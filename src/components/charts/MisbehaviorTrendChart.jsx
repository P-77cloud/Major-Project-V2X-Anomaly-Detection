import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { HOURLY_ACTIVITY_DATA } from '../../data/mockV2XData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const normal = payload.find(p => p.dataKey === 'normal')?.value || 0;
    const anomalous = payload.find(p => p.dataKey === 'anomalous')?.value || 0;
    const total = normal + anomalous;
    const anomalyRate = total > 0 ? ((anomalous / total) * 100).toFixed(2) : 0;

    return (
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md font-mono text-xs space-y-1.5">
        <p className="text-slate-300 font-semibold border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
          <span>TIME WINDOW: {label} UTC</span>
          <span className="text-cyan-400">{total.toLocaleString()} msgs</span>
        </p>
        <div className="flex items-center justify-between gap-6 text-emerald-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Normal BSM:
          </span>
          <span className="font-bold">{normal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-6 text-red-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Anomalous / Injected:
          </span>
          <span className="font-bold">{anomalous.toLocaleString()}</span>
        </div>
        <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Misbehavior Rate:</span>
          <span className="text-amber-400 font-bold">{anomalyRate}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const MisbehaviorTrendChart = ({ data = HOURLY_ACTIVITY_DATA, height = 300 }) => {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorAnomalous" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" opacity={0.5} vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748B" 
            fontSize={11} 
            tickLine={false}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
          />
          <YAxis 
            stroke="#64748B" 
            fontSize={11} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
            tick={{ fill: '#94A3B8', fontFamily: 'monospace' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '11px', fontFamily: 'monospace' }}
            formatter={(value) => (
              <span className="text-slate-300 font-mono text-xs capitalize">
                {value === 'normal' ? 'Normal Verified BSM' : 'Flagged Misbehaviors'}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="normal"
            name="normal"
            stroke="#00F0FF"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNormal)"
          />
          <Area
            type="monotone"
            dataKey="anomalous"
            name="anomalous"
            stroke="#EF4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAnomalous)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MisbehaviorTrendChart;

