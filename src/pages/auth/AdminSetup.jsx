import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Shield,
  User,
  Mail,
  KeyRound,
  Building,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  IdCard,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { initialAdminUsers } from '../../data/mockData';

export default function AdminSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    setupKey: 'CAMPUS-ROOT-2026',
    fullName: '',
    adminId: `ADM-${Math.floor(100 + Math.random() * 900)}`,
    email: '',
    department: 'Office of the Registrar',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const validate = () => {
    const errs = {};

    if (!formData.setupKey.trim()) {
      errs.setupKey = 'Institutional setup key is required.';
    } else if (formData.setupKey.trim() !== 'CAMPUS-ROOT-2026') {
      errs.setupKey = 'Invalid setup key. Use the authorized master key (e.g. CAMPUS-ROOT-2026).';
    }

    if (!formData.fullName.trim()) {
      errs.fullName = 'Administrator full name is required.';
    }

    if (!formData.adminId.trim()) {
      errs.adminId = 'Administrator ID is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Official institutional email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address (e.g. admin@campus360.edu).';
      }
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    // Check duplicate ID and email in existing users
    let userList = initialAdminUsers;
    const saved = localStorage.getItem('campus360_admin_users');
    if (saved) {
      try {
        userList = JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    const emailLower = formData.email.trim().toLowerCase();
    const idLower = formData.adminId.trim().toLowerCase();

    if (userList.some((u) => u.email?.toLowerCase() === emailLower)) {
      errs.email = 'An account with this institutional email is already registered.';
    }
    if (userList.some((u) => u.id?.toLowerCase() === idLower)) {
      errs.adminId = 'This Administrator ID is already in use.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setFeedback(null);

    setTimeout(() => {
      // Create new Administrator user
      const newAdmin = {
        id: formData.adminId.trim(),
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        role: 'Administrator',
        department: formData.department,
        designation: 'System Administrator',
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
        mustChangePassword: false,
        passwordHash: `pbkdf2_sha256$260000$${Math.random().toString(36).substring(2)}`,
      };

      // Read existing user list
      let userList = initialAdminUsers;
      const saved = localStorage.getItem('campus360_admin_users');
      if (saved) {
        try {
          userList = JSON.parse(saved);
        } catch {
          // fallback
        }
      }

      // Prepend new admin and save
      const updatedUsers = [newAdmin, ...userList];
      localStorage.setItem('campus360_admin_users', JSON.stringify(updatedUsers));

      // Set active session
      localStorage.setItem('campus360_auth_user', JSON.stringify(newAdmin));

      setFeedback({
        type: 'success',
        message: `Administrator account initialized successfully for ${newAdmin.name}! Redirecting to Admin Console...`,
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('/admin/dashboard');
      }, 700);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm max-w-lg mx-auto">
      {/* Back Link */}
      <div>
        <Link
          to="/login/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#4F46E5] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Administrator Login</span>
        </Link>
      </div>

      {/* Header with Solid Blue Shield Badge */}
      <div className="flex items-start gap-3.5 pb-2 border-b border-[#E2E8F0]">
        <div className="h-12 w-12 rounded-xl bg-blue-600 text-white shadow-2xs flex items-center justify-center shrink-0">
          <Shield className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Provision Administrator Account
          </h1>
          <p className="text-xs text-[#475569] mt-0.5">
            Initial setup and master administrative credential provisioning for Campus360.
          </p>
        </div>
      </div>

      {/* Security Authorization Notice */}
      <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-200/80 text-xs text-[#2563EB] flex items-start gap-2.5">
        <KeyRound className="h-4 w-4 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <span className="font-bold">Authorized Setup Gateway:</span> Master administrative account initialization requires the institutional deployment key to prevent unauthorized access.
        </p>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-3.5 rounded-lg text-xs flex items-center gap-2 ${
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

      {/* Setup Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Master Setup Key */}
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Institutional Master Setup Key <span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.setupKey}
              onChange={(e) => {
                setFormData({ ...formData, setupKey: e.target.value });
                if (errors.setupKey) setErrors({ ...errors, setupKey: undefined });
              }}
              placeholder="CAMPUS-ROOT-2026"
              className={`w-full px-3 py-2 text-xs font-mono rounded-md border ${
                errors.setupKey ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
              } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]`}
            />
          </div>
          {errors.setupKey && <p className="text-[11px] text-[#DC2626] mt-1">{errors.setupKey}</p>}
          <p className="text-[10px] text-slate-500 mt-0.5">
            Default system authorization key: <code className="font-bold">CAMPUS-ROOT-2026</code>
          </p>
        </div>

        {/* Name and Admin ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Administrator Full Name"
            name="fullName"
            placeholder="e.g. Dr. Rajesh Sharma"
            icon={User}
            required
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: undefined });
            }}
            error={errors.fullName}
          />

          <Input
            label="Administrator ID"
            name="adminId"
            placeholder="e.g. ADM-101"
            icon={IdCard}
            required
            value={formData.adminId}
            onChange={(e) => {
              setFormData({ ...formData, adminId: e.target.value });
              if (errors.adminId) setErrors({ ...errors, adminId: undefined });
            }}
            error={errors.adminId}
          />
        </div>

        {/* Email and Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Official Institutional Email"
            name="email"
            type="email"
            placeholder="rajesh.sharma@campus360.edu"
            icon={Mail}
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">
              Administrative Division <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="Office of the Registrar">Office of the Registrar</option>
              <option value="Office of Academic Affairs">Office of Academic Affairs</option>
              <option value="Central Administration">Central Administration</option>
              <option value="Campus Operations & Security">Campus Operations & Security</option>
            </select>
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Master Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 8 characters"
            icon={Lock}
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded text-[#64748B] hover:text-[#0F172A] focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter password"
            icon={Lock}
            required
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
            }}
            error={errors.confirmPassword}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1 rounded text-[#64748B] hover:text-[#0F172A] focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full justify-center text-xs py-2.5 font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Administrator Account & Enter Console
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="pt-2 text-center text-[11px] text-[#64748B] border-t border-[#E2E8F0]">
        <span>Already have an administrator account? </span>
        <Link
          to="/login/admin"
          className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Sign In Here
        </Link>
      </div>
    </div>
  );
}
