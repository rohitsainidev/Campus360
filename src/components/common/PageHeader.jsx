import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  action,
  className = '',
}) {
  const renderedActions = actions || action;
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E2E8F0] ${className}`}
    >
      <div className="space-y-1">
        {/* Optional Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  {crumb.path && !isLast ? (
                    <Link
                      to={crumb.path}
                      className="hover:text-[#0F172A] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'font-medium text-[#0F172A]' : ''}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="h-3 w-3 text-[#64748B]" />}
                </div>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
            {title}
          </h1>
          {badge && <div>{badge}</div>}
        </div>
        {description && (
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {renderedActions && (
        <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto shrink-0">
          {renderedActions}
        </div>
      )}
    </div>
  );
}
