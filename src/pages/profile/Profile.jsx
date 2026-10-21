import { useState } from 'react';
import { PageShell, Card, Toast } from '../../components/common/PageShell';
import { Edit2, Save, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';

const DEMO_PROFILE = {
  name:    'Jane Doe',
  email:   'janedo@gmail.com',
  phone:   '+251 987 654',
  role:    'Administrator',
  address: 'Kocha, Addis Ababa',
  country: 'Ethiopia',
  img:     'https://i.pravatar.cc/150?img=47',
};

const validate = (f) => {
  const e = {};
  if (!f.name.trim())  e.name  = 'Name is required';
  if (!f.email.trim()) e.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Invalid email';
  return e;
};

const Profile = () => {
  const { toast, show } = useToast();
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState(DEMO_PROFILE);
  const [errors, setErrors]   = useState({});
  const [saving, setSaving]   = useState(false);

  const startEdit = () => { setForm(profile); setErrors({}); setEditing(true); };
  const cancel    = () => { setEditing(false); setErrors({}); };

  const save = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setTimeout(() => {
      setProfile(form);
      setEditing(false);
      setSaving(false);
      show('Profile updated!', 'success');
    }, 500);
  };

  return (
    <PageShell
      title="Profile"
      subtitle="Demo profile — changes are not saved to a server"
      action={!editing
        ? <button className="btn btn--outline" onClick={startEdit}><Edit2 size={15}/> Edit Profile</button>
        : <div style={{display:'flex',gap:10}}>
            <button className="btn btn--ghost" onClick={cancel}><X size={15}/> Cancel</button>
            <button className="btn btn--primary" onClick={save} disabled={saving}><Save size={15}/> {saving?'Saving…':'Save'}</button>
          </div>
      }
    >
      <div style={{ maxWidth:560 }}>
        {/* Avatar */}
        <Card style={{ display:'flex', alignItems:'center', gap:24, marginBottom:20 }}>
          <img src={profile.img} alt={profile.name} style={{ width:90, height:90, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--accent)' }}/>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, color:'var(--text-primary)' }}>{profile.name}</h2>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginTop:3 }}>{profile.role}</p>
          </div>
        </Card>

        {/* View / Edit */}
        <Card>
          {!editing ? (
            [['Email',profile.email],['Phone',profile.phone],['Address',profile.address],['Country',profile.country]].map(([k,v])=>(
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--border)', fontSize:14 }}>
                <span style={{ fontWeight:600, color:'var(--text-muted)' }}>{k}</span>
                <span style={{ color:'var(--text-primary)' }}>{v}</span>
              </div>
            ))
          ) : (
            <form onSubmit={save} noValidate>
              <div className="form-grid">
                {[
                  { key:'name',    label:'Full Name', type:'text',  required:true },
                  { key:'email',   label:'Email',     type:'email', required:true },
                  { key:'phone',   label:'Phone',     type:'text' },
                  { key:'address', label:'Address',   type:'text' },
                  { key:'country', label:'Country',   type:'text' },
                ].map(f=>(
                  <div className="form-field" key={f.key}>
                    <label>{f.label}{f.required&&<span style={{color:'#dc2626'}}> *</span>}</label>
                    <input type={f.type} value={form[f.key]} onChange={e=>setForm(x=>({...x,[f.key]:e.target.value}))}/>
                    {errors[f.key] && <span className="field-error">{errors[f.key]}</span>}
                  </div>
                ))}
              </div>
            </form>
          )}
        </Card>
      </div>
      {toast && <Toast message={toast.message} type={toast.type}/>}
    </PageShell>
  );
};

export default Profile;
