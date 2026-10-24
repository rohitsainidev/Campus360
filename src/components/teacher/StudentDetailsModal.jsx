import { Mail, GraduationCap, CalendarCheck, FileText, CheckCircle2, AlertTriangle, Star } from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function StudentDetailsModal({
  isOpen,
  onClose,
  student,
}) {
  if (!student) return null;

  const isAtRisk = student.academicStatus === 'At Risk' || student.attendancePercentage < 75;
  const isExcellent = student.academicStatus === 'Excellent';

  const statusVariant = isAtRisk ? 'error' : isExcellent ? 'success' : 'primary';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Academic Profile"
      maxWidth="max-w-xl"
      footer={
        <Button variant="outline" size="sm" onClick={onClose}>
          Close Record
        </Button>
      }
    >
      <div className="space-y-5 text-xs text-[#475569]">
        {/* Student Header Card */}
        <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center font-bold text-base shrink-0">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#0F172A]">{student.name}</h3>
                <Badge variant={statusVariant} dot>
                  {student.academicStatus || 'Active'}
                </Badge>
              </div>
              <p className="text-[11px] text-[#64748B] font-mono mt-0.5">
                ID: {student.id} • Roll: {student.rollNo || 'N/A'}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-[#E2E8F0] sm:pl-4">
            <span className="text-[10px] uppercase font-semibold text-[#64748B] block">
              Section
            </span>
            <span className="text-xs font-bold text-[#0F172A]">
              {student.section ? `Section ${student.section}` : 'General'}
            </span>
          </div>
        </div>

        {/* Academic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-md bg-white border border-[#E2E8F0] space-y-1">
            <div className="flex items-center gap-1.5 text-[#64748B] font-semibold text-[11px]">
              <GraduationCap className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Program & Term</span>
            </div>
            <p className="font-semibold text-[#0F172A]">{student.course}</p>
            <p className="text-[#64748B]">{student.semester}</p>
          </div>

          <div className="p-3 rounded-md bg-white border border-[#E2E8F0] space-y-1">
            <div className="flex items-center gap-1.5 text-[#64748B] font-semibold text-[11px]">
              <Mail className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Campus Email</span>
            </div>
            <p className="font-semibold text-[#0F172A] truncate">{student.email}</p>
            <p className="text-[#64748B]">Official institutional inbox</p>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="p-4 rounded-lg bg-white border border-[#E2E8F0] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#0F172A]">
              <CalendarCheck className="h-4 w-4 text-[#4F46E5]" />
              <span>Attendance Record</span>
            </div>
            <span
              className={`font-bold text-sm ${
                isAtRisk ? 'text-[#DC2626]' : 'text-[#15803D]'
              }`}
            >
              {student.attendancePercentage}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isAtRisk ? 'bg-[#DC2626]' : 'bg-[#15803D]'
              }`}
              style={{ width: `${Math.min(student.attendancePercentage, 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-[#E2E8F0] text-[11px]">
            <div>
              <span className="text-[#64748B] block">Total Classes</span>
              <span className="font-bold text-[#0F172A]">{student.totalClasses || 44}</span>
            </div>
            <div>
              <span className="text-[#64748B] block">Present</span>
              <span className="font-bold text-[#15803D]">{student.presentClasses || 38}</span>
            </div>
            <div>
              <span className="text-[#64748B] block">Absent</span>
              <span className="font-bold text-[#DC2626]">{student.absentClasses || 6}</span>
            </div>
          </div>
        </div>

        {/* Coursework & Assignment Summary */}
        <div className="p-4 rounded-lg bg-white border border-[#E2E8F0] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#0F172A]">
              <FileText className="h-4 w-4 text-[#4F46E5]" />
              <span>Assignments & Submissions</span>
            </div>
            <span className="font-bold text-xs text-[#4F46E5]">
              Avg. Score: {student.avgAssignmentScore || '88%'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="flex items-center justify-between p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B]">Submitted Work:</span>
              <span className="font-bold text-[#15803D]">
                {student.assignmentsSubmitted ?? 4}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B]">Pending Submissions:</span>
              <span className="font-bold text-[#B45309]">
                {student.assignmentsPending ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Academic Advisory Notice */}
        {isAtRisk ? (
          <div className="p-3 rounded-md bg-amber-50 border border-amber-200 text-[#B45309] text-[11px] flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Advisory Flag: Attendance / Performance Alert</span>
              <span>
                This student has fallen below the 75% institutional cutoff or requires additional academic consultation.
              </span>
            </div>
          </div>
        ) : isExcellent ? (
          <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-[#15803D] text-[11px] flex items-start gap-2">
            <Star className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Honors Standing</span>
              <span>
                Demonstrating high academic attendance and consistent timely submissions.
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] text-[#64748B] text-[11px] flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[#15803D]" />
            <span>
              Academic requirements satisfied. Student in good administrative standing.
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}
