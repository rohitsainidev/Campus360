import { Calendar, Award, BookOpen, Clock, Edit3 } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function AssignmentDetailsModal({
  isOpen,
  onClose,
  assignment,
  onOpenReview,
  onEditAssignment,
}) {
  if (!assignment) return null;

  const submissions = assignment.submissions || [];
  const totalSubmissions = submissions.length;
  const submittedCount = submissions.filter((s) => s.status === 'Submitted' || s.status === 'Graded').length;
  const gradedCount = submissions.filter((s) => s.marks !== '' && s.marks !== undefined && s.marks !== null).length;
  const pendingCount = submissions.filter((s) => s.status === 'Pending').length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assignment Details: ${assignment.id}`}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          {onEditAssignment && (
            <Button
              variant="outline"
              size="sm"
              icon={Edit3}
              onClick={() => {
                onClose();
                onEditAssignment(assignment);
              }}
            >
              Edit Assignment
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={onClose} className="ml-auto">
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-5 text-xs text-[#475569]">
        {/* Header Summary */}
        <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[11px] text-[#64748B] font-semibold">
                {assignment.id}
              </span>
              <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                {assignment.title}
              </h3>
              <p className="text-[#4F46E5] font-semibold text-xs mt-0.5">
                {assignment.subject}
              </p>
            </div>
            <Badge
              variant={
                assignment.status === 'Active'
                  ? 'success'
                  : assignment.status === 'Under Review'
                  ? 'warning'
                  : 'neutral'
              }
              dot
            >
              {assignment.status || 'Active'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span className="truncate">{assignment.course}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>{assignment.semester}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Due: {assignment.dueDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Max: {assignment.maxMarks} pts</span>
            </div>
          </div>
        </div>

        {/* Prompt & Instructions */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-md bg-white border border-[#E2E8F0] space-y-1">
            <span className="font-bold text-[#0F172A] block text-xs">
              Coursework Prompt:
            </span>
            <p className="text-[#475569] leading-relaxed">
              {assignment.description}
            </p>
          </div>

          {assignment.instructions && (
            <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1">
              <span className="font-semibold text-[#0F172A] block text-[11px]">
                Submission Instructions:
              </span>
              <p className="text-[#64748B] leading-relaxed text-[11px]">
                {assignment.instructions}
              </p>
            </div>
          )}
        </div>

        {/* Submissions Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase block">
              Turned In
            </span>
            <span className="text-lg font-bold text-[#15803D]">{submittedCount} / {totalSubmissions}</span>
          </div>
          <div className="p-2.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase block">
              Evaluated
            </span>
            <span className="text-lg font-bold text-[#2563EB]">{gradedCount}</span>
          </div>
          <div className="p-2.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase block">
              Pending
            </span>
            <span className="text-lg font-bold text-[#B45309]">{pendingCount}</span>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#0F172A]">
              Student Submissions ({totalSubmissions})
            </h4>
            <span className="text-[11px] text-[#64748B]">
              Simulated classroom records
            </span>
          </div>

          <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
            <div className="overflow-x-auto max-h-64">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[10px] sticky top-0">
                  <tr>
                    <th scope="col" className="px-3 py-2.5">Student</th>
                    <th scope="col" className="px-3 py-2.5">Status</th>
                    <th scope="col" className="px-3 py-2.5">Turned In</th>
                    <th scope="col" className="px-3 py-2.5">Score</th>
                    <th scope="col" className="px-3 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                  {submissions.map((sub) => {
                    const isSubmitted = sub.status === 'Submitted';
                    const hasMarks = sub.marks !== '' && sub.marks !== undefined && sub.marks !== null;
                    return (
                      <tr key={sub.studentId || sub.id} className="hover:bg-slate-50/70">
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className="font-semibold block">{sub.studentName}</span>
                          <span className="text-[10px] text-[#64748B] font-mono">{sub.studentId}</span>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <Badge
                            variant={hasMarks ? 'success' : isSubmitted ? 'info' : 'warning'}
                            dot
                          >
                            {hasMarks ? 'Graded' : sub.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-[#64748B] text-[11px]">
                          {sub.submissionDate || '—'}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-medium text-[11px]">
                          {hasMarks ? `${sub.marks} / ${assignment.maxMarks}` : 'Ungraded'}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-right">
                          <Button
                            variant={isSubmitted && !hasMarks ? 'primary' : 'outline'}
                            size="sm"
                            className="text-[11px] py-1 px-2.5"
                            onClick={() => onOpenReview(sub, assignment)}
                          >
                            {hasMarks ? 'Review' : isSubmitted ? 'Grade' : 'Review'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
