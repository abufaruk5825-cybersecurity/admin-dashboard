import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import '../components/common/PageShell.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--bg)', gap:16, padding:24 }}>
      <AlertTriangle size={56} color="var(--accent)" style={{ opacity:0.7 }}/>
      <h1 style={{ fontSize:32, fontWeight:800, color:'var(--text-primary)', margin:0 }}>404</h1>
      <p style={{ fontSize:16, color:'var(--text-muted)', textAlign:'center', maxWidth:360 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button className="btn btn--primary" onClick={() => navigate('/')}>
        <Home size={16}/> Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
