import { useState, useMemo } from 'react';
import {
  Wrench,
  Eye,
  PlusCircle,
  CheckCircle2,
  RotateCcw,
  MapPin,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import RequestDetailsModal from '../../components/staff/RequestDetailsModal';
import RequestResolutionModal from '../../components/staff/RequestResolutionModal';
import CreateTaskFromRequestModal from '../../components/staff/CreateTaskFromRequestModal';
import {
  initialStaffRequests,
  initialStaffTasks,
  staffRequestCategories,
  staffCampusLocations,
} from '../../data/mockData';

export default function StaffMaintenance() {
  // Load requests from localStorage or mock data
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('campus360_staff_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStaffRequests;
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');

  // Modals state
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [resolveRequest, setResolveRequest] = useState(null);
  const [createTaskRequest, setCreateTaskRequest] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 4500);
  };

  const persistRequests = (updated) => {
    setRequests(updated);
    localStorage.setItem('campus360_staff_requests', JSON.stringify(updated));
  };

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        req.title.toLowerCase().includes(term) ||
        req.id.toLowerCase().includes(term) ||
        req.description.toLowerCase().includes(term) ||
        req.location.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'ALL' || req.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'ALL' || req.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === 'ALL' || req.category === categoryFilter;

      const matchesLocation =
        locationFilter === 'ALL' || req.location === locationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory &&
        matchesLocation
      );
    });
  }, [requests, searchTerm, statusFilter, priorityFilter, categoryFilter, locationFilter]);

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

  // Direct workflow status update (e.g. Submitted -> Assigned, Assigned -> In Progress)
  const handleUpdateStatus = (requestId, newStatus) => {
    const updated = requests.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: newStatus,
          assignedStaffId: r.assignedStaffId || 'STF-029',
          assignedStaffName: r.assignedStaffName || 'Michael Chen',
        };
      }
      return r;
    });

    persistRequests(updated);

    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: newStatus,
        assignedStaffName: prev.assignedStaffName || 'Michael Chen',
      }));
    }

    showNotification(`Request ${requestId} advanced to "${newStatus}".`);
  };

  // Resolve request with required notes
  const handleSaveResolution = ({ requestId, resolutionNotes, resolvedDate }) => {
    const updated = requests.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'Resolved',
          resolutionNotes,
          resolvedDate,
        };
      }
      return r;
    });

    persistRequests(updated);

    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: 'Resolved',
        resolutionNotes,
        resolvedDate,
      }));
    }

    setResolveRequest(null);
    showNotification(`Maintenance request ${requestId} marked as Resolved.`);
  };

  // Convert request to an assigned task
  const handleCreateTaskFromRequest = (taskData) => {
    // 1. Load current tasks from localStorage
    let currentTasks = initialStaffTasks;
    const savedTasks = localStorage.getItem('campus360_staff_tasks');
    if (savedTasks) {
      try {
        currentTasks = JSON.parse(savedTasks);
      } catch {
        // fallback
      }
    }

    // 2. Prevent duplicate task for same request
    const existingTask = currentTasks.find((t) => t.relatedRequestId === taskData.requestId);
    if (existingTask) {
      showNotification(`Task ${existingTask.id} already exists for this request.`);
      setCreateTaskRequest(null);
      return;
    }

    // 3. Create new task
    const nextTaskId = `TSK-2026-0${currentTasks.length + 41}`;
    const newTask = {
      id: nextTaskId,
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      location: taskData.location,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      status: 'Assigned',
      assignedStaffId: 'STF-029',
      assignedStaffName: 'Michael Chen',
      relatedRequestId: taskData.requestId,
      instructions: taskData.instructions || '',
      completionNotes: null,
    };

    const updatedTasks = [newTask, ...currentTasks];
    localStorage.setItem('campus360_staff_tasks', JSON.stringify(updatedTasks));

    // 4. Update request status to 'Assigned' and link relatedTaskId
    const updatedRequests = requests.map((r) => {
      if (r.id === taskData.requestId) {
        return {
          ...r,
          status: 'Assigned',
          assignedStaffId: 'STF-029',
          assignedStaffName: 'Michael Chen',
          relatedTaskId: nextTaskId,
        };
      }
      return r;
    });

    persistRequests(updatedRequests);

    if (selectedRequest && selectedRequest.id === taskData.requestId) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: 'Assigned',
        assignedStaffName: 'Michael Chen',
        relatedTaskId: nextTaskId,
      }));
    }

    setCreateTaskRequest(null);
    showNotification(`Task ${nextTaskId} successfully dispatched from Ticket ${taskData.requestId}!`);
  };

  const getPriorityBadgeVariant = (priority) => {
    if (priority === 'High') return 'error';
    if (priority === 'Medium') return 'warning';
    return 'neutral';
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'Resolved') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'Assigned') return 'info';
    return 'warning';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Campus Maintenance Requests"
        description="Review facility malfunction reports, student complaints, and convert actionable tickets into staff work orders."
        breadcrumbs={[
          { label: 'Maintenance Portal', path: '/staff/dashboard' },
          { label: 'Maintenance Requests' },
        ]}
        badge={
          <Badge variant="primary" dot>
            {filteredRequests.length} Incident Tickets
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

      {/* Facilities Incident Metrics - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Incident Reports
              </span>
              <Wrench className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {requests.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Tickets</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Reported campus faults
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Awaiting Assignment
              </span>
              <AlertTriangle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {requests.filter((r) => r.status === 'Submitted').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Unassigned</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Needs triage & dispatch
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Under Repair
              </span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {requests.filter((r) => r.status === 'In Progress' || r.status === 'Assigned').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Active</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Technicians assigned
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Resolved Tickets
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {requests.filter((r) => r.status === 'Resolved').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Fixed</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Fully completed & closed
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search tickets by ID, title, or keywords..."
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

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#E2E8F0] text-xs">
          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] text-[11px]">
              Ticket Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted (Awaiting Review)</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
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
              {staffRequestCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] text-[11px]">
              Campus Location
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

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No maintenance requests match your criteria"
          description="Try broadening your search query or reset your category, status, and location filters."
          icon={Wrench}
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <caption className="sr-only">Campus Maintenance Requests Table</caption>
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-3.5">
                    Ticket ID
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Request Title & Issue
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Category & Location
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Reported Date
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
                {filteredRequests.map((req) => {
                  const isSubmitted = req.status === 'Submitted';
                  const isResolved = req.status === 'Resolved';
                  const hasLinkedTask = Boolean(req.relatedTaskId);

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-medium text-[#64748B]">
                        {req.id}
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="max-w-xs sm:max-w-sm">
                          <span className="font-bold text-[#0F172A] block leading-tight">
                            {req.title}
                          </span>
                          <span className="text-[11px] text-[#475569] line-clamp-1 mt-0.5">
                            {req.description}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-medium text-[#0F172A] block">
                          {req.category}
                        </span>
                        <span className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-[#4F46E5] shrink-0" />
                          <span className="truncate max-w-[170px]">{req.location}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-[#64748B] text-[11px]">
                        {req.reportedDate}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`text-xs font-semibold ${
                            req.priority === 'High'
                              ? 'text-rose-600'
                              : req.priority === 'Medium'
                              ? 'text-amber-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {req.priority}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`text-xs font-semibold ${
                            req.status === 'Resolved'
                              ? 'text-emerald-600'
                              : req.status === 'In Progress'
                              ? 'text-[#4F46E5]'
                              : req.status === 'Assigned'
                              ? 'text-blue-600'
                              : 'text-amber-700'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td
                        className="px-4 py-3.5 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          {isSubmitted && !hasLinkedTask && (
                            <Button
                              size="sm"
                              variant="primary"
                              className="text-[11px] py-1 px-2.5"
                              icon={PlusCircle}
                              onClick={() => setCreateTaskRequest(req)}
                            >
                              Create Task
                            </Button>
                          )}

                          {!isResolved && (
                            <Button
                              size="sm"
                              variant="outline"
                              icon={Eye}
                              className="text-xs py-1 px-2.5"
                              onClick={() => setSelectedRequest(req)}
                            >
                              Details
                            </Button>
                          )}

                          {isResolved && (
                            <Button
                              size="sm"
                              variant="ghost"
                              icon={Eye}
                              className="text-xs py-1 px-2 text-[#15803D]"
                              onClick={() => setSelectedRequest(req)}
                            >
                              View Resolution
                            </Button>
                          )}
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
              Showing {filteredRequests.length} of {requests.length} maintenance tickets
            </span>
            <span className="text-[11px]">
              Submitted tickets can be directly converted into work orders with assigned staff.
            </span>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      <RequestDetailsModal
        isOpen={Boolean(selectedRequest)}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        onUpdateStatus={handleUpdateStatus}
        onOpenResolveModal={(req) => setResolveRequest(req)}
        onOpenCreateTask={(req) => setCreateTaskRequest(req)}
      />

      {/* Resolve Request Modal */}
      <RequestResolutionModal
        isOpen={Boolean(resolveRequest)}
        onClose={() => setResolveRequest(null)}
        request={resolveRequest}
        onSaveResolution={handleSaveResolution}
      />

      {/* Create Task from Request Modal */}
      <CreateTaskFromRequestModal
        isOpen={Boolean(createTaskRequest)}
        onClose={() => setCreateTaskRequest(null)}
        request={createTaskRequest}
        onCreateTask={handleCreateTaskFromRequest}
      />
    </div>
  );
}
