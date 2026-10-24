import { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Users,
  GraduationCap,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import { initialAdminDepartments, initialAdminUsers } from '../../data/mockData';

// Subcomponent for Add/Edit Department Form
function DepartmentFormModalBody({ deptToEdit, existingDepartments, onSave, onCancel }) {
  const isEditing = Boolean(deptToEdit);

  const [formData, setFormData] = useState({
    name: deptToEdit?.name || '',
    code: deptToEdit?.code || '',
    headOfDepartment: deptToEdit?.headOfDepartment || '',
    status: deptToEdit?.status || 'Active',
    establishedYear: deptToEdit?.establishedYear || 2026,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required.';
    }
    if (!formData.code.trim()) {
      newErrors.code = 'Department code is required.';
    } else {
      const codeUpper = formData.code.trim().toUpperCase();
      const isDuplicate = existingDepartments.some(
        (d) =>
          d.code.toUpperCase() === codeUpper &&
          (!isEditing || d.id !== deptToEdit.id)
      );
      if (isDuplicate) {
        newErrors.code = 'A department with this code already exists.';
      }
    }
    if (!formData.headOfDepartment.trim()) {
      newErrors.headOfDepartment = 'Head of Department name is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      onSave({
        ...deptToEdit,
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        headOfDepartment: formData.headOfDepartment.trim(),
        status: formData.status,
      });
    } else {
      const newId = `DEPT-0${existingDepartments.length + 1}`;
      onSave({
        id: newId,
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        headOfDepartment: formData.headOfDepartment.trim(),
        status: formData.status,
        establishedYear: formData.establishedYear || 2026,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Department Name <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Civil & Environmental Engineering"
          className={`w-full px-3 py-2 text-xs rounded-md border ${
            errors.name ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
          } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
        />
        {errors.name && <p className="text-[11px] text-[#DC2626] mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Department Code <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g. CEE"
            maxLength={6}
            className={`w-full px-3 py-2 text-xs uppercase font-mono rounded-md border ${
              errors.code ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.code && <p className="text-[11px] text-[#DC2626] mt-1">{errors.code}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Status <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Head of Department (HOD) <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          value={formData.headOfDepartment}
          onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
          placeholder="e.g. Prof. Alan Turing, Ph.D."
          className={`w-full px-3 py-2 text-xs rounded-md border ${
            errors.headOfDepartment ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
          } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
        />
        {errors.headOfDepartment && (
          <p className="text-[11px] text-[#DC2626] mt-1">{errors.headOfDepartment}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? 'Save Changes' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
}

export default function AdminDepartments() {
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_departments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminDepartments;
  });

  // Load users to dynamically compute student & teacher counts
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

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [viewingDept, setViewingDept] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const saveDepartmentsToStorage = (updated) => {
    setDepartments(updated);
    localStorage.setItem('campus360_admin_departments', JSON.stringify(updated));
  };

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 4000);
  };

  // Compute student and teacher totals for each department from users
  const departmentsWithCounts = useMemo(() => {
    return departments.map((dept) => {
      const studentCount = users.filter(
        (u) => u.role === 'Student' && u.department === dept.name
      ).length;
      const teacherCount = users.filter(
        (u) => u.role === 'Teacher' && u.department === dept.name
      ).length;

      return {
        ...dept,
        studentCount,
        teacherCount,
      };
    });
  }, [departments, users]);

  // Filter departments
  const filteredDepartments = useMemo(() => {
    return departmentsWithCounts.filter((d) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        (d.headOfDepartment && d.headOfDepartment.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [departmentsWithCounts, searchTerm, statusFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(filteredDepartments.length / pageSize) || 1;

  const paginatedDepartments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDepartments.slice(start, start + pageSize);
  }, [filteredDepartments, currentPage, pageSize]);

  const handleSaveDepartment = (deptRecord) => {
    if (editingDept) {
      const updated = departments.map((d) => (d.id === deptRecord.id ? deptRecord : d));
      saveDepartmentsToStorage(updated);
      showNotification(`Department "${deptRecord.name}" updated successfully.`);
    } else {
      const updated = [...departments, deptRecord];
      saveDepartmentsToStorage(updated);
      showNotification(`Department "${deptRecord.name}" (${deptRecord.code}) created successfully.`);
    }
    setDeptModalOpen(false);
    setEditingDept(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Departments Management"
        description="Oversee academic divisions, departmental chairs, program structures, and faculty-student ratios."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'Departments' },
        ]}
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5CAC32]" />
            {departments.length} Academic Departments
          </span>
        }
      />

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 max-w-xl">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Search by department name, code, or HOD..."
            />
          </div>
          <div className="flex items-center gap-2 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[#64748B] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium flex-1 sm:flex-initial"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingDept(null);
            setDeptModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-lg bg-[#5CAC32] text-white hover:bg-[#4B9228] transition-all font-semibold text-xs shadow-2xs w-full md:w-auto shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Department Cards Grid or Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredDepartments.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Building2}
              title="No Departments Found"
              description="No departments match your current search or status filter. Try clearing filters or create a new department."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('ALL');
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reset Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div>
            {/* Desktop / Tablet Table */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[960px]">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Code</th>
                    <th className="py-3.5 px-4 min-w-[240px]">Department Name</th>
                    <th className="py-3.5 px-4 min-w-[180px]">Head of Department</th>
                    <th className="py-3.5 px-4 text-center whitespace-nowrap">Faculty</th>
                    <th className="py-3.5 px-4 text-center whitespace-nowrap">Students</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                  {paginatedDepartments.map((dept) => (
                    <tr key={dept.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 pl-6 pr-4 font-mono font-semibold text-slate-800 text-xs whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-bold">
                          {dept.code}
                        </span>
                      </td>
                      <td className="py-4 px-4 min-w-[240px]">
                        <div className="font-semibold text-[#0F172A] text-sm">{dept.name}</div>
                        <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                          ID: {dept.id} • Est. {dept.establishedYear || 2026}
                        </div>
                      </td>
                      <td className="py-4 px-4 min-w-[180px]">
                        {dept.headOfDepartment ? (
                          <span className="font-medium text-slate-800">{dept.headOfDepartment}</span>
                        ) : (
                          <span className="text-slate-400 italic font-normal text-[11px]">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{dept.teacherCount}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                          <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{dept.studentCount}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              dept.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          <span>{dept.status}</span>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingDept(dept)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingDept(dept);
                              setDeptModalOpen(true);
                            }}
                            className="p-1.5 rounded-md text-slate-400 hover:text-[#5CAC32] hover:bg-[#5CAC32]/10 transition-colors"
                            title="Edit Department"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Cards */}
            <div className="block md:hidden divide-y divide-slate-100">
              {paginatedDepartments.map((dept) => (
                <div key={dept.id} className="p-4 space-y-3 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2 py-0.5 rounded font-mono font-semibold text-slate-800 text-[11px] bg-slate-100 border border-slate-200">
                          {dept.code}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              dept.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          {dept.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                        {dept.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        ID: {dept.id} • Est. {dept.establishedYear || 2026}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setViewingDept(dept)}
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDept(dept);
                          setDeptModalOpen(true);
                        }}
                        className="p-2 rounded-lg text-slate-500 hover:text-[#5CAC32] hover:bg-[#5CAC32]/10 transition-colors"
                        title="Edit Department"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* HOD Info */}
                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">HOD:</span>
                    {dept.headOfDepartment ? (
                      <span className="font-medium text-slate-800">{dept.headOfDepartment}</span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </div>

                  {/* Micro stats grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span><strong>{dept.teacherCount}</strong> Faculty</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span><strong>{dept.studentCount}</strong> Students</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Enterprise Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredDepartments.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              itemName="departments"
            />
          </div>
        )}
      </div>

      {/* Add / Edit Department Modal */}
      <Modal
        isOpen={deptModalOpen}
        onClose={() => {
          setDeptModalOpen(false);
          setEditingDept(null);
        }}
        title={editingDept ? `Edit Department: ${editingDept.name}` : 'Create Academic Department'}
        maxWidth="max-w-md"
      >
        <DepartmentFormModalBody
          key={editingDept ? editingDept.id : 'new-dept'}
          deptToEdit={editingDept}
          existingDepartments={departments}
          onSave={handleSaveDepartment}
          onCancel={() => {
            setDeptModalOpen(false);
            setEditingDept(null);
          }}
        />
      </Modal>

      {/* View Department Details Modal */}
      <Modal
        isOpen={Boolean(viewingDept)}
        onClose={() => setViewingDept(null)}
        title="Department Academic Profile"
        maxWidth="max-w-md"
      >
        {viewingDept && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0]">
              <div className="p-2.5 rounded-lg bg-[#5CAC32]/10 border border-[#5CAC32]/20 text-[#5CAC32]">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">{viewingDept.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs font-bold text-[#5CAC32]">
                    {viewingDept.code}
                  </span>
                  <Badge variant={viewingDept.status === 'Active' ? 'success' : 'neutral'}>
                    {viewingDept.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <span className="text-[#64748B] block mb-1">Head of Department</span>
                <span className="font-bold text-[#0F172A]">{viewingDept.headOfDepartment}</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <span className="text-[#64748B] block mb-1">Established</span>
                <span className="font-bold text-[#0F172A] flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#64748B]" />
                  {viewingDept.establishedYear || 2026}
                </span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-[#15803D] block mb-1 font-semibold">Enrolled Students</span>
                <span className="font-bold text-lg text-[#15803D]">{viewingDept.studentCount}</span>
              </div>
              <div className="p-3 bg-[#5CAC32]/10 rounded-lg border border-[#5CAC32]/20">
                <span className="text-[#4B9228] block mb-1 font-semibold">Faculty Staff</span>
                <span className="font-bold text-lg text-[#4B9228]">{viewingDept.teacherCount}</span>
              </div>
            </div>

            <div className="p-3 rounded bg-amber-50 border border-amber-200 text-[11px] text-[#B45309] flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Demonstration statistics calculated directly from current registered user profiles.
              </span>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#E2E8F0]">
              <Button variant="outline" onClick={() => setViewingDept(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
