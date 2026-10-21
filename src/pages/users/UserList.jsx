import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageShell, Card, Badge, ConfirmDialog, Toast } from '../../components/common/PageShell';
import { getUsers, deleteUser } from '../../data/store';
import { Plus, Search, Eye, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import '../../components/common/PageShell.scss';
import './Users.scss';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(getUsers);
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatus] = useState('all');
  const [page, setPage]         = useState(0);
  const [confirmId, setConfirmId] = useState(null);
  const { toast, show }         = useToast();
  const PER_PAGE = 8;

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const pages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const handleDelete = (id) => {
    deleteUser(id);
    setUsers(getUsers());
    setConfirmId(null);
    show('User deleted successfully', 'success');
  };

  return (
    <PageShell
      title="Users"
      subtitle={`${users.length} total users`}
      action={
        <Link to="/users/new" className="btn btn--primary">
          <Plus size={16} /> Add New User
        </Link>
      }
    >
      {/* Filters */}
      <div className="user-filters">
        <div className="search-box">
          <Search size={15} />
          <input
            placeholder="Search by name or email…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
          />
        </div>
        <select value={statusFilter} onChange={e => { setStatus(e.target.value); setPage(0); }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="passive">Passive</option>
        </select>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {visible.length === 0 ? (
          <div className="empty-state">No users match your search.</div>
        ) : (
          <div className="user-table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Created</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="cell-user">
                        <img src={u.img} alt={u.username} />
                        <span>{u.username}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.role}</td>
                    <td><Badge status={u.status} /></td>
                    <td>{u.createdAt}</td>
                    <td>
                      <div className="cell-actions">
                        <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/users/${u.id}`)} title="View"><Eye size={14} /></button>
                        <button className="btn btn--outline btn--sm" onClick={() => navigate(`/users/${u.id}/edit`)} title="Edit"><Edit2 size={14} /></button>
                        <button className="btn btn--danger btn--sm" onClick={() => setConfirmId(u.id)} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div className="pagination">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="btn btn--ghost btn--sm">← Prev</button>
            <span>Page {page + 1} of {pages}</span>
            <button disabled={page >= pages - 1} onClick={() => setPage(p => p + 1)} className="btn btn--ghost btn--sm">Next →</button>
          </div>
        )}
      </Card>

      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </PageShell>
  );
};

export default UserList;
