import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageShell, Card, Badge, ConfirmDialog, Toast } from '../../components/common/PageShell';
import { getProducts, deleteProduct } from '../../data/store';
import { Plus, Search, Eye, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';
import '../users/Users.scss';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(getProducts);
  const [search, setSearch]   = useState('');
  const [catFilter, setCat]   = useState('all');
  const [page, setPage]       = useState(0);
  const [confirmId, setConfirmId] = useState(null);
  const { toast, show } = useToast();
  const PER_PAGE = 8;

  const categories = ['all', ...new Set(getProducts().map(p => p.category))];

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      && (catFilter === 'all' || p.category === catFilter);
  });
  const pages   = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const handleDelete = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
    setConfirmId(null);
    show('Product deleted', 'success');
  };

  return (
    <PageShell
      title="Products"
      subtitle={`${products.length} products`}
      action={<Link to="/products/new" className="btn btn--primary"><Plus size={16}/> Add Product</Link>}
    >
      <div className="user-filters">
        <div className="search-box"><Search size={15}/>
          <input placeholder="Search products…" value={search} onChange={e=>{ setSearch(e.target.value); setPage(0); }} />
        </div>
        <select value={catFilter} onChange={e=>{ setCat(e.target.value); setPage(0); }}>
          {categories.map(c=><option key={c} value={c}>{c==='all'?'All Categories':c}</option>)}
        </select>
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {visible.length === 0 ? <div className="empty-state">No products match.</div> : (
          <div className="user-table-wrap">
            <table className="user-table">
              <thead><tr>
                <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Added</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {visible.map(p => (
                  <tr key={p.id}>
                    <td><div className="cell-user"><img src={p.img} alt={p.name}/><span>{p.name}</span></div></td>
                    <td>{p.category}</td>
                    <td>${p.price.toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td><Badge status={p.status}/></td>
                    <td>{p.createdAt}</td>
                    <td><div className="cell-actions">
                      <button className="btn btn--ghost btn--sm" onClick={()=>navigate(`/products/${p.id}`)}><Eye size={14}/></button>
                      <button className="btn btn--outline btn--sm" onClick={()=>navigate(`/products/${p.id}/edit`)}><Edit2 size={14}/></button>
                      <button className="btn btn--danger btn--sm" onClick={()=>setConfirmId(p.id)}><Trash2 size={14}/></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <div className="pagination">
            <button disabled={page===0} onClick={()=>setPage(p=>p-1)} className="btn btn--ghost btn--sm">← Prev</button>
            <span>Page {page+1} of {pages}</span>
            <button disabled={page>=pages-1} onClick={()=>setPage(p=>p+1)} className="btn btn--ghost btn--sm">Next →</button>
          </div>
        )}
      </Card>

      {confirmId && <ConfirmDialog message="Delete this product permanently?" onConfirm={()=>handleDelete(confirmId)} onCancel={()=>setConfirmId(null)}/>}
      {toast && <Toast message={toast.message} type={toast.type}/>}
    </PageShell>
  );
};

export default ProductList;
