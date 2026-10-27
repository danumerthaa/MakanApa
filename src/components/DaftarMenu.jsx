import KartuMenu from './KartuMenu';
import RingkasanData from './RingkasanData';

export default function DaftarMenu({ menus }) {
  if (menus.length === 0) {
    return <p className="text-center text-red-500 italic py-8">Belum ada data Menu. Silakan tambah menu pada halaman "Tambah Menu".</p>;
  }

  return (
    <div>
      <RingkasanData total={menus.length} />
      <div className="flex flex-col gap-2">
        {menus.map((menu) => (
          <KartuMenu key={menu.id} nama={menu.nama} kategori={menu.kategori} />
        ))}
      </div>
    </div>
  );
}