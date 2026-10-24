import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  ShieldCheck,
  Shield,
  Users,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { initialAdminUsers } from '../../data/mockData';
import { authService } from '../../services/authService';

const ROLE_CONFIGS = {
  student: {
    key: 'student',
    title: 'Student Portal Login',
    roleLabel: 'Enrolled Student',
    icon: GraduationCap,
    solidBg: 'bg-emerald-600',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    idLabel: 'Student ID or Institutional Email',
    idPlaceholder: 'e.g. STU-2026-081 or alex.johnson@campus360.edu',
    targetRoute: '/student/dashboard',
    defaultEmail: 'STU-2026-081',
    defaultUser: {
      name: 'Alex Johnson',
      role: 'Student',
      id: 'STU-2026-081',
      email: 'alex.johnson@campus360.edu',
      department: 'Computer Science & Engineering',
    },
    canRegister: false,
    noticeText:
      'Student accounts must be provisioned and authorized by the college administration. Public self-registration is strictly disabled.',
  },
  teacher: {
    key: 'teacher',
    title: 'Faculty Portal Login',
    roleLabel: 'Faculty Member',
    icon: Users,
    solidBg: 'bg-indigo-600',
    btnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    idLabel: 'Teacher ID or Institutional Email',
    idPlaceholder: 'e.g. FAC-104 or sarah.patel@campus360.edu',
    targetRoute: '/teacher/dashboard',
    defaultEmail: 'FAC-104',
    defaultUser: {
      name: 'Dr. Sarah Patel',
      role: 'Teacher',
      id: 'FAC-104',
      email: 'sarah.patel@campus360.edu',
      department: 'Computer Science & Engineering',
    },
    canRegister: false,
    noticeText:
      'Faculty accounts are provisioned and authorized directly by the Academic Dean’s Office.',
  },
  staff: {
    key: 'staff',
    title: 'Maintenance Staff Login',
    roleLabel: 'Facilities Staff',
    icon: Wrench,
    solidBg: 'bg-[#FA5A2A]',
    btnClass: 'bg-[#FA5A2A] hover:bg-[#E5481B] text-white',
    idLabel: 'Staff ID or Institutional Email',
    idPlaceholder: 'e.g. STF-029 or michael.chen@campus360.edu',
    targetRoute: '/staff/dashboard',
    defaultEmail: 'STF-029',
    defaultUser: {
      name: 'Michael Chen',
      role: 'Maintenance Staff',
      id: 'STF-029',
      email: 'michael.chen@campus360.edu',
      department: 'Campus Facilities',
    },
    canRegister: false,
    noticeText:
      'Maintenance staff accounts are created and authorized through Campus Facilities Management.',
  },
  admin: {
    key: 'admin',
    title: 'Administrator Console Login',
    roleLabel: 'Central Administrator',
    icon: Shield,
    solidBg: 'bg-blue-600',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    idLabel: 'Administrator ID or Email',
    idPlaceholder: 'e.g. ADM-001 or admin@campus360.edu',
    targetRoute: '/admin/dashboard',
    defaultEmail: 'ADM-001',
    defaultUser: {
      name: 'Elena Rostova',
      role: 'Administrator',
      id: 'ADM-001',
      email: 'admin@campus360.edu',
      department: 'Office of the Registrar',
    },
    canRegister: false,
    noticeText:
      'Restricted administrative gateway. Authorized campus personnel only. Public registration is strictly disabled.',
  },
};

