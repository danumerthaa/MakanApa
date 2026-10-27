export default function KartuMenu({ nama, kategori }) {
  return (
    <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center hover:shadow-sm mb-3">
      <span className="font-bold text-gray-800">{nama}</span>
      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">{kategori}</span>
    </div>
  );
}