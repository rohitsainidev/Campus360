import { useState } from 'react';
import { User, CheckCircle2, MessageSquare } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Badge from '../common/Badge';

function SubmissionReviewForm({ submission, assignment, onSaveGrade, onClose }) {
  const [marks, setMarks] = useState(
    submission.marks !== undefined && submission.marks !== null ? String(submission.marks) : ''
  );
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const [error, setError] = useState('');

  const maxMarks = Number(assignment.maxMarks) || 100;

  const handleSave = (e) => {
    e.preventDefault();
    if (marks === '') {
      setError('Please assign numeric marks to complete evaluation.');
      return;
    }

    const numericMarks = Number(marks);
    if (isNaN(numericMarks)) {
      setError('Marks must be a valid number.');
      return;
    }
    if (numericMarks < 0) {
      setError('Marks cannot be negative.');
      return;
    }
    if (numericMarks > maxMarks) {
      setError(`Marks cannot exceed the maximum score of ${maxMarks}.`);
      return;
    }

    onSaveGrade({
      assignmentId: assignment.id,
      studentId: submission.studentId,
      marks: numericMarks,
      feedback: feedback.trim(),
    });
  };

  return (
    <div className="space-y-4 text-xs text-[#475569]">
      {/* Student & Course Context */}
      <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center font-bold text-xs shrink-0">
              <User className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#0F172A] block leading-tight">
                {submission.studentName}
              </span>
              <span className="text-[10px] text-[#64748B] font-mono">
                {submission.studentId}
              </span>
            </div>
          </div>

          <Badge
            variant={
              submission.status === 'Submitted'
                ? 'info'
                : submission.status === 'Graded'
                ? 'success'
                : 'warning'
            }
            dot
          >
            {submission.status}
          </Badge>
        </div>

        <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 text-[11px] text-[#64748B]">
          <div>
            <span className="block text-[#0F172A] font-medium">{assignment.title}</span>
            <span>{assignment.subject}</span>
          </div>
          <div className="text-right">
            <span className="block">Submitted: {submission.submissionDate || 'Pending'}</span>
            <span className="font-semibold text-[#0F172A]">Max Score: {maxMarks} pts</span>
          </div>
        </div>
      </div>

      {/* Demo Submission Content Note */}
      <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] text-[11px] space-y-1">
        <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
          Submission Artifact Received
        </span>
        <p className="text-[#64748B] leading-relaxed">
          Student solution files (SQL script, normalization diagrams, benchmark report) were logged in simulated evaluation mode.
        </p>
      </div>

      {/* Grading Form */}
      <form onSubmit={handleSave} className="space-y-4 pt-1">
        <Input
          label={`Assigned Marks (Out of ${maxMarks})`}
          type="number"
          min="0"
          max={maxMarks}
          step="0.5"
          required
          value={marks}
          onChange={(e) => {
            setMarks(e.target.value);
            if (error) setError('');
          }}
          placeholder={`Enter marks between 0 and ${maxMarks}`}
          error={error}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 text-[#4F46E5]" />
            <span>Instructor Feedback & Qualitative Comments</span>
          </label>
          <textarea
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="e.g. Excellent query optimization logic. Please pay closer attention to index column selectivity..."
            className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs p-3 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button size="sm" type="submit">
            Save Grade & Feedback
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function SubmissionReviewModal({
  isOpen,
  onClose,
  submission,
  assignment,
  onSaveGrade,
}) {
  if (!isOpen || !submission || !assignment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Evaluate Coursework Submission"
      maxWidth="max-w-lg"
    >
      <SubmissionReviewForm
        key={`${submission.studentId}_${assignment.id}`}
        submission={submission}
        assignment={assignment}
        onSaveGrade={onSaveGrade}
        onClose={onClose}
      />
    </Modal>
  );
}
