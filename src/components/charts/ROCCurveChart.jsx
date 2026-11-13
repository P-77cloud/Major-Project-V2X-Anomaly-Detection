import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ROC_CURVE_DATA } from '../../data/mockV2XData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md font-mono text-xs space-y-1">
        <p className="font-bold text-white border-b border-slate-800 pb-1">
          ROC OPERATING POINT
        </p>
        <div className="flex justify-between gap-4 text-cyan-400">
          <span>True Positive Rate (Sensitivity):</span>
          <span className="font-bold">{(data.tpr * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between gap-4 text-amber-400">
          <span>False Positive Rate (1 - Specificity):</span>
          <span className="font-bold">{(data.fpr * 100).toFixed(2)}%</span>
        </div>
        <p className="text-[10px] text-slate-400 pt-1">
          Area Under Curve (AUC-ROC): <span className="text-emerald-400 font-bold">0.994</span>
        </p>
      </div>
    );
  }
  return null;
};

const ROCCurveChart = ({ data = ROC_CURVE_DATA, height = 240 }) => {
  return (
    <div className="w-full font-mono" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" opacity={0.6} />
          <XAxis 
            dataKey="fpr" 
            type="number" 
            domain={[0, 1]} 
            stroke="#64748B" 
            fontSize={10}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
            label={{ value: 'False Positive Rate (FPR)', position: 'insideBottomRight', offset: -5, fill: '#64748B', fontSize: 10 }}
          />
          <YAxis 
            dataKey="tpr" 
            type="number" 
            domain={[0, 1]} 
            stroke="#64748B" 
            fontSize={10}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
            label={{ value: 'True Positive Rate (TPR)', angle: -90, position: 'insideLeft', offset: 25, fill: '#64748B', fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine stroke="#EF4444" strokeDasharray="3 3" segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} />
          <Area
            type="monotone"
            dataKey="tpr"
            stroke="#00F0FF"
            strokeWidth={2.5}
            fill="url(#rocGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ROCCurveChart;

