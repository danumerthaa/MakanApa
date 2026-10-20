import { useState } from 'react';

function FormTambahMenu({ onTambah }) {
  const [namaMenu, setNamaMenu] = useState('');
  const [kategori, setKategori] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaMenu || !kategori) return; 
    
    onTambah({ id: Date.now(), nama: namaMenu, kategori: kategori });
    
    setNamaMenu('');
    setKategori('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Tambah Menu Baru</h3>
      <input
        type="text"
        placeholder="Nama Menu"
        value={namaMenu}
        onChange={(e) => setNamaMenu(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Kategori (Misal: Makanan)"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button type="submit" style={{ padding: '6px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Tambah
      </button>
    </form>
  );
}

export default FormTambahMenu