import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Edit2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Check,
  X,
  Shield,
  GraduationCap,
  Wrench,
  BookOpen,
  KeyRound,
  Eye,
  Copy,
  Lock,
  Building2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import { initialAdminUsers, initialAdminDepartments } from '../../data/mockData';

// Helper to generate a secure random temporary password
function generateSecureTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `Camp360#${rand}`;
}

// Generate realistic role-based institutional ID
function generateRoleId(role, existingUsers) {
  const prefixMap = {
    Student: 'STU-2026-',
    Teacher: 'FAC-',
    'Maintenance Staff': 'STF-',
    Staff: 'STF-',
    Administrator: 'ADM-',
  };
  const prefix = prefixMap[role] || 'USR-';
  let suffix = Math.floor(100 + Math.random() * 900);
  let candidate = `${prefix}${suffix}`;
  while (existingUsers.some((u) => u.id === candidate)) {
    suffix = Math.floor(100 + Math.random() * 900);
    candidate = `${prefix}${suffix}`;
  }
  return candidate;
}

// Subcomponent for Add/Edit User Form
function UserFormModalBody({
  userToEdit,
  defaultRole = 'Student',
  departments,
  existingUsers,
  onSave,
  onCancel,
}) {
  const isEditing = Boolean(userToEdit);

  const [role, setRole] = useState(userToEdit?.role || defaultRole);
  const [formData, setFormData] = useState({
    name: userToEdit?.name || '',
    id: userToEdit?.id || generateRoleId(userToEdit?.role || defaultRole, existingUsers),
    email: userToEdit?.email || '',
    department:
      userToEdit?.department ||
      (departments[0]?.name || 'Computer Science & Engineering'),
    course: userToEdit?.course || 'B.Tech Computer Science & Engineering',
    academicYear: userToEdit?.academicYear || 'Year 1 (Semester 1)',
    designation: userToEdit?.designation || 'Assistant Professor',
    staffTeam: userToEdit?.staffTeam || 'Facilities & Operations',
    status: userToEdit?.status || 'Active',
  });

  const [errors, setErrors] = useState({});

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (!isEditing) {
      setFormData((prev) => ({
        ...prev,
        id: generateRoleId(newRole, existingUsers),
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.id.trim()) {
      newErrors.id = 'Institutional ID is required.';
    } else {
      // Check duplicate ID
      const isDuplicateId = existingUsers.some(
        (u) =>
          u.id.toLowerCase() === formData.id.trim().toLowerCase() &&
          (!isEditing || u.id !== userToEdit.id)
      );
      if (isDuplicateId) {
        newErrors.id = 'This Institutional ID is already assigned to another user.';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Institutional email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@campus360.edu).';
    } else {
      // Check duplicate email
      const isDuplicateEmail = existingUsers.some(
        (u) =>
          u.email?.toLowerCase() === formData.email.trim().toLowerCase() &&
          (!isEditing || u.id !== userToEdit.id)
      );
      if (isDuplicateEmail) {
        newErrors.email = 'This email is already assigned to another user.';
      }
    }

    if (role === 'Student') {
      if (!formData.course.trim()) newErrors.course = 'Course / Program is required.';
      if (!formData.academicYear.trim()) newErrors.academicYear = 'Academic Year / Semester is required.';
    } else if (role === 'Teacher') {
      if (!formData.designation.trim()) newErrors.designation = 'Academic designation is required.';
    } else if (role === 'Maintenance Staff' || role === 'Staff') {
      if (!formData.designation.trim()) newErrors.designation = 'Staff designation is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      onSave({
        ...userToEdit,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: role,
        department:
          role === 'Maintenance Staff' || role === 'Staff'
            ? formData.staffTeam
            : formData.department,
        course: role === 'Student' ? formData.course : undefined,
        academicYear: role === 'Student' ? formData.academicYear : undefined,
        designation:
          role !== 'Student' ? formData.designation : undefined,
        status: formData.status,
      });
    } else {
      const tempPassword = generateSecureTempPassword();
      const mockPasswordHash = `pbkdf2_sha256$260000$${Math.random().toString(36).substring(2)}`;

      onSave(
        {
          id: formData.id.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: role,
          department:
            role === 'Maintenance Staff' || role === 'Staff'
              ? formData.staffTeam
              : formData.department,
          course: role === 'Student' ? formData.course : undefined,
          academicYear: role === 'Student' ? formData.academicYear : undefined,
          designation:
            role !== 'Student' ? formData.designation : undefined,
          status: formData.status,
          createdDate: new Date().toISOString().split('T')[0],
          mustChangePassword: true,
          passwordHash: mockPasswordHash,
        },
        tempPassword
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Role Selection / Indicator Banner */}
      {!isEditing ? (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-700">Account Type</label>
            <span className="text-[11px] text-slate-400 font-mono">ID: {formData.id}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { label: 'Student', icon: GraduationCap },
              { label: 'Teacher', icon: BookOpen },
              { label: 'Staff', fullRole: 'Maintenance Staff', icon: Wrench },
            ].map((item) => {
              const fullRole = item.fullRole || item.label;
              const isSelected = role === fullRole;
              const Icon = item.icon;
              return (
                <button
                  key={fullRole}
                  type="button"
                  onClick={() => handleRoleChange(fullRole)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-[#5CAC32] shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2">
            {role === 'Student' && <GraduationCap className="h-4 w-4 text-emerald-600" />}
            {role === 'Teacher' && <BookOpen className="h-4 w-4 text-[#5CAC32]" />}
            {(role === 'Maintenance Staff' || role === 'Staff') && <Wrench className="h-4 w-4 text-amber-600" />}
            {role === 'Administrator' && <Shield className="h-4 w-4 text-blue-600" />}
            <span className="font-semibold text-slate-700">Account Type:</span>
            <span className="font-bold text-[#0F172A]">{role}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">ID: {formData.id}</span>
        </div>
      )}

      {/* Basic Profile Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Full Name <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alex Johnson"
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.name ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.name && <p className="text-[11px] text-[#DC2626] mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Institutional ID <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            disabled={isEditing}
            placeholder="e.g. STU-2026-081"
            className={`w-full px-3 py-2 text-xs rounded-md border font-mono ${
              errors.id ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32] disabled:bg-slate-50 disabled:text-slate-500`}
          />
          {errors.id && <p className="text-[11px] text-[#DC2626] mt-1">{errors.id}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Institutional Email <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. name@campus360.edu"
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.email ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.email && <p className="text-[11px] text-[#DC2626] mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Account Status <span className="text-[#DC2626]">*</span>
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

      {/* Role-Specific Fields */}
      {role === 'Student' && (
        <div className="space-y-4 pt-1 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Academic Department <span className="text-[#DC2626]">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Course / Program <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                placeholder="e.g. B.Tech Computer Science & Engineering"
                className={`w-full px-3 py-2 text-xs rounded-md border ${
                  errors.course ? 'border-[#DC2626]' : 'border-[#E2E8F0]'
                } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
              />
              {errors.course && <p className="text-[11px] text-[#DC2626] mt-1">{errors.course}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Academic Year / Current Semester <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
            >
              <option value="Year 1 (Semester 1)">Year 1 (Semester 1)</option>
              <option value="Year 1 (Semester 2)">Year 1 (Semester 2)</option>
              <option value="Year 2 (Semester 3)">Year 2 (Semester 3)</option>
              <option value="Year 2 (Semester 4)">Year 2 (Semester 4)</option>
              <option value="Year 3 (Semester 5)">Year 3 (Semester 5)</option>
              <option value="Year 3 (Semester 6)">Year 3 (Semester 6)</option>
              <option value="Year 4 (Semester 7)">Year 4 (Semester 7)</option>
              <option value="Year 4 (Semester 8)">Year 4 (Semester 8)</option>
            </select>
          </div>
        </div>
      )}

      {role === 'Teacher' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Department <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name} ({dept.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Academic Designation <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
            >
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Head of Department">Head of Department</option>
              <option value="Lecturer">Lecturer</option>
            </select>
            {errors.designation && <p className="text-[11px] text-[#DC2626] mt-1">{errors.designation}</p>}
          </div>
        </div>
      )}

      {(role === 'Maintenance Staff' || role === 'Staff') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Assigned Team / Division <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.staffTeam}
              onChange={(e) => setFormData({ ...formData, staffTeam: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] bg-white focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
            >
              <option value="Facilities & Operations">Facilities & Operations</option>
              <option value="Electrical Maintenance">Electrical Maintenance</option>
              <option value="Plumbing & Water Systems">Plumbing & Water Systems</option>
              <option value="HVAC & Climate Control">HVAC & Climate Control</option>
              <option value="Civil & Campus Works">Civil & Campus Works</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Staff Designation <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="e.g. Maintenance Supervisor"
              className={`w-full px-3 py-2 text-xs rounded-md border ${
                errors.designation ? 'border-[#DC2626]' : 'border-[#E2E8F0]'
              } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
            />
            {errors.designation && <p className="text-[11px] text-[#DC2626] mt-1">{errors.designation}</p>}
          </div>
        </div>
      )}

      {role === 'Administrator' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Administrative Division <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. Office of Academic Affairs"
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Administrative Role <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="e.g. System Administrator"
              className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
            />
          </div>
        </div>
      )}

      {/* Security Provisioning Note */}
      <div className="p-3 text-[11px] text-[#64748B] bg-slate-50 rounded-lg border border-slate-200/80 flex items-start gap-2">
        <Lock className="h-4 w-4 text-[#5CAC32] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {isEditing
            ? 'Profile adjustments are preserved in the institutional directory. Role assignments and security permissions update immediately.'
            : 'Upon creation, a secure temporary password will be generated. The user will be required to change it on their first login. Plaintext passwords are never stored.'}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? 'Save Profile Changes' : `Create ${role} Account`}
        </Button>
      </div>
    </form>
  );
}

export default function AdminUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRoleParam = searchParams.get('role') || 'ALL';

  // Load users from localStorage or initialAdminUsers
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminUsers;
  });

  // Departments for dropdowns & filters
  const departments = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_departments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminDepartments;
  }, []);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState(initialRoleParam);
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals state
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [addUserMenuOpen, setAddUserMenuOpen] = useState(false);
  const [defaultModalRole, setDefaultModalRole] = useState('Student');
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [confirmStatusUser, setConfirmStatusUser] = useState(null);
  const [createdCredential, setCreatedCredential] = useState(null);
  const [resetCredentialUser, setResetCredentialUser] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Overview Statistics
  const overviewStats = useMemo(() => {
    const totalStudents = users.filter((u) => u.role === 'Student').length;
    const totalTeachers = users.filter((u) => u.role === 'Teacher').length;
    const totalStaff = users.filter(
      (u) => u.role === 'Maintenance Staff' || u.role === 'Staff'
    ).length;
    const activeAccounts = users.filter((u) => u.status === 'Active').length;
    const inactiveAccounts = users.filter((u) => u.status === 'Inactive').length;

    return {
      totalStudents,
      totalTeachers,
      totalStaff,
      activeAccounts,
      inactiveAccounts,
    };
  }, [users]);

  const saveUsersToStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('campus360_admin_users', JSON.stringify(updatedUsers));
  };

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 4500);
  };

  // Filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.name?.toLowerCase().includes(q) ||
        u.id?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q);

      const matchesRole =
        roleFilter === 'ALL' ||
        u.role === roleFilter ||
        (roleFilter === 'Maintenance Staff' && u.role === 'Staff');
      const matchesDept =
        departmentFilter === 'ALL' || u.department === departmentFilter;
      const matchesStatus =
        statusFilter === 'ALL' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, departmentFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('ALL');
    setDepartmentFilter('ALL');
    setStatusFilter('ALL');
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleOpenCreateModal = (role = 'Student') => {
    setEditingUser(null);
    setDefaultModalRole(role);
    setUserModalOpen(true);
  };

  const handleSaveUser = (userRecord, tempPassword) => {
    if (editingUser) {
      const updated = users.map((u) => (u.id === userRecord.id ? userRecord : u));
      saveUsersToStorage(updated);
      showNotification(`Account details for ${userRecord.name} updated successfully.`);
      setUserModalOpen(false);
      setEditingUser(null);
    } else {
      const updated = [userRecord, ...users];
      saveUsersToStorage(updated);
      setUserModalOpen(false);
      // Show Credential Confirmation Modal
      setCreatedCredential({
        user: userRecord,
        tempPassword,
      });
    }
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    const updated = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    saveUsersToStorage(updated);
    setConfirmStatusUser(null);
    showNotification(`Account status for ${user.name} changed to ${newStatus}.`);
  };

  // Password reset initiation by Admin
  const handleInitiatePasswordReset = (user) => {
    const newTempPassword = generateSecureTempPassword();
    const updated = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            mustChangePassword: true,
            passwordHash: `pbkdf2_sha256$260000$${Math.random().toString(36).substring(2)}`,
          }
        : u
    );
    saveUsersToStorage(updated);
    setResetCredentialUser({
      user,
      tempPassword: newTempPassword,
    });
  };

  const handleCopyCredentials = (textToCopy) => {
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'Administrator':
        return 'primary';
      case 'Teacher':
        return 'info';
      case 'Student':
        return 'success';
      case 'Maintenance Staff':
      case 'Staff':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Administrator':
        return <Shield className="h-3.5 w-3.5 text-[#5CAC32]" />;
      case 'Teacher':
        return <BookOpen className="h-3.5 w-3.5 text-blue-600" />;
      case 'Student':
        return <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />;
      case 'Maintenance Staff':
      case 'Staff':
        return <Wrench className="h-3.5 w-3.5 text-amber-600" />;
      default:
        return <Users className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        description="Provision, monitor, and manage role-based institutional accounts for students, faculty, staff, and administrators."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'User Management' },
        ]}
      />

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Overview Statistics Cards - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Students</span>
              <GraduationCap className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{overviewStats.totalStudents}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Enrolled accounts</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Teachers</span>
              <BookOpen className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{overviewStats.totalTeachers}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Faculty members</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Staff</span>
              <Wrench className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{overviewStats.totalStaff}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Facilities personnel</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Active</span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{overviewStats.activeAccounts}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Authorized access</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Inactive</span>
              <AlertCircle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{overviewStats.inactiveAccounts}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Disabled accounts</p>
          </div>
        </div>
      </div>

      {/* Action and Filter Controls Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 w-full sm:max-w-md">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Search by name, ID, or email..."
              className="w-full"
            />
          </div>

          {/* Clean Unified Action - Single Primary Button with Role Menu */}
          <div className="relative w-full sm:w-auto shrink-0">
            <div className="inline-flex w-full sm:w-auto rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => handleOpenCreateModal('Student')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-r-none bg-[#5CAC32] text-white hover:bg-[#4B9228] font-semibold text-xs transition-colors flex-1 sm:flex-initial"
              >
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </button>
              <button
                type="button"
                onClick={() => setAddUserMenuOpen(!addUserMenuOpen)}
                className="hidden sm:inline-flex items-center px-2.5 py-2.5 rounded-r-xl bg-[#4B9228] text-white hover:bg-[#3D7720] transition-colors border-l border-white/20"
                title="Quick Role Selection"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            {addUserMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-30 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    handleOpenCreateModal('Student');
                    setAddUserMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium transition-colors"
                >
                  <GraduationCap className="h-4 w-4 text-emerald-600" />
                  <span>Student Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleOpenCreateModal('Teacher');
                    setAddUserMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-[#5CAC32]" />
                  <span>Teacher / Faculty</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleOpenCreateModal('Maintenance Staff');
                    setAddUserMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium transition-colors"
                >
                  <Wrench className="h-4 w-4 text-amber-600" />
                  <span>Maintenance Staff</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modern Clean Dropdown Filters Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full sm:max-w-2xl">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:ring-1 focus:ring-[#5CAC32] focus:border-[#5CAC32] transition-colors shadow-2xs"
            >
              <option value="ALL">All Roles</option>
              <option value="Student">Students</option>
              <option value="Teacher">Teachers</option>
              <option value="Maintenance Staff">Maintenance Staff</option>
              <option value="Administrator">Administrators</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:ring-1 focus:ring-[#5CAC32] focus:border-[#5CAC32] transition-colors shadow-2xs truncate"
            >
              <option value="ALL">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:ring-1 focus:ring-[#5CAC32] focus:border-[#5CAC32] transition-colors shadow-2xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {(searchTerm || roleFilter !== 'ALL' || departmentFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium shrink-0 self-start sm:self-center"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Users}
              title="No Users Found"
              description="No user records matched your current search or filter criteria. Try resetting filters or creating a new user."
              action={
                <Button variant="outline" size="sm" onClick={handleResetFilters}>
                  Clear All Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div>
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[980px]">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">ID</th>
                    <th className="py-3.5 px-4 min-w-[200px]">Full Name</th>
                    <th className="py-3.5 px-4 min-w-[200px]">Email</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Role</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Department</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 pl-6 pr-4 font-mono font-medium text-slate-500 text-xs whitespace-nowrap">
                        {user.id}
                      </td>
                      <td className="py-4 px-4 min-w-[200px]" title={user.name}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 border border-slate-200">
                            {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                          </div>
                          <span className="font-semibold text-[#0F172A] capitalize">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#475569] text-xs" title={user.email}>
                        {user.email}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <span className="shrink-0">{getRoleIcon(user.role)}</span>
                          <span>{user.role}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#475569] text-xs" title={user.department || '—'}>
                        {user.department || '—'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          <span>{user.status}</span>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingUser(user)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="View Account Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUser(user);
                              setUserModalOpen(true);
                            }}
                            className="p-1.5 rounded-md text-slate-400 hover:text-[#5CAC32] hover:bg-[#5CAC32]/10 transition-colors"
                            title="Edit Profile"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInitiatePasswordReset(user)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Initiate Temporary Password Reset"
                          >
                            <KeyRound className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmStatusUser(user)}
                            className={`p-1.5 rounded-md transition-colors ${
                              user.status === 'Active'
                                ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                                : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                          >
                            {user.status === 'Active' ? (
                              <X className="h-3.5 w-3.5" />
                            ) : (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Creative Mobile Responsive Card Feed */}
            <div className="block md:hidden divide-y divide-slate-100">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                        {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 text-xs sm:text-sm truncate capitalize">
                          {user.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <span className="font-mono text-[#5CAC32] font-medium">{user.id}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                            {getRoleIcon(user.role)}
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 shrink-0">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span className="font-medium">{user.status}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-slate-700 font-medium truncate max-w-[200px]">{user.email}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Department:</span>
                      <span className="text-slate-700 font-medium">{user.department || 'General'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setViewingUser(user)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingUser(user);
                        setUserModalOpen(true);
                      }}
                      className="p-1.5 text-[#5CAC32] hover:text-[#4B9228] rounded-md bg-[#5CAC32]/10 hover:bg-[#5CAC32]/20 transition-colors"
                      title="Edit Profile"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInitiatePasswordReset(user)}
                      className="p-1.5 text-amber-600 hover:text-amber-700 rounded-md bg-amber-50 hover:bg-amber-100 transition-colors"
                      title="Reset Password"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmStatusUser(user)}
                      className={`p-1.5 rounded-md transition-colors ${
                        user.status === 'Active'
                          ? 'text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100'
                          : 'text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                      title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'Active' ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Check className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Enterprise Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredUsers.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              itemName="users"
            />
          </div>
        )}
      </div>

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={userModalOpen}
        onClose={() => {
          setUserModalOpen(false);
          setEditingUser(null);
        }}
        title={
          editingUser
            ? `Edit Profile: ${editingUser.name} (${editingUser.id})`
            : defaultModalRole === 'Student'
            ? 'Enroll New Student Account'
            : defaultModalRole === 'Teacher'
            ? 'Provision Faculty / Teacher Account'
            : defaultModalRole === 'Maintenance Staff'
            ? 'Provision Facilities Staff Account'
            : 'Provision Administrator Account'
        }
        maxWidth="max-w-xl"
      >
        <UserFormModalBody
          key={editingUser ? editingUser.id : `new-${defaultModalRole}`}
          userToEdit={editingUser}
          defaultRole={defaultModalRole}
          departments={departments}
          existingUsers={users}
          onSave={handleSaveUser}
          onCancel={() => {
            setUserModalOpen(false);
            setEditingUser(null);
          }}
        />
      </Modal>

      {/* View User Details Modal */}
      <Modal
        isOpen={Boolean(viewingUser)}
        onClose={() => setViewingUser(null)}
        title="Account Details"
        maxWidth="max-w-md"
      >
        {viewingUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="h-12 w-12 rounded-xl bg-[#5CAC32]/10 text-[#5CAC32] flex items-center justify-center font-bold text-lg">
                {viewingUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">{viewingUser.name}</h3>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-500">
                  {viewingUser.id}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[#64748B] block text-[11px]">System Role</span>
                <span className="font-semibold text-[#0F172A]">{viewingUser.role}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[#64748B] block text-[11px]">Account Status</span>
                <span className="font-semibold text-[#0F172A]">{viewingUser.status}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#64748B] block text-[11px]">Institutional Email</span>
                <span className="font-medium text-[#0F172A]">{viewingUser.email}</span>
              </div>
              <div>
                <span className="text-[#64748B] block text-[11px]">Department / Team</span>
                <span className="font-medium text-[#0F172A]">{viewingUser.department || '—'}</span>
              </div>
              {viewingUser.course && (
                <div>
                  <span className="text-[#64748B] block text-[11px]">Enrolled Course / Program</span>
                  <span className="font-medium text-[#0F172A]">{viewingUser.course}</span>
                </div>
              )}
              {viewingUser.academicYear && (
                <div>
                  <span className="text-[#64748B] block text-[11px]">Academic Year / Semester</span>
                  <span className="font-medium text-[#0F172A]">{viewingUser.academicYear}</span>
                </div>
              )}
              {viewingUser.designation && (
                <div>
                  <span className="text-[#64748B] block text-[11px]">Designation</span>
                  <span className="font-medium text-[#0F172A]">{viewingUser.designation}</span>
                </div>
              )}
              <div>
                <span className="text-[#64748B] block text-[11px]">Created Date</span>
                <span className="font-medium text-[#0F172A]">{viewingUser.createdDate || viewingUser.createdAt || '2026-08-15'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewingUser(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Screen / Modal for New Account Creation */}
      <Modal
        isOpen={Boolean(createdCredential)}
        onClose={() => setCreatedCredential(null)}
        title="Account Created — One-Time Temporary Credentials"
        maxWidth="max-w-md"
      >
        {createdCredential && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-[#15803D]">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Account Successfully Provisioned</p>
                <p className="text-[11px] mt-0.5 leading-relaxed">
                  The {createdCredential.user.role} profile for {createdCredential.user.name} has been enrolled into the directory.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Assigned ID:</span>
                <span className="font-mono font-bold text-[#0F172A]">{createdCredential.user.id}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Email:</span>
                <span className="font-medium text-[#0F172A]">{createdCredential.user.email}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#0F172A]">Temporary Password:</span>
                  {copied && <span className="text-[11px] font-bold text-emerald-600">Copied!</span>}
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-white rounded-md border border-slate-200 font-mono text-xs font-bold text-[#5CAC32] select-all">
                    {createdCredential.tempPassword}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopyCredentials(
                        `Institutional ID: ${createdCredential.user.id}\nEmail: ${createdCredential.user.email}\nTemporary Password: ${createdCredential.tempPassword}`
                      )
                    }
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            {/* Compliance Policy Notice */}
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/70 text-[11px] text-[#B45309] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                <span>Security Notice:</span>
              </div>
              <p className="leading-relaxed">
                The user is strictly required to change this temporary password upon their first login. This credential will not be displayed again.
              </p>
              <p className="text-[10px] text-amber-700/80 pt-1 border-t border-amber-200/50">
                Notice: Automated institutional email delivery is pending backend email service integration. Please convey these temporary credentials securely to the user.
              </p>
            </div>

            <div className="flex items-center justify-end pt-2">
              <Button variant="primary" onClick={() => setCreatedCredential(null)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Screen / Modal for Password Reset */}
      <Modal
        isOpen={Boolean(resetCredentialUser)}
        onClose={() => setResetCredentialUser(null)}
        title="Temporary Password Reset Initiated"
        maxWidth="max-w-md"
      >
        {resetCredentialUser && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#5CAC32]/10 border border-[#5CAC32]/20 flex items-start gap-2.5 text-xs text-[#4B9228]">
              <KeyRound className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Password Reset Successfully Generated</p>
                <p className="text-[11px] mt-0.5 leading-relaxed">
                  A new temporary credential has been generated for {resetCredentialUser.user.name} ({resetCredentialUser.user.id}).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#0F172A]">New Temporary Password:</span>
                {copied && <span className="text-[11px] font-bold text-emerald-600">Copied!</span>}
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-white rounded-md border border-slate-200 font-mono text-xs font-bold text-[#5CAC32] select-all">
                  {resetCredentialUser.tempPassword}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleCopyCredentials(
                      `Institutional ID: ${resetCredentialUser.user.id}\nNew Temporary Password: ${resetCredentialUser.tempPassword}`
                    )
                  }
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/70 text-[11px] text-[#B45309] space-y-1">
              <p className="leading-relaxed">
                Existing passwords are never revealed to administrators. The user must set a new permanent password on their next login attempt.
              </p>
              <p className="text-[10px] text-amber-700/80 pt-1 border-t border-amber-200/50">
                Notice: Automated institutional email delivery is pending backend email service integration. Please convey these temporary credentials securely to the user.
              </p>
            </div>

            <div className="flex items-center justify-end pt-2">
              <Button variant="primary" onClick={() => setResetCredentialUser(null)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal for Status Toggle */}
      <Modal
        isOpen={Boolean(confirmStatusUser)}
        onClose={() => setConfirmStatusUser(null)}
        title="Confirm Account Status Change"
        maxWidth="max-w-md"
      >
        {confirmStatusUser && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-50 text-[#B45309] shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F172A]">
                  {confirmStatusUser.status === 'Active'
                    ? `Deactivate ${confirmStatusUser.name}?`
                    : `Reactivate ${confirmStatusUser.name}?`}
                </h4>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  {confirmStatusUser.status === 'Active'
                    ? `Deactivating this user will suspend their institutional login access. No academic or operational records will be deleted.`
                    : `Reactivating this account will restore institutional login access and permitted portal actions for this user.`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
              <Button
                variant="outline"
                type="button"
                onClick={() => setConfirmStatusUser(null)}
              >
                Cancel
              </Button>
              <Button
                variant={confirmStatusUser.status === 'Active' ? 'warning' : 'primary'}
                type="button"
                onClick={() => handleToggleStatus(confirmStatusUser)}
              >
                Confirm {confirmStatusUser.status === 'Active' ? 'Deactivation' : 'Activation'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
