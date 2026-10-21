import './Featured.scss';
import { EllipsisVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useContext } from 'react';
import { DarkModeContext } from '../../coontext/darkModeContext.jsx';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <EllipsisVertical size={18} />
      </div>

      <div className="bottom">
        <div className="featuredchart">
          <CircularProgressbar
            value={70}
            strokeWidth={5}
            text="70%"
            styles={buildStyles({
              pathColor: '#7c5ff8',
              trailColor: darkMode ? '#2a2d3e' : '#eeeeee',
              textColor: darkMode ? '#e8eaf0' : '#555',
            })}
          />
        </div>

        <p className="featured-label">Total sales made today</p>
        <p className="amount">$420</p>
        <p className="desc">Previous transactions processing. Last payments may not be included.</p>

        <div className="summery">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <ChevronDown size={18} />
              <div className="resultAmount">$67.6k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <ChevronUp size={18} />
              <div className="resultAmount">$37.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <ChevronUp size={18} />
              <div className="resultAmount">$19k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