export default function RoleLogin({ role: propRole }) {
  const params = useParams();
  const navigate = useNavigate();

  // Role from route param or prop
  const currentRoleKey = propRole || params.role || 'student';
  const config = ROLE_CONFIGS[currentRoleKey] || ROLE_CONFIGS.student;
  const Icon = config.icon;

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

  // Load remembered institutional ID for this portal
  useEffect(() => {
    const remembered = localStorage.getItem(`campus360_remember_${currentRoleKey}`);
    if (remembered) {
      setIdentifier(remembered);
      setRememberMe(true);
    }
  }, [currentRoleKey]);

  const validate = () => {
    const errs = {};
    if (!identifier.trim()) {
      errs.identifier = `${config.idLabel} is required.`;
    }
    if (!password) {
      errs.password = 'Password is required.';
    }
    return errs;
  };

  const completeLogin = (userToLogin) => {
    // Save Remember Me preference
    if (rememberMe) {
      localStorage.setItem(`campus360_remember_${currentRoleKey}`, identifier.trim());
    } else {
      localStorage.removeItem(`campus360_remember_${currentRoleKey}`);
    }

    // Save authenticated user into localStorage
    localStorage.setItem('campus360_auth_user', JSON.stringify(userToLogin));

    setFeedback({
      type: 'success',
      message: `Welcome back, ${userToLogin.name}! Redirecting to ${config.title}...`,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate(config.targetRoute);
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
    }, 500);
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
      const result = await authService.login(identifier.trim(), password, currentRoleKey);
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

      // If backend was offline or unreachable, fall back to mock users
      console.info('Backend unreachable, using mock data login fallback.');
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
        ...config.defaultUser,
        email: identifier.includes('@') ? identifier.trim() : config.defaultUser.email,
      };

      performLogin(userSession);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs max-w-md mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-1">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Choose a different portal</span>
        </Link>
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
          Institutional Gateway
        </span>
      </div>

      {/* Header with Solid Rounded Icon Badge */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
        <div
          className={`flex items-center justify-center h-12 w-12 rounded-xl ${config.solidBg} text-white shadow-2xs shrink-0`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            {config.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional access for authorized {config.roleLabel.toLowerCase()}s
          </p>
        </div>
      </div>

      {/* Feedback Messages */}
      {feedback && (
        <div
          className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-[#15803D]'
              : 'bg-red-50 border border-red-200 text-[#DC2626]'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label={config.idLabel}
          name="identifier"
          placeholder={config.idPlaceholder}
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
              className="p-1 rounded text-[#64748B] hover:text-[#0F172A] focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        {/* Remember Me and Forgot Password row */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[#475569]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5] h-3.5 w-3.5"
            />
            <span>Remember ID</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          <Button
            type="submit"
            isLoading={isLoading}
            className={`w-full justify-center text-xs py-2.5 font-semibold ${config.btnClass}`}
          >
            Sign In to {config.title.replace(' Login', '')}
          </Button>

          {/* Clean Admin Account Creation Link */}
          {currentRoleKey === 'admin' && (
            <div className="pt-2 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <Link
                to="/admin/setup"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create Administrator Account
              </Link>
            </div>
          )}
        </div>
      </form>

      {/* Institutional Security Notice Footer */}
      <div className="pt-3 text-center text-[11px] text-[#64748B] border-t border-slate-100 flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3 text-slate-400 shrink-0" />
        <span>Institutional access only • Accounts issued by Administration</span>
      </div>

      {/* First-Time Login Password Change Modal */}
      <Modal
        isOpen={Boolean(pendingChangeUser)}
        onClose={() => setPendingChangeUser(null)}
        title="First-Time Login: Set Permanent Password"
        maxWidth="max-w-md"
      >
        {pendingChangeUser && (
          <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-[#B45309]">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Temporary Credential Detected</p>
                <p className="text-[11px] mt-0.5 leading-relaxed">
                  Your account was initialized with a temporary password by the administrator. Campus360 security policy requires setting a personal permanent password before accessing your dashboard.
                </p>
              </div>
            </div>

            {changePasswordError && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-[#DC2626] flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{changePasswordError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                New Permanent Password <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Confirm Permanent Password <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Re-enter your new password"
                className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
              <Button
                variant="outline"
                type="button"
                onClick={() => setPendingChangeUser(null)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <KeyRound className="h-3.5 w-3.5 mr-1.5" />
                <span>Save Password & Enter</span>
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
