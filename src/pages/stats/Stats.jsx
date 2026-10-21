import { PageShell, Card } from '../../components/common/PageShell';
import Widget  from '../../components/widget/Widget';
import Charts  from '../../components/charts/Charts';
import { getUsers, getOrders, getProducts, getDeliveries } from '../../data/store';
import '../../components/common/PageShell.scss';

const Stats = () => {
  const users      = getUsers();
  const orders     = getOrders();
  const products   = getProducts();
  const deliveries = getDeliveries();
  const revenue    = orders.reduce((s,o)=>s+o.amount, 0);
  const delivered  = deliveries.filter(d=>d.status==='Delivered').length;

  return (
    <PageShell title="Stats" subtitle="Demo analytics — all figures are based on local data">
      <div style={{ display:'flex', gap:20, flexWrap:'wrap', marginBottom:20 }}>
        <Widget type="users"    count={users.length} />
        <Widget type="orders"   count={orders.length} />
        <Widget type="earnings" count={revenue} />
        <Widget type="balance"  count={products.length} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16, marginBottom:20 }}>
        {[
          ['Active Users',     users.filter(u=>u.status==='active').length,    users.length,      'badge--green'],
          ['Pending Users',    users.filter(u=>u.status==='pending').length,   users.length,      'badge--yellow'],
          ['Approved Orders',  orders.filter(o=>o.status==='Approved').length, orders.length,     'badge--green'],
          ['Delivered',        delivered,                                       deliveries.length, 'badge--green'],
          ['In Stock Products',products.filter(p=>p.status==='In Stock').length,products.length,  'badge--green'],
          ['Out of Stock',     products.filter(p=>p.status==='Out of Stock').length,products.length,'badge--red'],
        ].map(([label, count, total, cls]) => (
          <Card key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontSize:12, color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', marginBottom:6 }}>{label}</p>
              <p style={{ fontSize:26, fontWeight:300, color:'var(--text-primary)' }}>{count}</p>
            </div>
            <span className={`badge ${cls}`} style={{ fontSize:14 }}>{total > 0 ? Math.round(count/total*100) : 0}%</span>
          </Card>
        ))}
      </div>

      <Charts title="Revenue — Last 7 Months" aspect={3/1}/>
    </PageShell>
  );
};

export default Stats;
