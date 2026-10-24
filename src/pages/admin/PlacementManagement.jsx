import { useState, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Briefcase,
  Users,
  Clock,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import {
  initialStudentPlacements,
  initialAdminApplications,
} from '../../data/mockData';

// Subcomponent for Create/Edit Placement Opportunity Form
function OpportunityFormModalBody({ oppToEdit, existingOpps, onSave, onCancel }) {
  const isEditing = Boolean(oppToEdit);

  const [formData, setFormData] = useState({
    company: oppToEdit?.company || '',
    jobTitle: oppToEdit?.jobTitle || '',
    eligibleCourse: oppToEdit?.eligibleCourse || 'B.Tech (CSE, IT, ECE)',
    jobType: oppToEdit?.jobType || 'Full-time',
    minCgpa: oppToEdit?.minCgpa || '7.5',
    deadline: oppToEdit?.deadline || 'Nov 15, 2026',
    compensation: oppToEdit?.compensation || '12.0 LPA CTC',
    location: oppToEdit?.location || 'Bengaluru',
    requiredSkills: oppToEdit?.requiredSkills ? oppToEdit.requiredSkills.join(', ') : 'Java, SQL, Docker',
    description: oppToEdit?.description || '',
    status: oppToEdit?.status === 'Closed' ? 'Closed' : 'Active',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.company.trim()) errs.company = 'Company name is required.';
    if (!formData.jobTitle.trim()) errs.jobTitle = 'Job role is required.';
    if (!formData.deadline.trim()) errs.deadline = 'Application deadline is required.';
    if (!formData.description.trim()) errs.description = 'Job description is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const skillsArray = formData.requiredSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isEditing) {
      onSave({
        ...oppToEdit,
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        eligibleCourse: formData.eligibleCourse.trim(),
        jobType: formData.jobType,
        minCgpa: formData.minCgpa.trim(),
        deadline: formData.deadline.trim(),
        compensation: formData.compensation.trim(),
        location: formData.location.trim(),
        requiredSkills: skillsArray.length ? skillsArray : ['General Engineering'],
        description: formData.description.trim(),
        status: formData.status,
      });
    } else {
      const newId = `PLC-2026-0${existingOpps.length + 1}`;
      onSave({
        id: newId,
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        eligibleCourse: formData.eligibleCourse.trim(),
        jobType: formData.jobType,
        minCgpa: formData.minCgpa.trim(),
        deadline: formData.deadline.trim(),
        compensation: formData.compensation.trim(),
        location: formData.location.trim(),
        requiredSkills: skillsArray.length ? skillsArray : ['General Engineering'],
        description: formData.description.trim(),
        status: 'Active',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Apex Cloud Technologies"
            className={`w-full px-3 py-2 text-xs rounded-lg border ${
              errors.company ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            } text-slate-900 focus:outline-none focus:border-slate-400 transition-colors`}
          />
          {errors.company && <p className="text-[11px] text-rose-500 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Job Role / Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            placeholder="e.g. Associate Software Engineer"
            className={`w-full px-3 py-2 text-xs rounded-lg border ${
              errors.jobTitle ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            } text-slate-900 focus:outline-none focus:border-slate-400 transition-colors`}
          />
          {errors.jobTitle && <p className="text-[11px] text-rose-500 mt-1">{errors.jobTitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Job Type
          </label>
          <select
            value={formData.jobType}
            onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-400"
          >
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Min CGPA
          </label>
          <input
            type="text"
            value={formData.minCgpa}
            onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
            placeholder="e.g. 7.5"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Deadline <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            placeholder="e.g. Oct 31, 2026"
            className={`w-full px-3 py-2 text-xs rounded-lg border ${
              errors.deadline ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
            } text-slate-900 focus:outline-none focus:border-slate-400 transition-colors`}
          />
          {errors.deadline && <p className="text-[11px] text-rose-500 mt-1">{errors.deadline}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Eligible Courses
          </label>
          <input
            type="text"
            value={formData.eligibleCourse}
            onChange={(e) => setFormData({ ...formData, eligibleCourse: e.target.value })}
            placeholder="e.g. B.Tech (CSE, IT, ECE)"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Compensation
          </label>
          <input
            type="text"
            value={formData.compensation}
            onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
            placeholder="e.g. 14.5 LPA CTC"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. Bengaluru"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            value={formData.requiredSkills}
            onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            placeholder="e.g. Python, SQL, Docker"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Job Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the recruitment drive, requirements, and responsibilities..."
          className={`w-full px-3 py-2 text-xs rounded-lg border ${
            errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
          } text-slate-900 focus:outline-none focus:border-slate-400 transition-colors`}
        />
        {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
      </div>

      {isEditing && (
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-400"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
        <Button variant="outline" type="button" onClick={onCancel} className="text-xs">
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="text-xs">
          {isEditing ? 'Save Changes' : 'Create Opportunity'}
        </Button>
      </div>
    </form>
  );
}

export default function AdminPlacementManagement() {
  // Shared placement opportunities store with Student Portal
  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem('campus360_student_placements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentPlacements;
  });

  // Demo applications
  const [applications] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminApplications;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [oppModalOpen, setOppModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [viewingOpp, setViewingOpp] = useState(null);
  const [confirmCloseOpp, setConfirmCloseOpp] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const saveOpportunities = (updated) => {
    setOpportunities(updated);
    localStorage.setItem('campus360_student_placements', JSON.stringify(updated));
  };

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 4000);
  };

  // Derive Overview Figures
  const activeOpps = opportunities.filter((o) => o.status !== 'Closed').length;
  const closedOpps = opportunities.filter((o) => o.status === 'Closed').length;
  const totalApplications = applications.length;

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((o) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.company.toLowerCase().includes(q) ||
        o.jobTitle.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        (o.eligibleCourse && o.eligibleCourse.toLowerCase().includes(q));

      const matchesType = jobTypeFilter === 'ALL' || o.jobType === jobTypeFilter;
      const matchesStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'Closed'
          ? o.status === 'Closed'
          : o.status !== 'Closed';

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [opportunities, searchTerm, jobTypeFilter, statusFilter]);

  const [oppPage, setOppPage] = useState(1);
  const oppPageSize = 5;
  const totalOppPages = Math.ceil(filteredOpportunities.length / oppPageSize) || 1;

  const paginatedOpportunities = useMemo(() => {
    const start = (oppPage - 1) * oppPageSize;
    return filteredOpportunities.slice(start, start + oppPageSize);
  }, [filteredOpportunities, oppPage, oppPageSize]);

  const [appPage, setAppPage] = useState(1);
  const appPageSize = 5;
  const totalAppPages = Math.ceil(applications.length / appPageSize) || 1;

  const paginatedApplications = useMemo(() => {
    const start = (appPage - 1) * appPageSize;
    return applications.slice(start, start + appPageSize);
  }, [applications, appPage, appPageSize]);

  const handleSaveOpp = (oppRecord) => {
    if (editingOpp) {
      const updated = opportunities.map((o) => (o.id === oppRecord.id ? oppRecord : o));
      saveOpportunities(updated);
      showNotification(`Opportunity for ${oppRecord.company} updated.`);
    } else {
      const updated = [oppRecord, ...opportunities];
      saveOpportunities(updated);
      showNotification(`New opportunity for ${oppRecord.company} created.`);
    }
    setOppModalOpen(false);
    setEditingOpp(null);
  };

  const handleCloseOpportunity = (opp) => {
    const updated = opportunities.map((o) =>
      o.id === opp.id ? { ...o, status: 'Closed' } : o
    );
    saveOpportunities(updated);
    setConfirmCloseOpp(null);
    showNotification(`Placement opportunity for ${opp.company} closed.`);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Placement Management"
        description="Corporate liaison, campus placement drives, job vacancy listings, and student application registries."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'Placement Management' },
        ]}
      />

      {feedbackMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Overview Stat Cards - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Active Opportunities</span>
              <Briefcase className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{activeOpps}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Active recruitment drives</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Total Applications</span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{totalApplications}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Student submissions</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Upcoming Deadlines</span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{activeOpps}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Drives accepting applications</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Closed Opportunities</span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{closedOpps}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Concluded drives</p>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 flex-1 w-full">
          <div className="w-full sm:w-72 md:w-80">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Search company, job role, or skills..."
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Type:</span>
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs focus:outline-none focus:border-slate-400"
              >
                <option value="ALL">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs focus:outline-none focus:border-slate-400"
              >
                <option value="ALL">All</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            {(searchTerm || jobTypeFilter !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setJobTypeFilter('ALL');
                  setStatusFilter('ALL');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 ml-1"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEditingOpp(null);
            setOppModalOpen(true);
          }}
          className="text-xs shrink-0 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Opportunity
        </Button>
      </div>

      {/* Placement Opportunities Table & Mobile Cards */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Placement Drives
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Active campus recruitment drives and job openings
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium md:hidden">
            {filteredOpportunities.length} Drives
          </span>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="p-8 text-center">
            <EmptyState
              title="No Placement Opportunities Found"
              description="No recruitment drives matched your search criteria."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setJobTypeFilter('ALL');
                    setStatusFilter('ALL');
                  }}
                  className="text-xs"
                >
                  Reset Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div>
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[1000px]">
                <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 uppercase font-medium text-[11px] tracking-wide">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Drive ID</th>
                    <th className="py-3 px-4">Company &amp; Role</th>
                    <th className="py-3.5 px-4 min-w-[170px]">Eligibility</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Type</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Compensation</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Deadline</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {paginatedOpportunities.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 pl-6 pr-4 font-mono font-medium text-slate-500 whitespace-nowrap">
                        {o.id}
                      </td>
                      <td className="py-4 px-4 min-w-[240px]">
                        <div className="font-semibold text-slate-900">
                          {o.company}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {o.jobTitle}{o.location ? ` • ${o.location}` : ''}
                        </div>
                      </td>
                      <td className="py-4 px-4 min-w-[170px]">
                        <div className="text-slate-700">{o.eligibleCourse}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          Min CGPA: {o.minCgpa ? `${o.minCgpa}+` : 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                        {o.jobType}
                      </td>
                      <td className="py-4 px-4 text-slate-900 font-semibold whitespace-nowrap">
                        {o.compensation}
                      </td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                        {o.deadline}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              o.status === 'Closed' ? 'bg-slate-400' : 'bg-emerald-500'
                            }`}
                          />
                          {o.status === 'Closed' ? 'Closed' : 'Active'}
                        </span>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingOpp(o)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingOpp(o);
                              setOppModalOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
                            title="Edit Opportunity"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          {o.status !== 'Closed' && (
                            <button
                              type="button"
                              onClick={() => setConfirmCloseOpp(o)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 transition-colors"
                              title="Close Opportunity"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
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
              {paginatedOpportunities.map((o) => (
                <div key={o.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] font-semibold text-[#5CAC32] block">{o.id}</span>
                      <h4 className="font-semibold text-slate-900 text-sm mt-0.5">{o.company}</h4>
                      <p className="text-xs text-slate-600">{o.jobTitle}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 shrink-0">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          o.status === 'Closed' ? 'bg-slate-400' : 'bg-emerald-500'
                        }`}
                      />
                      {o.status === 'Closed' ? 'Closed' : 'Active'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 px-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Type</span>
                      <span className="font-medium text-slate-800">{o.jobType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Compensation</span>
                      <span className="font-semibold text-slate-900">{o.compensation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Min CGPA</span>
                      <span className="font-medium text-slate-800">{o.minCgpa ? `${o.minCgpa}+` : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Deadline</span>
                      <span className="font-medium text-slate-800">{o.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 truncate max-w-[170px]">
                      {o.eligibleCourse}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setViewingOpp(o)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingOpp(o);
                          setOppModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                        title="Edit Opportunity"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      {o.status !== 'Closed' && (
                        <button
                          type="button"
                          onClick={() => setConfirmCloseOpp(o)}
                          className="p-1.5 text-rose-600 hover:text-rose-700 rounded-md bg-rose-50 hover:bg-rose-100 transition-colors"
                          title="Close Opportunity"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={oppPage}
              totalPages={totalOppPages}
              totalItems={filteredOpportunities.length}
              pageSize={oppPageSize}
              onPageChange={setOppPage}
              itemName="opportunities"
            />
          </div>
        )}
      </div>

      {/* Student Applications Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Student Applications
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Registry of students who applied for placement drives
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium md:hidden">
            {applications.length} Applicants
          </span>
        </div>

        <div>
          {/* Desktop / Tablet Table View */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs table-auto">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 uppercase font-medium text-[11px] tracking-wide">
                <tr>
                  <th className="py-3 px-5">Application ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Opportunity &amp; Role</th>
                  <th className="py-3 px-4">Date Applied</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {paginatedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-slate-500 whitespace-nowrap">
                      {app.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{app.studentId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900">{app.company}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{app.jobTitle}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {app.appliedDate}
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            app.status === 'Selected'
                              ? 'bg-emerald-500'
                              : app.status === 'Shortlisted'
                              ? 'bg-[#5CAC32]'
                              : app.status === 'Interview Scheduled'
                              ? 'bg-sky-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Creative Mobile Responsive Card Feed */}
          <div className="block md:hidden divide-y divide-slate-100">
            {paginatedApplications.map((app) => (
              <div key={app.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block">{app.id}</span>
                    <h4 className="font-semibold text-slate-900 text-xs">{app.studentName}</h4>
                    <span className="text-[11px] font-mono text-slate-500">{app.studentId}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 shrink-0">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        app.status === 'Selected'
                          ? 'bg-emerald-500'
                          : app.status === 'Shortlisted'
                          ? 'bg-[#5CAC32]'
                          : app.status === 'Interview Scheduled'
                          ? 'bg-sky-500'
                          : 'bg-slate-400'
                      }`}
                    />
                    {app.status}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-slate-800">{app.company}</div>
                    <div className="text-[11px] text-slate-500">{app.jobTitle}</div>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    {app.appliedDate}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={appPage}
            totalPages={totalAppPages}
            totalItems={applications.length}
            pageSize={appPageSize}
            onPageChange={setAppPage}
            itemName="applications"
          />
        </div>
      </div>

      {/* Add / Edit Opportunity Modal */}
      <Modal
        isOpen={oppModalOpen}
        onClose={() => {
          setOppModalOpen(false);
          setEditingOpp(null);
        }}
        title={editingOpp ? `Edit Drive: ${editingOpp.company}` : 'Create Placement Opportunity'}
        maxWidth="max-w-lg"
      >
        <OpportunityFormModalBody
          key={editingOpp ? editingOpp.id : 'new-opp'}
          oppToEdit={editingOpp}
          existingOpps={opportunities}
          onSave={handleSaveOpp}
          onCancel={() => {
            setOppModalOpen(false);
            setEditingOpp(null);
          }}
        />
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={Boolean(viewingOpp)}
        onClose={() => setViewingOpp(null)}
        title="Opportunity Details"
        maxWidth="max-w-lg"
      >
        {viewingOpp && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">{viewingOpp.id}</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      viewingOpp.status === 'Closed' ? 'bg-slate-400' : 'bg-emerald-500'
                    }`}
                  />
                  {viewingOpp.status === 'Closed' ? 'Closed' : 'Active'}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mt-1">{viewingOpp.company}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{viewingOpp.jobTitle}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] mb-0.5">Description</span>
                <p className="text-slate-700 leading-relaxed">{viewingOpp.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-slate-400 block text-[11px]">Type</span>
                  <span className="text-slate-800 font-medium">{viewingOpp.jobType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Compensation</span>
                  <span className="text-slate-800 font-medium">{viewingOpp.compensation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="text-slate-800 font-medium">{viewingOpp.location || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Deadline</span>
                  <span className="text-slate-800 font-medium">{viewingOpp.deadline}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Eligible Courses</span>
                  <span className="text-slate-800 font-medium">{viewingOpp.eligibleCourse}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Min CGPA</span>
                  <span className="text-slate-800 font-medium">{viewingOpp.minCgpa ? `${viewingOpp.minCgpa}+` : 'N/A'}</span>
                </div>
              </div>

              {viewingOpp.requiredSkills && viewingOpp.requiredSkills.length > 0 && (
                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px] mb-1">Required Skills</span>
                  <p className="text-slate-700">{viewingOpp.requiredSkills.join(', ')}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <Button variant="outline" onClick={() => setViewingOpp(null)} className="text-xs">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal to Close Opportunity */}
      <Modal
        isOpen={Boolean(confirmCloseOpp)}
        onClose={() => setConfirmCloseOpp(null)}
        title="Close Opportunity"
        maxWidth="max-w-md"
      >
        {confirmCloseOpp && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600 shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Close drive for {confirmCloseOpp.company}?
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  This will mark the opportunity as Closed and prevent new student submissions.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <Button variant="outline" onClick={() => setConfirmCloseOpp(null)} className="text-xs">
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleCloseOpportunity(confirmCloseOpp)}
                className="text-xs"
              >
                Close Drive
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
