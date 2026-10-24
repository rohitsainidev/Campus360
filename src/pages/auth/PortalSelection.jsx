import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  ShieldCheck,
  LogIn,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function PortalSelection() {
  const portalCards = [
    {
      id: 'admin',
      title: 'Administrators',
      roleLabel: 'Central Admin',
      icon: ShieldCheck,
      description:
        'Oversee campus users, departments, complaints, hostel, and system settings.',
      loginPath: '/login/admin',
      canRegister: false,
      policyNote: 'Restricted to authorized campus admins',
      iconColor: 'text-blue-600',
      solidBg: 'bg-blue-600',
      btnBg: 'bg-blue-600 hover:bg-blue-700',
      hoverBorder: 'hover:border-blue-400',
      labelColor: 'text-blue-600',
      loginBtnText: 'Administrator Login',
    },
    {
      id: 'student',
      title: 'Students',
      roleLabel: 'Academic Portal',
      icon: GraduationCap,
      description:
        'Access attendance, course assignments, hostel, library, complaints, and placements.',
      loginPath: '/login/student',
      canRegister: false,
      policyNote: 'Student accounts enrolled and issued by administration',
      iconColor: 'text-emerald-600',
      solidBg: 'bg-emerald-600',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700',
      hoverBorder: 'hover:border-emerald-400',
      labelColor: 'text-emerald-600',
      loginBtnText: 'Student Login',
    },
    {
      id: 'teacher',
      title: 'Teachers',
      roleLabel: 'Faculty Desk',
      icon: BookOpen,
      description:
        'Manage assigned classes, student attendance, assignments, and academic activities.',
      loginPath: '/login/teacher',
      canRegister: false,
      policyNote: 'Faculty accounts issued by administration',
      iconColor: 'text-indigo-600',
      solidBg: 'bg-indigo-600',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700',
      hoverBorder: 'hover:border-indigo-400',
      labelColor: 'text-indigo-600',
      loginBtnText: 'Teacher Login',
    },
    {
      id: 'staff',
      title: 'Staff',
      roleLabel: 'Operations Desk',
      icon: Wrench,
      description:
        'View assigned tasks, maintenance requests, facilities, and campus operations.',
      loginPath: '/login/staff',
      canRegister: false,
      policyNote: 'Staff accounts issued by administration',
      iconColor: 'text-[#FA5A2A]',
      solidBg: 'bg-[#FA5A2A]',
      btnBg: 'bg-[#FA5A2A] hover:bg-[#E5481B]',
      hoverBorder: 'hover:border-[#FA5A2A]',
      labelColor: 'text-[#FA5A2A]',
      loginBtnText: 'Staff Login',
    },
  ];

  return (
    <div className="space-y-8 py-3 w-full max-w-7xl mx-auto">
      {/* Page Title & Subtitle */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F172A]">
          Welcome to Campus360
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          One campus. One connected experience.
        </p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="h-px w-8 bg-slate-200"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FA5A2A]">
            Choose Your Portal
          </span>
          <span className="h-px w-8 bg-slate-200"></span>
        </div>
      </div>

      {/* Four Cards in One Single Line on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {portalCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs ${card.hoverBorder} hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group text-center`}
            >
              {/* Card Body */}
              <div className="flex flex-col items-center">
                {/* Solid Rounded-Square Icon Badge */}
                <div className={`flex items-center justify-center h-14 w-14 rounded-2xl ${card.solidBg} text-white shadow-2xs mb-4 transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </div>

                {/* Clean Role Label without Background */}
                <span className={`text-[11px] font-bold tracking-wider uppercase ${card.labelColor} mb-1.5`}>
                  {card.roleLabel}
                </span>

                {/* Card Title */}
                <h2 className="text-xl font-bold text-[#0F172A] group-hover:text-slate-900 transition-colors">
                  {card.title}
                </h2>

                {/* Description */}
                <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed min-h-[44px] flex items-center justify-center">
                  {card.description}
                </p>
              </div>

              {/* Action Buttons Section - Aligned across all cards */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5 w-full">
                {/* Primary Login Button with Matching Icon Color */}
                <Link to={card.loginPath} className="block w-full">
                  <button
                    type="button"
                    className={`w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3.5 rounded-xl ${card.btnBg} text-white transition-all shadow-xs cursor-pointer`}
                  >
                    <LogIn className="h-4 w-4 shrink-0" />
                    <span>{card.loginBtnText}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-80 ml-auto" />
                  </button>
                </Link>

                {/* Secondary Institutional Policy Notice - Uniform across all portals */}
                <div className="w-full h-9 flex items-center justify-center gap-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] text-[#64748B] text-center">
                  <Lock className="h-3 w-3 shrink-0 text-[#94A3B8]" />
                  <span className="truncate leading-tight">{card.policyNote}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional Security Notice */}
      <div className="max-w-4xl mx-auto py-2.5 px-6 rounded-xl sm:rounded-full bg-slate-50/90 border border-slate-200/80 flex items-center justify-center gap-2.5 text-xs text-[#64748B] text-center shadow-2xs">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#4F46E5]" />
        <p className="leading-relaxed">
          <span className="font-semibold text-[#0F172A]">Campus360 Institutional Gateway:</span>{' '}
          Select your authorized role to access student records, faculty operations, facilities maintenance, or campus administration.
        </p>
      </div>
    </div>
  );
}
