import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { useSEO } from '../../hooks/useSEO';
import Logo from '../../components/Logo';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useSEO({ title: 'Admin Login', description: 'Busy Multicare admin panel', noIndex: true });

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] text-white flex-col justify-between p-12">
        <div>
          <Logo variant="nav" />
          <h1 className="text-3xl font-bold mt-12 leading-tight">Content Management</h1>
          <p className="text-indigo-200/80 mt-4 max-w-md">
            Update blogs, awards, product prices, and your entire home page — no code required.
          </p>
        </div>
        <p className="text-sm text-indigo-300/60">Busy Multicare Software Pvt. Ltd.</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f8fafc]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo variant="nav" />
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200/80">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h2>
            <p className="text-slate-500 text-sm mb-8">Admin panel access</p>
            <label htmlFor="admin-email" className="sr-only">Email</label>
            <input
              id="admin-email"
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]/30 focus:border-[#1a56db]"
            />
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]/30 focus:border-[#1a56db]"
            />
            {error && <p className="text-red-600 text-sm mb-4" role="alert">{error}</p>}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#1a56db] hover:bg-[#1648c0] disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
