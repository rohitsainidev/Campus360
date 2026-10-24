import { Outlet, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header Branding */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-md bg-[#5CAC32] flex items-center justify-center text-white">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <span className="font-bold text-base tracking-tight text-[#0F172A]">
            Campus<span className="text-[#5CAC32]">360</span>
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
        >
          &larr; Back to Homepage
        </Link>
      </header>

      {/* Main Form Center Container */}
      <main className="flex-1 flex items-start sm:items-center justify-center w-full pt-2 pb-8 sm:py-6">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="w-full max-w-7xl mx-auto pt-6 text-center text-xs text-[#64748B]">
        <p>&copy; {new Date().getFullYear()} Campus360. Secure Institutional Access.</p>
      </footer>
    </div>
  );
}
