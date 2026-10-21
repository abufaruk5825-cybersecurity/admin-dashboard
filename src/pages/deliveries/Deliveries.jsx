import { useState } from 'react';
import { PageShell, Card, Badge, Toast } from '../../components/common/PageShell';
import { getDeliveries, updateDelivery } from '../../data/store';
import { Search } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';
import '../users/Users.scss';

const TRANSITIONS = {
  Pending:    ['Assigned','Cancelled'],
  Assigned:   ['In Transit','Cancelled'],
  'In Transit':['Delivered','Cancelled'],
  Delivered:  [],
  Cancelled:  [],
};

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState(getDeliveries);
  const [search, setSearch] = useState('');
  const [statusF, setStatus] = useState('all');
  const { toast, show } = useToast();

  const filtered = deliveries.filter(d => {
    const q = search.toLowerCase();
    return (!q || d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q))
      && (statusF === 'all' || d.status === statusF);
  });

  const handleUpdate = (id, data) => {
    updateDelivery(id, data);
    setDeliveries(getDeliveries());
    show('Delivery updated', 'success');
  };

  return (
    <PageShell title="Deliveries" subtitle={`${deliveries.length} deliveries`}>
      <div className="user-filters">
        <div className="search-box"><Search size={15}/>
          <input placeholder="Search by delivery ID or customer…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select value={statusF} onChange={e=>setStatus(e.target.value)}>
          <option value="all">All Status</option>
          {['Pending','Assigned','In Transit','Delivered','Cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {filtered.length===0 ? <div className="empty-state">No deliveries found.</div> : (
          <div className="user-table-wrap">
            <table className="user-table">
              <thead><tr>
                <th>ID</th><th>Order</th><th>Customer</th><th>Address</th><th>Assigned To</th><th>ETA</th><th>Status</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(d=>(
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>#{d.orderId}</td>
                    <td>{d.customer}</td>
                    <td style={{ maxWidth:160, overflow:'hidden', textOverflow:'ellipsis' }}>{d.address}</td>
                    <td>{d.assigned || <span style={{color:'var(--text-muted)'}}>Unassigned</span>}</td>
                    <td>{d.eta}</td>
                    <td><Badge status={d.status}/></td>
                    <td>
                      {TRANSITIONS[d.status]?.length > 0 ? (
                        <select defaultValue="" onChange={e=>{ if(e.target.value) { handleUpdate(d.id, {status:e.target.value}); e.target.value=''; } }}
                          style={{ fontSize:12, padding:'4px 8px', borderRadius:6, border:'1px solid var(--border)', background:'var(--input-bg)', color:'var(--text-primary)', cursor:'pointer' }}>
                          <option value="" disabled>Set…</option>
                          {TRANSITIONS[d.status].map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : <span style={{fontSize:12,color:'var(--text-muted)'}}>—</span>}
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

export default Deliveries;
