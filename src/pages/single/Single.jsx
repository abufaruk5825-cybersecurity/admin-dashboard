/**
 * Legacy Single page kept as a fallback detail view.
 * Proper detail pages are UserDetail (/users/:id) and ProductDetail (/products/:id).
 * This renders inside DashboardLayout's Outlet automatically.
 */
import './Single.scss';
import Charts from '../../components/charts/Charts';
import Table  from '../../components/table/Table';

const Single = () => (
  <div className="single-content">
    <div className="top">
      <div className="left">
        <div className="editButton">Edit</div>
        <h1 className="title">Information</h1>
        <div className="item">
          <img src="https://i.pravatar.cc/150?img=47" alt="user" className="itemImg"/>
          <div className="details">
            <h1 className="itemTitle">Jane Doe</h1>
            <div className="detailItem"><span className="itemKey">Email:</span><span className="itemValue">janedo@gmail.com</span></div>
            <div className="detailItem"><span className="itemKey">Phone:</span><span className="itemValue">+251 987 654</span></div>
            <div className="detailItem"><span className="itemKey">Address:</span><span className="itemValue">Kocha, Addis Ababa</span></div>
            <div className="detailItem"><span className="itemKey">Country:</span><span className="itemValue">Ethiopia</span></div>
          </div>
        </div>
      </div>
      <div className="right">
        <Charts aspect={3/1} title="User spending (last 7 months)"/>
      </div>
    </div>
    <div className="bottom">
      <h1 className="title">Last Transactions</h1>
      <Table/>
    </div>
  </div>
);

export default Single;
