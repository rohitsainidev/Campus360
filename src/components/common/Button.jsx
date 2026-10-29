import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB] border border-transparent shadow-2xs',
  secondary:
    'bg-white text-[#0F172A] hover:bg-[#F8FAFC] border border-[#E2E8F0] focus-visible:ring-slate-300',
  outline:
    'bg-transparent text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 border border-[#E2E8F0] focus-visible:ring-slate-300',
  ghost:
    'bg-transparent text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 border border-transparent focus-visible:ring-slate-300',
  danger:
    'bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-transparent focus-visible:ring-[#DC2626]',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5 shadow-2xs',
  md: 'px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg gap-2 shadow-xs',
  lg: 'px-5 py-2.5 text-sm sm:text-base font-semibold rounded-xl gap-2 shadow-xs',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-150';

  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />
      )}
      {children && <span>{children}</span>}
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4" />
      )}
    </button>
  );
}
