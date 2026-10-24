import { Loader2 } from 'lucide-react';

export default function Loader({
  size = 'md',
  text = 'Loading...',
  className = '',
}) {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 text-[#4F46E5] ${className}`}
    >
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-current`} />
      {text && (
        <span className="text-xs font-medium text-[#64748B]">{text}</span>
      )}
    </div>
  );
}
