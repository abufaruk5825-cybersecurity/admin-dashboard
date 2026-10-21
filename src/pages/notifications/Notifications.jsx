import { useState } from 'react';
import { PageShell, Card, Toast } from '../../components/common/PageShell';
import { getNotifications, markNotifRead, markAllNotifsRead } from '../../data/store';
import { Bell, Check, CheckCheck, ShoppingCart, Truck, HeartPulse, Package, UserRound } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';

const typeIcon = { user: UserRound, order: ShoppingCart, delivery: Truck, system: HeartPulse, product: Package };

const Notifications = () => {
  const [notes, setNotes] = useState(getNotifications);
  const [filter, setFilter] = useState('all');
  const { toast, show } = useToast();

  const unread = notes.filter(n => !n.read).length;

  const markRead = (id) => {
    markNotifRead(id);
    setNotes(getNotifications());
  };

  const markAll = () => {
    markAllNotifsRead();
    setNotes(getNotifications());
    show('All notifications marked as read', 'success');
  };

  const filtered = notes.filter(n => filter === 'all' || (filter === 'unread' ? !n.read : n.read));

  return (
    <PageShell
      title="Notifications"
      subtitle={`${unread} unread`}
      action={
        <div style={{ display:'flex', gap:10 }}>
          <select value={filter} onChange={e=>setFilter(e.target.value)} style={{ padding:'8px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--input-bg)', color:'var(--text-primary)', fontSize:13, outline:'none' }}>
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <button className="btn btn--outline" onClick={markAll}><CheckCheck size={15}/> Mark all read</button>
        </div>
      }
    >
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {filtered.length === 0 ? (
          <Card><div style={{ textAlign:'center', padding:32, color:'var(--text-muted)' }}>No notifications.</div></Card>
        ) : filtered.map(n => {
          const Icon = typeIcon[n.type] || Bell;
          return (
            <Card key={n.id} style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 20px', background: n.read ? 'var(--bg-card)' : 'var(--accent-light)', borderLeft: n.read ? '3px solid transparent' : '3px solid var(--accent)' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--accent-light)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={16} color="var(--accent)"/>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, color:'var(--text-primary)', fontWeight: n.read?400:600 }}>{n.text}</p>
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:3 }}>{n.time}</p>
              </div>
              {!n.read && (
                <button className="btn btn--outline btn--sm" onClick={()=>markRead(n.id)} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Check size={12}/> Read
                </button>
              )}
            </Card>
          );
        })}
      </div>
      {toast && <Toast message={toast.message} type={toast.type}/>}
    </PageShell>
  );
};

export default Notifications;
