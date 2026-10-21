import { useState } from 'react';
import { PageShell, Card, Badge, Toast } from '../../components/common/PageShell';
import { getOrders, updateOrderStatus } from '../../data/store';
import { Search } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';
import '../users/Users.scss';

const VALID_TRANSITIONS = {
  Pending:  ['Approved', 'rejected'],
  Approved: ['rejected'],
  rejected: [],
};

const Orders = () => {
  const [orders, setOrders] = useState(getOrders);
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const { toast, show } = useToast();

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    return (!q || String(o.id).includes(q) || o.customer.toLowerCase().includes(q) || o.product.toLowerCase().includes(q))
      && (statusF === 'all' || o.status === statusF);
  });

  const handleStatus = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
    setOrders(getOrders());
    show(`Order status updated to "${newStatus}"`, 'success');
  };

  return (
    <PageShell title="Orders" subtitle={`${orders.length} total orders`}>
      <div className="user-filters">
        <div className="search-box"><Search size={15}/>
          <input placeholder="Search by order ID, customer, or product…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select value={statusF} onChange={e=>setStatusF(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {filtered.length === 0 ? <div className="empty-state">No orders found.</div> : (
          <div className="user-table-wrap">
            <table className="user-table">
              <thead><tr>
                <th>Order ID</th><th>Product</th><th>Customer</th><th>Date</th><th>Amount</th><th>Payment</th><th>Pay Status</th><th>Status</th><th>Change Status</th>
              </tr></thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td><div className="cell-user"><img src={o.img} alt={o.product}/><span>{o.product}</span></div></td>
                    <td>{o.customer}</td>
                    <td>{o.date}</td>
                    <td>${o.amount.toLocaleString()}</td>
                    <td>{o.method}</td>
                    <td><Badge status={o.payStatus}/></td>
                    <td><Badge status={o.status}/></td>
                    <td>
                      {VALID_TRANSITIONS[o.status]?.length > 0 ? (
                        <select
                          defaultValue=""
                          onChange={e => { if(e.target.value) handleStatus(o.id, e.target.value); e.target.value=''; }}
                          style={{ fontSize:12, padding:'4px 8px', borderRadius:6, border:'1px solid var(--border)', background:'var(--input-bg)', color:'var(--text-primary)', cursor:'pointer' }}
                        >
                          <option value="" disabled>Set…</option>
                          {VALID_TRANSITIONS[o.status].map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : <span style={{ fontSize:12, color:'var(--text-muted)' }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {toast && <Toast message={toast.message} type={toast.type}/>}
    </PageShell>
  );
};

export default Orders;
