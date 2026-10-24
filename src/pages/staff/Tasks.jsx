import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckSquare,
  RotateCcw,
  Eye,
  CheckCircle2,
  MapPin,
  Clock,
  Wrench,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import TaskDetailsModal from '../../components/staff/TaskDetailsModal';
import TaskCompletionModal from '../../components/staff/TaskCompletionModal';
import {
  initialStaffTasks,
  staffTaskCategories,
  staffCampusLocations,
} from '../../data/mockData';

export default function StaffTasks() {
  const [searchParams] = useSearchParams();

  // Load tasks from localStorage or mock data
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

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState(() => {
    return searchParams.get('priority') || 'ALL';
  });
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');

  // Modals state
  const [selectedTask, setSelectedTask] = useState(null);
  const [completionTask, setCompletionTask] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 4500);
  };

  const persistTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem('campus360_staff_tasks', JSON.stringify(updated));
  };

  // Combined search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        task.id.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.location.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'ALL' || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'ALL' || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'ALL' || task.category === categoryFilter;

      const matchesLocation =
        locationFilter === 'ALL' || task.location === locationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory &&
        matchesLocation
      );
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter, locationFilter]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL' ||
    categoryFilter !== 'ALL' ||
    locationFilter !== 'ALL';

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setCategoryFilter('ALL');
    setLocationFilter('ALL');
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    });

    persistTasks(updated);

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => ({ ...prev, status: newStatus }));
    }

    showNotification(`Task ${taskId} status transitioned to "${newStatus}".`);
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

    persistTasks(updated);

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => ({
        ...prev,
        status: 'Completed',
        completionNotes,
      }));
    }

    setCompletionTask(null);
    showNotification(`Task ${taskId} marked as completed with verification report.`);
  };

  const getPriorityBadgeVariant = (priority) => {
    if (priority === 'High') return 'error';
    if (priority === 'Medium') return 'warning';
    return 'neutral';
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'On Hold') return 'warning';
    return 'info';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Assigned Maintenance Tasks"
        description="Active campus work orders, facilities repair dispatches, and infrastructure operations."
        breadcrumbs={[
          { label: 'Maintenance Portal', path: '/staff/dashboard' },
          { label: 'Assigned Tasks' },
        ]}
        badge={
          <Badge variant="primary" dot>
            {filteredTasks.length} Work Orders
          </Badge>
        }
      />

      {/* Success Notification */}
      {feedbackMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="font-semibold">{feedbackMessage}</span>
        </div>
      )}

      {/* Task Operations Metrics - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Assigned Tasks
              </span>
              <CheckSquare className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {tasks.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Orders</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Allocated work tickets
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
                {tasks.filter((t) => t.status === 'Assigned').length}
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
                Active In Progress
              </span>
              <Wrench className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {tasks.filter((t) => t.status === 'In Progress').length}
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
                Completed & Verified
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {tasks.filter((t) => t.status === 'Completed').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Resolved</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Signed off work orders
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search Panel */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search tasks by ID, title, or keywords..."
            className="max-w-md"
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={handleResetFilters}
              className="text-xs text-[#DC2626] hover:bg-red-50"
            >
              Reset All Filters
            </Button>
          )}
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#E2E8F0] text-xs">
          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] text-[11px]">
              Task Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] text-[11px]">
              Priority Level
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] text-[11px]">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Categories</option>
              {staffTaskCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] text-[11px]">
              Campus Zone / Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Locations</option>
              {staffCampusLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task List Table */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No maintenance tasks match your criteria"
          description="Try broadening your search query or reset your status, priority, and location filters."
          icon={CheckSquare}
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <caption className="sr-only">Assigned Maintenance Tasks</caption>
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-3.5">
                    Task ID
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Task Title & Description
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Category & Location
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Timeline
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center">
                    Priority
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                {filteredTasks.map((task) => {
                  const isCompleted = task.status === 'Completed';
                  const isInProgress = task.status === 'In Progress';
                  const isAssigned = task.status === 'Assigned';

                  return (
                    <tr
                      key={task.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedTask(task)}
                    >
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-medium text-[#64748B]">
                        {task.id}
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="max-w-xs sm:max-w-sm">
                          <span className="font-bold text-[#0F172A] block leading-tight">
                            {task.title}
                          </span>
                          <span className="text-[11px] text-[#475569] line-clamp-1 mt-0.5">
                            {task.description}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-medium text-[#0F172A] block">
                          {task.category}
                        </span>
                        <span className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-[#4F46E5] shrink-0" />
                          <span className="truncate max-w-[170px]">{task.location}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-[#64748B] text-[11px]">
                        <div>Assigned: {task.assignedDate}</div>
                        <div className="font-semibold text-[#DC2626]">Due: {task.dueDate}</div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`text-xs font-semibold ${
                            task.priority === 'High'
                              ? 'text-rose-600'
                              : task.priority === 'Medium'
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`text-xs font-semibold ${
                            task.status === 'Completed'
                              ? 'text-emerald-600'
                              : task.status === 'In Progress'
                              ? 'text-[#4F46E5]'
                              : task.status === 'On Hold'
                              ? 'text-slate-500'
                              : 'text-amber-700'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td
                        className="px-4 py-3.5 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          {!isCompleted && isAssigned && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[11px] py-1 px-2 text-[#4F46E5] hover:bg-indigo-50"
                              onClick={() => handleUpdateStatus(task.id, 'In Progress')}
                            >
                              Start
                            </Button>
                          )}

                          {!isCompleted && isInProgress && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-[11px] py-1 px-2 text-[#15803D] hover:bg-emerald-50"
                              onClick={() => setCompletionTask(task)}
                            >
                              Complete
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            icon={Eye}
                            className="text-xs py-1 px-2.5"
                            onClick={() => setSelectedTask(task)}
                          >
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
            <span>
              Showing {filteredTasks.length} of {tasks.length} maintenance work orders
            </span>
            <span className="text-[11px]">
              Click any task row to view instructions, change status, or inspect completion notes.
            </span>
          </div>
        </div>
      )}

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
