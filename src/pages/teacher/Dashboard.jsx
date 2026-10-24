import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CalendarDays,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  Sparkles,
  MapPin,
  ListTodo,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/ui/EmptyState';
import {
  initialTeacherProfile,
  teacherScheduleToday,
  teacherRecentActivities,
  teacherPendingTasks,
} from '../../data/mockData';

export default function TeacherDashboard() {
  const [profile] = useState(initialTeacherProfile);
  const [schedule] = useState(teacherScheduleToday);
  const [activities] = useState(teacherRecentActivities);
  const [tasks] = useState(teacherPendingTasks);

  // Compute live counts if assignments or attendance have local changes
  const assignmentCount = useMemo(() => {
    const saved = localStorage.getItem('campus360_teacher_assignments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let pending = 0;
        parsed.forEach((asn) => {
          (asn.submissions || []).forEach((sub) => {
            if (sub.status === 'Submitted' && (sub.marks === '' || sub.marks === undefined || sub.marks === null)) {
              pending += 1;
            }
          });
        });
        return pending || 8;
      } catch {
        // fallback
      }
    }
    return 8;
  }, []);

  const totalStudentsCount = 120; // 120 enrolled students across 4 active course sections

  return (
    <div className="space-y-6">
      {/* Welcome & Page Header */}
      <PageHeader
        title="Welcome back, Teacher"
        description="Here's an overview of your classes and academic activities."
        badge={
          <Badge variant="primary" dot>
            {profile.name} • {profile.department}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link to="/teacher/attendance">
              <Button size="sm" icon={CalendarCheck}>
                Take Attendance
              </Button>
            </Link>
            <Link to="/teacher/assignments">
              <Button variant="secondary" size="sm" icon={FileText}>
                New Assignment
              </Button>
            </Link>
          </div>
        }
      />

      {/* Demo Notice Banner */}
      <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5 text-xs text-[#4F46E5]">
        <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold">Faculty Academic Dashboard</span>
          <p className="text-[#475569] text-[11px] mt-0.5">
            Logged in as Dr. Sarah Patel (FAC-104). Displaying simulated departmental rosters, live lecture schedules, and submission pipelines.
          </p>
        </div>
      </div>

      {/* Summary Stat Strip - Unified Enterprise Typography */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Students
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalStudentsCount}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Enrolled</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Across 4 teaching cohorts
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Classes Today
              </span>
              <CalendarDays className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {schedule.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Sessions</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Lectures & practical labs
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Pending Assignments
              </span>
              <FileText className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {assignmentCount}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Awaiting</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Submissions awaiting review
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Attendance to Complete
              </span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                2
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Classes</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              CS-301L and CS-403 afternoon
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Quick Academic Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/teacher/students"
            className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/60 border border-indigo-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-indigo-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-indigo-900 tracking-wide block truncate">
                  View Students
                </span>
                <span className="text-xs text-indigo-700 font-medium block truncate mt-0.5">
                  Student directory
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>

          <Link
            to="/teacher/attendance"
            className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/60 border border-emerald-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-emerald-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <CalendarCheck className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-emerald-900 tracking-wide block truncate">
                  Mark Attendance
                </span>
                <span className="text-xs text-emerald-700 font-medium block truncate mt-0.5">
                  Record daily roll call
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>

          <Link
            to="/teacher/assignments"
            className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/60 border border-blue-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-blue-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-blue-900 tracking-wide block truncate">
                  Create Assignment
                </span>
                <span className="text-xs text-blue-700 font-medium block truncate mt-0.5">
                  Publish coursework
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-blue-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>

          <Link
            to="/teacher/assignments"
            className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-amber-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-amber-900 tracking-wide block truncate">
                  View Assignments
                </span>
                <span className="text-xs text-amber-700 font-medium block truncate mt-0.5">
                  Review & grade
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (2 cols on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4.5 w-4.5 text-[#4F46E5]" />
              <h2 className="text-sm font-bold text-[#0F172A]">Today's Teaching Schedule</h2>
            </div>
            <span className="text-xs font-medium text-[#64748B]">
              Wednesday • 4 Sessions
            </span>
          </div>

          {schedule.length === 0 ? (
            <EmptyState
              title="No scheduled lectures today"
              description="You have no classes assigned for today. Use this time for office hours or research."
            />
          ) : (
            <div className="space-y-3">
              {schedule.map((slot) => {
                const isCompleted = slot.status === 'Completed';
                const isInProgress = slot.status === 'In Progress';

                return (
                  <div
                    key={slot.id}
                    className={`p-3.5 rounded-lg border transition-all ${
                      isInProgress
                        ? 'bg-indigo-50/40 border-indigo-200 shadow-xs'
                        : isCompleted
                        ? 'bg-[#F8FAFC] border-[#E2E8F0]'
                        : 'bg-white border-[#E2E8F0] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-[#0F172A]">
                            {slot.subject}
                          </h3>
                          <span
                            className={`text-xs font-semibold ${
                              isCompleted
                                ? 'text-slate-500'
                                : isInProgress
                                ? 'text-[#4F46E5]'
                                : 'text-amber-700'
                            }`}
                          >
                            {slot.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#475569]">
                          {slot.course} • {slot.semester} ({slot.section})
                        </p>
                      </div>

                      <div className="flex items-center gap-3 sm:text-right shrink-0">
                        <div className="text-[11px] text-[#64748B]">
                          <div className="flex items-center gap-1 sm:justify-end font-semibold text-[#0F172A]">
                            <Clock className="h-3 w-3 text-[#4F46E5]" />
                            <span>{slot.startTime} – {slot.endTime}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:justify-end text-[10px]">
                            <MapPin className="h-3 w-3 text-[#64748B]" />
                            <span>{slot.classroom}</span>
                          </div>
                        </div>

                        <div>
                          {slot.attendanceTaken ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D]">
                              <CheckCircle2 className="h-3 w-3" />
                              Recorded
                            </span>
                          ) : (
                            <Link to="/teacher/attendance">
                              <Button
                                size="sm"
                                variant={isInProgress ? 'primary' : 'outline'}
                                className="text-[10px] py-1 px-2.5"
                              >
                                Take Roll
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span>Room keys and audiovisual support: Academic Block A Desk</span>
            <Link
              to="/teacher/attendance"
              className="font-semibold text-[#4F46E5] hover:text-[#4338CA] inline-flex items-center gap-1"
            >
              <span>Manage all attendance</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Pending Tasks Panel */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4.5 w-4.5 text-[#4F46E5]" />
              <h2 className="text-sm font-bold text-[#0F172A]">Pending Tasks</h2>
            </div>
            <span className="text-[11px] font-semibold text-[#B45309]">
              {tasks.length} Action Items
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <Link
                key={task.id}
                to={task.link}
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50 transition-colors block group"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors leading-snug">
                    {task.title}
                  </span>
                  <Badge
                    variant={
                      task.priority === 'High'
                        ? 'error'
                        : task.priority === 'Medium'
                        ? 'warning'
                        : 'neutral'
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-[#64748B]">
                  <span className="uppercase font-medium tracking-wider">
                    {task.category}
                  </span>
                  <span>Due: {task.due}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] text-center">
            <span className="text-[11px] text-[#64748B]">
              All items are synchronized with your academic term roster.
            </span>
          </div>
        </div>
      </div>

      {/* Recent Academic Activity Feed */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4.5 w-4.5 text-[#4F46E5]" />
            <h2 className="text-sm font-bold text-[#0F172A]">Recent Academic Activity</h2>
          </div>
          <span className="text-xs text-[#64748B]">Simulated system timeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {activities.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                  <span className="font-semibold uppercase tracking-wider text-[#4F46E5]">
                    {item.category}
                  </span>
                  <span>{item.timestamp}</span>
                </div>
                <h3 className="text-xs font-bold text-[#0F172A] mt-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#475569] leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
