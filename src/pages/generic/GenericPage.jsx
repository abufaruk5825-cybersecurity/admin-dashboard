import './GenericPage.scss';

/**
 * Simple page scaffold for pages that don't need a full custom layout.
 * NOTE: DashboardLayout is provided by the router's Outlet — do NOT wrap this in DashboardLayout again.
 */
const GenericPage = ({ title, description, icon: Icon, children }) => (
  <div className="generic-page">
    <div className="generic-header">
      {Icon && <Icon size={26} className="page-icon"/>}
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
    <div className="generic-body">
      {children ?? (
        <div className="coming-soon">
          {Icon && <div className="cs-icon"><Icon size={48}/></div>}
          <h2>{title}</h2>
          <p>This section is available as a demo. Full backend integration coming soon.</p>
        </div>
      )}
    </div>
  </div>
);

export default GenericPage;
