export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  rightElement,
  className = '',
  id,
  type = 'text',
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const helperId = helperText && inputId ? `${inputId}-helper` : undefined;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[#0F172A] flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-[#DC2626] ml-1" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 pointer-events-none text-[#64748B]">
            <Icon className="h-4 w-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId || helperId || undefined}
          className={`w-full rounded-md border bg-white text-[#0F172A] placeholder:text-[#64748B] text-sm px-3.5 py-2 transition-colors focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed ${
            Icon ? 'pl-9' : ''
          } ${rightElement ? 'pr-10' : ''} ${
            error
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
              : 'border-[#E2E8F0] hover:border-slate-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]'
          } ${className}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center text-[#64748B]">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-[#DC2626] font-medium" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[#64748B]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
