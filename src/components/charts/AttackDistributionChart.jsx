import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ATTACK_CATEGORIES } from '../../data/mockV2XData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md font-mono text-xs">
        <p className="font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
          {data.name}
        </p>
        <div className="mt-1 flex items-center justify-between gap-4 text-slate-300">
          <span>Incidents Detected:</span>
          <span className="text-cyan-400 font-bold">{data.count.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-400">
          <span>Proportion:</span>
          <span className="text-emerald-400 font-bold">{data.percentage}%</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-400 max-w-xs font-sans leading-tight">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

const AttackDistributionChart = ({ data = ATTACK_CATEGORIES, height = 260 }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-1/2 relative" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#070B14"
                  strokeWidth={2}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: activeIndex === index ? 'drop-shadow(0px 0px 8px rgba(0, 240, 255, 0.6))' : 'none',
                    transform: activeIndex === index ? 'scale(1.04)' : 'scale(1)',
                    transformOrigin: 'center center'
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Attacks</span>
          <span className="text-xl font-bold text-white">93.4k</span>
          <span className="text-[10px] text-cyan-400">Total Flagged</span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="w-full sm:w-1/2 space-y-2 font-mono text-xs">
        {data.map((item, idx) => (
          <div
            key={item.name}
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
              activeIndex === idx
                ? 'bg-slate-800/90 border-cyan-500/40 text-white'
                : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-xs">{item.name}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-slate-400 text-[11px]">
                {item.count.toLocaleString()}
              </span>
              <span
                className="font-bold text-xs px-1.5 py-0.5 rounded bg-slate-950/80"
                style={{ color: item.color }}
              >
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackDistributionChart;

