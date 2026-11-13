import React from 'react';
import { ShieldAlert, Info, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DemonstrationBanner = ({ title, message, showLink = true }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900/60 p-4 shadow-lg shadow-cyan-950/20 mb-6 backdrop-blur-md">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 1 Demonstration
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Academic Review (Nov 14, 2026)
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100 mt-1">
              {title || "Simulated High-Fidelity V2X Misbehavior Telemetry"}
            </h4>
            <p className="text-xs text-slate-300/90 mt-0.5 max-w-3xl leading-relaxed">
              {message || "Telemetry, vehicle trajectories, and detection analytics in this interface are generated from standard VeReMi benchmarks and simulated SAE J2735 BSM streams. The production Python ML engine (XGBoost / Bi-LSTM) and FastAPI streaming microservice will be linked in Phase 2."}
            </p>
          </div>
        </div>

        {showLink && (
          <Link
            to="/architecture"
            className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline shrink-0 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/20 transition-all hover:border-cyan-500/40"
          >
            <span>Review Architecture & Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DemonstrationBanner;

