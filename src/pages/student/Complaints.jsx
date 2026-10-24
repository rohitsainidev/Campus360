import { useState, useMemo, useEffect } from 'react';
import {
  AlertCircle,
  Plus,
  CheckCircle2,
  Eye,
  Info,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import { initialStudentComplaints } from '../../data/mockData';
import { complaintService } from '../../services/complaintService';

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('campus360_student_complaints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentComplaints;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Submit Complaint Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    category: 'Hostel',
    priority: 'Medium',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [successNotice, setSuccessNotice] = useState('');

  // View Details Modal State
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Load complaints from backend on mount
  useEffect(() => {
    let isMounted = true;
    const fetchComplaints = async () => {
      try {
        const res = await complaintService.getComplaints();
        if (isMounted && res.complaints && res.complaints.length > 0) {
          const formatted = res.complaints.map((c) => ({
            id: c.ticketId || c._id,
            title: c.title,
            category: c.category,
            priority: c.priority,
            status: c.status,
            submissionDate: new Date(c.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            lastUpdated: new Date(c.updatedAt || c.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            description: c.description,
            resolutionNotes: c.resolutionNotes,
          }));
          setComplaints(formatted);
          localStorage.setItem('campus360_student_complaints', JSON.stringify(formatted));
        }
      } catch (err) {
        // Fallback already in local state
      }
    };
    fetchComplaints();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    'Hostel',
    'Maintenance',
    'Electricity',
    'Water Supply',
    'Cleanliness',
    'Classroom',
    'Other',
  ];

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'ALL' ? true : c.status === statusFilter;
      const matchesCat =
        categoryFilter === 'ALL' ? true : c.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCat;
    });
  }, [complaints, searchTerm, statusFilter, categoryFilter]);

  const validate = () => {
    const errs = {};
    if (!newComplaint.title.trim()) errs.title = 'Complaint subject/title is required.';
    if (!newComplaint.description.trim())
      errs.description = 'Detailed description is required.';
    return errs;
  };

  const handleCreateComplaint = async (e) => {
    e.preventDefault();
    const errs = validate();
    setFormErrors(errs);

    if (Object.keys(errs).length === 0) {
      let createdEntry = null;

      try {
        const res = await complaintService.createComplaint({
          title: newComplaint.title.trim(),
          category: newComplaint.category,
          priority: newComplaint.priority,
          description: newComplaint.description.trim(),
        });

        if (res.complaint) {
          const c = res.complaint;
          createdEntry = {
            id: c.ticketId || c._id,
            title: c.title,
            category: c.category,
            priority: c.priority,
            status: c.status,
            submissionDate: new Date(c.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            lastUpdated: new Date(c.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            description: c.description,
          };
        }
      } catch (apiErr) {
        console.warn('Backend complaint creation failed, saving locally:', apiErr);
      }

      const generatedId = createdEntry?.id || `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      const entry = createdEntry || {
        id: generatedId,
        title: newComplaint.title.trim(),
        category: newComplaint.category,
        priority: newComplaint.priority,
        status: 'Submitted',
        submissionDate: currentDate,
        lastUpdated: currentDate,
        description: newComplaint.description.trim(),
      };

      const updated = [entry, ...complaints];
      setComplaints(updated);
      localStorage.setItem('campus360_student_complaints', JSON.stringify(updated));

      setIsSubmitModalOpen(false);
      setNewComplaint({
        title: '',
        category: 'Hostel',
        priority: 'Medium',
        description: '',
      });
      setSuccessNotice(`Ticket ${entry.id} logged successfully on campus system.`);
      setTimeout(() => setSuccessNotice(''), 4500);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Grievance & Complaint Desk"
        description="Formal grievance lodging for hostel, electrical, classroom and campus facility upkeep."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Complaints' },
        ]}
        badge={<Badge variant="info">Service SLA: 24-48h</Badge>}
        actions={
          <Button
            size="sm"
            icon={Plus}
            onClick={() => {
              setFormErrors({});
              setIsSubmitModalOpen(true);
            }}
          >
            Submit Complaint
          </Button>
        }
      />

      {successNotice && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder="Search complaints by ID, title, or keywords..."
        />

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#64748B] font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] rounded-md border border-[#E2E8F0]">
            {['ALL', 'Submitted', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  statusFilter === st
                    ? 'bg-white text-[#4F46E5] shadow-xs border border-[#E2E8F0]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      {filteredComplaints.length === 0 ? (
        <EmptyState
          title="No complaints logged"
          description="There are no grievances matching your active filter criteria."
          icon={AlertCircle}
          actionLabel="Submit New Complaint"
          onAction={() => setIsSubmitModalOpen(true)}
        />
      ) : (
        <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3">Ticket ID</th>
                  <th className="px-5 py-3">Subject / Issue</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                {filteredComplaints.map((cmp) => (
                  <tr key={cmp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-semibold text-[#4F46E5]">
                      {cmp.id}
                    </td>
                    <td className="px-5 py-3.5 font-medium max-w-xs truncate">
                      {cmp.title}
                    </td>
                    <td className="px-5 py-3.5 text-[#64748B]">
                      <Badge variant="neutral">{cmp.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`font-semibold ${
                          cmp.priority === 'High'
                            ? 'text-[#DC2626]'
                            : cmp.priority === 'Medium'
                            ? 'text-[#B45309]'
                            : 'text-[#15803D]'
                        }`}
                      >
                        {cmp.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#64748B] whitespace-nowrap">
                      {cmp.submissionDate}
                    </td>
                    <td className="px-5 py-3.5 text-center">
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
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedComplaint(cmp)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submit New Complaint Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Campus Grievance or Maintenance Request"
        maxWidth="max-w-lg"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateComplaint}>
              Log Grievance Ticket
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateComplaint} className="space-y-4 text-xs">
          <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-[#2563EB] text-[11px] flex items-start gap-1.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Demonstration Ticket: Grievances are recorded in browser storage and routed through the local state machine.
            </span>
          </div>

          <Input
            label="Grievance Title / Subject"
            placeholder="e.g. Water leak in washroom, Classroom projector issue"
            value={newComplaint.title}
            onChange={(e) =>
              setNewComplaint({ ...newComplaint, title: e.target.value })
            }
            required
            error={formErrors.title}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-[#0F172A]">
                Issue Category <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={newComplaint.category}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, category: e.target.value })
                }
                className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] p-2 focus:outline-none focus:border-[#4F46E5]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-[#0F172A]">
                Priority Level <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={newComplaint.priority}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, priority: e.target.value })
                }
                className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] p-2 focus:outline-none focus:border-[#4F46E5]"
              >
                <option value="Low">Low (Standard SLA)</option>
                <option value="Medium">Medium (Within 24 Hours)</option>
                <option value="High">High (Urgent Attention)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0F172A]">
              Specific Location & Issue Description <span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              rows={4}
              value={newComplaint.description}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, description: e.target.value })
              }
              placeholder="Specify room number, block, nature of fault, and when it occurred..."
              className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-[#0F172A] focus:outline-none focus:border-[#4F46E5]"
            />
            {formErrors.description && (
              <p className="text-[#DC2626] text-[11px] font-medium">
                {formErrors.description}
              </p>
            )}
          </div>
        </form>
      </Modal>

      {/* View Complaint Details Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={Boolean(selectedComplaint)}
          onClose={() => setSelectedComplaint(null)}
          title={`Ticket Audit: ${selectedComplaint.id}`}
          maxWidth="max-w-md"
          footer={
            <Button size="sm" onClick={() => setSelectedComplaint(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A] text-sm">
                {selectedComplaint.title}
              </span>
              <Badge
                variant={
                  selectedComplaint.status === 'Resolved'
                    ? 'success'
                    : selectedComplaint.status === 'In Progress'
                    ? 'warning'
                    : 'info'
                }
                dot
              >
                {selectedComplaint.status}
              </Badge>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded border border-[#E2E8F0] space-y-1">
              <span className="font-semibold text-[#0F172A]">Description:</span>
              <p className="text-[#475569] leading-relaxed">
                {selectedComplaint.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[#64748B] pt-1">
              <p>
                <strong>Category:</strong> {selectedComplaint.category}
              </p>
              <p>
                <strong>Priority:</strong> {selectedComplaint.priority}
              </p>
              <p>
                <strong>Submitted:</strong> {selectedComplaint.submissionDate}
              </p>
              <p>
                <strong>Last Updated:</strong> {selectedComplaint.lastUpdated}
              </p>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-[#E2E8F0] text-[11px] text-[#64748B]">
              Only campus facility supervisors or admin desk can transition status to <strong>Resolved</strong> after physical inspection.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
