import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageShell, Card, Toast } from '../../components/common/PageShell';
import { getProductById, addProduct, updateProduct } from '../../data/store';
import { ArrowLeft, FolderUp } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';

const FIELDS = [
  { key:'name',     label:'Product Name', type:'text',   placeholder:'Acer Nitro 5',   required:true },
  { key:'category', label:'Category',     type:'text',   placeholder:'Computers',       required:true },
  { key:'price',    label:'Price ($)',    type:'number', placeholder:'0',               required:true, min:0 },
  { key:'stock',    label:'Stock',        type:'number', placeholder:'0',               required:true, min:0 },
  { key:'status',   label:'Status',       type:'select', options:['In Stock','Low Stock','Out of Stock'], required:true },
];

const validate = (form) => {
  const errs = {};
  if (!form.name?.trim())            errs.name = 'Name is required';
  if (!form.category?.trim())        errs.category = 'Category is required';
  if (form.price === '' || Number(form.price) < 0) errs.price = 'Valid price required';
  if (form.stock === '' || Number(form.stock) < 0) errs.stock = 'Valid stock required';
  return errs;
};

const ProductForm = ({ mode }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast, show } = useToast();
  const existing = mode === 'edit' ? getProductById(productId) : null;

  const [form, setForm] = useState(existing
    ? { name:existing.name, category:existing.category, price:existing.price, stock:existing.stock, status:existing.status }
    : { name:'', category:'', price:'', stock:'', status:'In Stock' }
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [file, setFile]     = useState(null);

  if (mode === 'edit' && !existing) return (
    <PageShell title="Product Not Found"><p style={{color:'var(--text-muted)'}}>Product "{productId}" not found.</p></PageShell>
  );

  const change = (key, val) => {
    setForm(f => ({ ...f, [key]:val }));
    if (errors[key]) setErrors(e => { const n={...e}; delete n[key]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setTimeout(() => {
      const data = { ...form, price:Number(form.price), stock:Number(form.stock) };
      if (mode === 'create') addProduct(data);
      else updateProduct(productId, data);
      setSaving(false);
      show(mode === 'create' ? 'Product created!' : 'Product updated!', 'success');
      setTimeout(() => navigate('/products'), 900);
    }, 400);
  };

  return (
    <PageShell
      title={mode === 'create' ? 'Add New Product' : `Edit — ${existing?.name}`}
      action={<button className="btn btn--ghost" onClick={()=>navigate(-1)}><ArrowLeft size={15}/> Back</button>}
    >
      <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
        <Card style={{ flex:'0 0 160px', display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
          <img
            src={file ? URL.createObjectURL(file) : (existing?.img || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg')}
            alt="preview"
            style={{ width:120, height:120, borderRadius:10, objectFit:'cover', border:'1px solid var(--border)' }}
          />
          <label htmlFor="prodImg" className="btn btn--ghost btn--sm" style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <FolderUp size={14}/> Image
          </label>
          <input id="prodImg" type="file" accept="image/*" style={{ display:'none' }} onChange={e=>setFile(e.target.files[0])}/>
        </Card>
        <Card style={{ flex:1, minWidth:0 }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {FIELDS.map(f => (
                <div className="form-field" key={f.key}>
                  <label>{f.label}{f.required&&<span style={{color:'#dc2626'}}> *</span>}</label>
                  {f.type === 'select' ? (
                    <select value={form[f.key]} onChange={e=>change(f.key, e.target.value)}>
                      {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key]} min={f.min} onChange={e=>change(f.key, e.target.value)}/>
                  )}
                  {errors[f.key] && <span className="field-error">{errors[f.key]}</span>}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, justifyContent:'flex-end', marginTop:24 }}>
              <button type="button" className="btn btn--ghost" onClick={()=>navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : mode==='create' ? 'Create Product' : 'Save Changes'}</button>
            </div>
          </form>
        </Card>
      </div>
      {toast && <Toast message={toast.message} type={toast.type}/>}
    </PageShell>
  );
};

export default ProductForm;
