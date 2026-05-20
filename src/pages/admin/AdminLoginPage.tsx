import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PASSWORD, STORAGE_KEYS } from '../../config/site';
import { useSEO } from '../../hooks/useSEO';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useSEO({
    title: 'Admin Login',
    description: 'Busy Multicare admin panel',
    noIndex: true,
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEYS.auth, 'true');
      localStorage.setItem(STORAGE_KEYS.authTime, Date.now().toString());
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel</h1>
        <p className="text-gray-500 mb-6">Busy Multicare Software</p>
        <label htmlFor="admin-password" className="sr-only">Admin password</label>
        <input
          id="admin-password"
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-3" role="alert">{error}</p>}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
