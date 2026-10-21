import { useState } from 'react';
import { PageShell, Card, Toast } from '../../components/common/PageShell';
import { DarkModeContext } from '../../coontext/darkModeContext.jsx';
import { Sun, Moon } from 'lucide-react';
import { useContext } from 'react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';

const SectionTitle = ({ children }) => (
  <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text-primary)', marginBottom:12, paddingBottom:8, borderBottom:'1px solid var(--border)' }}>{children}</h3>
);

const Settings = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const { toast, show } = useToast();
  const [lang,  setLang]  = useState('English');
  const [notif, setNotif] = useState({ email:true, push:true, sms:false });

  const save = () => show('Settings saved', 'success');

  return (
    <PageShell
      title="Settings"
      subtitle="Application preferences and configuration"
      action={<button className="btn btn--primary" onClick={save}>Save Changes</button>}
    >
      <div style={{ maxWidth:600, display:'flex', flexDirection:'column', gap:20 }}>
        {/* Appearance */}
        <Card>
          <SectionTitle>Appearance</SectionTitle>
          <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16 }}>Select your preferred color theme. This setting is synced with the navbar toggle and persisted to localStorage.</p>
          <div style={{ display:'flex', gap:12 }}>
            {[
              { label:'Light', icon:Sun,  mode:false, action:'LIGHT' },
              { label:'Dark',  icon:Moon, mode:true,  action:'DARK'  },
            ].map(({ label, icon:Icon, mode, action }) => (
              <button
                key={label}
                onClick={() => dispatch({ type: action })}
                style={{ flex:1, padding:'14px', borderRadius:10, border:`2px solid ${darkMode===mode?'var(--accent)':'var(--border)'}`, background:darkMode===mode?'var(--accent-light)':'transparent', color:'var(--text-primary)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontWeight:600, fontSize:14, transition:'all var(--transition)' }}
              >
                <Icon size={18} color={darkMode===mode?'var(--accent)':'var(--text-muted)'}/> {label}
              </button>
            ))}
          </div>
        </Card>

        {/* Language */}
        <Card>
          <SectionTitle>Language &amp; Region</SectionTitle>
          <div className="form-field">
            <label>Display Language</label>
            <select value={lang} onChange={e=>setLang(e.target.value)}>
              {['English','Amharic','French','Spanish','Arabic'].map(l=><option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <SectionTitle>Notification Preferences</SectionTitle>
          {[
            ['email', 'Email Notifications', 'Receive alerts and updates via email'],
            ['push',  'Push Notifications',  'Browser push notifications for real-time alerts'],
            ['sms',   'SMS Alerts',          'Text messages for critical events'],
          ].map(([key, label, desc]) => (
            <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
              <div>
                <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{label}</p>
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{desc}</p>
              </div>
              <input type="checkbox" checked={notif[key]} onChange={e=>setNotif(n=>({...n,[key]:e.target.checked}))} style={{ width:18, height:18, accentColor:'var(--accent)', cursor:'pointer' }}/>
            </div>
          ))}
        </Card>
      </div>
      {toast && <Toast message={toast.message} type={toast.type}/>}
    </PageShell>
  );
};

export default Settings;
