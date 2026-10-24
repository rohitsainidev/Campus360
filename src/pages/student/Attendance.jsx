import { useState, useMemo } from 'react';
import {
  Filter,
  TrendingUp,
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import { studentAttendanceData } from '../../data/mockData';

export default function StudentAttendance() {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('ALL');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('ALL');

  const filteredSubjects = useMemo(() => {
    if (selectedSubjectFilter === 'ALL') return studentAttendanceData.subjects;
    return studentAttendanceData.subjects.filter(
      (s) => s.code === selectedSubjectFilter
    );
  }, [selectedSubjectFilter]);

  const filteredMonthly = useMemo(() => {
    if (selectedMonthFilter === 'ALL') return studentAttendanceData.monthlyAttendance;
    return studentAttendanceData.monthlyAttendance.filter(
      (m) => m.month.includes(selectedMonthFilter)
    );
  }, [selectedMonthFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Ledger"
        description="Comprehensive biometric and lecture attendance tracking across enrolled subjects."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Attendance' },
        ]}
        badge={
          <Badge
            variant={studentAttendanceData.overallPercentage >= 75 ? 'success' : 'error'}
            dot
          >
            {studentAttendanceData.overallPercentage >= 75
              ? 'Above Statutory Cutoff (75%)'
              : 'Action Required: Low Attendance'}
          </Badge>
        }
      />

      {/* 1. Summary Metrics Strip - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Cumulative Attendance
              </span>
              <CalendarCheck className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {studentAttendanceData.overallPercentage}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-0.5">%</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">Eligible</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Statutory threshold: 75%
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Scheduled
              </span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {studentAttendanceData.totalClasses}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Hours</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Conducted lecture hours
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Attended (Present)
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {studentAttendanceData.presentClasses}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Classes</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Biometric marked present
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Absences Logged
              </span>
              <AlertTriangle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {studentAttendanceData.absentClasses}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Classes</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Excused &amp; unexcused leaves
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
          <Filter className="h-4 w-4 text-[#4F46E5]" />
          <span>Filter Ledger Records:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label htmlFor="sub-filter" className="text-[#64748B] font-medium">
              Subject:
            </label>
            <select
              id="sub-filter"
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="ALL">All Subjects ({studentAttendanceData.subjects.length})</option>
              {studentAttendanceData.subjects.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="month-filter" className="text-[#64748B] font-medium">
              Month:
            </label>
            <select
              id="month-filter"
              value={selectedMonthFilter}
              onChange={(e) => setSelectedMonthFilter(e.target.value)}
              className="rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="ALL">All Months</option>
              <option value="August">August 2026</option>
              <option value="September">September 2026</option>
              <option value="October">October 2026</option>
              <option value="November">November 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Subject-wise Attendance Table */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-base font-bold text-[#0F172A]">
            Subject-wise Academic Attendance
          </h2>
          <p className="text-xs text-[#64748B]">
            Minimum 75% required per subject to qualify for semester examinations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3">Course Code</th>
                <th className="px-5 py-3">Subject Name</th>
                <th className="px-5 py-3">Faculty In-charge</th>
                <th className="px-5 py-3 text-center">Attended / Total</th>
                <th className="px-5 py-3 text-center">Percentage</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
              {filteredSubjects.map((sub) => {
                const isSafe = sub.percentage >= 75;
                return (
                  <tr key={sub.code} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-semibold text-[#4F46E5]">
                      {sub.code}
                    </td>
                    <td className="px-5 py-3.5 font-medium">{sub.name}</td>
                    <td className="px-5 py-3.5 text-[#64748B]">{sub.faculty}</td>
                    <td className="px-5 py-3.5 text-center font-mono">
                      {sub.present} / {sub.total}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isSafe ? 'bg-[#15803D]' : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${sub.percentage}%` }}
                          />
                        </div>
                        <span
                          className={`font-bold ${
                            isSafe ? 'text-[#15803D]' : 'text-[#DC2626]'
                          }`}
                        >
                          {sub.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <Badge variant={isSafe ? 'success' : 'error'} dot>
                        {isSafe ? 'Satisfactory' : 'Below 75%'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Monthly Attendance Breakdown */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Monthly Aggregated Attendance
            </h2>
            <p className="text-xs text-[#64748B]">Month-by-month attendance progress log</p>
          </div>
          <Badge variant="info">Odd Semester 2026</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMonthly.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0F172A]">{m.month}</span>
                <span className="font-bold text-[#15803D]">{m.percentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#15803D] rounded-full"
                  style={{ width: `${m.percentage}%` }}
                />
              </div>
              <p className="text-[11px] text-[#64748B]">
                Attended: {m.present} of {m.total} classes
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
