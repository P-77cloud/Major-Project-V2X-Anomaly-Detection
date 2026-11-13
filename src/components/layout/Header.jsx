import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Play, 
  Pause, 
  FastForward, 
  ShieldAlert, 
  Clock, 
  Radio, 
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw,
  GitBranch
} from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';
import { Link } from 'react-router-dom';

const Header = ({ onOpenSidebar }) => {
  const { 
    isLiveStreaming, 
    setIsLiveStreaming, 
    streamSpeed, 
    setStreamSpeed,
    metrics,
    addToast
  } = useSentinel();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleStream = () => {
    const nextState = !isLiveStreaming;
    setIsLiveStreaming(nextState);
    addToast(
      nextState ? 'info' : 'warning',
      nextState ? 'Telemetry Ingestion Resumed' : 'Telemetry Ingestion Paused',
      nextState ? 'Streaming simulated 5.9GHz SAE J2735 BSM packets to Random Forest.' : 'Packet processing stream paused for static inspection.'
    );
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-cyber-border bg-[#070B14]/85 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">ML ENGINE:</span>
          <Link
            to="/training"
            className="px-2 py-0.5 rounded bg-blue-950/70 text-cyan-300 border border-blue-800/60 font-semibold hover:border-cyan-500/60 flex items-center gap-1.5 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>RANDOM FOREST (200 TREES)</span>
          </Link>
          <span className="text-slate-400">•</span>
          <span className="text-slate-400">VeReMi Extension</span>
        </div>
      </div>

      {/* Center: Live Stream Controls */}
      <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 rounded-xl px-2.5 py-1 shadow-inner">
        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 pr-2 border-r border-slate-800">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          BSM SIMULATION
        </span>

        <button
          onClick={handleToggleStream}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium font-mono transition-all ${
            isLiveStreaming
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}
          title={isLiveStreaming ? "Pause Stream" : "Resume Stream"}
        >
          {isLiveStreaming ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>LIVE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>PAUSED</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          {[1, 2, 5].map((speed) => (
            <button
              key={speed}
              onClick={() => setStreamSpeed(speed)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                streamSpeed === speed
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Right: SOC Status, Clock & Review Indicator */}
      <div className="flex items-center gap-3">
        {/* Threat Level */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono">
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          <span className="font-semibold">DEFCON 4</span>
          <span className="text-[11px] text-red-300/80">6.3% ANOMALIES</span>
        </div>

        {/* Real-time UTC/Local Clock */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>

        {/* College Review Badge */}
        <Link
          to="/architecture"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:bg-cyan-900/60 transition-colors shadow-glow-cyan"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline font-semibold">REVIEW: NOV 14</span>
          <span className="sm:hidden font-semibold">PHASE 1</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
