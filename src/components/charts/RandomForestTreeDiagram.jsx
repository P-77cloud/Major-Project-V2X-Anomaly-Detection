import React, { useState } from 'react';
import { GitBranch, ChevronRight, CheckCircle2, AlertTriangle, Layers, Info } from 'lucide-react';

const RandomForestTreeDiagram = () => {
  const [selectedTreeIndex, setSelectedTreeIndex] = useState(42);
  const [activeNode, setActiveNode] = useState('root');

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Estimator Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-bold text-xs">
            Estimator Visualizer: Tree #{selectedTreeIndex} of 200
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            Bootstrap Sampled
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">Sample Tree:</span>
          {[1, 14, 42, 108, 199].map((idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTreeIndex(idx)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                selectedTreeIndex === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              #{idx}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Decision Tree Hierarchy */}
      <div className="p-4 rounded-xl border border-cyber-border bg-[#060A12] overflow-x-auto">
        <div className="min-w-[620px] flex flex-col items-center space-y-4">
          {/* Level 0: Root Node */}
          <div
            onClick={() => setActiveNode('root')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer w-64 shadow-lg ${
              activeNode === 'root'
                ? 'border-cyan-400 bg-cyan-950/60 shadow-glow-cyan'
                : 'border-slate-700 bg-slate-900/90 hover:border-slate-500'
            }`}
          >
            <span className="text-[9px] text-slate-400 block uppercase font-bold">
              ROOT NODE (DEPTH 0)
            </span>
            <div className="text-cyan-300 font-bold text-xs mt-0.5">
              Pos_Plausibility_Delta ≤ 14.8m
            </div>
            <div className="text-[10px] text-slate-400 mt-1 flex justify-center gap-3">
              <span>Gini = 0.492</span>
              <span>Samples = 147,600</span>
            </div>
          </div>

          {/* Connectors */}
          <div className="w-96 flex justify-between items-center px-12 text-[10px] text-slate-400 font-bold">
            <span className="text-emerald-400">← True (Normal Path)</span>
            <span className="text-red-400">False (Anomalous) →</span>
          </div>

          {/* Level 1: Left and Right Nodes */}
          <div className="w-full flex justify-around gap-4">
            {/* Left Branch */}
            <div
              onClick={() => setActiveNode('node_left')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer w-64 shadow-md ${
                activeNode === 'node_left'
                  ? 'border-cyan-400 bg-cyan-950/60 shadow-glow-cyan'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-600'
              }`}
            >
              <span className="text-[9px] text-slate-400 block uppercase font-bold">
                BRANCH NODE (DEPTH 1)
              </span>
              <div className="text-white font-bold text-xs mt-0.5">
                Instant_Accel ≤ -18.2 m/s²
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-center gap-3">
                <span>Gini = 0.142</span>
                <span>Samples = 136,200</span>
              </div>
            </div>

            {/* Right Branch */}
            <div
              onClick={() => setActiveNode('node_right')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer w-64 shadow-md ${
                activeNode === 'node_right'
                  ? 'border-red-400 bg-red-950/40 shadow-glow-danger'
                  : 'border-red-900/60 bg-slate-900/70 hover:border-red-700'
              }`}
            >
              <span className="text-[9px] text-red-400 block uppercase font-bold">
                BRANCH NODE (DEPTH 1)
              </span>
              <div className="text-red-300 font-bold text-xs mt-0.5">
                RSSI_Mismatch ≤ 8.5 dB
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-center gap-3">
                <span>Gini = 0.084</span>
                <span>Samples = 11,400</span>
              </div>
            </div>
          </div>

          {/* Level 2: Terminal Leaf Nodes */}
          <div className="w-full grid grid-cols-4 gap-2 text-center text-[11px] pt-2">
            <div className="p-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-300">
              <span className="text-[9px] text-emerald-400 font-bold block">TERMINAL LEAF</span>
              <span className="font-bold">NORMAL BSM</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">134,880 samples (99.8%)</span>
            </div>

            <div className="p-2.5 rounded-lg border border-amber-500/40 bg-amber-950/20 text-amber-300">
              <span className="text-[9px] text-amber-400 font-bold block">TERMINAL LEAF</span>
              <span className="font-bold">SPEED ANOMALY</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">1,320 samples (Ghost Brake)</span>
            </div>

            <div className="p-2.5 rounded-lg border border-red-500/40 bg-red-950/20 text-red-300">
              <span className="text-[9px] text-red-400 font-bold block">TERMINAL LEAF</span>
              <span className="font-bold">POSITION SPOOFING</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">10,240 samples (GPS Leap)</span>
            </div>

            <div className="p-2.5 rounded-lg border border-purple-500/40 bg-purple-950/20 text-purple-300">
              <span className="text-[9px] text-purple-400 font-bold block">TERMINAL LEAF</span>
              <span className="font-bold">SYBIL / FORGERY</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">1,160 samples (RF Spoof)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory footer */}
      <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 text-[11px] text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <span className="text-white font-semibold">Random Forest Ensemble Mechanism:</span> Each input BSM vector traverses all 200 independently grown decision trees. Final misbehavior classification is determined by majority probabilistic voting ($P(\text{Malicious}) \ge 0.75$), drastically reducing individual tree variance and false alarms on noisy vehicular sensors.
        </p>
      </div>
    </div>
  );
};

export default RandomForestTreeDiagram;

