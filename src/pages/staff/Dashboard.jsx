import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/ui/EmptyState';
import TaskDetailsModal from '../../components/staff/TaskDetailsModal';
import TaskCompletionModal from '../../components/staff/TaskCompletionModal';
import {
  initialStaffProfile,
  initialStaffTasks,
  staffRecentActivities,
} from '../../data/mockData';

export default function StaffDashboard() {
  const [profile] = useState(initialStaffProfile);

  // Synchronize tasks with localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('campus360_staff_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStaffTasks;
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [completionTask, setCompletionTask] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Mathematically consistent dynamic metrics
  const totalAssigned = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'Assigned').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  // High priority tasks
  const priorityTasks = useMemo(() => {
    return tasks
      .filter((t) => t.priority === 'High' && t.status !== 'Completed')
      .slice(0, 4);
  }, [tasks]);

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 4500);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    });

    setTasks(updated);
    localStorage.setItem('campus360_staff_tasks', JSON.stringify(updated));

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => ({ ...prev, status: newStatus }));
    }

    showNotification(`Task ${taskId} status updated to "${newStatus}".`);
  };

  const handleSaveCompletion = ({ taskId, completionNotes }) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'Completed',
          completionNotes,
        };
      }
      return t;
    });

    setTasks(updated);
    localStorage.setItem('campus360_staff_tasks', JSON.stringify(updated));

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => ({
        ...prev,
        status: 'Completed',
        completionNotes,
      }));
    }

    setCompletionTask(null);
    showNotification(`Task ${taskId} marked as completed with verification notes.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Welcome back, Maintenance Staff"
        description="Review your assigned tasks and keep campus facilities running smoothly."
        badge={
          <Badge variant="primary" dot>
            {profile.name} • {profile.role}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link to="/staff/tasks">
              <Button size="sm" icon={CheckSquare}>
                My Tasks ({totalAssigned})
              </Button>
            </Link>
            <Link to="/staff/maintenance">
              <Button variant="secondary" size="sm" icon={Wrench}>
                Campus Tickets
              </Button>
            </Link>
          </div>
        }
      />

      {/* Demo Feedback Notification */}
      {feedbackMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="font-semibold">{feedbackMessage}</span>
        </div>
      )}

      {/* Demo Context Notice */}
      <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5 text-xs text-[#4F46E5]">
        <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold">Facilities Operations Control Console</span>
          <p className="text-[#475569] text-[11px] mt-0.5">
            Logged in as {profile.name} ({profile.id}). Managing infrastructure across Academic Block A, Aravali Residence, and Central Library.
          </p>
        </div>
      </div>

      {/* Summary Stat Strip - Unified Enterprise Typography */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Assigned Tasks
              </span>
              <CheckSquare className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalAssigned}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Orders</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Active facilities roster
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Pending Dispatch
              </span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {pendingCount}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Pending</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Awaiting technician pickup
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                In Progress
              </span>
              <Wrench className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {inProgressCount}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Active</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Under physical repair
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Completed Tasks
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {completedCount}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Resolved</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Verified and signed off
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Maintenance Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/staff/tasks"
            className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/60 border border-indigo-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-indigo-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <CheckSquare className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-indigo-900 tracking-wide block truncate">
                  View Assigned Tasks
                </span>
                <span className="text-xs text-indigo-700 font-medium block truncate mt-0.5">
                  {totalAssigned} active work orders
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>

          <Link
            to="/staff/maintenance"
            className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/60 border border-emerald-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-emerald-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Wrench className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-emerald-900 tracking-wide block truncate">
                  View Maintenance Requests
                </span>
                <span className="text-xs text-emerald-700 font-medium block truncate mt-0.5">
                  Campus tickets & student complaints
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>

          <Link
            to="/staff/tasks?priority=High"
            className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/80 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-lg bg-amber-600 text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <AlertTriangle className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase text-amber-900 tracking-wide block truncate">
                  Review High-Priority Tasks
                </span>
                <span className="text-xs text-amber-700 font-medium block truncate mt-0.5">
                  {priorityTasks.length} urgent repairs needing attention
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-amber-500 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Priority Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Tasks (2 columns on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-[#DC2626]" />
              <h2 className="text-sm font-bold text-[#0F172A]">High-Priority Work Orders</h2>
            </div>
            <span className="text-xs text-[#64748B] font-medium">
              {priorityTasks.length} urgent items
            </span>
          </div>

          {priorityTasks.length === 0 ? (
            <EmptyState
              title="No high-priority work orders"
              description="All critical maintenance tasks are currently resolved or completed."
            />
          ) : (
            <div className="space-y-3">
              {priorityTasks.map((task) => {
                const isInProgress = task.status === 'In Progress';
                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-lg border transition-all ${
                      isInProgress
                        ? 'bg-indigo-50/40 border-indigo-200 shadow-xs'
                        : 'bg-white border-[#E2E8F0] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-[#64748B] font-semibold">
                            {task.id}
                          </span>
                          <h3 className="text-xs font-bold text-[#0F172A]">
                            {task.title}
                          </h3>
                          <span className="text-xs font-semibold text-rose-600">
                            High
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              isInProgress ? 'text-[#4F46E5]' : 'text-amber-700'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                          <span className="font-medium text-[#475569]">{task.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#4F46E5]" />
                            {task.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right text-[11px] text-[#64748B] hidden sm:block">
                          <span className="block font-medium text-[#DC2626]">
                            Due: {task.dueDate}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          icon={Eye}
                          onClick={() => setSelectedTask(task)}
                          className="text-xs py-1 px-2.5"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span>Safety PPE required in all mechanical plant rooms.</span>
            <Link
              to="/staff/tasks"
              className="font-semibold text-[#4F46E5] hover:text-[#4338CA] inline-flex items-center gap-1"
            >
              <span>Manage all tasks</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-[#4F46E5]" />
              <h2 className="text-sm font-bold text-[#0F172A]">Recent Activity</h2>
            </div>
            <span className="text-[11px] text-[#64748B]">Campus Feed</span>
          </div>

          <div className="space-y-3">
            {staffRecentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold uppercase tracking-wider text-[#4F46E5]">
                    {act.title}
                  </span>
                  <span className="text-[#64748B]">{act.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  {act.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] text-center">
            <span className="text-[11px] text-[#64748B]">
              Logged actions are synchronized with the campus facility desk.
            </span>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onUpdateStatus={handleUpdateStatus}
        onOpenCompleteModal={(task) => {
          setSelectedTask(null);
          setCompletionTask(task);
        }}
      />

      {/* Task Completion Modal */}
      <TaskCompletionModal
        isOpen={Boolean(completionTask)}
        onClose={() => setCompletionTask(null)}
        task={completionTask}
        onSaveCompletion={handleSaveCompletion}
      />
    </div>
  );
}
