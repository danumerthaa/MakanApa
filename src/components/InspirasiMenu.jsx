import { useState, useEffect } from 'react';

export default function InspirasiMenu() {
  const [inspirasi, setInspirasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ambilDataAPI = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (!response.ok) throw new Error('Gagal mengambil data');
      const data = await response.json();
      setInspirasi(data.categories.slice(0, 6)); 
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilDataAPI();
  }, []);

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-green-700 mb-4 border-b pb-2">🌍 Inspirasi Menu dari API Eksternal</h2>
      
      {loading && (
        <div className="text-center py-12 text-gray-500 animate-pulse font-semibold">
          ⏳ Sedang memuat data masakan dunia dari server...
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-10 bg-red-50 rounded-md border border-red-200">
          <p className="text-red-600 mb-4 font-semibold">Gagal terhubung ke server API.</p>
          <button 
            onClick={ambilDataAPI} 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition"
          >
            🔄 Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inspirasi.map((item) => (
            <div key={item.idCategory} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md">
              <img src={item.strCategoryThumb} alt={item.strCategory} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="font-bold text-gray-800">{item.strCategory}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.strCategoryDescription}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}