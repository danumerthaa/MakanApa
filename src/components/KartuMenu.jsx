export default function KartuMenu({ id, nama, kategori, onHapus }) {
  return (
    <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center hover:shadow-sm mb-3">
      <div>
        <span className="font-bold text-gray-800 mr-3">{nama}</span>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">{kategori}</span>
      </div>
      <button 
        onClick={() => onHapus(id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
      >
        Hapus
      </button>
    </div>
  );
}