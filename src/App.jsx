import { useState } from 'react';
import Header from './components/Header';
import FormTambahMenu from './components/FormTambahMenu';
import DaftarMenu from './components/DaftarMenu';
import InspirasiMenu from './components/InspirasiMenu';
import gambarMie from './assets/miayam.jpg';

export default function App() {
  const [menus, setMenus] = useState([]);
  const [hasilAcak, setHasilAcak] = useState(null);
  const [tabAktif, setTabAktif] = useState('beranda');

  const tambahMenu = (menuBaru) => {
    setMenus([...menus, menuBaru]);
    setTabAktif('daftar'); 
  };

  const acakMenu = () => {
    if (menus.length === 0) {
        alert("Daftar menu masih kosong! Tambahkan menu terlebih dahulu.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * menus.length);
    setHasilAcak(menus[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header tabAktif={tabAktif} setTabAktif={setTabAktif} />

      <main className="flex-grow flex flex-col items-center py-10 px-4">
        {tabAktif === 'beranda' && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full text-center border border-gray-100">
            <h2 className="text-xl font-bold text-green-700 mb-2">Bingung mau makan apa hari ini?</h2>
            <p className="text-gray-600 mb-6 text-sm">Tenang, biarkan aplikasi ini yang memilihkan menu untukmu!</p>
            
            <img src={gambarMie} alt="Mie Ayam" className="w-3/4 mx-auto rounded-md mb-6 shadow-sm" />
            
            <button onClick={acakMenu} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-md transition">
              Acak Menu Sekarang!
            </button>
            
            {hasilAcak && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-xl font-bold text-green-800">🎉 Hasil Acak: {hasilAcak.nama}</h3>
              </div>
            )}
          </div>
        )}

        {tabAktif === 'tambah' && (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
             <FormTambahMenu onTambah={tambahMenu} />
          </div>
        )}

        {tabAktif === 'daftar' && (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
             <DaftarMenu menus={menus} />
          </div>
        )}

        {tabAktif === 'inspirasi' && (
          <InspirasiMenu />
        )}
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        © 2026 Putu Gede Danu Mertha Teja - Tugas Web
      </footer>
    </div>
  );
}