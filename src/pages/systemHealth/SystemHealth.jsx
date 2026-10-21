import { useState } from 'react';
import { PageShell, Card, Badge } from '../../components/common/PageShell';
import { RefreshCw } from 'lucide-react';
import '../../components/common/PageShell.scss';

const SERVICES = [
  { name: 'API Server',    status: 'Operational', uptime: '99.98%', latency: '42ms',  note: ''  },
  { name: 'Database',      status: 'Operational', uptime: '99.95%', latency: '8ms',   note: ''  },
  { name: 'Auth Service',  status: 'Operational', uptime: '100%',   latency: '15ms',  note: ''  },
  { name: 'File Storage',  status: 'Degraded',    uptime: '98.20%', latency: '320ms', note: 'Latency spike detected' },
  { name: 'Email Service', status: 'Operational', uptime: '99.80%', latency: '95ms',  note: ''  },
  { name: 'CDN',           status: 'Operational', uptime: '99.99%', latency: '12ms',  note: ''  },
];

const SystemHealth = () => {
  const [lastCheck, setLastCheck] = useState(new Date().toLocaleTimeString());
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastCheck(new Date().toLocaleTimeString()); setRefreshing(false); }, 800);
  };

  const operational = SERVICES.filter(s=>s.status==='Operational').length;

  return (
    <PageShell
      title="System Health"
      subtitle={`Last checked: ${lastCheck} — Demo data, not live status`}
      action={
        <button className="btn btn--outline" onClick={refresh} disabled={refreshing}>
          <RefreshCw size={15} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }}/> Refresh
        </button>
      }
    >
      {/* Summary */}
      <div style={{ display:'flex', gap:16, marginBottom:20, flexWrap:'wrap' }}>
        <Card style={{ flex:1, minWidth:140, textAlign:'center' }}>
          <p style={{ fontSize:32, fontWeight:700, color:'var(--text-primary)' }}>{operational}/{SERVICES.length}</p>
          <p style={{ fontSize:13, color:'var(--text-muted)' }}>Services Operational</p>
        </Card>
        <Card style={{ flex:1, minWidth:140, textAlign:'center' }}>
          <p style={{ fontSize:32, fontWeight:700, color: operational === SERVICES.length ? 'var(--badge-green-text)' : 'var(--badge-yellow-text)' }}>
            {operational === SERVICES.length ? 'All Good' : 'Degraded'}
          </p>
          <p style={{ fontSize:13, color:'var(--text-muted)' }}>Overall Status</p>
        </Card>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
        {SERVICES.map(s => (
          <Card key={s.name}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <span style={{ fontWeight:700, fontSize:15, color:'var(--text-primary)' }}>{s.name}</span>
              <Badge status={s.status}/>
            </div>
            <div style={{ fontSize:13, color:'var(--text-secondary)', display:'flex', gap:20 }}>
              <span>Uptime: <strong style={{color:'var(--text-primary)'}}>{s.uptime}</strong></span>
              <span>Latency: <strong style={{color:'var(--text-primary)'}}>{s.latency}</strong></span>
            </div>
            {s.note && <p style={{ fontSize:12, color:'var(--badge-yellow-text)', marginTop:8 }}>⚠ {s.note}</p>}
          </Card>
        ))}
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }`}</style>
    </PageShell>
  );
};

export default SystemHealth;
