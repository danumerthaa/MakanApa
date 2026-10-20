import { useState } from 'react';
import Header from './components/Header';
import RingkasanData from './components/RingkasanData';
import FormTambahMenu from './components/FormTambahMenu';
import DaftarMenu from './components/DaftarMenu';

function App() {
  const [menus, setMenus] = useState([]);
  const [hasilAcak, setHasilAcak] = useState(null);

  const tambahMenu = (menuBaru) => {
    setMenus([...menus, menuBaru]);
  };

  const acakMenu = () => {
    if (menus.length === 0) return;
    const randomIndex = Math.floor(Math.random() * menus.length);
    setHasilAcak(menus[randomIndex]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <Header />
      <RingkasanData total={menus.length} />
      <FormTambahMenu onTambah={tambahMenu} />

      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', textAlign: 'center' }}>
        <button 
          onClick={acakMenu} 
          disabled={menus.length === 0} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#ffc107', 
            color: 'black', 
            border: '1px solid #d39e00', 
            borderRadius: '5px', 
            fontWeight: 'bold', 
            cursor: menus.length === 0 ? 'not-allowed' : 'pointer' 
          }}
        >
          Acak Makan Apa Hari Ini!
        </button>
        
        {hasilAcak && (
          <h2 style={{ marginTop: '15px', color: '#856404' }}>
            Kamu harus makan: {hasilAcak.nama}!
          </h2>
        )}
      </div>

      <DaftarMenu menus={menus} />
    </div>
  );
}

export default App;