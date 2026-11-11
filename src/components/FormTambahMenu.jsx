import { useState } from 'react';

export default function FormTambahMenu({ onTambah }) {
  const [namaMenu, setNamaMenu] = useState('');
  const [kategori, setKategori] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaMenu || !kategori) return;

    try {
      const response = await fetch('http://localhost:3000/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nama: namaMenu, 
          kategori: kategori, 
          harga: 0 
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        onTambah(data);
        setNamaMenu('');
        setKategori('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-green-700 border-b pb-2">Tambah Menu Baru</h3>
      <input
        type="text"
        placeholder="Nama Makanan"
        value={namaMenu}
        onChange={(e) => setNamaMenu(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="text"
        placeholder="Kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-md transition">
        Simpan Menu
      </button>
    </form>
  );
}