import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'danger', 'ghost', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 active:scale-98 border border-cyan-400/30';
      case 'secondary':
        return 'bg-slate-800/90 text-cyan-300 hover:bg-slate-700/90 border border-cyan-500/30 hover:border-cyan-400/60 shadow-md shadow-slate-950/50';
      case 'outline':
        return 'bg-transparent text-slate-200 border border-slate-700 hover:border-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/5';
      case 'danger':
        return 'bg-red-600/90 text-white hover:bg-red-500 shadow-lg shadow-red-600/25 border border-red-500/50';
      case 'ghost':
        return 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/50';
      default:
        return 'bg-cyan-500 text-slate-950';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-3 py-1.5 gap-1.5 rounded-lg';
      case 'lg':
        return 'text-base px-6 py-3 gap-2.5 rounded-xl font-semibold';
      case 'md':
      default:
        return 'text-sm px-4 py-2 gap-2 rounded-xl';
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;

