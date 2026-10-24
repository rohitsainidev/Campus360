import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, X, ChevronRight, LogOut } from 'lucide-react';

export default function Sidebar({
  title = 'Campus Portal',
  navigationItems = [],
  user = { name: 'Demo User', role: 'Student' },
  isMobileOpen = false,
  onClose,
  onItemClick,
  onLogout,
}) {
  const isAdmin = user?.role?.toLowerCase()?.includes('admin') || title?.toLowerCase()?.includes('admin');

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        aria-label="Sidebar Navigation"
        className={`fixed top-0 bottom-0 left-0 z-50 w-52 bg-white border-r border-[#E2E8F0] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#E2E8F0]">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`h-7.5 w-7.5 rounded-lg flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform ${
              isAdmin
                ? 'bg-gradient-to-tr from-[#5CAC32] to-[#4B9228]'
                : 'bg-gradient-to-tr from-indigo-700 to-indigo-500'
            }`}>
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-xs tracking-tight text-[#0F172A] block leading-tight">
                Campus<span className={isAdmin ? 'text-[#5CAC32]' : 'text-[#4F46E5]'}>360</span>
              </span>
              <span className="text-[9px] text-[#64748B] font-semibold uppercase tracking-wider block">
                {title}
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className={`lg:hidden p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 focus:outline-none focus:ring-2 ${
              isAdmin ? 'focus:ring-[#5CAC32]/20' : 'focus:ring-[#4F46E5]/20'
            }`}
            aria-label="Close navigation sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation links list without scrollbar */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-0.5 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <p className="px-2.5 pb-1 text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Navigation
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (onItemClick) {
                    onItemClick(item, e);
                  }
                  if (onClose) {
                    onClose();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? isAdmin
                        ? 'bg-[#5CAC32]/10 text-[#5CAC32] font-semibold shadow-2xs'
                        : 'bg-indigo-50/90 text-[#4F46E5] font-semibold shadow-2xs'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`
                }
              >
                {Icon && (
                  <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" />
                )}
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button Only Footer */}
        <div className="p-2.5 border-t border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else {
                localStorage.removeItem('campus360_auth_user');
                window.location.href = '/login';
              }
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50/80 transition-all group focus:outline-none focus:ring-2 focus:ring-rose-200"
            aria-label="Sign out of portal"
          >
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-colors shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
