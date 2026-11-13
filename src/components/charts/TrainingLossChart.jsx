import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TRAINING_CURVE_DATA } from '../../data/mockV2XData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md font-mono text-xs space-y-1">
        <p className="text-slate-300 font-bold border-b border-slate-800 pb-1">
          EPOCH: {label} / 30
        </p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4" style={{ color: entry.color }}>
            <span className="capitalize">{entry.name}:</span>
            <span className="font-bold">
              {entry.name.includes('Acc') ? `${entry.value}%` : entry.value.toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TrainingLossChart = ({ currentEpoch = 30, height = 280 }) => {
  // Slice data according to current training progress
  const filteredData = TRAINING_CURVE_DATA.filter(item => item.epoch <= Math.max(currentEpoch, 1));

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filteredData.length > 0 ? filteredData : [TRAINING_CURVE_DATA[0]]}
          margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" opacity={0.6} />
          <XAxis 
            dataKey="epoch" 
            stroke="#64748B" 
            fontSize={11}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
            label={{ value: 'Epochs', position: 'insideBottomRight', offset: -5, fill: '#64748B', fontSize: 10 }}
          />
          <YAxis 
            stroke="#64748B" 
            fontSize={11}
            domain={[0, 0.6]}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px', fontFamily: 'monospace' }}
          />
          <Line
            type="monotone"
            dataKey="trainLoss"
            name="Train Loss"
            stroke="#00F0FF"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#00F0FF' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="valLoss"
            name="Val Loss"
            stroke="#F59E0B"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#F59E0B' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingLossChart;

