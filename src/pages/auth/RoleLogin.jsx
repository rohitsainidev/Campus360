import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle2,
  Zap,
  ArrowRight,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { initialAdminUsers } from '../../data/mockData';
import { authService } from '../../services/authService';

const ROLES = [
  {
    key: 'student',
    tabLabel: 'Student',
    icon: GraduationCap,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    title: 'Student Portal Login',
    roleLabel: 'Enrolled Student',
    badge: 'Academic Records & Student Life',
    idLabel: 'Student Roll No. or Institutional Email',
    idPlaceholder: 'e.g. STU-2026-081 or student@campus360.edu',
    targetRoute: '/student/dashboard',
    demoUser: {
      name: 'Alex Johnson',
      id: 'STU-2026-081',
      email: 'student@campus360.edu',
      password: 'student123',
      role: 'Student',
      department: 'Computer Science & Engineering',
    },
    noticeText: 'Student accounts are officially enrolled and issued by university administration.',
  },
  {
    key: 'teacher',
    tabLabel: 'Faculty',
    icon: BookOpen,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    title: 'Faculty Portal Login',
    roleLabel: 'Faculty Member',
    badge: 'Lecture Rosters & CIA Grading',
    idLabel: 'Faculty ID or Institutional Email',
    idPlaceholder: 'e.g. FAC-104 or teacher@campus360.edu',
    targetRoute: '/teacher/dashboard',
    demoUser: {
      name: 'Dr. Sarah Patel',
      id: 'FAC-104',
      email: 'teacher@campus360.edu',
      password: 'teacher123',
      role: 'Teacher',
      department: 'Computer Science & Engineering',
    },
    noticeText: 'Faculty credentials are authorized directly through the Academic Dean’s Office.',
  },
  {
    key: 'staff',
    tabLabel: 'Staff',
    icon: Wrench,
    iconColor: 'text-[#FA5A2A]',
    iconBg: 'bg-orange-50',
    title: 'Operations Staff Login',
    roleLabel: 'Facilities Staff',
    badge: 'Campus Infrastructure & Maintenance',
    idLabel: 'Staff ID or Employee Code',
    idPlaceholder: 'e.g. STF-029 or staff@campus360.edu',
    targetRoute: '/staff/dashboard',
    demoUser: {
      name: 'Michael Chen',
      id: 'STF-029',
      email: 'staff@campus360.edu',
      password: 'staff123',
      role: 'Maintenance Staff',
      department: 'Campus Facilities',
    },
    noticeText: 'Maintenance personnel accounts are managed through Campus Facilities Operations.',
  },
  {
    key: 'admin',
    tabLabel: 'Admin',
    icon: Shield,
    iconColor: 'text-[#2563EB]',
    iconBg: 'bg-blue-50',
    title: 'Administrator Console',
    roleLabel: 'Central Administrator',
    badge: 'Institutional Governance & Audit',
    idLabel: 'Administrator ID or Official Email',
    idPlaceholder: 'e.g. ADM-001 or admin@campus360.edu',
    targetRoute: '/admin/dashboard',
    demoUser: {
      name: 'Elena Rostova',
      id: 'ADM-001',
      email: 'admin@campus360.edu',
      password: 'admin123',
      role: 'Administrator',
      department: 'Office of the Registrar',
    },
    noticeText: 'Restricted administrative gateway. Authorized campus controllers only.',
  },
];

