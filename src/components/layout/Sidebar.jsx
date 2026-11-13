import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  BrainCircuit,
  Radio,
  ShieldAlert,
  Crosshair,
  FileCode2,
  Wifi,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  GitBranch
} from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Main Dashboard',
    icon: LayoutDashboard,
    badge: 'Overview',
    description: 'SOC overview & metrics'
  },
  {
    path: '/dataset',
    label: 'Dataset Management',
    icon: Database,
    badge: 'VeReMi Ext',
    description: 'VeReMi Extension CSV ingestion'
  },
  {
    path: '/training',
    label: 'Model Training',
    icon: BrainCircuit,
    badge: 'Random Forest',
    description: 'Random Forest & ML evaluation'
  },
  {
    path: '/monitor',
    label: 'Real-Time V2X Monitor',
    icon: Radio,
    badge: 'Live Radar',
    description: 'Kinematic radar & packets'
  },
  {
    path: '/threats',
    label: 'Threat & Attack Analytics',
    icon: ShieldAlert,
    badge: 'Deep Inspect',
    description: 'Misbehavior vectors & SHAP'
  },
  {
    path: '/simulation',
    label: 'Attack Simulation',
    icon: Crosshair,
    badge: 'Sandbox',
    description: 'Inject spoofing & Sybil attacks'
  },
  {
    path: '/architecture',
    label: 'System Architecture',
    icon: FileCode2,
    badge: 'Review Doc',
    description: 'SAE J2735 & Phase 2 roadmap'
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { metrics } = useSentinel();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 flex flex-col bg-[#070B14] border-r border-cyber-border transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-cyber-border/80 bg-gradient-to-b from-slate-900/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 shadow-glow-cyan">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-wider text-white font-mono">
                  V2X <span className="text-cyan-400">SENTINEL</span>
                </h1>
              </div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                ML Misbehavior Guard
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SOC SYSTEM ONLINE
            </span>
            <span className="text-cyan-300 font-bold">RF ENSEMBLE</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            Navigation Modules
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-blue-600/10 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 hover:border hover:border-slate-700/50 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-1.5 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-slate-800/80 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="block truncate">{item.label}</span>
                        <span className="block text-[10px] text-slate-400 truncate font-mono">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                          isActive
                            ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Hardware & RF Status Box */}
        <div className="p-3.5 border-t border-cyber-border/80 bg-slate-950/60">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                Random Forest (200T)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Target Benchmark</span>
              <span className="text-white font-semibold">
                VeReMi Extension
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Edge Inference</span>
              <span className="text-emerald-400 font-semibold">
                {metrics.averageLatencyMs} ms
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Review: Nov 14, 2026</span>
              <span className="text-cyan-400 font-mono">v1.1.0-rf</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
