import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel = 'vs last term',
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-150 group block ${className}`}
    >
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <span className="text-xs sm:text-sm font-medium text-slate-600 transition-colors truncate">
          {title}
        </span>
        {Icon && (
          <Icon className="h-4.5 w-4.5 text-[#5CAC32] shrink-0" />
        )}
      </div>

      <div className="my-1">
        <p className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
          {value}
        </p>
      </div>

      {description && (
        <p className="text-[11px] sm:text-xs text-slate-500 truncate leading-snug">{description}</p>
      )}

      {trend !== undefined && (
        <div className="pt-2 mt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] sm:text-xs">
          <span
            className={`inline-flex items-center gap-0.5 font-semibold ${
              trend >= 0 ? 'text-emerald-700' : 'text-rose-600'
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </span>
          <span className="text-slate-400 text-[10px] sm:text-[11px]">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
