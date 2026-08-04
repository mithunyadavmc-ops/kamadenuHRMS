import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff, LoaderCircle, Lock, Sparkles, User } from 'lucide-react';
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
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (field: keyof LoginFormValues, value: string | boolean) => {
    setFormValues((current) => ({
      ...current,
      [field]: value
    }));
    if (error) {
      setError('');
    }
    if (statusMessage) {
      setStatusMessage('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setStatusMessage('');

    try {
      const signedInUser = await login(formValues.username.trim(), formValues.password);
      completeLogin(signedInUser, formValues.rememberMe);
      setStatusMessage('Login successful. Redirecting to your dashboard...');
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : 'Invalid username or password.';
      setError(message);
      setStatusMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_40%),linear-gradient(135deg,_#eef4ff_0%,_#f8fafc_50%,_#e0f2fe_100%)] text-slate-900 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.3)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col items-center text-center">
            <KamadhenuLogo
              variant="header"
              className="bg-transparent border-0 shadow-none p-0 mx-auto"
              imageClassName="h-20 w-auto max-w-[75vw] object-contain sm:h-24"
            />
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-sm font-medium text-blue-700">
              <Sparkles className="h-4 w-4" />
              Secure HR Access
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to access your HR Management Dashboard
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Username</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
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
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
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

            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              ) : null}

              {statusMessage ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                  role="status"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{statusMessage}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-80"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
