import { useState, useMemo } from 'react';
import {
  Home,
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Bed,
  Building,
  Users,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import {
  initialAdminHostels,
  initialAdminAllocations,
  initialAdminUsers,
} from '../../data/mockData';

// Subcomponent for Add/Edit Hostel Form
function HostelFormModalBody({ hostelToEdit, existingHostels, onSave, onCancel }) {
  const isEditing = Boolean(hostelToEdit);

  const [formData, setFormData] = useState({
    name: hostelToEdit?.name || '',
    type: hostelToEdit?.type || "Men's Residence",
    totalRooms: hostelToEdit?.totalRooms || 100,
    occupiedRooms: hostelToEdit?.occupiedRooms || 0,
    warden: hostelToEdit?.warden || '',
    status: hostelToEdit?.status || 'Active',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Hostel name is required.';
    if (Number(formData.totalRooms) <= 0) {
      errs.totalRooms = 'Total room capacity must be greater than 0.';
    }
    if (Number(formData.occupiedRooms) < 0) {
      errs.occupiedRooms = 'Occupied rooms cannot be negative.';
    }
    if (Number(formData.occupiedRooms) > Number(formData.totalRooms)) {
      errs.occupiedRooms = 'Occupied rooms cannot exceed total room capacity.';
    }
    if (!formData.warden.trim()) errs.warden = 'Chief warden name is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      onSave({
        ...hostelToEdit,
        name: formData.name.trim(),
        type: formData.type,
        totalRooms: Number(formData.totalRooms),
        occupiedRooms: Number(formData.occupiedRooms),
        warden: formData.warden.trim(),
        status: formData.status,
      });
    } else {
      const newId = `HST-0${existingHostels.length + 1}`;
      onSave({
        id: newId,
        name: formData.name.trim(),
        type: formData.type,
        totalRooms: Number(formData.totalRooms),
        occupiedRooms: Number(formData.occupiedRooms),
        warden: formData.warden.trim(),
        status: formData.status,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Hostel Residence Name <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Vindhyachal Student Hall"
          className={`w-full px-3 py-2 text-xs rounded-md border ${
            errors.name ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
          } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
        />
        {errors.name && <p className="text-[11px] text-[#DC2626] mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Hostel Type <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          >
            <option value="Men's Residence">Men&apos;s Residence</option>
            <option value="Women's Residence">Women&apos;s Residence</option>
            <option value="Postgraduate & Scholar">Postgraduate &amp; Scholar</option>
            <option value="Co-ed Residence">Co-ed Residence</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Status <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          >
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Total Room Capacity <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={formData.totalRooms}
            onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.totalRooms ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.totalRooms && <p className="text-[11px] text-[#DC2626] mt-1">{errors.totalRooms}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Occupied Rooms <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            min={0}
            value={formData.occupiedRooms}
            onChange={(e) => setFormData({ ...formData, occupiedRooms: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.occupiedRooms ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.occupiedRooms && (
            <p className="text-[11px] text-[#DC2626] mt-1">{errors.occupiedRooms}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Chief Residence Warden <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          value={formData.warden}
          onChange={(e) => setFormData({ ...formData, warden: e.target.value })}
          placeholder="e.g. Dr. H. S. Sharma"
          className={`w-full px-3 py-2 text-xs rounded-md border ${
            errors.warden ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
          } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
        />
        {errors.warden && <p className="text-[11px] text-[#DC2626] mt-1">{errors.warden}</p>}
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? 'Save Changes' : 'Create Hostel'}
        </Button>
      </div>
    </form>
  );
}

// Subcomponent for Allocating Student to Hostel
function AllocationFormModalBody({ hostels, existingAllocations, students, onSave, onCancel }) {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedHostelId, setSelectedHostelId] = useState(hostels[0]?.id || '');
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');

  const targetHostel = hostels.find((h) => h.id === selectedHostelId);
  const availableInHostel = targetHostel
    ? targetHostel.totalRooms - targetHostel.occupiedRooms
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      setError('Please select a student.');
      return;
    }
    if (!roomNumber.trim()) {
      setError('Room number is required.');
      return;
    }

    // Check duplicate student allocation
    const alreadyAllocated = existingAllocations.some(
      (a) => a.studentId === selectedStudentId && a.status === 'Allocated'
    );
    if (alreadyAllocated) {
      setError('This student already has an active room allocation.');
      return;
    }

    // Check hostel capacity
    if (availableInHostel <= 0) {
      setError('Selected hostel has zero available rooms. Select a different residence.');
      return;
    }

    const studentObj = students.find((s) => s.id === selectedStudentId);

    onSave({
      id: `ALC-${Date.now().toString().slice(-4)}`,
      studentId: selectedStudentId,
      studentName: studentObj ? studentObj.name : 'Enrolled Student',
      hostelId: selectedHostelId,
      hostelName: targetHostel ? targetHostel.name : '',
      roomNumber: roomNumber.trim().toUpperCase(),
      allocatedDate: new Date().toISOString().split('T')[0],
      status: 'Allocated',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Select Enrolled Student <span className="text-[#DC2626]">*</span>
        </label>
        <select
          value={selectedStudentId}
          onChange={(e) => {
            setSelectedStudentId(e.target.value);
            if (error) setError('');
          }}
          className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
        >
          <option value="">-- Choose Student --</option>
          {students.map((stu) => (
            <option key={stu.id} value={stu.id}>
              {stu.name} ({stu.id}) • {stu.department}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Hostel Residence <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={selectedHostelId}
            onChange={(e) => {
              setSelectedHostelId(e.target.value);
              if (error) setError('');
            }}
            className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          >
            {hostels.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.totalRooms - h.occupiedRooms} avail)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Room Number <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => {
              setRoomNumber(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. B-305"
            className="w-full px-3 py-2 text-xs uppercase font-mono rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          />
        </div>
      </div>

      {targetHostel && (
        <div className="p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-xs flex items-center justify-between">
          <span className="text-[#64748B]">Available Capacity in {targetHostel.name}:</span>
          <span className="font-bold text-[#0F172A]">
            {availableInHostel} / {targetHostel.totalRooms} rooms
          </span>
        </div>
      )}

      {error && (
        <div className="p-2.5 rounded bg-red-50 border border-red-200 text-xs text-[#DC2626]">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Confirm Allocation
        </Button>
      </div>
    </form>
  );
}

export default function AdminHostelManagement() {
  const [hostels, setHostels] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_hostels');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminHostels;
  });

  const [allocations, setAllocations] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_allocations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminAllocations;
  });

  // Students list from user directory
  const students = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_users');
    let userList = initialAdminUsers;
    if (saved) {
      try {
        userList = JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return userList.filter((u) => u.role === 'Student');
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [hostelModalOpen, setHostelModalOpen] = useState(false);
  const [editingHostel, setEditingHostel] = useState(null);
  const [viewingHostel, setViewingHostel] = useState(null);
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const saveHostels = (updated) => {
    setHostels(updated);
    localStorage.setItem('campus360_admin_hostels', JSON.stringify(updated));
  };

  const saveAllocations = (updated) => {
    setAllocations(updated);
    localStorage.setItem('campus360_admin_allocations', JSON.stringify(updated));
  };

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 4000);
  };

  // Metrics
  const totalRooms = hostels.reduce(
    (sum, h) => sum + Number(h.roomCapacity ?? h.totalRooms ?? 0),
    0
  );
  const occupiedRooms = hostels.reduce(
    (sum, h) => sum + Number(h.occupiedRooms ?? 0),
    0
  );
  const availableRooms = Math.max(0, totalRooms - occupiedRooms);
  const overallOccupancyPct =
    totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(1) : '0.0';

  const filteredHostels = useMemo(() => {
    return hostels.filter((h) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.id.toLowerCase().includes(q) ||
        h.warden.toLowerCase().includes(q);

      const matchesType = typeFilter === 'ALL' || h.type === typeFilter;
      const matchesStatus = statusFilter === 'ALL' || h.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [hostels, searchTerm, typeFilter, statusFilter]);

  const handleSaveHostel = (hostelRecord) => {
    if (editingHostel) {
      const updated = hostels.map((h) => (h.id === hostelRecord.id ? hostelRecord : h));
      saveHostels(updated);
      showNotification(`Hostel "${hostelRecord.name}" updated successfully.`);
    } else {
      const updated = [...hostels, hostelRecord];
      saveHostels(updated);
      showNotification(`Hostel "${hostelRecord.name}" created successfully.`);
    }
    setHostelModalOpen(false);
    setEditingHostel(null);
  };

  const handleSaveAllocation = (newAllocation) => {
    // Increment occupied rooms for target hostel
    const updatedHostels = hostels.map((h) =>
      h.id === newAllocation.hostelId ? { ...h, occupiedRooms: h.occupiedRooms + 1 } : h
    );
    saveHostels(updatedHostels);

    const updatedAllocations = [newAllocation, ...allocations];
    saveAllocations(updatedAllocations);

    setAllocationModalOpen(false);
    showNotification(`Student ${newAllocation.studentName} allocated to Room ${newAllocation.roomNumber} in ${newAllocation.hostelName}.`);
  };

  const [allocPage, setAllocPage] = useState(1);
  const allocPageSize = 5;
  const totalAllocPages = Math.ceil(allocations.length / allocPageSize) || 1;

  const paginatedAllocations = useMemo(() => {
    const start = (allocPage - 1) * allocPageSize;
    return allocations.slice(start, start + allocPageSize);
  }, [allocations, allocPage, allocPageSize]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hostel Management"
        description="Monitor residence halls, room capacity utilization, student residential allocations and warden desk."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'Hostel Management' },
        ]}
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {overallOccupancyPct}% Occupied
          </span>
        }
      />

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Overview Stat Cards - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Residence Halls</span>
              <Building className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {hostels.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Active campus blocks</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Total Capacity</span>
              <Bed className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalRooms}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Total student rooms</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Occupied Rooms</span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {occupiedRooms}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">{overallOccupancyPct}% occupancy</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Available Rooms</span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {availableRooms}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Vacant for allocation</p>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
          <div className="w-full sm:w-80 md:w-96 flex-shrink-0">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Search hostel, warden, or ID..."
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium shadow-2xs"
              >
                <option value="ALL">All Types</option>
                <option value="Men's Residence">Men&apos;s</option>
                <option value="Women's Residence">Women&apos;s</option>
                <option value="Postgraduate & Scholar">PG &amp; Scholar</option>
              </select>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium shadow-2xs"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setAllocationModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#5CAC32]/10 border border-[#5CAC32]/20 text-[#4B9228] hover:bg-[#5CAC32]/20 shadow-2xs transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5 text-[#5CAC32]" />
            <span>Allocate Student</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingHostel(null);
              setHostelModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#5CAC32] text-white hover:bg-[#4B9228] shadow-2xs transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Hostel</span>
          </button>
        </div>
      </div>

      {/* Hostel Residence Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
            Hostel Halls &amp; Capacity Overview
          </h3>
          <span className="text-[11px] text-[#64748B]">
            {filteredHostels.length} Active Halls
          </span>
        </div>

        {filteredHostels.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Home}
              title="No Hostels Found"
              description="No residence hall matches the query or filter."
            />
          </div>
        ) : (
          <div>
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[1040px]">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Hostel ID</th>
                    <th className="py-3.5 px-4 min-w-[240px]">Residence Name</th>
                    <th className="py-3.5 px-4 min-w-[150px] whitespace-nowrap">Type</th>
                    <th className="py-3.5 px-3 text-center whitespace-nowrap">Total</th>
                    <th className="py-3.5 px-3 text-center whitespace-nowrap">Occupied</th>
                    <th className="py-3.5 px-3 text-center whitespace-nowrap">Available</th>
                    <th className="py-3.5 px-4 min-w-[120px] whitespace-nowrap">Occupancy</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                  {filteredHostels.map((h) => {
                    const cap = Number(h.roomCapacity ?? h.totalRooms ?? 0);
                    const occ = Number(h.occupiedRooms ?? 0);
                    const avail = Math.max(0, cap - occ);
                    const pct = cap > 0 ? ((occ / cap) * 100).toFixed(1) : '0.0';
                    return (
                      <tr key={h.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 pl-6 pr-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium text-[11px] border border-slate-200/80 inline-block">
                            {h.id}
                          </span>
                        </td>
                        <td className="py-4 px-4 min-w-[240px]">
                          <div className="font-semibold text-[#0F172A] truncate text-xs">{h.name}</div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            Warden: {h.warden}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#475569] min-w-[150px] whitespace-nowrap">
                          {h.type}
                        </td>
                        <td className="py-4 px-3 text-center font-medium text-slate-700 whitespace-nowrap">
                          {cap}
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-slate-800">
                          {occ}
                        </td>
                        <td className="py-4 px-3 text-center font-bold text-emerald-600 whitespace-nowrap">
                          {avail}
                        </td>
                        <td className="py-4 px-4 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="w-14 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-[#5CAC32] h-1.5 rounded-full"
                                style={{ width: `${Math.min(100, Number(pct))}%` }}
                              />
                            </div>
                            <span className="font-semibold text-xs text-slate-700">{pct}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 truncate">
                          <Badge variant={h.status === 'Active' ? 'success' : 'warning'}>
                            {h.status}
                          </Badge>
                        </td>
                        <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewingHostel(h)}
                              className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingHostel(h);
                                setHostelModalOpen(true);
                              }}
                              className="p-1.5 rounded-md text-slate-400 hover:text-[#5CAC32] hover:bg-[#5CAC32]/10 transition-colors"
                              title="Edit Hostel"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Creative Mobile Responsive Card Feed */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredHostels.map((h) => {
                const cap = Number(h.roomCapacity ?? h.totalRooms ?? 0);
                const occ = Number(h.occupiedRooms ?? 0);
                const avail = Math.max(0, cap - occ);
                const pct = cap > 0 ? ((occ / cap) * 100).toFixed(1) : '0.0';
                return (
                  <div key={h.id} className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[11px] font-semibold text-[#5CAC32] bg-[#5CAC32]/10 px-2 py-0.5 rounded border border-[#5CAC32]/20 inline-block mb-1">
                          {h.id}
                        </span>
                        <h4 className="font-semibold text-slate-900 text-sm">{h.name}</h4>
                        <p className="text-xs text-slate-500">{h.type} • Warden: {h.warden}</p>
                      </div>
                      <Badge variant={h.status === 'Active' ? 'success' : 'warning'}>
                        {h.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total</span>
                        <span className="font-bold text-slate-800 text-xs">{cap}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Occupied</span>
                        <span className="font-bold text-[#5CAC32] text-xs">{occ}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Available</span>
                        <span className="font-bold text-emerald-600 text-xs">{avail}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>Occupancy</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#5CAC32] h-1.5 rounded-full"
                          style={{ width: `${Math.min(100, Number(pct))}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setViewingHostel(h)}
                        className="px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Details</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHostel(h);
                          setHostelModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-md bg-[#5CAC32]/10 hover:bg-[#5CAC32]/20 text-[#4B9228] text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Student Allocations Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-[#5CAC32]" />
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
              Student Room Allocation Records
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B]">
            {allocations.length} Active Records
          </span>
        </div>

        <div>
          {/* Desktop / Tablet Table View */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[960px]">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Student ID</th>
                  <th className="py-2.5 px-4">Student Name</th>
                  <th className="py-2.5 px-4">Hostel Residence</th>
                  <th className="py-2.5 px-4">Room No.</th>
                  <th className="py-2.5 px-4">Allocated Date</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                {paginatedAllocations.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-600 text-[11px] truncate">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80 inline-block">
                        {a.studentId}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#0F172A] truncate">
                      {a.studentName}
                    </td>
                    <td className="py-3 px-4 text-[#475569] truncate">
                      {a.hostelName}
                    </td>
                    <td className="py-3 px-4 truncate">
                      <span className="font-mono font-semibold text-slate-800">
                        {a.roomNumber}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 truncate text-[11px]">
                      {a.allocatedDate}
                    </td>
                    <td className="py-3 px-4 truncate">
                      <Badge variant="success">
                        {a.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Creative Mobile Responsive Card Feed */}
          <div className="block md:hidden divide-y divide-slate-100">
            {paginatedAllocations.map((a) => (
              <div key={a.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block">{a.studentId}</span>
                    <h4 className="font-semibold text-slate-900 text-xs">{a.studentName}</h4>
                  </div>
                  <Badge variant="success">
                    {a.status}
                  </Badge>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Residence</span>
                    <span className="font-medium text-slate-800">{a.hostelName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Room</span>
                    <span className="font-mono font-bold text-slate-900">{a.roomNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={allocPage}
            totalPages={totalAllocPages}
            totalItems={allocations.length}
            pageSize={allocPageSize}
            onPageChange={setAllocPage}
            itemName="allocations"
          />
        </div>
      </div>

      {/* Add / Edit Hostel Modal */}
      <Modal
        isOpen={hostelModalOpen}
        onClose={() => {
          setHostelModalOpen(false);
          setEditingHostel(null);
        }}
        title={editingHostel ? `Edit Hostel: ${editingHostel.name}` : 'Create Hostel Residence'}
        maxWidth="max-w-md"
      >
        <HostelFormModalBody
          key={editingHostel ? editingHostel.id : 'new-hostel'}
          hostelToEdit={editingHostel}
          existingHostels={hostels}
          onSave={handleSaveHostel}
          onCancel={() => {
            setHostelModalOpen(false);
            setEditingHostel(null);
          }}
        />
      </Modal>

      {/* Student Allocation Modal */}
      <Modal
        isOpen={allocationModalOpen}
        onClose={() => setAllocationModalOpen(false)}
        title="Allocate Student to Hostel Room"
        maxWidth="max-w-md"
      >
        <AllocationFormModalBody
          hostels={hostels}
          existingAllocations={allocations}
          students={students}
          onSave={handleSaveAllocation}
          onCancel={() => setAllocationModalOpen(false)}
        />
      </Modal>

      {/* View Hostel Details Modal */}
      <Modal
        isOpen={Boolean(viewingHostel)}
        onClose={() => setViewingHostel(null)}
        title="Hostel Residence Information"
        maxWidth="max-w-md"
      >
        {viewingHostel && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0]">
              <div className="p-2.5 rounded-lg bg-[#5CAC32]/10 border border-[#5CAC32]/20 text-[#5CAC32]">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">{viewingHostel.name}</h3>
                <div className="text-xs text-[#64748B] mt-0.5">{viewingHostel.type}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Chief Warden</span>
                <span className="font-bold text-[#0F172A]">{viewingHostel.warden}</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Operational Status</span>
                <Badge variant={viewingHostel.status === 'Active' ? 'success' : 'warning'}>
                  {viewingHostel.status}
                </Badge>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Total Room Capacity</span>
                <span className="font-bold text-[#0F172A]">{viewingHostel.totalRooms} Rooms</span>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-[#15803D] block text-[11px] font-semibold">Vacant Rooms</span>
                <span className="font-bold text-[#15803D]">
                  {Math.max(0, viewingHostel.totalRooms - viewingHostel.occupiedRooms)} Rooms Available
                </span>
              </div>
            </div>

            <div className="p-3 rounded bg-amber-50 border border-amber-200 text-[11px] text-[#B45309] flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Capacity allocations enforce room vacancy constraints automatically during student check-in.
              </span>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#E2E8F0]">
              <Button variant="outline" onClick={() => setViewingHostel(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
