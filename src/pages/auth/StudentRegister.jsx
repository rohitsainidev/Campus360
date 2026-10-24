import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import Button from '../../components/common/Button';

export default function StudentRegister() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm max-w-lg mx-auto text-center">
      {/* Back to Portal Selection */}
      <div className="text-left">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#4F46E5] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Portal Selection</span>
        </Link>
      </div>

      {/* Icon */}
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#B45309]">
          <ShieldAlert className="h-8 w-8" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
          Institutional Policy Notice
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          Public Registration Disabled
        </h1>
        <p className="text-xs text-[#64748B] leading-relaxed max-w-md mx-auto">
          In accordance with Campus360 security protocols, self-registration is strictly disabled for all users. Student accounts cannot be created publicly.
        </p>
      </div>

      {/* Policy Details Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left space-y-3 text-xs text-[#475569]">
        <div className="flex items-start gap-2.5">
          <Lock className="h-4 w-4 shrink-0 mt-0.5 text-[#4F46E5]" />
          <div>
            <p className="font-semibold text-[#0F172A]">Administrator-Managed Enrollment</p>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
              Only authenticated and authorized Administrators can provision student accounts.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
          <GraduationCap className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <p className="font-semibold text-[#0F172A]">Enrolled Student Credentials</p>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
              If you are an enrolled student, your Student ID and initial credentials have been issued by the College Registrar.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 space-y-2.5">
        <Link to="/login/student" className="block w-full">
          <Button variant="primary" className="w-full justify-center text-xs py-2.5 font-semibold">
            <span>Proceed to Student Login</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
        <Link to="/login" className="block w-full">
          <Button variant="outline" className="w-full justify-center text-xs py-2 font-semibold">
            <span>View All Portal Gateways</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
