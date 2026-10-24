import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileText,
  AlertCircle,
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  TrendingUp,
  Megaphone,
  CreditCard,
  Award,
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  studentAttendanceData,
  initialStudentAssignments,
  initialStudentComplaints,
  studentLibraryInfo,
  studentCampusEvents,
} from '../../data/mockData';

export default function StudentDashboard() {
  const pendingAssignmentsCount = initialStudentAssignments.filter(
    (a) => a.status === 'Pending'
  ).length;

  const activeComplaintsCount = initialStudentComplaints.filter(
    (c) => c.status === 'In Progress' || c.status === 'Submitted'
  ).length;

  const issuedBooksCount = studentLibraryInfo.activeBorrowings.length;

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Student Academic Workspace
            </span>
            <span className="text-[#64748B]">•</span>
            <span className="text-xs text-[#64748B]">B.Tech CSE • Semester 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Good morning, Student!
          </h1>
          <p className="text-xs sm:text-sm text-[#475569]">
            Here's an overview of your academic activities, examination notices, and fee dues.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/student/notices">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Megaphone className="h-3.5 w-3.5 text-indigo-600" />
              Notices
            </Button>
          </Link>
          <Link to="/student/fees">
            <Button size="sm" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
              <CreditCard className="h-3.5 w-3.5" />
              Fee Portal
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Action Highlights for New Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/student/notices"
          className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/60 border border-indigo-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-600 text-white shrink-0">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-indigo-900 tracking-wide">
                Notice Board
              </p>
              <p className="text-xs text-indigo-700 font-medium mt-0.5 line-clamp-1">
                End-Sem Exam Timetable Released
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/student/fees"
          className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-600 text-white shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-amber-900 tracking-wide">
                Fee Payments
              </p>
              <p className="text-xs text-amber-700 font-medium mt-0.5">
                Balance Due: ₹ 35,000 (Due 10 Nov)
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/student/exams"
          className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/60 border border-purple-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-600 text-white shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-purple-900 tracking-wide">
                Exams &amp; Hall Ticket
              </p>
              <p className="text-xs text-purple-700 font-medium mt-0.5">
                Admit Card Ready (SGPA: 8.75)
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2. Four Summary KPI Cards - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <Link
            to="/student/attendance"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
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
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">Safe</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Cutoff requirement: 75%
            </p>
          </Link>

          <Link
            to="/student/assignments"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Pending Assignments
              </span>
              <FileText className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {pendingAssignmentsCount}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Require your submission
            </p>
          </Link>

          <Link
            to="/student/complaints"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Active Grievances
              </span>
              <AlertCircle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {activeComplaintsCount}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Awaiting facility resolution
            </p>
          </Link>

          <Link
            to="/student/library"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Library Loans
              </span>
              <BookOpen className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {issuedBooksCount}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Books</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Active borrowed titles
            </p>
          </Link>
        </div>
      </div>

      {/* 3. Middle Section: Attendance Breakdown & Upcoming Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Breakdown Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#E2E8F0] p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Attendance Overview
              </h2>
              <p className="text-xs text-[#64748B]">
                {studentAttendanceData.presentClasses} of {studentAttendanceData.totalClasses} total lectures attended ({studentAttendanceData.absentClasses} absences)
              </p>
            </div>
            <Link
              to="/student/attendance"
              className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1"
            >
              Full Ledger <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {studentAttendanceData.subjects.map((sub) => (
              <div key={sub.code} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#0F172A]">
                    {sub.name} <span className="text-[#64748B]">({sub.code})</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">
                      {sub.present}/{sub.total} classes
                    </span>
                    <span
                      className={`font-semibold ${
                        sub.percentage >= 75 ? 'text-[#15803D]' : 'text-[#DC2626]'
                      }`}
                    >
                      {sub.percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sub.percentage >= 75 ? 'bg-[#15803D]' : 'bg-[#DC2626]'
                    }`}
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Events Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Shortcuts */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 space-y-3 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Quick Shortcuts
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/student/attendance"
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors flex flex-col justify-between"
              >
                <CalendarCheck className="h-4 w-4 text-[#4F46E5] mb-2" />
                <span className="text-xs font-semibold text-[#0F172A]">View Attendance</span>
              </Link>
              <Link
                to="/student/assignments"
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors flex flex-col justify-between"
              >
                <FileText className="h-4 w-4 text-[#4F46E5] mb-2" />
                <span className="text-xs font-semibold text-[#0F172A]">View Assignments</span>
              </Link>
              <Link
                to="/student/complaints"
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors flex flex-col justify-between"
              >
                <AlertCircle className="h-4 w-4 text-[#4F46E5] mb-2" />
                <span className="text-xs font-semibold text-[#0F172A]">Submit Complaint</span>
              </Link>
              <Link
                to="/student/library"
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors flex flex-col justify-between"
              >
                <BookOpen className="h-4 w-4 text-[#4F46E5] mb-2" />
                <span className="text-xs font-semibold text-[#0F172A]">View Library</span>
              </Link>
            </div>
          </div>

          {/* Upcoming Campus Events */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Upcoming Schedule
              </h2>
              <span className="text-[11px] text-[#4F46E5] font-medium">Verified Calendar</span>
            </div>
            <div className="space-y-2.5">
              {studentCampusEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 text-xs"
                >
                  <Calendar className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0F172A] leading-snug">{evt.title}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{evt.date} • {evt.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Upcoming Assignments & Recent Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignments Table List */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Upcoming Assignments
              </h2>
              <p className="text-xs text-[#64748B]">Tasks pending submission or review</p>
            </div>
            <Link
              to="/student/assignments"
              className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1"
            >
              All Assignments <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {initialStudentAssignments.slice(0, 3).map((asn) => (
              <div
                key={asn.id}
                className="p-3.5 rounded-md border border-[#E2E8F0] hover:border-slate-300 transition-colors flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <p className="font-semibold text-[#0F172A] leading-snug">
                    {asn.title}
                  </p>
                  <p className="text-[#64748B]">{asn.subject}</p>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B] pt-0.5">
                    <Clock className="h-3 w-3" />
                    <span>Due: {asn.dueDate}</span>
                  </div>
                </div>

                <Badge
                  variant={
                    asn.status === 'Graded'
                      ? 'success'
                      : asn.status === 'Submitted'
                      ? 'info'
                      : 'warning'
                  }
                  dot
                >
                  {asn.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Recent Grievances & Tickets
              </h2>
              <p className="text-xs text-[#64748B]">Service requests logged with campus desks</p>
            </div>
            <Link
              to="/student/complaints"
              className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1"
            >
              Complaints Desk <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {initialStudentComplaints.slice(0, 3).map((cmp) => (
              <div
                key={cmp.id}
                className="p-3.5 rounded-md border border-[#E2E8F0] hover:border-slate-300 transition-colors flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#64748B] font-semibold">{cmp.id}</span>
                    <Badge variant="neutral">{cmp.category}</Badge>
                  </div>
                  <p className="font-semibold text-[#0F172A] leading-snug">
                    {cmp.title}
                  </p>
                  <p className="text-[11px] text-[#64748B]">Submitted: {cmp.submissionDate}</p>
                </div>

                <Badge
                  variant={
                    cmp.status === 'Resolved'
                      ? 'success'
                      : cmp.status === 'In Progress'
                      ? 'warning'
                      : 'info'
                  }
                  dot
                >
                  {cmp.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
