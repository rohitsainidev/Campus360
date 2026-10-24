import { useState, useMemo } from 'react';
import {
  AlertCircle,
  Eye,
  UserCheck,
  CheckCircle2,
  Clock,
  RotateCcw,
  MapPin,
  Tag,
  Wrench,
  FileCheck,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import {
  initialStaffRequests,
  staffRequestCategories,
  staffCampusLocations,
  initialAdminUsers,
} from '../../data/mockData';

// Subcomponent for Assigning Staff / Updating Priority Modal
function AssignComplaintModalBody({ complaint, staffMembers, onSave, onCancel }) {
  const [assignedStaffId, setAssignedStaffId] = useState(complaint.assignedStaffId || '');
  const [priority, setPriority] = useState(complaint.priority || 'Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedStaff = staffMembers.find((s) => s.id === assignedStaffId);
    onSave({
      ...complaint,
      assignedStaffId: selectedStaff ? selectedStaff.id : '',
      assignedStaffName: selectedStaff ? selectedStaff.name : 'Unassigned',
      priority,
      status: selectedStaff ? (complaint.status === 'Submitted' ? 'In Progress' : complaint.status) : complaint.status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <h4 className="text-xs font-bold text-[#64748B] uppercase">Complaint</h4>
        <p className="text-sm font-bold text-[#0F172A] mt-0.5">{complaint.title}</p>
        <p className="text-xs text-[#475569] mt-0.5 font-mono">{complaint.id} • {complaint.location}</p>
      </div>

      <div className="pt-2">
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Assign Maintenance Staff / Technician
        </label>
        <select
          value={assignedStaffId}
          onChange={(e) => setAssignedStaffId(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
        >
          <option value="">-- Leave Unassigned --</option>
          {staffMembers.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name} ({staff.id}) - Facilities
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Update Ticket Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-[11px] text-[#64748B]">
        Assigning staff synchronizes this ticket with the assigned technician&apos;s active tasks in the Maintenance Staff Portal.
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Assignment
        </Button>
      </div>
    </form>
  );
}

// Subcomponent for Resolving Complaint Modal with Notes
function ResolveComplaintModalBody({ complaint, onSave, onCancel }) {
  const [resolutionNotes, setResolutionNotes] = useState(complaint.resolutionNotes || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resolutionNotes.trim()) {
      setError('Resolution notes are required to mark a complaint as resolved.');
      return;
    }

    onSave({
      ...complaint,
      status: 'Resolved',
      resolutionNotes: resolutionNotes.trim(),
      resolvedDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <h4 className="text-xs font-bold text-[#64748B] uppercase">Resolve Complaint</h4>
        <p className="text-sm font-bold text-[#0F172A] mt-0.5">{complaint.title}</p>
        <p className="text-xs text-[#475569] mt-0.5 font-mono">{complaint.id}</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Resolution Details & Field Work Summary <span className="text-[#DC2626]">*</span>
        </label>
        <textarea
          rows={4}
          value={resolutionNotes}
          onChange={(e) => {
            setResolutionNotes(e.target.value);
            if (error) setError('');
          }}
          placeholder="Explain the inspection findings, parts repaired or replaced, and resolution verification..."
          className={`w-full px-3 py-2 text-xs rounded-md border ${
            error ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
          } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
        />
        {error && <p className="text-[11px] text-[#DC2626] mt-1">{error}</p>}
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="success" type="submit">
          Confirm Resolution
        </Button>
      </div>
    </form>
  );
}

export default function AdminComplaints() {
  // Shared complaints store with Maintenance Staff portal
  const [complaints, setComplaints] = useState(() => {
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

  // Load maintenance staff users for assignment
  const maintenanceStaff = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_users');
    let userList = initialAdminUsers;
    if (saved) {
      try {
        userList = JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return userList.filter((u) => u.role === 'Maintenance Staff');
  }, []);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');

  // Modals
  const [viewingComplaint, setViewingComplaint] = useState(null);
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [resolvingComplaint, setResolvingComplaint] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const saveComplaints = (updated) => {
    setComplaints(updated);
    localStorage.setItem('campus360_staff_requests', JSON.stringify(updated));
  };

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 4000);
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === 'ALL' || c.category === categoryFilter;
      const matchesPriority =
        priorityFilter === 'ALL' || c.priority === priorityFilter;
      const matchesStatus =
        statusFilter === 'ALL' || c.status === statusFilter;
      const matchesLocation =
        locationFilter === 'ALL' || c.location === locationFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus &&
        matchesLocation
      );
    });
  }, [complaints, searchTerm, categoryFilter, priorityFilter, statusFilter, locationFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(filteredComplaints.length / pageSize) || 1;

  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredComplaints.slice(start, start + pageSize);
  }, [filteredComplaints, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('ALL');
    setPriorityFilter('ALL');
    setStatusFilter('ALL');
    setLocationFilter('ALL');
    setCurrentPage(1);
  };

  const handleSaveAssignment = (updatedTicket) => {
    const updated = complaints.map((c) =>
      c.id === updatedTicket.id ? updatedTicket : c
    );
    saveComplaints(updated);
    setAssigningComplaint(null);
    showNotification(`Ticket ${updatedTicket.id} updated. Staff assigned: ${updatedTicket.assignedStaffName}.`);
  };

  const handleSaveResolution = (resolvedTicket) => {
    const updated = complaints.map((c) =>
      c.id === resolvedTicket.id ? resolvedTicket : c
    );
    saveComplaints(updated);
    setResolvingComplaint(null);
    showNotification(`Ticket ${resolvedTicket.id} marked as Resolved.`);
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'Urgent':
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'Assigned':
        return 'info';
      case 'Submitted':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Complaints Management"
        description="Unified desk for triaging, assigning and resolving facility grievances, hostel issues and campus tickets."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'Complaints' },
        ]}
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5CAC32]" />
            {complaints.length} Total Complaints
          </span>
        }
      />

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search complaint ID or issue keywords..."
          />
        </div>

        {/* Multi-Filter Row */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium"
            >
              <option value="ALL">All Categories</option>
              {staffRequestCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-medium">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium"
            >
              <option value="ALL">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-medium">Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:ring-1 focus:ring-[#5CAC32] max-w-[180px] truncate font-medium"
            >
              <option value="ALL">All Locations</option>
              {staffCampusLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || categoryFilter !== 'ALL' || priorityFilter !== 'ALL' || statusFilter !== 'ALL' || locationFilter !== 'ALL') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#0F172A] underline font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredComplaints.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={AlertCircle}
              title="No Complaints Found"
              description="No tickets match your specified search term or filter parameters."
              action={
                <Button variant="outline" size="sm" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div>
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[1020px]">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Ticket ID</th>
                    <th className="py-3.5 px-4 min-w-[260px]">Issue & Location</th>
                    <th className="py-3.5 px-4 min-w-[180px]">Submitted By</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Priority</th>
                    <th className="py-3.5 px-4 min-w-[160px]">Assigned Staff</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                  {paginatedComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 pl-6 pr-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium text-[11px] border border-slate-200/80 inline-block">
                          {c.id}
                        </span>
                      </td>
                      <td className="py-4 px-4 min-w-[260px]" title={c.title}>
                        <div className="font-semibold text-[#0F172A] truncate text-xs">{c.title}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                          <span className="font-medium text-slate-600">{c.category}</span>
                          <span>•</span>
                          <span className="truncate">{c.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 min-w-[180px]">
                        <div className="font-medium text-slate-800 text-xs truncate">
                          {c.submittedByName || c.submittedBy?.split('(')[0]?.trim() || 'Alex Johnson'}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                          {c.submittedById || c.submittedBy?.match(/\((.*?)\)/)?.[1] || 'STU-2026-081'} • {c.reportedDate}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              c.priority === 'Urgent' || c.priority === 'High'
                                ? 'bg-rose-500'
                                : c.priority === 'Medium'
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                            }`}
                          />
                          <span>{c.priority}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 min-w-[160px]">
                        {c.assignedStaffName ? (
                          <span className="text-slate-700 font-medium text-xs truncate block">
                            {c.assignedStaffName}
                          </span>
                        ) : (
                          <span className="text-amber-600 italic text-[11px] font-medium">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              c.status === 'Resolved'
                                ? 'bg-emerald-500'
                                : c.status === 'In Progress' || c.status === 'Assigned'
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                            }`}
                          />
                          <span>{c.status}</span>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingComplaint(c)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          {c.status !== 'Resolved' && (
                            <>
                              <button
                                type="button"
                                onClick={() => setAssigningComplaint(c)}
                                className="p-1.5 rounded-md text-slate-400 hover:text-[#5CAC32] hover:bg-[#5CAC32]/10 transition-colors"
                                title="Assign Staff / Priority"
                              >
                                <UserCheck className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setResolvingComplaint(c)}
                                className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Mark as Resolved"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Creative Mobile Responsive Card Feed */}
            <div className="block md:hidden divide-y divide-slate-100">
              {paginatedComplaints.map((c) => (
                <div key={c.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-[#5CAC32] bg-[#5CAC32]/10 px-2 py-0.5 rounded border border-[#5CAC32]/20">
                        {c.id}
                      </span>
                      <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            c.priority === 'Urgent' || c.priority === 'High'
                              ? 'bg-rose-500'
                              : c.priority === 'Medium'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {c.priority}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          c.status === 'Resolved'
                            ? 'bg-emerald-500'
                            : c.status === 'In Progress' || c.status === 'Assigned'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      <span className="font-medium">{c.status}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {c.category} • {c.location}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Submitted By</span>
                      <span className="font-medium text-slate-800">{c.submittedByName || 'Student'}</span>
                      <span className="text-[10px] text-slate-400 block">{c.reportedDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned To</span>
                      {c.assignedStaffName ? (
                        <span className="font-medium text-slate-800">{c.assignedStaffName}</span>
                      ) : (
                        <span className="text-amber-600 font-medium italic text-[11px]">Unassigned</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setViewingComplaint(c)}
                      className="px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>
                    {c.status !== 'Resolved' && (
                      <>
                        <button
                          type="button"
                          onClick={() => setAssigningComplaint(c)}
                          className="px-2.5 py-1.5 rounded-md bg-[#5CAC32]/10 hover:bg-[#5CAC32]/20 text-[#4B9228] text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          <span>Assign</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setResolvingComplaint(c)}
                          className="px-2.5 py-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Resolve</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Enterprise Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredComplaints.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              itemName="complaints"
            />
          </div>
        )}
      </div>

      {/* Complaint Details Modal */}
      <Modal
        isOpen={Boolean(viewingComplaint)}
        onClose={() => setViewingComplaint(null)}
        title="Complaint Ticket Details"
        maxWidth="max-w-lg"
      >
        {viewingComplaint && (
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="font-mono text-xs font-bold text-[#5CAC32]">
                  {viewingComplaint.id}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-1">
                  {viewingComplaint.title}
                </h3>
              </div>
              <Badge variant={getStatusBadgeVariant(viewingComplaint.status)}>
                {viewingComplaint.status}
              </Badge>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#64748B] uppercase">Description</h4>
              <p className="text-xs text-[#0F172A] mt-1 p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0] leading-relaxed">
                {viewingComplaint.description || 'No detailed issue description entered.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Submitted By</span>
                <span className="font-semibold text-[#0F172A]">
                  {viewingComplaint.submittedBy || 'Alex Johnson (STU-2026-081)'}
                </span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Reported Date</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#64748B]" />
                  {viewingComplaint.reportedDate}
                </span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Category</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-[#64748B]" />
                  {viewingComplaint.category}
                </span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Location</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#64748B]" />
                  {viewingComplaint.location}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Assigned Staff</span>
                <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                  <Wrench className="h-3.5 w-3.5 text-[#5CAC32]" />
                  {viewingComplaint.assignedStaffName || 'Unassigned'}
                </span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Linked Maintenance Task</span>
                <span className="font-mono font-semibold text-[#5CAC32]">
                  {viewingComplaint.relatedTaskId || 'None Linked'}
                </span>
              </div>
            </div>

            {viewingComplaint.status === 'Resolved' && (
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs">
                <span className="text-[#15803D] font-bold block mb-1 flex items-center gap-1">
                  <FileCheck className="h-4 w-4" />
                  Resolution Summary ({viewingComplaint.resolvedDate || 'Verified'})
                </span>
                <p className="text-[#15803D] leading-relaxed">
                  {viewingComplaint.resolutionNotes || 'Technician completed repair and certified site.'}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-[#E2E8F0]">
              <Button variant="outline" onClick={() => setViewingComplaint(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Staff Modal */}
      <Modal
        isOpen={Boolean(assigningComplaint)}
        onClose={() => setAssigningComplaint(null)}
        title="Assign Staff / Update Priority"
        maxWidth="max-w-md"
      >
        {assigningComplaint && (
          <AssignComplaintModalBody
            key={assigningComplaint.id}
            complaint={assigningComplaint}
            staffMembers={maintenanceStaff}
            onSave={handleSaveAssignment}
            onCancel={() => setAssigningComplaint(null)}
          />
        )}
      </Modal>

      {/* Resolve Complaint Modal */}
      <Modal
        isOpen={Boolean(resolvingComplaint)}
        onClose={() => setResolvingComplaint(null)}
        title="Resolve Complaint Ticket"
        maxWidth="max-w-md"
      >
        {resolvingComplaint && (
          <ResolveComplaintModalBody
            key={resolvingComplaint.id}
            complaint={resolvingComplaint}
            onSave={handleSaveResolution}
            onCancel={() => setResolvingComplaint(null)}
          />
        )}
      </Modal>
    </div>
  );
}
