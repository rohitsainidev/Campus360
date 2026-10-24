import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'max-w-md',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop with modern blur */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-2xl border border-slate-200/90 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] transition-all`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-7 py-4.5 border-b border-slate-100 bg-white">
          {title && (
            <h2 id="modal-title" className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            aria-label="Close dialog"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 sm:px-7 py-5 sm:py-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600">
          {children}
        </div>

        {/* Action Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 sm:px-7 py-4 border-t border-slate-100 bg-slate-50/80">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
