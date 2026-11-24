import { useState } from 'react';

export default function AuthForm({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPesan('');
    setIsError(false);

    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const body = isRegister ? { nama, email, password } : { email, password };

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setPesan(Array.isArray(data.message) ? data.message[0] : data.message);
        return;
      }

      if (isRegister) {
        setIsRegister(false);
        setPesan('Registrasi berhasil! Silakan login dengan akun tersebut.');
      } else {
        localStorage.setItem('accessToken', data.accessToken);
        onLoginSuccess(data.accessToken);
      }
    } catch {
      setIsError(true);
      setPesan('Gagal terhubung ke server backend.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {isRegister ? 'Daftar Akun MakanApa' : 'Login MakanApa'}
        </h2>

        {pesan && (
          <div
            className={`p-3 rounded-md mb-4 text-sm ${
              isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {pesan}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Masukkan nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="danu@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            {isRegister ? 'Daftar' : 'Masuk'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setPesan('');
          }}
          className="w-full mt-4 text-sm text-green-700 hover:underline"
        >
          {isRegister ? 'Sudah punya akun? Login di sini' : 'Belum punya akun? Daftar di sini'}
        </button>
      </div>
    </div>
  );
}