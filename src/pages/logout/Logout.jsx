import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import '../../components/common/PageShell.scss';

/**
 * Logout is rendered outside DashboardLayout (see App.jsx route config)
 * so the sidebar doesn't flash before redirect.
 */
const Logout = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:24 }}>
      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:16, padding:'40px 36px', maxWidth:400, width:'100%', textAlign:'center', boxShadow:'var(--shadow-strong)' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'var(--badge-red-bg)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <LogOut size={28} color="var(--badge-red-text)"/>
        </div>
        <h2 style={{ fontSize:22, fontWeight:700, color:'var(--text-primary)', marginBottom:8 }}>Sign Out</h2>
        <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:28, lineHeight:1.6 }}>
          This is a demo dashboard — no real session exists.
          You can return to the dashboard at any time.
        </p>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={() => navigate('/')} className="btn btn--ghost" style={{ flex:1, justifyContent:'center' }}>
            Cancel
          </button>
          <button onClick={() => navigate('/login')} style={{ flex:1, padding:11, border:'none', borderRadius:8, background:'#dc2626', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
