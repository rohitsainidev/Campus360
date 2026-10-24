import { Users, CheckCircle2, XCircle, Percent } from 'lucide-react';

export default function AttendanceSummary({
  total = 0,
  present = 0,
  absent = 0,
  className = '',
}) {
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : '0.0';

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-600 transition-colors">
              Total Enrolled
            </span>
            <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
          </div>
          <div className="my-0.5 flex items-baseline">
            <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {total}
            </span>
            <span className="text-xs font-medium text-slate-500 ml-1">Students</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            Cohort capacity
          </p>
        </div>

        <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-600 transition-colors">
              Present Today
            </span>
            <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
          </div>
          <div className="my-0.5 flex items-baseline">
            <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {present}
            </span>
            <span className="text-xs font-medium text-slate-500 ml-1">Attended</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            Marked present
          </p>
        </div>

        <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-600 transition-colors">
              Absent
            </span>
            <XCircle className="h-4 w-4 text-rose-500 transition-transform group-hover:scale-110" />
          </div>
          <div className="my-0.5 flex items-baseline">
            <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {absent}
            </span>
            <span className="text-xs font-medium text-slate-500 ml-1">Missing</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            Marked absent
          </p>
        </div>

        <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-600 transition-colors">
              Attendance Rate
            </span>
            <Percent className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
          </div>
          <div className="my-0.5 flex items-baseline">
            <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {percentage}
            </span>
            <span className="text-xs font-medium text-slate-500 ml-1">%</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">
            Session turnout
          </p>
        </div>
      </div>
    </div>
  );
}
