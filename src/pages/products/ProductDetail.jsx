import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageShell, Card, Badge } from '../../components/common/PageShell';
import { getProductById } from '../../data/store';
import { Edit2, ArrowLeft } from 'lucide-react';
import '../../components/common/PageShell.scss';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product  = getProductById(productId);

  if (!product) return (
    <PageShell title="Product Not Found">
      <p style={{ color:'var(--text-muted)' }}>No product with ID "{productId}" exists.</p>
      <Link to="/products" className="btn btn--outline" style={{ marginTop:16, display:'inline-flex' }}>← Back to Products</Link>
    </PageShell>
  );

  return (
    <PageShell
      title="Product Detail"
      action={
        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn--ghost" onClick={()=>navigate(-1)}><ArrowLeft size={15}/> Back</button>
          <Link to={`/products/${product.id}/edit`} className="btn btn--outline"><Edit2 size={15}/> Edit</Link>
        </div>
      }
    >
      <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
        <Card style={{ flex:'0 0 220px', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <img src={product.img} alt={product.name} style={{ width:160, height:160, objectFit:'cover', borderRadius:12, border:'1px solid var(--border)' }}/>
          <Badge status={product.status}/>
        </Card>
        <Card style={{ flex:1, minWidth:240 }}>
          <h2 style={{ fontSize:20, fontWeight:700, color:'var(--text-primary)', marginBottom:16 }}>{product.name}</h2>
          {[
            ['Category', product.category],
            ['Price',    `$${product.price.toLocaleString()}`],
            ['Stock',    product.stock],
            ['Added',    product.createdAt],
          ].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--border)', fontSize:14 }}>
              <span style={{ fontWeight:600, color:'var(--text-muted)' }}>{k}</span>
              <span style={{ color:'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>
    </PageShell>
  );
};

export default ProductDetail;
