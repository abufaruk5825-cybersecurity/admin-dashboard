import './PageShell.scss';

/**
 * Consistent page wrapper used by every route page.
 * Provides header (title + optional action button) and a content area.
 */
export const PageShell = ({ title, subtitle, action, children }) => (
  <div className="page-shell">
    <div className="page-shell__header">
      <div>
        <h1 className="page-shell__title">{title}</h1>
        {subtitle && <p className="page-shell__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="page-shell__action">{action}</div>}
    </div>
    <div className="page-shell__body">{children}</div>
  </div>
);

/** Simple card wrapper */
export const Card = ({ children, className = '', style }) => (
  <div className={`ps-card ${className}`} style={style}>{children}</div>
);

/** Status badge */
export const Badge = ({ status }) => {
  const map = {
    active:      'badge--green',
    Approved:    'badge--green',
    Delivered:   'badge--green',
    'In Stock':  'badge--green',
    Operational: 'badge--green',
    pending:     'badge--yellow',
    Pending:     'badge--yellow',
    'Low Stock': 'badge--yellow',
    Degraded:    'badge--yellow',
    Assigned:    'badge--yellow',
    'In Transit':'badge--yellow',
    passive:     'badge--red',
    rejected:    'badge--red',
    Cancelled:   'badge--red',
    'Out of Stock': 'badge--red',
    Down:        'badge--red',
    Refunded:    'badge--red',
  };
  return <span className={`badge ${map[status] || 'badge--gray'}`}>{status}</span>;
};

/** Confirm modal */
export const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-overlay">
    <div className="confirm-box">
      <p>{message}</p>
      <div className="confirm-actions">
        <button className="confirm-cancel" onClick={onCancel}>Cancel</button>
        <button className="confirm-ok"     onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  </div>
);

/** Toast notification */
export const Toast = ({ message, type = 'success' }) => (
  <div className={`toast toast--${type}`}>{message}</div>
);
