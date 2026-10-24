import { Inbox } from 'lucide-react';
import Button from '../common/Button';

export default function EmptyState({
  title = 'No records available',
  description = 'There are currently no items to display in this view.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-lg border border-dashed border-[#E2E8F0] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-[#64748B]">
        <Icon className="h-5 w-5" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
        <p className="text-xs text-[#475569] leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
