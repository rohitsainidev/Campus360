import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Briefcase,
  Wrench,
  AlertCircle,
  Home,
  Building2,
  FileText,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronRight,
  CreditCard,
  Award,
  BookOpen,
  Megaphone,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  initialAdminUsers,
  initialStaffRequests,
  initialAdminAllocations,
  initialStudentPlacements,
  initialAdminBooks,
  adminRecentActivities,
} from '../../data/mockData';
import { adminFeeOverview } from '../../data/feeMockData';
import { initialNotices } from '../../data/noticeMockData';
import { studentExamData } from '../../data/examMockData';

export default function AdminDashboard() {
  // Read synchronized data from localStorage with fallbacks
  const users = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminUsers;
  }, []);

  const complaints = useMemo(() => {
    const saved = localStorage.getItem('campus360_staff_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStaffRequests;
  }, []);

  const allocations = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_allocations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminAllocations;
  }, []);

  const placements = useMemo(() => {
    const saved = localStorage.getItem('campus360_student_placements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentPlacements;
  }, []);

  // Additional Core Admin Modules (Fees, Library, Notices, Exams)
  const feeData = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_fees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return adminFeeOverview;
  }, []);

  const books = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_books');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminBooks;
  }, []);

  const notices = useMemo(() => {
    const saved = localStorage.getItem('campus360_notices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialNotices;
  }, []);

  const examTimetable = useMemo(() => {
    return studentExamData?.timetable || [];
  }, []);

  // Compute metric counts
  const totalStudents = users.filter((u) => u.role === 'Student').length;
  const totalTeachers = users.filter((u) => u.role === 'Teacher').length;
  const totalStaff = users.filter((u) => u.role === 'Maintenance Staff').length;

  const openComplaints = complaints.filter(
    (c) => c.status === 'Submitted' || c.status === 'Assigned' || c.status === 'In Progress'
  ).length;

  const activeAllocations = allocations.filter(
    (a) => a.status === 'Allocated' || a.status === 'Active'
  ).length;

  const activePlacements = placements.filter(
    (p) => p.status !== 'Closed' && p.status !== 'Expired'
  ).length;

  // Breakdown statistics
  const submittedComplaints = complaints.filter((c) => c.status === 'Submitted').length;
  const inProgressComplaints = complaints.filter((c) => c.status === 'In Progress' || c.status === 'Assigned').length;
  const resolvedComplaints = complaints.filter((c) => c.status === 'Resolved').length;
  const unassignedMaintenance = complaints.filter((c) => !c.assignedStaffName || c.assignedStaffName === 'Unassigned').length;

  // Additional module stats
  const totalBookCopies = books.reduce((sum, b) => sum + (Number(b.totalCopies) || 1), 0);
  const issuedBookCopies = books.reduce((sum, b) => sum + (Number(b.issuedCopies) || 0), 0);
  const pinnedNoticesCount = notices.filter((n) => n.isPinned).length;

  return (
    <div className="space-y-8">
      {/* Unified Professional Campus Overview Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#5CAC32]/5 to-slate-50 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 lg:p-9 gap-6 sm:gap-8">
          <div className="max-w-2xl space-y-2.5 text-center md:text-left">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-500 mb-1">
              <Link to="/admin/dashboard" className="hover:text-slate-900 transition-colors">
                Admin Portal
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">Dashboard</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
              Campus Overview
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Real-time institutional management across academic departments, student accounts, facilities, and campus operations.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <Link
                to="/admin/users"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5CAC32] hover:bg-[#4B9228] text-white font-medium text-xs shadow-2xs transition-all active:scale-[0.98]"
              >
                <Users className="h-3.5 w-3.5" />
                <span>User Directory</span>
              </Link>
              <Link
                to="/admin/fees"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs shadow-2xs transition-all active:scale-[0.98]"
              >
                <CreditCard className="h-3.5 w-3.5 text-[#5CAC32]" />
                <span>Fee Register</span>
              </Link>
              <Link
                to="/admin/complaints"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs shadow-2xs transition-all active:scale-[0.98]"
              >
                <AlertCircle className="h-3.5 w-3.5 text-[#5CAC32]" />
                <span>Grievance Desk</span>
              </Link>
              <Link
                to="/admin/reports"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs shadow-2xs transition-all active:scale-[0.98]"
              >
                <FileText className="h-3.5 w-3.5 text-[#5CAC32]" />
                <span>Audit Reports</span>
              </Link>
            </div>
          </div>

          {/* Clean Illustration Container */}
          <div className="relative shrink-0 w-52 sm:w-60 md:w-68 lg:w-76">
            <img
              src="/images/dashboard-hero.jpg"
              alt="Campus 360 Operations Illustration"
              className="w-full h-auto object-contain rounded-xl shadow-xs border border-slate-200/60 hover:scale-[1.02] transition-transform duration-300"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Unified Enterprise Metrics Strip (Stripe / Linear Architecture) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Subtle Top Status Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5CAC32] ring-4 ring-[#5CAC32]/10" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Institutional Operations & Campus Pulse
            </h2>
          </div>
          <span className="hidden sm:inline text-[11px] text-slate-400 font-medium">
            Synchronized live across all 11 campus departments
          </span>
        </div>

        {/* Primary Row 1: Core Stakeholders & Operations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <Link
            to="/admin/users?role=Student"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Enrolled Students
              </span>
              <GraduationCap className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalStudents}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Enrolled across 6 departments
            </p>
          </Link>

          <Link
            to="/admin/users?role=Teacher"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Faculty & Staff
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalTeachers + totalStaff}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {totalTeachers} Faculty • {totalStaff} Staff
            </p>
          </Link>

          <Link
            to="/admin/fees"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Fee Collections
              </span>
              <CreditCard className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                ₹ {(feeData.totalRevenueCollected / 10000000).toFixed(2)}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Cr</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {feeData.collectionRate}% collected • {feeData.totalDefaultersCount} pending
            </p>
          </Link>

          <Link
            to="/admin/complaints"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Open Grievances
              </span>
              <AlertCircle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {openComplaints}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {submittedComplaints} submitted, {inProgressComplaints} active
            </p>
          </Link>
        </div>

        {/* Row 2: Campus Infrastructure & Academics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-slate-100 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <Link
            to="/admin/hostel"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Hostel Allocations
              </span>
              <Home className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {activeAllocations}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              4 Residential blocks active
            </p>
          </Link>

          <Link
            to="/admin/library"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Library Stack
              </span>
              <BookOpen className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {books.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Titles</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {totalBookCopies} copies • {issuedBookCopies} issued
            </p>
          </Link>

          <Link
            to="/admin/exams"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Examination Roster
              </span>
              <Award className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {examTimetable.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Papers</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Winter 2026 assessments ready
            </p>
          </Link>

          <Link
            to="/admin/placements"
            className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#5CAC32] transition-colors">
                Placement Drives
              </span>
              <Briefcase className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {activePlacements}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Drives</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {notices.length} Campus circulars live
            </p>
          </Link>
        </div>
      </div>

      {/* Two-Column Middle Section: Complaints Overview & Maintenance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Complaints Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#5CAC32]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Complaints Overview</h3>
              </div>
              <Link
                to="/admin/complaints"
                className="text-xs font-medium text-[#5CAC32] hover:text-[#4B9228] hover:underline"
              >
                Complaints Management &rarr;
              </Link>
            </div>

            <p className="text-xs text-[#64748B] mt-3">
              Campus complaints submitted by students and campus residents across all facilities.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mt-5">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="text-xl font-bold text-[#0F172A]">{complaints.length}</div>
                <div className="text-[11px] font-medium text-[#64748B] mt-0.5">Total Logged</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-xl font-bold text-[#5CAC32]">{submittedComplaints}</div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">Submitted</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-xl font-bold text-slate-800">{inProgressComplaints}</div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">In Progress</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-xl font-bold text-[#5CAC32]">{resolvedComplaints}</div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">Resolved</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span>Resolution Rate: {complaints.length > 0 ? `${Math.round((resolvedComplaints / complaints.length) * 100)}%` : '0%'}</span>
            <Link
              to="/admin/complaints"
              className="text-[#5CAC32] font-semibold hover:underline"
            >
              Review all tickets
            </Link>
          </div>
        </div>

        {/* Maintenance Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-[#5CAC32]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Maintenance Overview</h3>
              </div>
              <Link
                to="/admin/complaints"
                className="text-xs font-medium text-[#5CAC32] hover:text-[#4B9228] hover:underline"
              >
                Workflow &rarr;
              </Link>
            </div>

            <p className="text-xs text-[#64748B] mt-3">
              Operational maintenance jobs dispatched to facilities technicians and engineering teams.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mt-5">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="text-xl font-bold text-[#0F172A]">{complaints.length}</div>
                <div className="text-[11px] font-medium text-[#64748B] mt-0.5">Total Tasks</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] text-center">
                <div className="text-xl font-bold text-slate-700">{unassignedMaintenance}</div>
                <div className="text-[11px] font-medium text-[#64748B] mt-0.5">Unassigned</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-xl font-bold text-slate-800">{inProgressComplaints}</div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">Dispatched</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-xl font-bold text-[#5CAC32]">{resolvedComplaints}</div>
                <div className="text-[11px] font-medium text-slate-600 mt-0.5">Completed</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span>Technicians On Duty: {totalStaff} Available</span>
            <Link
              to="/admin/users?role=Maintenance+Staff"
              className="text-[#5CAC32] font-semibold hover:underline"
            >
              View staff directory
            </Link>
          </div>
        </div>
      </div>

      {/* Two-Column Lower Section: Campus Announcements & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Left Column: Official Campus Announcements */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4.5 w-4.5 text-[#5CAC32]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Campus Announcements</h3>
              </div>
              <Link
                to="/admin/notices"
                className="text-xs font-semibold text-[#5CAC32] hover:underline flex items-center gap-1"
              >
                <span>All Circulars ({notices.length})</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-xl border border-slate-100 bg-[#F8FAFC]/80 hover:bg-white hover:border-slate-200 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3 text-[#5CAC32]" />
                      {notice.publishedDate}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                    {notice.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Official circulars broadcasted to students & staff</span>
            <Link
              to="/admin/notices"
              className="text-[#5CAC32] font-semibold hover:underline"
            >
              Broadcast Notice &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Recent Administrative Activity Log */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-[#5CAC32]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Recent System Activity</h3>
              </div>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                Institutional Log
              </span>
            </div>

            <div className="space-y-3">
              {adminRecentActivities.slice(0, 4).map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 bg-[#F8FAFC]/80 hover:bg-white hover:border-slate-200 transition-colors"
                >
                  <div className="text-[#5CAC32] shrink-0 mt-0.5">
                    {act.category === 'user' && <Users className="h-4 w-4 text-[#5CAC32]" />}
                    {act.category === 'department' && <Building2 className="h-4 w-4 text-[#5CAC32]" />}
                    {act.category === 'complaint' && <Wrench className="h-4 w-4 text-[#5CAC32]" />}
                    {act.category === 'placement' && <Briefcase className="h-4 w-4 text-[#5CAC32]" />}
                    {!['user', 'department', 'complaint', 'placement'].includes(act.category) && (
                      <CheckCircle2 className="h-4 w-4 text-[#5CAC32]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <h4 className="text-xs font-semibold text-[#0F172A] truncate">
                        {act.title}
                      </h4>
                      <span className="text-[11px] text-[#64748B] whitespace-nowrap flex items-center gap-1 shrink-0">
                        <Calendar className="h-3 w-3 text-[#5CAC32]" />
                        {act.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Audit trail automatically verified</span>
            <Link
              to="/admin/reports"
              className="text-[#5CAC32] font-semibold hover:underline"
            >
              Audit Reports &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
