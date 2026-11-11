import { useState, useEffect } from 'react';
import KartuMenu from './KartuMenu';
import RingkasanData from './RingkasanData';

export default function DaftarMenu() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error(err));
  }, []);

  const handleHapus = async (id) => {
    try {
      await fetch(`http://localhost:3000/menu/${id}`, { method: 'DELETE' });
      setMenus(menus.filter((menu) => menu.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (menus.length === 0) {
    return <p className="text-center text-red-500 italic py-8">Belum ada data Menu. Silakan tambah menu pada halaman "Tambah Menu".</p>;
  }

  return (
    <div>
      <RingkasanData total={menus.length} />
      <div className="flex flex-col gap-2">
        {menus.map((menu) => (
          <KartuMenu 
            key={menu.id} 
            id={menu.id}
            nama={menu.nama} 
            kategori={menu.kategori} 
            onHapus={handleHapus}
          />
        ))}
      </div>
    </div>
  );
}