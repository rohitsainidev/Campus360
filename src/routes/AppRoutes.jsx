import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Services from '../pages/public/Services';
import Contact from '../pages/public/Contact';

// Auth Pages
import PortalSelection from '../pages/auth/PortalSelection';
import RoleLogin from '../pages/auth/RoleLogin';
import StudentRegister from '../pages/auth/StudentRegister';
import ForgotPassword from '../pages/auth/ForgotPassword';
import AdminSetup from '../pages/auth/AdminSetup';

// Student Portal Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentProfile from '../pages/student/Profile';
import StudentAttendance from '../pages/student/Attendance';
import StudentAssignments from '../pages/student/Assignments';
import StudentComplaints from '../pages/student/Complaints';
import StudentHostel from '../pages/student/Hostel';
import StudentLibrary from '../pages/student/Library';
import StudentPlacements from '../pages/student/Placements';
import StudentNotices from '../pages/student/Notices';
import StudentFees from '../pages/student/Fees';
import StudentExams from '../pages/student/Exams';

// Teacher Portal Pages (Phase 5)
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherStudents from '../pages/teacher/Students';
import TeacherAttendance from '../pages/teacher/Attendance';
import TeacherAssignments from '../pages/teacher/Assignments';
import TeacherExams from '../pages/teacher/TeacherExams';

// Maintenance Staff Portal Pages (Phase 6)
import StaffDashboard from '../pages/staff/Dashboard';
import StaffTasks from '../pages/staff/Tasks';
import StaffMaintenance from '../pages/staff/Maintenance';

// Administrators Portal Pages (Phase 7)
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminDepartments from '../pages/admin/Departments';
import AdminComplaints from '../pages/admin/Complaints';
import AdminHostelManagement from '../pages/admin/HostelManagement';
import AdminLibraryManagement from '../pages/admin/LibraryManagement';
import AdminPlacementManagement from '../pages/admin/PlacementManagement';
import AdminReports from '../pages/admin/Reports';
import AdminNotices from '../pages/admin/AdminNotices';
import AdminFees from '../pages/admin/AdminFees';
import AdminExams from '../pages/admin/AdminExams';

// Dashboard Preview component (for Phase 3 verification)
import DashboardPreview from '../pages/public/DashboardPreview';

function DashboardPreviewRoute({ defaultRole = 'student' }) {
  const [role, setRole] = useState(defaultRole);

  return (
    <DashboardLayout activeRole={role} onRoleChange={setRole}>
      <DashboardPreview activeRole={role} />
    </DashboardLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication Pages wrapped in AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PortalSelection />} />
        <Route path="/portals" element={<PortalSelection />} />
        <Route path="/login/student" element={<RoleLogin role="student" />} />
        <Route path="/login/teacher" element={<RoleLogin role="teacher" />} />
        <Route path="/login/staff" element={<RoleLogin role="staff" />} />
        <Route path="/login/admin" element={<RoleLogin role="admin" />} />
        <Route path="/admin/setup" element={<AdminSetup />} />
        <Route path="/login/admin/setup" element={<AdminSetup />} />
        <Route path="/register" element={<Navigate to="/register/student" replace />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Complete Student Portal */}
      <Route path="/student" element={<DashboardLayout activeRole="student" />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="notices" element={<StudentNotices />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="exams" element={<StudentExams />} />
        <Route path="complaints" element={<StudentComplaints />} />
        <Route path="hostel" element={<StudentHostel />} />
        <Route path="library" element={<StudentLibrary />} />
        <Route path="placements" element={<StudentPlacements />} />
      </Route>

      {/* Complete Teacher Portal */}
      <Route path="/teacher" element={<DashboardLayout activeRole="teacher" />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="notices" element={<StudentNotices />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="exams" element={<TeacherExams />} />
      </Route>

      {/* Complete Maintenance Staff Portal */}
      <Route path="/staff" element={<DashboardLayout activeRole="staff" />}>
        <Route index element={<Navigate to="/staff/dashboard" replace />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="notices" element={<StudentNotices />} />
        <Route path="tasks" element={<StaffTasks />} />
        <Route path="maintenance" element={<StaffMaintenance />} />
      </Route>

      {/* Phase 3 Architecture Previews for upcoming portals */}
      <Route
        path="/dashboard-preview"
        element={<DashboardPreviewRoute defaultRole="student" />}
      />

      {/* Complete Administrators Portal */}
      <Route path="/admin" element={<DashboardLayout activeRole="admin" />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="fees" element={<AdminFees />} />
        <Route path="exams" element={<AdminExams />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="hostel" element={<AdminHostelManagement />} />
        <Route path="library" element={<AdminLibraryManagement />} />
        <Route path="placements" element={<AdminPlacementManagement />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
