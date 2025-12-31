'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import { FaLock } from 'react-icons/fa';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      password,
      redirect: false
    });

    if (result?.error) {
      setError('Mot de passe incorrect');
    } else {
      router.refresh();
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-xl font-semibold text-gray-700">Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-amber-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Accès Administration
            </h1>
            <p className="text-gray-600">
              Entrez le mot de passe pour accéder au panneau d'administration
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none transition"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors duration-300 font-semibold"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-amber-700 hover:text-amber-800 font-semibold transition-colors"
            >
              ← Retour au site
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}