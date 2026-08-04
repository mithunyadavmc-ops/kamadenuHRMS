import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { KamadhenuLogo } from '../layout/KamadhenuLogo';

type LoginFormValues = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const AdminLoginPage: React.FC = () => {
  const { login, completeLogin } = useAuth();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    username: '',
    password: '',
    rememberMe: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof LoginFormValues, value: string | boolean) => {
    setFormValues((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const signedInUser = await login(formValues.username.trim(), formValues.password);
      completeLogin(signedInUser, formValues.rememberMe);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Invalid username or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col items-center text-center">
            <KamadhenuLogo
              variant="header"
              className="bg-transparent border-0 shadow-none p-0 mx-auto"
              imageClassName="h-20 w-auto max-w-[75vw] object-contain sm:h-24"
            />
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Welcome Back</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to access your HR Management Dashboard
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Username</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
                <User className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={formValues.username}
                  onChange={(event) => handleChange('username', event.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  required
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formValues.rememberMe}
                  onChange={(event) => handleChange('rememberMe', event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 bg-white text-blue-500 accent-blue-500"
                />
                Remember Me
              </label>
              <button type="button" className="text-blue-600 transition-colors hover:text-blue-700">
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[#2563EB] px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-transform hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
