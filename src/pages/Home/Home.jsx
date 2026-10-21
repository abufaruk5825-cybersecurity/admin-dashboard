import './home.scss';
import Widget  from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Charts  from '../../components/charts/Charts';
import Table   from '../../components/table/Table';
import { getUsers, getOrders } from '../../data/store';

const Home = () => {
  const userCount  = getUsers().length;
  const orderCount = getOrders().length;
  const revenue    = getOrders().reduce((s, o) => s + o.amount, 0);

  return (
    <div className="home-content">
      <div className="widgets">
        <Widget type="users"    count={userCount} />
        <Widget type="orders"   count={orderCount} />
        <Widget type="earnings" count={revenue} />
        <Widget type="balance"  count={Math.round(revenue * 0.12)} />
      </div>

      <div className="charts">
        <Featured />
        <Charts title="Last 7 Months — Revenue" aspect={2 / 1} />
      </div>

      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Table />
      </div>
    </div>
  );
};

export default Home;
