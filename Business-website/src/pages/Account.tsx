import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { FileText, Headphones, Package, RefreshCw, Send, Signpost } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type Order = { id: string; created_at: string; status: string; one_time_total: number; monthly_total: number; cart_items: Array<{ name?: string; quantity?: number }> };
type Invoice = { id: string; created_at: string; amount: number; currency: string; status: string; invoice_url?: string | null };
type Subscription = { id: string; plan_name: string; amount: number; period: string; status: string; current_period_end?: string | null };
type SupportRequest = { id: string; subject: string; message: string; status: string; admin_reply?: string | null; created_at: string };

function Account() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [support, setSupport] = useState<SupportRequest[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadAccount = async () => {
    if (!user || !supabase) return;
    setRefreshing(true);
    setError('');
    const results = await Promise.all([
      supabase.from('checkout_requests').select('id, created_at, status, one_time_total, monthly_total, cart_items').order('created_at', { ascending: false }),
      supabase.from('invoices').select('id, created_at, amount, currency, status, invoice_url').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('id, plan_name, amount, period, status, current_period_end').order('created_at', { ascending: false }),
      supabase.from('support_requests').select('id, subject, message, status, admin_reply, created_at').order('created_at', { ascending: false }),
    ]);
    const failed = results.find((result) => result.error);
    if (failed?.error) setError(failed.error.message);
    else {
      setOrders((results[0].data || []) as Order[]);
      setInvoices((results[1].data || []) as Invoice[]);
      setSubscriptions((results[2].data || []) as Subscription[]);
      setSupport((results[3].data || []) as SupportRequest[]);
    }
    setRefreshing(false);
  };

  useEffect(() => { void loadAccount(); }, [user]);

  const createSupportRequest = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase || !user || !subject.trim() || !message.trim()) return;
    const { error: insertError } = await supabase.from('support_requests').insert({ customer_id: user.id, subject: subject.trim(), message: message.trim() });
    if (insertError) setError(insertError.message);
    else {
      setSubject('');
      setMessage('');
      setNotice('Your support request was sent.');
      void loadAccount();
    }
  };

  if (loading) return <main className="container-custom py-32 text-center text-neutral-600">Loading your account...</main>;
  if (!user) return <main className="container-custom py-32 text-center"><h1 className="text-3xl font-bold">Sign in to view your account</h1><Link to="/auth" className="mt-6 inline-block"><Button>Sign in</Button></Link></main>;

  return (
    <main className="container-custom py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Customer portal</p><h1 className="mt-2 text-4xl font-bold text-neutral-900">Your account</h1><p className="mt-2 text-neutral-600">{user.email}</p></div>
        <div className="flex gap-3"><Button variant="outline" onClick={() => void loadAccount()} disabled={refreshing}><RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />Refresh</Button><Button variant="outline" onClick={async () => { await signOut(); navigate('/'); }}>Sign out</Button></div>
      </div>
      {error && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
      {notice && <p className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PortalSection icon={Package} title="Orders">
          {orders.length === 0 ? <Empty text="No orders are linked to this account yet." /> : orders.map((order) => <div key={order.id} className="border-b border-neutral-100 py-4 last:border-0"><div className="flex justify-between gap-3"><p className="font-medium">Order #{order.id.slice(0, 8)}</p><Status value={order.status} /></div><p className="mt-1 text-sm text-neutral-500">{new Date(order.created_at).toLocaleDateString()} · {order.cart_items?.map((item) => `${item.name || 'Item'} × ${item.quantity || 1}`).join(', ')}</p><p className="mt-2 text-sm font-medium">${Number(order.one_time_total || 0).toFixed(2)} one-time{Number(order.monthly_total) > 0 ? ` + $${Number(order.monthly_total).toFixed(2)}/mo` : ''}</p></div>)}
        </PortalSection>
        <PortalSection icon={FileText} title="Invoices">
          {invoices.length === 0 ? <Empty text="Invoices will appear here after payment is recorded." /> : invoices.map((invoice) => <div key={invoice.id} className="flex items-center justify-between gap-4 border-b border-neutral-100 py-4 last:border-0"><div><p className="font-medium">Invoice #{invoice.id.slice(0, 8)}</p><p className="text-sm text-neutral-500">{new Date(invoice.created_at).toLocaleDateString()} · {invoice.currency.toUpperCase()}</p></div><div className="text-right"><p className="font-medium">${Number(invoice.amount).toFixed(2)}</p><Status value={invoice.status} />{invoice.invoice_url && <a href={invoice.invoice_url} target="_blank" rel="noreferrer" className="mt-1 block text-xs text-primary-600">View invoice</a>}</div></div>)}
        </PortalSection>
        <PortalSection icon={Signpost} title="Website subscriptions">
          {subscriptions.length === 0 ? <Empty text="Active website subscriptions will appear here." /> : subscriptions.map((subscription) => <div key={subscription.id} className="border-b border-neutral-100 py-4 last:border-0"><div className="flex justify-between gap-3"><p className="font-medium">{subscription.plan_name}</p><Status value={subscription.status} /></div><p className="mt-1 text-sm text-neutral-500">${Number(subscription.amount).toFixed(2)}{subscription.period}{subscription.current_period_end ? ` · Renews ${new Date(subscription.current_period_end).toLocaleDateString()}` : ''}</p></div>)}
        </PortalSection>
        <PortalSection icon={Headphones} title="Support requests">
          {support.length === 0 ? <Empty text="No support requests yet." /> : support.map((ticket) => <div key={ticket.id} className="border-b border-neutral-100 py-4 last:border-0"><div className="flex justify-between gap-3"><p className="font-medium">{ticket.subject}</p><Status value={ticket.status} /></div><p className="mt-1 text-sm text-neutral-600">{ticket.message}</p>{ticket.admin_reply && <p className="mt-2 rounded bg-primary-50 p-2 text-sm text-primary-900">Reply: {ticket.admin_reply}</p>}</div>)}
          <form onSubmit={createSupportRequest} className="mt-4 border-t border-neutral-200 pt-4"><label className="label" htmlFor="support-subject">New request</label><input id="support-subject" className="input-field" placeholder="What do you need help with?" value={subject} onChange={(event) => setSubject(event.target.value)} required /><textarea className="input-field mt-3 min-h-24 resize-y" placeholder="Describe the issue or question..." value={message} onChange={(event) => setMessage(event.target.value)} required /><Button type="submit" className="mt-3"><Send className="mr-2 h-4 w-4" />Send request</Button></form>
        </PortalSection>
      </div>
    </main>
  );
}

function PortalSection({ icon: Icon, title, children }: { icon: typeof Package; title: string; children: ReactNode }) {
  return <section className="card p-6"><div className="flex items-center gap-3"><Icon className="h-5 w-5 text-primary-600" /><h2 className="text-xl font-semibold text-neutral-900">{title}</h2></div><div className="mt-3">{children}</div></section>;
}

function Status({ value }: { value: string }) {
  return <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium capitalize text-neutral-700">{value.replace('_', ' ')}</span>;
}

function Empty({ text }: { text: string }) {
  return <p className="py-5 text-sm text-neutral-500">{text}</p>;
}

export default Account;
