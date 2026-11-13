import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  accent = 'cyan', // 'cyan', 'blue', 'emerald', 'danger', 'warning', 'purple'
  badgeText,
  footerNote,
}) => {
  const getAccentConfig = () => {
    switch (accent) {
      case 'danger':
        return {
          glow: 'group-hover:border-red-500/50 group-hover:shadow-glow-danger',
          iconBg: 'bg-red-500/10 text-red-400 border-red-500/30',
          indicator: 'bg-red-500',
          accentText: 'text-red-400',
        };
      case 'emerald':
        return {
          glow: 'group-hover:border-emerald-500/50 group-hover:shadow-glow-emerald',
          iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          indicator: 'bg-emerald-500',
          accentText: 'text-emerald-400',
        };
      case 'warning':
        return {
          glow: 'group-hover:border-amber-500/50 group-hover:shadow-amber-500/20',
          iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          indicator: 'bg-amber-500',
          accentText: 'text-amber-400',
        };
      case 'purple':
        return {
          glow: 'group-hover:border-purple-500/50 group-hover:shadow-purple-500/20',
          iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          indicator: 'bg-purple-500',
          accentText: 'text-purple-400',
        };
      case 'blue':
        return {
          glow: 'group-hover:border-blue-500/50 group-hover:shadow-glow-blue',
          iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          indicator: 'bg-blue-500',
          accentText: 'text-blue-400',
        };
      case 'cyan':
      default:
        return {
          glow: 'group-hover:border-cyan-500/50 group-hover:shadow-glow-cyan',
          iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          indicator: 'bg-cyan-400',
          accentText: 'text-cyan-400',
        };
    }
  };

  const config = getAccentConfig();

  return (
    <div
      className={`group relative rounded-xl border border-cyber-border bg-cyber-card/90 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyber-cardHover/90 ${config.glow} backdrop-blur-md`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono-numbers">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border ${config.iconBg} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Sub row with trends and badge */}
      <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 font-medium font-mono ${
                trendPositive ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {trendPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 font-normal truncate">
              {subtitle}
            </span>
          )}
        </div>

        {badgeText && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60 shrink-0">
            {badgeText}
          </span>
        )}
      </div>

      {footerNote && (
        <p className="mt-2 text-[11px] text-slate-500 font-mono truncate">
          {footerNote}
        </p>
      )}

      {/* Subtle indicator bar */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full w-2/3 ${config.indicator} opacity-60 group-hover:opacity-100 transition-opacity`} />
      </div>
    </div>
  );
};

export default MetricCard;

