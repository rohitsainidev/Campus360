const VARIANTS = {
  success: 'text-emerald-700 font-medium',
  warning: 'text-amber-700 font-medium',
  error: 'text-rose-700 font-medium',
  info: 'text-blue-700 font-medium',
  primary: 'text-indigo-700 font-medium',
  neutral: 'text-slate-600 font-medium',
};

const DOT_COLORS = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
  info: 'bg-blue-500',
  primary: 'bg-indigo-600',
  neutral: 'bg-slate-400',
};

export default function Badge({
  children,
  variant = 'neutral',
  dot = true,
  className = '',
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.neutral;
  const dotColor = DOT_COLORS[variant] || DOT_COLORS.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${variantClass} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotColor}`} />}
      <span>{children}</span>
    </span>
  );
}
