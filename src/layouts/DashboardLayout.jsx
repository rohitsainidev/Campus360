import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, X, User, LogOut, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { portalNavigations } from '../data/navigation';

export default function DashboardLayout({
  activeRole: propRole,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotificationsDemo, setShowNotificationsDemo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine role from prop or route path
  let currentRole = propRole || 'student';
  if (!propRole) {
    if (location.pathname.startsWith('/teacher')) currentRole = 'teacher';
    else if (location.pathname.startsWith('/staff')) currentRole = 'staff';
    else if (location.pathname.startsWith('/admin')) currentRole = 'admin';
  }

  const roleTitles = {
    student: 'Student Portal',
    teacher: 'Teacher Portal',
    staff: 'Maintenance Staff Portal',
    admin: 'Administrator Console',
  };

  const defaultMockUsers = {
    student: { name: 'Alex Johnson', role: 'Student', id: 'STU-2026-081', email: 'alex.johnson@campus360.edu' },
    teacher: { name: 'Dr. Sarah Patel', role: 'Teacher', id: 'FAC-104', email: 'sarah.patel@campus360.edu' },
    staff: { name: 'Michael Chen', role: 'Maintenance Staff', id: 'STF-029', email: 'michael.chen@campus360.edu' },
    admin: { name: 'Elena Rostova', role: 'Administrator', id: 'ADM-001', email: 'admin@campus360.edu' },
  };

  const roleKeyMap = {
    Student: 'student',
    Teacher: 'teacher',
    'Maintenance Staff': 'staff',
    Staff: 'staff',
    Administrator: 'admin',
    Admin: 'admin',
    student: 'student',
    teacher: 'teacher',
    staff: 'staff',
    admin: 'admin',
  };

  // Enforce role-based access control
  useEffect(() => {
    const storedAuth = localStorage.getItem('campus360_auth_user');
    if (!storedAuth) {
      navigate(`/login/${currentRole}`, { replace: true });
      return;
    }
    try {
      const parsed = JSON.parse(storedAuth);
      const userRoleKey = roleKeyMap[parsed.role];
      if (userRoleKey && userRoleKey !== currentRole) {
        // Redirect to their authorized role dashboard
        navigate(`/${userRoleKey}/dashboard`, { replace: true });
      }
    } catch {
      navigate(`/login/${currentRole}`, { replace: true });
    }
  }, [currentRole, navigate]);

  // Check if an authenticated user session exists in localStorage
  let currentUser = defaultMockUsers[currentRole] || defaultMockUsers.student;
  const storedAuth = localStorage.getItem('campus360_auth_user');
  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth);
      if (roleKeyMap[parsed.role] === currentRole) {
        currentUser = {
          name: parsed.name || parsed.fullName || currentUser.name,
          role: parsed.role || currentUser.role,
          id: parsed.id || parsed.identifier || currentUser.id,
          email: parsed.email || currentUser.email,
        };
      }
    } catch {
      // fallback to mock
    }
  }

  const navItems = portalNavigations[currentRole] || portalNavigations.student;

  const handleLogout = () => {
    localStorage.removeItem('campus360_auth_user');
    navigate('/login');
  };

  const demoNotifications = [
    {
      id: 1,
      title: 'Schedule Notice',
      text: 'Semester registration verification protocol is now active.',
      time: '10m ago',
    },
    {
      id: 2,
      title: 'Facility Maintenance',
      text: 'Scheduled network inspection in Academic Block A today at 4 PM.',
      time: '1h ago',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex">
      {/* Sidebar Component */}
      <Sidebar
        title={roleTitles[currentRole]}
        navigationItems={navItems}
        user={currentUser}
        isMobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport Area */}
      <div className="flex-1 flex flex-col lg:pl-52 min-w-0 overflow-x-hidden">
        {/* Dashboard Header */}
        <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 transition-colors">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
              aria-label="Open navigation sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Portal Title */}
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-sm sm:text-base text-[#0F172A] tracking-tight">
                {roleTitles[currentRole]}
              </span>
            </div>
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-3">
            {/* Notifications Button with demo dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotificationsDemo(!showNotificationsDemo)}
                className={`relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 ${
                  currentRole === 'admin' ? 'focus:ring-[#5CAC32]/20' : 'focus:ring-[#4F46E5]/20'
                }`}
                aria-label="Demo notifications, 2 unread"
                aria-expanded={showNotificationsDemo}
              >
                <Bell className="h-4.5 w-4.5" />
                <span className={`absolute top-1.5 right-1.5 h-2 w-2 rounded-full ring-2 ring-white ${
                  currentRole === 'admin' ? 'bg-[#5CAC32]' : 'bg-[#4F46E5]'
                }`} />
              </button>

              {/* Notification Demo Dropdown */}
              {showNotificationsDemo && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-xl border border-[#E2E8F0] shadow-lg p-3.5 z-50 text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <span className="font-semibold text-[#0F172A]">Notifications</span>
                    <button
                      type="button"
                      onClick={() => setShowNotificationsDemo(false)}
                      className="text-[#64748B] hover:text-[#0F172A] p-1 rounded hover:bg-slate-100"
                      aria-label="Close notifications"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {demoNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-slate-300 transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#0F172A]">{notif.title}</span>
                          <span className="text-[10px] text-[#64748B]">{notif.time}</span>
                        </div>
                        <p className="text-[#475569] text-[11px] leading-relaxed">{notif.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#64748B] text-center pt-1">
                    Demo notification preview
                  </p>
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-[#E2E8F0]" />

            {/* User Profile Chip */}
            <div className="flex items-center gap-2 pl-1 py-1 pr-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="relative">
                <div className={`h-7.5 w-7.5 rounded-full text-white flex items-center justify-center font-semibold text-xs shadow-xs ${
                  currentRole === 'admin'
                    ? 'bg-gradient-to-tr from-[#5CAC32] to-[#4B9228]'
                    : 'bg-gradient-to-tr from-indigo-600 to-indigo-500'
                }`}>
                  {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'U'}
                </div>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-[#0F172A] leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-[#64748B] leading-tight font-mono">
                  {currentUser.id}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Nested Dashboard Page Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
