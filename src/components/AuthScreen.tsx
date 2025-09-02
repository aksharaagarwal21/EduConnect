import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthScreenProps {
  onAuthComplete: () => void;
}

export default function AuthScreen({ onAuthComplete }: AuthScreenProps) {
  const { dispatch } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Date.now().toString(),
        email: formData.email,
        name: isLogin ? formData.email.split('@')[0] : formData.name,
      };

      dispatch({ type: 'SET_USER', payload: user });
      setIsLoading(false);
      onAuthComplete();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-emerald-500 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EduConnect</h1>
          <p className="text-gray-400">Digital Education for Everyone</p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isLogin
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                !isLogin
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Demo Credentials</h3>
          <p className="text-xs text-gray-400 mb-1">Email: demo@educonnect.com</p>
          <p className="text-xs text-gray-400">Password: demo123</p>
        </div>
      </div>
    </div>
  );
}