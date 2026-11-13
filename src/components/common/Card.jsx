import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  headerAction, 
  className = '', 
  glow = false,
  noPadding = false 
}) => {
  return (
    <div 
      className={`rounded-xl border ${
        glow ? 'border-cyan-500/40 shadow-glow-cyan' : 'border-cyber-border'
      } bg-cyber-card/85 backdrop-blur-md overflow-hidden ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyber-border/70 bg-slate-900/40">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
    </div>
  );
};

export default Card;

