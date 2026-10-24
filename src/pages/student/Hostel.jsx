import { useState } from 'react';
import {
  Building,
  Utensils,
  ShieldAlert,
  Phone,
  User,
  Wrench,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { studentHostelInfo } from '../../data/mockData';

export default function StudentHostel() {
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [maintenanceTitle, setMaintenanceTitle] = useState('');
  const [maintenanceDesc, setMaintenanceDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successFeedback, setSuccessFeedback] = useState('');

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
    if (!maintenanceTitle.trim() || !maintenanceDesc.trim()) {
      setErrorMsg('Please enter both issue subject and description.');
      return;
    }

    // Save to complaints local storage if desired
    const savedComplaints = JSON.parse(
      localStorage.getItem('campus360_student_complaints') || '[]'
    );
    const newTicket = {
      id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: `[Hostel B-304] ${maintenanceTitle.trim()}`,
      category: 'Hostel',
      priority: 'Medium',
      status: 'Submitted',
      submissionDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      description: maintenanceDesc.trim(),
    };

    localStorage.setItem(
      'campus360_student_complaints',
      JSON.stringify([newTicket, ...savedComplaints])
    );

    setIsMaintenanceModalOpen(false);
    setMaintenanceTitle('');
    setMaintenanceDesc('');
    setSuccessFeedback(
      `Maintenance ticket ${newTicket.id} logged with the Hostel Facilities Desk!`
    );
    setTimeout(() => setSuccessFeedback(''), 4500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hostel & Residence Services"
        description="Room allotment credentials, dining commons timings, and residential warden contacts."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Hostel' },
        ]}
        badge={<Badge variant="success" dot>{studentHostelInfo.allocationStatus}</Badge>}
        actions={
          <Button
            size="sm"
            icon={Wrench}
            onClick={() => {
              setErrorMsg('');
              setIsMaintenanceModalOpen(true);
            }}
          >
            Report Room Issue
          </Button>
        }
      />

      {successFeedback && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successFeedback}</span>
        </div>
      )}

      {/* 1. Primary Allocation Overview Card */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-[#4F46E5] shrink-0">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  Room {studentHostelInfo.roomNumber}
                </h2>
                <Badge variant="primary">{studentHostelInfo.roomType}</Badge>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {studentHostelInfo.hostelName} • {studentHostelInfo.floor}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              Roommate
            </span>
            <p className="text-sm font-semibold text-[#0F172A]">
              {studentHostelInfo.roommate}
            </p>
          </div>
        </div>

        {/* Administration & Warden Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="font-semibold text-[#64748B] block">Resident Warden</span>
            <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#4F46E5]" />
              {studentHostelInfo.wardenName}
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="font-semibold text-[#64748B] block">Warden Helpline</span>
            <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#4F46E5]" />
              {studentHostelInfo.wardenContact}
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="font-semibold text-[#64748B] block">Campus Curfew</span>
            <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#4F46E5]" />
              {studentHostelInfo.gatePassCurfew}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Mess Timings & Dining Commons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Utensils className="h-4.5 w-4.5 text-[#4F46E5]" />
              <h3 className="text-base font-bold text-[#0F172A]">
                {studentHostelInfo.messDetails.messName}
              </h3>
            </div>
            <Badge variant="info">Dining Commons</Badge>
          </div>

          <p className="text-xs text-[#64748B]">
            Daily meal hours. Vegetarian and non-vegetarian counter rotations are posted at the entrance.
          </p>

          <div className="space-y-2.5">
            {studentHostelInfo.messDetails.mealTimings.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-[#0F172A]">{m.meal}</span>
                <span className="text-[#64748B] font-mono">{m.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Hostel Guidelines & Code of Conduct */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-[#B45309]" />
              <h3 className="text-base font-bold text-[#0F172A]">
                Residential Code & Regulations
              </h3>
            </div>
            <Badge variant="neutral">Proctorial Rules</Badge>
          </div>

          <ul className="space-y-2.5 text-xs text-[#475569]">
            {studentHostelInfo.rules.map((rule, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5] shrink-0 mt-1.5" />
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Room Maintenance Request Modal */}
      <Modal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        title="Hostel Room Maintenance Request (Room B-304)"
        maxWidth="max-w-md"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMaintenanceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleMaintenanceSubmit}>
              Submit Request
            </Button>
          </>
        }
      >
        <form onSubmit={handleMaintenanceSubmit} className="space-y-3.5 text-xs">
          <Input
            label="Issue Subject"
            placeholder="e.g. AC cooling issue, Shower tap leaking"
            value={maintenanceTitle}
            onChange={(e) => setMaintenanceTitle(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0F172A]">
              Detailed Description <span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              rows={3}
              value={maintenanceDesc}
              onChange={(e) => setMaintenanceDesc(e.target.value)}
              placeholder="Describe what needs repair or inspection in room B-304..."
              className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-[#0F172A] focus:outline-none focus:border-[#4F46E5]"
            />
          </div>

          {errorMsg && (
            <p className="text-[#DC2626] text-[11px] font-medium">{errorMsg}</p>
          )}

          <p className="text-[11px] text-[#64748B]">
            This request will be automatically added to your portal's complaints ledger and assigned to maintenance technicians.
          </p>
        </form>
      </Modal>
    </div>
  );
}
