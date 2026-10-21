import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageShell, Card, Badge } from '../../components/common/PageShell';
import { getUserById } from '../../data/store';
import { Edit2, ArrowLeft, Mail, Phone, MapPin, Globe, UserRound, Calendar } from 'lucide-react';
import Charts from '../../components/charts/Charts';
import '../../components/common/PageShell.scss';

const DetailRow = ({ icon: Icon, label, value }) => (
  <div style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
    <Icon size={16} color="var(--accent)" style={{ marginTop:2, flexShrink:0 }} />
    <div>
      <p style={{ fontSize:11, color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</p>
      <p style={{ fontSize:14, color:'var(--text-primary)', marginTop:3 }}>{value || '—'}</p>
    </div>
  </div>
);

const UserDetail = () => {
  const { userId } = useParams();
  const navigate   = useNavigate();
  const user       = getUserById(userId);

  if (!user) return (
    <PageShell title="User Not Found">
      <p style={{ color:'var(--text-muted)' }}>No user with ID "{userId}" exists.</p>
      <Link to="/users" className="btn btn--outline" style={{ marginTop:16, display:'inline-flex' }}>← Back to Users</Link>
    </PageShell>
  );

  return (
    <PageShell
      title="User Detail"
      action={
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn--ghost" onClick={() => navigate(-1)}><ArrowLeft size={15}/> Back</button>
          <Link to={`/users/${user.id}/edit`} className="btn btn--outline"><Edit2 size={15}/> Edit</Link>
        </div>
      }
    >
      <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
        {/* Info card */}
        <Card style={{ flex:1, minWidth:260 }}>
          <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:20 }}>
            <img src={user.img} alt={user.username} style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--accent)' }} />
            <div>
              <h2 style={{ fontSize:20, fontWeight:700, color:'var(--text-primary)' }}>{user.username}</h2>
              <p style={{ fontSize:13, color:'var(--text-muted)', marginTop:2 }}>{user.role}</p>
              <div style={{ marginTop:8 }}><Badge status={user.status} /></div>
            </div>
          </div>
          <DetailRow icon={Mail}     label="Email"   value={user.email} />
          <DetailRow icon={Phone}    label="Phone"   value={user.phone} />
          <DetailRow icon={MapPin}   label="Address" value={user.address} />
          <DetailRow icon={Globe}    label="Country" value={user.country} />
          <DetailRow icon={UserRound}label="Age"     value={user.age} />
          <DetailRow icon={Calendar} label="Joined"  value={user.createdAt} />
        </Card>

        {/* Activity chart */}
        <div style={{ flex:2, minWidth:0 }}>
          <Charts aspect={3/1} title={`${user.username} — Activity (demo)`} />
        </div>
      </div>
    </PageShell>
  );
};

export default UserDetail;
