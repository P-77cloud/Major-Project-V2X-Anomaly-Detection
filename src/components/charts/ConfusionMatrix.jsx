import React from 'react';
import { CONFUSION_MATRIX_DATA } from '../../data/mockV2XData';

const ConfusionMatrix = ({ data = CONFUSION_MATRIX_DATA }) => {
  const { truePositive, falsePositive, falseNegative, trueNegative } = data;
  const total = truePositive + falsePositive + falseNegative + trueNegative;
  
  const precision = ((truePositive / (truePositive + falsePositive)) * 100).toFixed(2);
  const recall = ((truePositive / (truePositive + falseNegative)) * 100).toFixed(2);
  const specificity = ((trueNegative / (trueNegative + falsePositive)) * 100).toFixed(2);
  const accuracy = (((truePositive + trueNegative) / total) * 100).toFixed(2);

  return (
    <div className="space-y-4 font-mono">
      {/* 2x2 Matrix */}
      <div className="relative overflow-hidden rounded-xl border border-cyber-border bg-slate-950/80 p-4">
        {/* Axis labels */}
        <div className="text-center pb-3 text-xs uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800">
          PREDICTED CLASS (SENTINEL AI)
        </div>

        <div className="grid grid-cols-12 gap-2 pt-3 items-center">
          {/* Vertical Y-axis label */}
          <div className="col-span-2 text-center text-[10px] uppercase font-bold text-slate-400 rotate-[-90deg] whitespace-nowrap">
            ACTUAL GROUND TRUTH
          </div>

          <div className="col-span-10 grid grid-cols-2 gap-2">
            {/* Headers */}
            <div className="text-center text-xs text-cyan-400 font-semibold pb-1">
              PREDICTED NORMAL
            </div>
            <div className="text-center text-xs text-red-400 font-semibold pb-1">
              PREDICTED ATTACK
            </div>

            {/* Row 1: Actual Normal */}
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-center hover:border-emerald-500/60 transition-colors">
              <span className="block text-[10px] text-emerald-400 font-semibold">
                TRUE NEGATIVE (TN)
              </span>
              <span className="text-lg lg:text-xl font-bold text-white font-mono-numbers">
                {trueNegative.toLocaleString()}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">
                99.95% Specificity
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 text-center hover:border-amber-500/60 transition-colors">
              <span className="block text-[10px] text-amber-400 font-semibold">
                FALSE POSITIVE (FP)
              </span>
              <span className="text-lg lg:text-xl font-bold text-amber-300 font-mono-numbers">
                {falsePositive.toLocaleString()}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">
                0.05% False Alarm
              </span>
            </div>

            {/* Row 2: Actual Attack */}
            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 text-center hover:border-red-500/60 transition-colors">
              <span className="block text-[10px] text-red-400 font-semibold">
                FALSE NEGATIVE (FN)
              </span>
              <span className="text-lg lg:text-xl font-bold text-red-300 font-mono-numbers">
                {falseNegative.toLocaleString()}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">
                1.42% Missed Attack
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-950/20 text-center hover:border-cyan-500/70 shadow-sm shadow-cyan-950 transition-colors">
              <span className="block text-[10px] text-cyan-400 font-semibold">
                TRUE POSITIVE (TP)
              </span>
              <span className="text-lg lg:text-xl font-bold text-white font-mono-numbers">
                {truePositive.toLocaleString()}
              </span>
              <span className="block text-[10px] text-cyan-300 mt-0.5">
                98.58% Sensitivity
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-center">
          <span className="text-slate-400 text-[10px] block">ACCURACY</span>
          <span className="text-white font-bold text-sm text-cyan-400">{accuracy}%</span>
        </div>
        <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-center">
          <span className="text-slate-400 text-[10px] block">PRECISION</span>
          <span className="text-white font-bold text-sm text-emerald-400">{precision}%</span>
        </div>
        <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-center">
          <span className="text-slate-400 text-[10px] block">RECALL (TPR)</span>
          <span className="text-white font-bold text-sm text-blue-400">{recall}%</span>
        </div>
        <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-center">
          <span className="text-slate-400 text-[10px] block">F1-SCORE</span>
          <span className="text-white font-bold text-sm text-purple-400">98.99%</span>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;

