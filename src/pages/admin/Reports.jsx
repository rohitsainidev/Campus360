import { useState, useMemo } from 'react';
import {
  Download,
  AlertCircle,
  Users,
  Home,
  BookOpen,
  Briefcase,
  Wrench,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import {
  initialAdminUsers,
  initialStaffRequests,
  initialAdminHostels,
  initialAdminBooks,
  initialStudentPlacements,
} from '../../data/mockData';

// Utility to export CSV cleanly with RFC 4180 escaping
function exportToCsv(filename, headers, rows) {
  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvLines = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => row.map(escapeCsv).join(',')),
  ];

  const blob = new Blob([csvLines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminReports() {
  // Load data sources from localStorage or initial mock data
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

  const complaints = useMemo(() => {
    const saved = localStorage.getItem('campus360_staff_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStaffRequests;
  }, []);

  const hostels = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_hostels');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminHostels;
  }, []);

  const books = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_books');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminBooks;
  }, []);

  const placements = useMemo(() => {
    const saved = localStorage.getItem('campus360_student_placements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentPlacements;
  }, []);

  // Time scope / Date filter
  // Options: 'ALL' (All Records), 'LAST_30' (Past 30 Days), 'OCT_2026' (October 2026)
  const [dateScope, setDateScope] = useState('ALL');
  const [exportNotice, setExportNotice] = useState('');

  const triggerExportNotice = (msg) => {
    setExportNotice(msg);
    setTimeout(() => setExportNotice(''), 4000);
  };

  // Filtered Complaints by date scope
  const filteredComplaints = useMemo(() => {
    if (dateScope === 'ALL') return complaints;
    if (dateScope === 'OCT_2026') {
      return complaints.filter((c) => c.reportedDate && c.reportedDate.startsWith('2026-10'));
    }
    if (dateScope === 'LAST_30') {
      return complaints.filter((c) => {
        if (!c.reportedDate) return false;
        return c.reportedDate >= '2026-09-15';
      });
    }
    return complaints;
  }, [complaints, dateScope]);

  // User Distribution calculations
  const totalUsers = users.length;
  const roleCounts = useMemo(() => {
    const counts = {
      Student: 0,
      Teacher: 0,
      'Maintenance Staff': 0,
      Administrator: 0,
    };
    users.forEach((u) => {
      if (counts[u.role] !== undefined) counts[u.role] += 1;
      else counts[u.role] = 1;
    });
    return counts;
  }, [users]);

  // Complaint Status Summary
  const complaintStats = useMemo(() => {
    const total = filteredComplaints.length;
    const submitted = filteredComplaints.filter((c) => c.status === 'Submitted').length;
    const inProgress = filteredComplaints.filter((c) => c.status === 'In Progress' || c.status === 'Assigned').length;
    const resolved = filteredComplaints.filter((c) => c.status === 'Resolved').length;
    return { total, submitted, inProgress, resolved };
  }, [filteredComplaints]);

  // Maintenance Tasks
  const maintenanceStats = useMemo(() => {
    const total = filteredComplaints.length;
    const unassigned = filteredComplaints.filter((c) => !c.assignedStaffName || c.assignedStaffName === 'Unassigned').length;
    const inProgress = filteredComplaints.filter((c) => c.status === 'In Progress').length;
    const resolved = filteredComplaints.filter((c) => c.status === 'Resolved').length;
    return { total, unassigned, inProgress, resolved };
  }, [filteredComplaints]);

  // Hostel Occupancy
  const totalHostelRooms = hostels.reduce((sum, h) => sum + h.totalRooms, 0);
  const totalHostelOccupied = hostels.reduce((sum, h) => sum + h.occupiedRooms, 0);
  const totalHostelAvailable = totalHostelRooms - totalHostelOccupied;
  const overallHostelOccupancyPct = totalHostelRooms > 0 ? ((totalHostelOccupied / totalHostelRooms) * 100).toFixed(1) : '0.0';

  // Library Inventory
  const totalBookTitles = books.length;
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const issuedCopies = totalCopies - availableCopies;

  // Placement Opportunities
  const activeDrives = placements.filter((p) => p.status !== 'Closed').length;
  const fulltimeDrives = placements.filter((p) => p.jobType === 'Full-time').length;
  const internshipDrives = placements.filter((p) => p.jobType === 'Internship').length;

  // CSV Export Handlers
  const handleExportUsers = () => {
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Department', 'Status', 'Created Date'];
    const rows = users.map((u) => [
      u.id,
      u.name,
      u.email,
      u.role,
      u.department || 'N/A',
      u.status,
      u.createdAt || '2026-08-15',
    ]);
    exportToCsv('campus360_user_directory_report.csv', headers, rows);
    triggerExportNotice('User directory report exported as CSV.');
  };

  const handleExportComplaints = () => {
    const headers = ['Ticket ID', 'Title', 'Category', 'Location', 'Priority', 'Reported Date', 'Status', 'Assigned Staff', 'Resolution Date'];
    const rows = filteredComplaints.map((c) => [
      c.id,
      c.title,
      c.category,
      c.location,
      c.priority,
      c.reportedDate,
      c.status,
      c.assignedStaffName || 'Unassigned',
      c.resolvedDate || 'Pending',
    ]);
    exportToCsv('campus360_complaints_report.csv', headers, rows);
    triggerExportNotice(`Complaints report (${filteredComplaints.length} records) exported as CSV.`);
  };

  const handleExportHostels = () => {
    const headers = ['Hostel ID', 'Name', 'Type', 'Total Rooms', 'Occupied Rooms', 'Available Rooms', 'Occupancy Pct', 'Warden', 'Status'];
    const rows = hostels.map((h) => {
      const avail = h.totalRooms - h.occupiedRooms;
      const pct = h.totalRooms > 0 ? ((h.occupiedRooms / h.totalRooms) * 100).toFixed(1) + '%' : '0%';
      return [
        h.id,
        h.name,
        h.type,
        h.totalRooms,
        h.occupiedRooms,
        avail,
        pct,
        h.warden,
        h.status,
      ];
    });
    exportToCsv('campus360_hostel_occupancy_report.csv', headers, rows);
    triggerExportNotice('Hostel occupancy report exported as CSV.');
  };

  const handleExportLibrary = () => {
    const headers = ['Book ID', 'Title', 'Author', 'Category', 'ISBN', 'Total Copies', 'Available Copies', 'Shelf Location'];
    const rows = books.map((b) => [
      b.id,
      b.title,
      b.author,
      b.category,
      b.isbn || 'N/A',
      b.totalCopies,
      b.availableCopies,
      b.shelfLocation,
    ]);
    exportToCsv('campus360_library_inventory_report.csv', headers, rows);
    triggerExportNotice('Library inventory report exported as CSV.');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Institutional Analytics & Reports"
        description="Comprehensive administrative metrics, operational reports and compliance registers across campus domains."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'Reports' },
        ]}
      />

      {exportNotice && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="font-medium">{exportNotice}</span>
        </div>
      )}

      {/* Date Scope Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#5CAC32]" />
          <span className="text-xs font-semibold text-slate-800">Date Range Filter</span>
        </div>

        <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-100 text-xs">
          {[
            { id: 'ALL', label: 'All Time' },
            { id: 'LAST_30', label: 'Past 30 Days' },
            { id: 'OCT_2026', label: 'October 2026' },
          ].map((scope) => {
            const active = dateScope === scope.id;
            return (
              <button
                key={scope.id}
                type="button"
                onClick={() => setDateScope(scope.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#5CAC32] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {scope.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Grid: Reports 1 & 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* User Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-[#5CAC32]" />
                <h3 className="text-sm font-bold text-slate-900">User Distribution</h3>
              </div>
              <button
                type="button"
                onClick={handleExportUsers}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              >
                <Download className="h-3 w-3 text-slate-500" />
                Export CSV
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Registered stakeholders distributed across academic and administrative roles.
            </p>

            <div className="space-y-3">
              {Object.entries(roleCounts).map(([role, count]) => {
                const pct = totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(1) : 0;
                const roleColors = {
                  Student: 'bg-[#5CAC32]',
                  Teacher: 'bg-blue-600',
                  'Maintenance Staff': 'bg-amber-500',
                  Administrator: 'bg-purple-600',
                };
                const barColor = roleColors[role] || 'bg-[#5CAC32]';

                return (
                  <div key={role} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{role}</span>
                      <span className="text-slate-500 font-medium">
                        {count} <span className="text-slate-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${barColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Total Enrolled Accounts</span>
            <span className="font-bold text-[#5CAC32]">{totalUsers} Users</span>
          </div>
        </div>

        {/* Complaint Status Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Complaint Resolution</h3>
              </div>
              <button
                type="button"
                onClick={handleExportComplaints}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              >
                <Download className="h-3 w-3 text-slate-500" />
                Export CSV
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Grievance tickets and triage progress for the selected date scope.
            </p>

            <div className="grid grid-cols-3 gap-3.5 sm:gap-4">
              <div className="p-3.5 rounded-xl border border-amber-200/70 bg-amber-50/50 text-center">
                <div className="text-lg sm:text-xl font-bold text-amber-600 leading-tight">{complaintStats.submitted}</div>
                <div className="text-xs font-semibold text-amber-900 mt-1.5">Submitted</div>
                <div className="text-[11px] font-medium text-amber-600 mt-0.5">
                  {complaintStats.total > 0
                    ? Math.round((complaintStats.submitted / complaintStats.total) * 100)
                    : 0}
                  % of total
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-blue-200/70 bg-blue-50/50 text-center">
                <div className="text-lg sm:text-xl font-bold text-blue-600 leading-tight">{complaintStats.inProgress}</div>
                <div className="text-xs font-semibold text-blue-900 mt-1.5">In Progress</div>
                <div className="text-[11px] font-medium text-blue-600 mt-0.5">
                  {complaintStats.total > 0
                    ? Math.round((complaintStats.inProgress / complaintStats.total) * 100)
                    : 0}
                  % of total
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-emerald-200/70 bg-emerald-50/50 text-center">
                <div className="text-lg sm:text-xl font-bold text-emerald-600 leading-tight">{complaintStats.resolved}</div>
                <div className="text-xs font-semibold text-emerald-900 mt-1.5">Resolved</div>
                <div className="text-[11px] font-medium text-emerald-600 mt-0.5">
                  {complaintStats.total > 0
                    ? Math.round((complaintStats.resolved / complaintStats.total) * 100)
                    : 0}
                  % of total
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Total Grievances: {complaintStats.total}</span>
            <span className="font-semibold text-emerald-600">
              Resolution Rate: {complaintStats.total > 0 ? Math.round((complaintStats.resolved / complaintStats.total) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Reports 3 & 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Task Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Wrench className="h-4.5 w-4.5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Facility Maintenance</h3>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                Operations
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Physical engineering assignments and repairs dispatched to staff.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Total Dispatched Tasks</span>
                <span className="font-bold text-slate-900">{maintenanceStats.total}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Pending Assignment</span>
                <span className="font-bold text-amber-600">{maintenanceStats.unassigned}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">In Active Repair</span>
                <span className="font-bold text-blue-600">{maintenanceStats.inProgress}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Completed &amp; Certified</span>
                <span className="font-bold text-emerald-600">{maintenanceStats.resolved}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Linked to Maintenance Desk</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active Dispatch
            </span>
          </div>
        </div>

        {/* Hostel Occupancy */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Home className="h-4.5 w-4.5 text-violet-600" />
                <h3 className="text-sm font-bold text-slate-900">Hostel Occupancy</h3>
              </div>
              <button
                type="button"
                onClick={handleExportHostels}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              >
                <Download className="h-3 w-3 text-slate-500" />
                Export CSV
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Capacity utilization breakdown across residential campus halls.
            </p>

            <div className="space-y-3">
              {hostels.map((h) => {
                const pct = h.totalRooms > 0 ? ((h.occupiedRooms / h.totalRooms) * 100).toFixed(1) : 0;
                return (
                  <div key={h.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{h.name}</span>
                      <span className="text-slate-500 font-medium">
                        {h.occupiedRooms} / {h.totalRooms} rooms <span className="font-semibold text-violet-600">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Capacity: {totalHostelRooms} Rooms ({totalHostelAvailable} Vacant)</span>
            <span className="font-bold text-violet-700">{overallHostelOccupancyPct}% Total Occupancy</span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Reports 5 & 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Library Inventory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Library Inventory</h3>
              </div>
              <button
                type="button"
                onClick={handleExportLibrary}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              >
                <Download className="h-3 w-3 text-slate-500" />
                Export CSV
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Catalogue volumes, shelf availability and circulating copy metrics.
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{totalBookTitles}</div>
                <div className="text-xs font-semibold text-slate-700 mt-1.5">Titles</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Catalogued</div>
              </div>
              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/70">
                <div className="text-lg sm:text-xl font-bold text-emerald-600 leading-tight">{availableCopies}</div>
                <div className="text-xs font-semibold text-emerald-900 mt-1.5">On Shelf</div>
                <div className="text-[11px] font-medium text-emerald-600 mt-0.5">Available</div>
              </div>
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/70">
                <div className="text-lg sm:text-xl font-bold text-blue-600 leading-tight">{issuedCopies}</div>
                <div className="text-xs font-semibold text-blue-900 mt-1.5">Circulating</div>
                <div className="text-[11px] font-medium text-blue-600 mt-0.5">Issued Out</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Total Copies: {totalCopies}</span>
            <span className="font-semibold text-emerald-600">
              Shelf Availability: {totalCopies > 0 ? Math.round((availableCopies / totalCopies) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Placement Opportunities */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4.5 w-4.5 text-[#5CAC32]" />
                <h3 className="text-sm font-bold text-slate-900">Placement Drives</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#4B9228] bg-[#5CAC32]/10 px-2 py-0.5 rounded-md border border-[#5CAC32]/20">
                Corporate Outreach
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Corporate outreach and active campus recruitment drive status.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Active Corporate Drives</span>
                <span className="font-bold text-[#5CAC32]">{activeDrives} Drives</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Full-time Roles</span>
                <span className="font-bold text-blue-600">{fulltimeDrives} Drives</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Internship Positions</span>
                <span className="font-bold text-purple-600">{internshipDrives} Drives</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Total Openings</span>
                <span className="font-bold text-slate-900">{placements.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Graduating Batch 2027</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Recruitment Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
