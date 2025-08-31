import React, { useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { authAPI } from '../services/api';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    authAPI.adminLogin(password)
      .then(() => {
        onLogin();
      })
      .catch((error) => {
        setError(error.message || 'Invalid password. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lock className="h-8 w-8 text-orange-600" />
            <Sparkles className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-600">Enter password to access admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};