function ColorfulRoleBadge({ roleKey }) {
  if (roleKey === 'admin') {
    return (
      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-[#1D4ED8] to-[#2563EB] text-white shadow-md shadow-blue-500/25 shrink-0">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m9 12 2 2 4-4"
            stroke="#FDE047"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (roleKey === 'student') {
    return (
      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] text-white shadow-md shadow-emerald-500/25 shrink-0">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M22 10v6M2 10l10-5 10 5-10 5z"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12v5c3 3 9 3 12 0v-5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="10" r="1.5" fill="#FDE047" stroke="#FDE047" />
          <path d="M22 11.5v4" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (roleKey === 'teacher') {
    return (
      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-indigo-500/25 shrink-0">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 7v10" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // staff
  return (
    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] text-white shadow-md shadow-orange-500/25 shrink-0">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
          fill="rgba(255, 255, 255, 0.2)"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="6" r="1.6" fill="#FDE047" stroke="#FDE047" />
      </svg>
    </div>
  );
}

export default function RoleLogin({ role: propRole }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current role from prop, path parameter, or path prefix
  const getInitialRole = () => {
    if (propRole) return propRole;
    if (params.role) return params.role;
    const match = location.pathname.match(/\/login\/(student|teacher|staff|admin)/);
    if (match) return match[1];
    return 'student';
  };

  const [activeRoleKey, setActiveRoleKey] = useState(getInitialRole);

  // Sync state if propRole or params.role changes
  useEffect(() => {
    const r = getInitialRole();
    setActiveRoleKey(r);
  }, [propRole, params.role, location.pathname]);

  const currentRole = ROLES.find((r) => r.key === activeRoleKey) || ROLES[0];
  const Icon = currentRole.icon;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // First-time login password change state
  const [pendingChangeUser, setPendingChangeUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState('');

  // Load remembered institutional ID for the current role
  useEffect(() => {
    const remembered = localStorage.getItem(`campus360_remember_${activeRoleKey}`);
    if (remembered) {
      setIdentifier(remembered);
      setRememberMe(true);
    } else {
      setIdentifier('');
      setRememberMe(false);
    }
    setPassword('');
    setErrors({});
    setFeedback(null);
  }, [activeRoleKey]);

  // Tab change handler
  const handleRoleTabClick = (roleKey) => {
    if (roleKey === activeRoleKey) return;
    setActiveRoleKey(roleKey);
    // Smoothly update URL route if at /login or /login/:role
    navigate(`/login/${roleKey}`, { replace: true });
  };

  const validate = () => {
    const errs = {};
    if (!identifier.trim()) {
      errs.identifier = `${currentRole.idLabel} is required.`;
    }
    if (!password) {
      errs.password = 'Password is required.';
    }
    return errs;
  };

  const completeLogin = (userToLogin) => {
    // Save Remember Me preference
    if (rememberMe) {
      localStorage.setItem(`campus360_remember_${activeRoleKey}`, identifier.trim());
    } else {
      localStorage.removeItem(`campus360_remember_${activeRoleKey}`);
    }

    // Save authenticated user session into localStorage
    localStorage.setItem('campus360_auth_user', JSON.stringify(userToLogin));

    setFeedback({
      type: 'success',
      message: `Welcome back, ${userToLogin.name}! Redirecting to ${currentRole.title}...`,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate(currentRole.targetRoute);
    }, 600);
  };

  const performLogin = (userToLogin) => {
    setIsLoading(true);
    setErrors({});
    setFeedback(null);

    setTimeout(() => {
      // Check if user has mustChangePassword requirement
      if (userToLogin.mustChangePassword) {
        setIsLoading(false);
        setPendingChangeUser(userToLogin);
        return;
      }

      completeLogin(userToLogin);
    }, 450);
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    setChangePasswordError('');

    if (!newPassword) {
      setChangePasswordError('New permanent password is required.');
      return;
    }
    if (newPassword.length < 8) {
      setChangePasswordError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('Passwords do not match.');
      return;
    }

    // Update user in campus360_admin_users
    let userList = initialAdminUsers;
    const saved = localStorage.getItem('campus360_admin_users');
    if (saved) {
      try {
        userList = JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    const updatedUser = {
      ...pendingChangeUser,
      mustChangePassword: false,
    };

    const updatedUsers = userList.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('campus360_admin_users', JSON.stringify(updatedUsers));

    setPendingChangeUser(null);
    setIsLoading(true);
    completeLogin(updatedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      // 1. Try real backend authentication
      const result = await authService.login(identifier.trim(), password, activeRoleKey);
      if (result.success && result.user) {
        completeLogin(result.user);
        return;
      }
    } catch (apiError) {
      // If backend returned specific credential failure (400/401/403)
      if (apiError.message && !apiError.message.toLowerCase().includes('network')) {
        setIsLoading(false);
        setFeedback({
          type: 'error',
          message: apiError.message,
        });
        return;
      }

      // If backend was offline or unreachable, fall back gracefully to mock seed users
      let userList = initialAdminUsers;
      const saved = localStorage.getItem('campus360_admin_users');
      if (saved) {
        try {
          userList = JSON.parse(saved);
        } catch {
          // fallback
        }
      }

      const trimmedInput = identifier.trim().toLowerCase();
      const matchedUser = userList.find(
        (u) =>
          u.email?.toLowerCase() === trimmedInput ||
          u.id?.toLowerCase() === trimmedInput
      );

      const userSession = matchedUser || {
        ...currentRole.demoUser,
        email: identifier.includes('@') ? identifier.trim() : currentRole.demoUser.email,
      };

      performLogin(userSession);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-2">
      {/* Header Narrative */}
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Campus<span className="text-[#2563EB]">360</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Select your institutional role to access your personalized campus workspace and services.
        </p>
      </div>

      {/* 100% Box-Free Role Switcher Tabs (Zero Background Box, Real Colorful Icons) */}
      <div className="border-b border-slate-200/90 max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between -mb-px">
          {ROLES.map((r) => {
            const isActive = activeRoleKey === r.key;
            const RoleIcon = r.icon;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => handleRoleTabClick(r.key)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 pb-3 pt-1 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-[#0F172A] font-bold border-[#2563EB]'
                    : 'text-slate-500 hover:text-slate-800 border-transparent hover:border-slate-300'
                }`}
              >
                <RoleIcon className={`h-4 w-4 shrink-0 ${r.iconColor}`} strokeWidth={2.2} />
                <span>{r.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modern Center Login Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.04)] space-y-5 max-w-md mx-auto">
        {/* Dynamic Card Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <ColorfulRoleBadge roleKey={activeRoleKey} />
          <div className="text-left">
            <h2 className="text-lg font-bold tracking-tight text-[#0F172A] leading-tight">
              {currentRole.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentRole.badge}
            </p>
          </div>
        </div>

        {/* Feedback / Alert Messages */}
        {feedback && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2.5 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-[#15803D]'
                : feedback.type === 'info'
                ? 'bg-blue-50 border border-blue-200 text-[#2563EB]'
                : 'bg-red-50 border border-red-200 text-[#DC2626]'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : feedback.type === 'info' ? (
              <Zap className="h-4 w-4 shrink-0 text-[#2563EB]" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span className="leading-relaxed">{feedback.message}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
          <Input
            label={currentRole.idLabel}
            name="identifier"
            placeholder={currentRole.idPlaceholder}
            icon={Mail}
            required
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (errors.identifier) setErrors({ ...errors, identifier: undefined });
            }}
            error={errors.identifier}
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your account password"
            icon={Lock}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded text-[#64748B] hover:text-[#0F172A] focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          {/* Remember ID & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] h-3.5 w-3.5 cursor-pointer"
              />
              <span>Remember ID</span>
            </label>

            <Link
              to="/forgot-password"
              className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full justify-center text-xs sm:text-sm py-2.5 font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl shadow-xs"
            >
              Sign In to {currentRole.tabLabel} Portal
            </Button>
          </div>

          {/* Admin Setup Link */}
          {activeRoleKey === 'admin' && (
            <div className="pt-1 text-center text-xs text-slate-500">
              Need to initialize master console?{' '}
              <Link
                to="/admin/setup"
                className="font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
              >
                Setup Master Administrator
              </Link>
            </div>
          )}
        </form>

        {/* Security Policy Badge */}
        <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3 text-slate-400 shrink-0" />
          <span>Protected under institutional RBAC security protocols</span>
        </div>
      </div>

      {/* First-Time Login Password Change Modal */}
      <Modal
        isOpen={Boolean(pendingChangeUser)}
        onClose={() => setPendingChangeUser(null)}
        title="First-Time Login: Set Permanent Password"
        maxWidth="max-w-md"
      >
        <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 pt-2 text-left">
          <p className="text-xs text-slate-600 leading-relaxed">
            Welcome, <strong className="text-slate-900">{pendingChangeUser?.name}</strong>! As an administrative security requirement, please configure a new permanent password before accessing your dashboard.
          </p>

          {changePasswordError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{changePasswordError}</span>
            </div>
          )}

          <Input
            label="New Permanent Password"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 focus:outline-none"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          <Input
            label="Confirm New Password"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Re-enter permanent password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center text-xs py-2.5 font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            >
              Save Password &amp; Open Dashboard
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
