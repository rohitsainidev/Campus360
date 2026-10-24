import { useState } from 'react';
import {
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  IdCard,
  Edit3,
  CheckCircle2,
  Shield,
  Heart,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { initialStudentProfile } from '../../data/mockData';

export default function StudentProfile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('campus360_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentProfile;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditClick = () => {
    setEditForm({ ...profile });
    setErrors({});
    setIsEditing(true);
  };

  const validate = () => {
    const errs = {};
    if (!editForm.name.trim()) errs.name = 'Full name is required.';
    if (!editForm.phone.trim()) errs.phone = 'Phone number is required.';
    if (!editForm.emergencyContact.trim()) errs.emergencyContact = 'Emergency contact is required.';
    return errs;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const valErrors = validate();
    setErrors(valErrors);

    if (Object.keys(valErrors).length === 0) {
      setProfile(editForm);
      localStorage.setItem('campus360_student_profile', JSON.stringify(editForm));
      setIsEditing(false);
      setSuccessMessage('Student profile details updated successfully.');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Official university student identification and academic record overview."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'My Profile' },
        ]}
        badge={<Badge variant="primary">Verified Enrolled</Badge>}
        actions={
          <Button size="sm" icon={Edit3} onClick={handleEditClick}>
            Edit Contact Info
          </Button>
        }
      />

      {successMessage && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Header Identity Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-indigo-50 border-2 border-indigo-200 text-[#4F46E5] flex items-center justify-center font-bold text-xl shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0F172A]">{profile.name}</h2>
                <Badge variant="success" dot>Active Term</Badge>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5 font-mono">
                Student ID: {profile.id} • Roll No: {profile.rollNo}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Cumulative CGPA
            </span>
            <p className="text-2xl font-bold text-[#4F46E5]">{profile.cgpa} / 10.0</p>
          </div>
        </div>

        {/* Detailed Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Institutional / Academic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              Academic Curriculum
            </h3>

            <div className="space-y-3 text-[#475569]">
              <div className="flex items-start gap-3">
                <Building className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Department</span>
                  <span>{profile.department}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Program & Course</span>
                  <span>{profile.course}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IdCard className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Current Stage</span>
                  <span>{profile.semester} (Academic Year 2026-27)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Year of Admission</span>
                  <span>{profile.admissionYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal & Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              Contact & Emergency Records
            </h3>

            <div className="space-y-3 text-[#475569]">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">University Email</span>
                  <span>{profile.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Contact Mobile Number</span>
                  <span>{profile.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Emergency Contact</span>
                  <span>{profile.emergencyContact}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="h-4 w-4 text-[#64748B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0F172A] block">Blood Group Record</span>
                  <span>{profile.bloodGroup}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Footer */}
        <div className="pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
          Note: Core enrollment records (Student ID, Department, and Admission Year) are locked by the university registrar. For statutory corrections, submit a grievance at the Complaints Desk.
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Contact & Personal Details"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Profile Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            required
            error={errors.name}
          />

          <Input
            label="Contact Mobile"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            required
            error={errors.phone}
          />

          <Input
            label="Emergency Contact Number"
            value={editForm.emergencyContact}
            onChange={(e) =>
              setEditForm({ ...editForm, emergencyContact: e.target.value })
            }
            required
            error={errors.emergencyContact}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">
              Blood Group
            </label>
            <select
              value={editForm.bloodGroup}
              onChange={(e) =>
                setEditForm({ ...editForm, bloodGroup: e.target.value })
              }
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-sm px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
