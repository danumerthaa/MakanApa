export default function Header({ tabAktif, setTabAktif }) {
  return (
    <header className="bg-green-700 px-8 py-4 flex flex-col md:flex-row justify-between items-center shadow-md gap-4">
      <h1 className="text-2xl font-bold text-white tracking-wide">MakanApa</h1>
      <nav className="flex gap-2 flex-wrap justify-center">
        <button onClick={() => setTabAktif('beranda')} className={`px-4 py-2 rounded-md font-semibold transition ${tabAktif === 'beranda' ? 'bg-white text-green-700' : 'bg-transparent text-white border border-white hover:bg-green-600'}`}>Beranda</button>
        <button onClick={() => setTabAktif('daftar')} className={`px-4 py-2 rounded-md font-semibold transition ${tabAktif === 'daftar' ? 'bg-white text-green-700' : 'bg-transparent text-white border border-white hover:bg-green-600'}`}>Daftar Menu</button>
        <button onClick={() => setTabAktif('tambah')} className={`px-4 py-2 rounded-md font-semibold transition ${tabAktif === 'tambah' ? 'bg-white text-green-700' : 'bg-transparent text-white border border-white hover:bg-green-600'}`}>Tambah Menu</button>
        <button onClick={() => setTabAktif('inspirasi')} className={`px-4 py-2 rounded-md font-semibold transition ${tabAktif === 'inspirasi' ? 'bg-yellow-400 text-green-900 border border-yellow-400' : 'bg-transparent text-yellow-300 border border-yellow-300 hover:bg-green-600'}`}>Inspirasi Menu</button>
      </nav>
    </header>
  );
}