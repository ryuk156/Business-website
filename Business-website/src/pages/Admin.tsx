import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

type RequestRow = { id: string; created_at: string; status: string; email?: string; customer_id?: string; subject?: string; business_name?: string; name?: string; plan?: string };
const tables = ['checkout_requests', 'website_requests', 'contact_requests', 'support_requests'] as const;
const statusOptions: Record<typeof tables[number], string[]> = {
  checkout_requests: ['pending', 'paid', 'cancelled'],
  website_requests: ['new', 'contacted', 'closed'],
  contact_requests: ['new', 'contacted', 'closed'],
  support_requests: ['open', 'in_progress', 'resolved', 'closed'],
};

function Admin() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [rows, setRows] = useState<Record<string, RequestRow[]>>({});
  const [error, setError] = useState('');

  const updateStatus = async (table: typeof tables[number], id: string, status: string) => {
    if (!supabase) return;
    const { error: updateError } = await supabase.from(table).update({ status }).eq('id', id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setRows((current) => ({
      ...current,
      [table]: (current[table] || []).map((row) => row.id === id ? { ...row, status } : row),
    }));
  };

  useEffect(() => {
    if (!user || !supabase) return;
    Promise.all(tables.map(async (table) => {
      const { data, error: queryError } = await supabase.from(table).select('*').order('created_at', { ascending: false }).limit(50);
      if (queryError) throw queryError;
      return [table, data || []] as const;
    })).then((results) => setRows(Object.fromEntries(results))).catch((err) => setError(err instanceof Error ? err.message : 'Unable to load requests.'));
  }, [user]);

  if (authLoading) return <main className="container-custom py-32 text-center">Loading admin dashboard...</main>;
  if (!user) return <main className="container-custom py-32 text-center"><h1 className="text-3xl font-bold">Admin sign-in required</h1><Link to="/auth" className="mt-6 inline-block"><Button>Sign in</Button></Link></main>;

  return (
    <main className="container-custom py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Operations</p><h1 className="mt-2 text-4xl font-bold">Admin dashboard</h1><p className="mt-2 text-neutral-600">Manage customer requests and new orders.</p></div><Button variant="outline" onClick={() => signOut()}>Sign out</Button></div>
      {error && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
      <div className="mt-8 grid gap-6 lg:grid-cols-4">{tables.map((table) => <section key={table} className="card overflow-hidden"><div className="border-b border-neutral-200 p-5"><h2 className="font-semibold capitalize text-neutral-900">{table.replace(/_/g, ' ')}</h2><p className="mt-1 text-sm text-neutral-500">{rows[table]?.length || 0} recent records</p></div><div className="divide-y divide-neutral-100">{(rows[table] || []).slice(0, 8).map((row) => <div key={row.id} className="p-4 text-sm"><p className="font-medium text-neutral-900">{row.subject || row.business_name || row.name || row.plan || row.email}</p><p className="mt-1 text-neutral-500">{row.email || row.customer_id}</p><div className="mt-2 flex items-center justify-between gap-3"><p className="text-xs text-neutral-400">{new Date(row.created_at).toLocaleString()}</p><select aria-label={`Update status for ${row.email || row.id}`} value={row.status} onChange={(event) => updateStatus(table, row.id, event.target.value)} className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-700">{statusOptions[table].map((status) => <option key={status} value={status}>{status}</option>)}</select></div></div>)}</div></section>)}</div>
    </main>
  );
}

export default Admin;
