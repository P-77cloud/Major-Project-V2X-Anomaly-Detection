import React from 'react';

const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const getVariantStyles = () => {
    switch (variant.toUpperCase()) {
      case 'CRITICAL':
      case 'DANGER':
        return 'bg-red-500/15 text-red-400 border-red-500/40 shadow-sm shadow-red-500/20';
      case 'HIGH':
      case 'WARNING':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-sm shadow-amber-500/20';
      case 'MEDIUM':
        return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40';
      case 'LOW':
      case 'INFO':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40';
      case 'NORMAL':
      case 'SUCCESS':
      case 'SAFE':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/20';
      case 'PURPLE':
      case 'DEMO':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return 'text-[10px] px-1.5 py-0.5';
      case 'md':
        return 'text-xs px-3 py-1';
      case 'lg':
        return 'text-sm px-3.5 py-1.5 font-medium';
      case 'sm':
      default:
        return 'text-xs px-2.5 py-0.5';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 animate-pulse" />
      {children}
    </span>
  );
};

export default Badge;

