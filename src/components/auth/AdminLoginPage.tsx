import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { KamadhenuLogo } from '../layout/KamadhenuLogo';

const Login3DScene = React.lazy(() => import('./Login3DScene'));

type LoginFormValues = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const AdminLoginPage: React.FC = () => {
  const { login, completeLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successPulse, setSuccessPulse] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [hasWebGLSupport, setHasWebGLSupport] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, watch } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: true
    },
    mode: 'onSubmit'
  });

  const usernameValue = watch('username');
  const passwordValue = watch('password');
  const hasUsername = Boolean(usernameValue);
  const hasPassword = Boolean(passwordValue);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.35 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.35 });

  const logoMotion = useMemo(
    () => ({
      y: [0, -10, 0],
      scale: [1, 1.015, 1],
      rotateZ: [0, 0.6, 0]
    }),
    []
  );

  const handleCardMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * 10);
    rotateY.set((x - 0.5) * 14);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasContext = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      setHasWebGLSupport(hasContext);
    } catch {
      setHasWebGLSupport(false);
    }
  }, []);

  const pushRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipples((current) => [...current, { id, x, y }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 650);
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setAuthError('');
    setSuccessPulse(false);

    try {
      const signedInUser = await login(values.username.trim(), values.password);
      setSuccessPulse(true);
      window.setTimeout(() => {
        completeLogin(signedInUser, values.rememberMe);
      }, 650);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Invalid username or password.');
      setSuccessPulse(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.28),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(96,165,250,0.16),transparent_35%),linear-gradient(180deg,#050816_0%,#0F172A_52%,#111827_100%)]" />
      <div className="absolute inset-0 opacity-70 mix-blend-screen bg-[linear-gradient(115deg,transparent_0%,rgba(148,163,184,0.08)_25%,transparent_50%,rgba(59,130,246,0.12)_70%,transparent_100%)] animate-[pulse_14s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.24)_45%,rgba(2,6,23,0.72)_100%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(37,99,235,0.16),transparent_70%)] blur-3xl" />
        <div className="absolute left-0 top-1/3 h-96 w-96 -translate-x-1/3 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[32rem] w-[32rem] translate-x-1/4 rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {hasWebGLSupport && (
          <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <Suspense fallback={null}>
              <Login3DScene />
            </Suspense>
          </div>
        )}

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full justify-center"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={logoMotion}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-blue-500/25 blur-3xl" />
              <motion.div
                className="origin-center"
                style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
              >
                <KamadhenuLogo
                  variant="header"
                  className="bg-transparent border-0 shadow-none p-0 mx-auto max-w-none"
                  imageClassName="h-24 w-auto max-w-[92vw] object-contain sm:h-28 md:h-32 lg:h-36 xl:h-40 drop-shadow-[0_0_26px_rgba(59,130,246,0.45)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            onPointerMove={handleCardMove}
            onPointerLeave={resetTilt}
            className="relative w-full max-w-md"
            style={{ perspective: 1500 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/8 p-6 shadow-[0_30px_120px_rgba(2,6,23,0.75)] backdrop-blur-2xl sm:p-8"
              style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_28%,transparent_72%,rgba(255,255,255,0.08))]" />
              <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/10" />
              <div className="absolute -right-20 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4 pb-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-400">Enterprise Portal</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Welcome Back</h1>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400 sm:text-base">
                    Sign in to access your HR Management Dashboard
                  </p>
                </div>
                <div className="hidden rounded-2xl border border-white/10 bg-white/8 p-3 text-sky-300 shadow-lg shadow-sky-500/10 sm:block">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              <form className="relative space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    {...register('username', { required: 'Username is required' })}
                    type="text"
                    autoComplete="username"
                    placeholder=" "
                    className="peer w-full rounded-2xl border border-white/10 bg-white/8 px-12 pb-3 pt-6 text-white outline-none transition-all duration-300 placeholder-transparent focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/20"
                  />
                  <label
                    className={`pointer-events-none absolute left-12 text-sm text-slate-400 transition-all duration-200 ${
                      hasUsername
                        ? 'top-3 translate-y-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200'
                        : 'top-1/2 -translate-y-1/2'
                    } peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-blue-200`}
                  >
                    Username
                  </label>
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder=" "
                    className="peer w-full rounded-2xl border border-white/10 bg-white/8 px-12 pb-3 pt-6 text-white outline-none transition-all duration-300 placeholder-transparent focus:border-blue-400/70 focus:ring-4 focus:ring-blue-500/20"
                  />
                  <label
                    className={`pointer-events-none absolute left-12 text-sm text-slate-400 transition-all duration-200 ${
                      hasPassword
                        ? 'top-3 translate-y-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200'
                        : 'top-1/2 -translate-y-1/2'
                    } peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-blue-200`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1 text-sm">
                  <label className="flex items-center gap-2 text-slate-300">
                    <input
                      {...register('rememberMe')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 accent-blue-500 focus:ring-blue-500/30"
                    />
                    Remember Me
                  </label>
                  <button
                    type="button"
                    className="text-slate-300 transition-colors hover:text-white"
                    onClick={(event) => event.preventDefault()}
                  >
                    Forgot Password?
                  </button>
                </div>

                <AnimatePresence>
                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      className="rounded-2xl border border-red-400/25 bg-red-500/12 px-4 py-3 text-sm text-red-200"
                    >
                      {authError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={pushRipple}
                    className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.4)] transition-transform disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </span>
                    <span className="absolute inset-0 bg-white/12 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                    {ripples.map((ripple) => (
                      <motion.span
                        key={ripple.id}
                        initial={{ opacity: 0.5, scale: 0 }}
                        animate={{ opacity: 0, scale: 10 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        style={{ left: ripple.x, top: ripple.y }}
                        className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35"
                      />
                    ))}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {successPulse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/10 px-6 py-5 text-center shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="mt-4 text-lg font-semibold text-white">Access Granted</p>
              <p className="mt-1 text-sm text-slate-300">Redirecting to your dashboard...</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                Loading workspace
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-[#050816] via-transparent to-transparent" />
      <div className="pointer-events-none fixed inset-y-0 right-0 z-0 w-32 bg-gradient-to-l from-blue-500/8 to-transparent" />
      <div className="pointer-events-none fixed inset-y-0 left-0 z-0 w-32 bg-gradient-to-r from-blue-500/8 to-transparent" />

      <style>{`@keyframes loginGlow { 0%, 100% { opacity: 0.55; transform: translate3d(0,0,0) scale(1); } 50% { opacity: 1; transform: translate3d(0,-4px,0) scale(1.03); } }`}</style>
    </div>
  );
};
