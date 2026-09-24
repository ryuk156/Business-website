import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        navigate(location.state?.from || '/account', { replace: true });
      } else {
        await signUp(email, password);
        setMessage('Account created. Check your email if confirmation is enabled, then sign in.');
        setMode('signin');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to complete account setup.');
    }
  };

  return (
    <main className="container-custom flex min-h-[70vh] items-center justify-center py-16">
      <section className="card w-full max-w-md p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Optional customer account</p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900">{mode === 'signin' ? 'Sign in' : 'Create your account'}</h1>
        <p className="mt-3 text-neutral-600">Manage orders, invoices, subscriptions, and support without blocking guest checkout.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label className="label" htmlFor="auth-email">Email address</label><input id="auth-email" className="input-field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
          <div><label className="label" htmlFor="auth-password">Password</label><input id="auth-password" className="input-field" type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
          {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
          {message && <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          <Button type="submit" className="w-full">{mode === 'signin' ? 'Sign in' : 'Create account'}</Button>
        </form>
        <button type="button" className="mt-5 text-sm font-medium text-primary-600 hover:text-primary-700" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}>
          {mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
        <Link to="/" className="mt-4 block text-sm text-neutral-500 hover:text-neutral-700">Continue as a guest</Link>
      </section>
    </main>
  );
}

export default Auth;
