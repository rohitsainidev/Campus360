import { useState, useMemo } from 'react';
import {
  Users,
  Filter,
  Eye,
  GraduationCap,
  CalendarCheck,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import StudentDetailsModal from '../../components/teacher/StudentDetailsModal';
import {
  initialTeacherStudents,
  teacherCourses,
  teacherSemesters,
} from '../../data/mockData';

export default function TeacherStudents() {
  const [students] = useState(initialTeacherStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [semesterFilter, setSemesterFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        student.name.toLowerCase().includes(term) ||
        student.id.toLowerCase().includes(term) ||
        (student.rollNo && student.rollNo.toLowerCase().includes(term)) ||
        student.email.toLowerCase().includes(term);

      const matchesCourse =
        courseFilter === 'ALL' || student.course === courseFilter;

      const matchesSemester =
        semesterFilter === 'ALL' || student.semester === semesterFilter;

      const matchesStatus =
        statusFilter === 'ALL' || student.academicStatus === statusFilter;

      return matchesSearch && matchesCourse && matchesSemester && matchesStatus;
    });
  }, [students, searchTerm, courseFilter, semesterFilter, statusFilter]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    courseFilter !== 'ALL' ||
    semesterFilter !== 'ALL' ||
    statusFilter !== 'ALL';

  const handleResetFilters = () => {
    setSearchTerm('');
    setCourseFilter('ALL');
    setSemesterFilter('ALL');
    setStatusFilter('ALL');
  };

  const handleOpenStudentDetails = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  // Status badge styling helper
  const getStatusBadge = (status, attendance) => {
    if (status === 'At Risk' || attendance < 75) {
      return (
        <span className="text-xs font-semibold text-rose-600">
          At Risk
        </span>
      );
    }
    if (status === 'Excellent') {
      return (
        <span className="text-xs font-semibold text-emerald-600">
          Excellent
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold text-slate-600">
        {status || 'Active'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Students Directory"
        description="Comprehensive roster of enrolled students across your assigned courses and practical laboratory cohorts."
        breadcrumbs={[
          { label: 'Teacher Portal', path: '/teacher/dashboard' },
          { label: 'Students' },
        ]}
        badge={
          <Badge variant="primary" dot>
            {filteredStudents.length} Students Listed
          </Badge>
        }
      />

      {/* Roster Metrics - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Enrolled
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {students.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Students</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Across department cohorts
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Good Standing
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {students.filter((s) => s.attendancePercentage >= 75).length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Regular</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              ≥ 75% attendance criteria
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Attendance At-Risk
              </span>
              <AlertTriangle className="h-4 w-4 text-rose-500 transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {students.filter((s) => s.attendancePercentage < 75 || s.academicStatus === 'At Risk').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Critical</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Requires intervention
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Active Cohorts
              </span>
              <GraduationCap className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {teacherCourses.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Courses</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Assigned programs
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search by student name, ID, or roll number..."
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

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E2E8F0] text-xs">
          {/* Course Filter */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1.5 text-[11px]">
              <GraduationCap className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Course / Degree</span>
            </label>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Enrolled Courses</option>
              {teacherCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1.5 text-[11px]">
              <CalendarCheck className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Academic Semester</span>
            </label>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Semesters</option>
              {teacherSemesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1.5 text-[11px]">
              <Filter className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Academic Status</span>
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active (In Good Standing)</option>
              <option value="Excellent">Excellent (Honors Standing)</option>
              <option value="At Risk">At Risk (&lt;75% Attendance)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Table */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          title="No student records match your criteria"
          description="Try adjusting your search query, or clear active course and semester filters."
          icon={Users}
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <caption className="sr-only">Student Directory Table</caption>
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="px-4 py-3.5">
                    Student ID
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Student Name
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Course & Semester
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center">
                    Attendance
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
                {filteredStudents.map((student) => {
                  const isLowAttendance = student.attendancePercentage < 75;
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                      onClick={() => handleOpenStudentDetails(student)}
                    >
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-medium text-[#64748B]">
                        {student.id}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center font-bold text-xs shrink-0">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-[#0F172A] block leading-tight">
                              {student.name}
                            </span>
                            <span className="text-[11px] text-[#64748B] block font-mono">
                              Roll: {student.rollNo}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-medium text-[#0F172A] block">
                          {student.course}
                        </span>
                        <span className="text-[11px] text-[#64748B] block">
                          {student.semester} {student.section ? `• Sec ${student.section}` : ''}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[#475569]">
                        <span className="truncate block max-w-[180px]">{student.email}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`font-bold inline-flex items-center gap-1 ${
                            isLowAttendance ? 'text-[#DC2626]' : 'text-[#15803D]'
                          }`}
                        >
                          {isLowAttendance && <AlertTriangle className="h-3 w-3" />}
                          {student.attendancePercentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        {getStatusBadge(student.academicStatus, student.attendancePercentage)}
                      </td>
                      <td
                        className="px-4 py-3.5 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Eye}
                          onClick={() => handleOpenStudentDetails(student)}
                          className="text-xs py-1 px-2.5"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
            <span>
              Showing {filteredStudents.length} of {students.length} student records
            </span>
            <span className="text-[11px]">
              Click any student row or "View Details" to open the academic evaluation card.
            </span>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      <StudentDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
}
