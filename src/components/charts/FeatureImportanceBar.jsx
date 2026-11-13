import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { FEATURE_IMPORTANCE } from '../../data/mockV2XData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md font-mono text-xs">
        <p className="font-bold text-white">{data.label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Feature: {data.feature}</p>
        <div className="mt-1 flex items-center justify-between gap-4 text-cyan-400">
          <span>Gini Importance:</span>
          <span className="font-bold">{(data.importance * 100).toFixed(1)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const FeatureImportanceBar = ({ data = FEATURE_IMPORTANCE, height = 240 }) => {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis 
            type="number" 
            domain={[0, 0.4]} 
            stroke="#64748B" 
            fontSize={11}
            tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
          />
          <YAxis 
            type="category" 
            dataKey="feature" 
            stroke="#64748B" 
            fontSize={10} 
            width={140}
            tick={{ fill: '#CBD5E1', fontFamily: 'monospace' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? '#00F0FF' : index === 1 ? '#38BDF8' : index === 2 ? '#2563EB' : '#8B5CF6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceBar;

