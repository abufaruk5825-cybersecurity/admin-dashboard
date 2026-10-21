import './Charts.scss';
import { useContext } from 'react';
import { DarkModeContext } from '../../coontext/darkModeContext.jsx';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis,
} from 'recharts';

const data = [
  { name: 'Jan', Total: 1400 },
  { name: 'Feb', Total: 2900 },
  { name: 'Mar', Total: 1100 },
  { name: 'Apr', Total: 2300 },
  { name: 'May', Total: 1200 },
  { name: 'Jun', Total: 2200 },
  { name: 'Jul', Total: 2700 },
];

const Charts = ({ aspect, title }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#7c5ff8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7c5ff8" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="chartgrid" />
          <XAxis dataKey="name" stroke={darkMode ? '#6b7280' : '#aaa'} tick={{ fill: darkMode ? '#a0a8b8' : '#666', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1a1d27' : '#fff',
              border: `1px solid ${darkMode ? '#2a2d3e' : '#e6e3e3'}`,
              borderRadius: 8,
              color: darkMode ? '#e8eaf0' : '#1a1a2e',
            }}
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#7c5ff8"
            fill="url(#Total)"
            strokeWidth={2}
            fillOpacity={1}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
