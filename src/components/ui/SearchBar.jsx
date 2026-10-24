import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search records, items, courses...',
  ariaLabel = 'Search records',
  className = '',
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className={`relative flex items-center w-full ${className || 'max-w-sm'}`}>
      <label htmlFor="search-input" className="sr-only">
        {ariaLabel}
      </label>

      <div className="absolute left-3 pointer-events-none text-slate-400">
        <Search className="h-4 w-4" />
      </div>

      <input
        id="search-input"
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full pl-9 pr-8 py-2 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#5CAC32] focus:ring-1 focus:ring-[#5CAC32] transition-colors shadow-2xs"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Clear search text"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
