import React from 'react';
import { useSentinel } from '../../context/SentinelContext';
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';

const NotificationToast = () => {
  const { toasts, removeToast } = useSentinel();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-cyan-500/40 bg-slate-900/95 text-slate-100 shadow-glow-cyan';
        let Icon = Info;
        let iconColor = 'text-cyan-400';

        if (toast.type === 'danger') {
          borderClass = 'border-red-500/50 bg-red-950/90 text-white shadow-glow-danger';
          Icon = XCircle;
          iconColor = 'text-red-400';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/50 bg-amber-950/90 text-white shadow-amber-500/20';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'success') {
          borderClass = 'border-emerald-500/50 bg-slate-900/95 text-white shadow-glow-emerald';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 animate-in slide-in-from-right-5 ${borderClass}`}
          >
            <div className={`p-1 rounded-lg bg-black/40 ${iconColor} shrink-0 mt-0.5`}>
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs font-bold font-mono tracking-wide uppercase">
                  {toast.title}
                </h5>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {toast.time}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationToast;

