import './Widget.scss';
import { ChevronUp, UserRound, ShoppingCart, Wallet, Banknote } from 'lucide-react';

const Widget = ({ type, count }) => {
  const diff = 20; // demo percentage

  const map = {
    users:    { title: 'USERS',    isMoney: false, link: 'See all users',      icon: <UserRound   className="icon" style={{ color: 'crimson',     backgroundColor: 'rgba(255,0,0,0.12)' }} /> },
    orders:   { title: 'ORDERS',   isMoney: false, link: 'View all orders',    icon: <ShoppingCart className="icon" style={{ color: 'goldenrod',   backgroundColor: 'rgba(255,215,0,0.12)' }} /> },
    earnings: { title: 'EARNINGS', isMoney: true,  link: 'View net earnings',  icon: <Wallet      className="icon" style={{ color: 'forestgreen', backgroundColor: 'rgba(34,139,34,0.12)' }} /> },
    balance:  { title: 'BALANCE',  isMoney: true,  link: 'View account balance',icon: <Banknote   className="icon" style={{ color: 'steelblue',   backgroundColor: 'rgba(70,130,180,0.12)' }} /> },
  };

  const data = map[type];
  if (!data) return null;

  const amount = count !== undefined ? count : 100;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney ? `$${amount.toLocaleString()}` : amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ChevronUp size={16} />{diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
