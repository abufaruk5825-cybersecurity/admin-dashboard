import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageShell, Card, Toast } from '../../components/common/PageShell';
import { getUserById, addUser, updateUser } from '../../data/store';
import { FolderUp, ArrowLeft } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';

const FIELDS = [
  { key:'username', label:'Username',       type:'text',     placeholder:'john_doe',           required:true },
  { key:'email',    label:'Email',           type:'email',    placeholder:'john@example.com',   required:true },
  { key:'phone',    label:'Phone',           type:'text',     placeholder:'+1 234 567 89' },
  { key:'role',     label:'Role',            type:'select',   options:['Admin','Editor','Viewer'], required:true },
  { key:'status',   label:'Status',          type:'select',   options:['active','pending','passive'], required:true },
  { key:'address',  label:'Address',         type:'text',     placeholder:'123 Main St' },
  { key:'country',  label:'Country',         type:'text',     placeholder:'USA' },
  { key:'age',      label:'Age',             type:'number',   placeholder:'30' },
];

const validate = (form) => {
  const errs = {};
  if (!form.username?.trim())            errs.username = 'Username is required';
  if (!form.email?.trim())               errs.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
  if (!form.role)                        errs.role = 'Role is required';
  if (!form.status)                      errs.status = 'Status is required';
  return errs;
};

const UserForm = ({ mode }) => {
  const { userId } = useParams();
  const navigate   = useNavigate();
  const { toast, show } = useToast();
  const existing   = mode === 'edit' ? getUserById(userId) : null;

  const [form, setForm] = useState(existing
    ? { username:existing.username, email:existing.email, phone:existing.phone||'', role:existing.role, status:existing.status, address:existing.address||'', country:existing.country||'', age:existing.age||'' }
    : { username:'', email:'', phone:'', role:'Viewer', status:'active', address:'', country:'', age:'' }
  );
  const [errors, setErrors]   = useState({});
  const [file,   setFile]     = useState(null);
  const [saving, setSaving]   = useState(false);

  if (mode === 'edit' && !existing) return (
    <PageShell title="User Not Found">
      <p style={{ color:'var(--text-muted)' }}>User "{userId}" does not exist.</p>
    </PageShell>
  );

  const change = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => { const n={...e}; delete n[key]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setTimeout(() => {
      if (mode === 'create') addUser({ ...form, age: Number(form.age)||0 });
      else updateUser(userId, { ...form, age: Number(form.age)||existing.age });
      setSaving(false);
      show(mode === 'create' ? 'User created!' : 'User updated!', 'success');
      setTimeout(() => navigate('/users'), 900);
    }, 400);
  };

  return (
    <PageShell
      title={mode === 'create' ? 'Add New User' : `Edit User — ${existing?.username}`}
      action={<button className="btn btn--ghost" onClick={() => navigate(-1)}><ArrowLeft size={15}/> Back</button>}
    >
      <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
        {/* Avatar preview */}
        <Card style={{ flex:'0 0 160px', display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
          <img
            src={file ? URL.createObjectURL(file) : (existing?.img || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg')}
            alt="preview"
            style={{ width:110, height:110, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--border)' }}
          />
          <label htmlFor="userImg" className="btn btn--ghost btn--sm" style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <FolderUp size={14}/> Choose
          </label>
          <input id="userImg" type="file" accept="image/*" style={{ display:'none' }} onChange={e => setFile(e.target.files[0])} />
        </Card>

        {/* Form */}
        <Card style={{ flex:1, minWidth:0 }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {FIELDS.map(f => (
                <div className="form-field" key={f.key}>
                  <label>{f.label}{f.required && <span style={{ color:'#dc2626' }}> *</span>}</label>
                  {f.type === 'select' ? (
                    <select value={form[f.key]} onChange={e => change(f.key, e.target.value)}>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => change(f.key, e.target.value)} />
                  )}
                  {errors[f.key] && <span className="field-error">{errors[f.key]}</span>}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, justifyContent:'flex-end', marginTop:24 }}>
              <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : mode === 'create' ? 'Create User' : 'Save Changes'}</button>
            </div>
          </form>
        </Card>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </PageShell>
  );
};

export default UserForm;
