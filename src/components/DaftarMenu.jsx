import KartuMenu from './KartuMenu';

function DaftarMenu({ menus }) {
  if (menus.length === 0) {
    return <p style={{ color: 'red', fontStyle: 'italic' }}>Belum ada data Menu</p>;
  }

  return (
    <div>
      {menus.map((menu) => (
        <KartuMenu key={menu.id} nama={menu.nama} kategori={menu.kategori} />
      ))}
    </div>
  );
}

export default DaftarMenu