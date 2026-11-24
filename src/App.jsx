import { useEffect, useState } from 'react';
import Header from './components/Header';
import FormTambahMenu from './components/FormTambahMenu';
import DaftarMenu from './components/DaftarMenu';
import InspirasiMenu from './components/InspirasiMenu';
import AuthForm from './components/AuthForm';
import gambarMie from './assets/miayam.jpg';

const API_URL = 'http://localhost:3000';

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [menus, setMenus] = useState([]);
  const [hasilAcak, setHasilAcak] = useState(null);
  const [tabAktif, setTabAktif] = useState('beranda');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setMenus([]);
    setHasilAcak(null);
  };

  const fetchMenus = async () => {
    try {
      const res = await fetch(`${API_URL}/menu`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setMenus(data);
      }
    } catch (err) {
      console.error('Gagal mengambil data menu:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMenus();
    }
  }, [token]);

  const tambahMenu = async (menuBaru) => {
    const { id, ...payload } = menuBaru;
    try {
      const res = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        const created = await res.json();
        setMenus((prev) => [...prev, created]);
        setTabAktif('daftar');
      }
    } catch (err) {
      console.error('Gagal menambah menu:', err);
    }
  };

  const hapusMenu = async (id) => {
    try {
      const res = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        setMenus((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Gagal menghapus menu:', err);
    }
  };

  const acakMenu = () => {
    if (menus.length === 0) {
      alert('Daftar menu masih kosong! Tambahkan menu terlebih dahulu.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * menus.length);
    setHasilAcak(menus[randomIndex]);
  };

  if (!token) {
    return <AuthForm onLoginSuccess={(newToken) => setToken(newToken)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-green-900 text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>Status: Login Aktif (JWT Terpasang)</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
        >
          Logout
        </button>
      </div>

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
            <DaftarMenu menus={menus} onHapus={hapusMenu} />
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