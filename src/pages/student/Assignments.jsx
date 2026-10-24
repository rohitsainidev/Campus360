import { useState, useMemo } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  User,
  Info,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import { initialStudentAssignments } from '../../data/mockData';

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('campus360_student_assignments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentAssignments;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submissionNote, setSubmissionNote] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const filteredAssignments = useMemo(() => {
    return assignments.filter((asn) => {
      const matchesSearch =
        asn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asn.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asn.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'ALL' ? true : asn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchTerm, statusFilter]);

  const handleOpenDetail = (asn) => {
    setSelectedAssignment(asn);
    setSubmissionNote('');
    setSelectedFile(null);
    setErrorMsg('');
    setSubmissionModalOpen(true);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!submissionNote.trim()) {
      setErrorMsg('Please enter a brief submission comment or summary note.');
      return;
    }

    // Update assignment status to Submitted in local state
    const updated = assignments.map((item) => {
      if (item.id === selectedAssignment.id) {
        return {
          ...item,
          status: 'Submitted',
          marks: 'Under Review',
        };
      }
      return item;
    });

    setAssignments(updated);
    localStorage.setItem(
      'campus360_student_assignments',
      JSON.stringify(updated)
    );

    setSubmissionSuccess(
      `Assignment "${selectedAssignment.title}" marked as submitted for demonstration.`
    );
    setSubmissionModalOpen(false);
    setTimeout(() => setSubmissionSuccess(''), 4500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments & Coursework"
        description="Term assignments, submissions, instructor feedback, and grading archives."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Assignments' },
        ]}
        badge={<Badge variant="primary">Academic Term</Badge>}
      />

      {submissionSuccess && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{submissionSuccess}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder="Search by assignment, subject, or professor..."
        />

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64748B] font-medium">Status Filter:</span>
          <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] rounded-md border border-[#E2E8F0]">
            {['ALL', 'Pending', 'Submitted', 'Graded'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  statusFilter === st
                    ? 'bg-white text-[#4F46E5] shadow-xs border border-[#E2E8F0]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignments Grid / List */}
      {filteredAssignments.length === 0 ? (
        <EmptyState
          title="No assignments found"
          description="There are no assignments matching your current search or status filter."
          icon={FileText}
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssignments.map((asn) => {
            const isPending = asn.status === 'Pending';
            const isSubmitted = asn.status === 'Submitted';
            return (
              <div
                key={asn.id}
                className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-mono font-semibold text-[#64748B]">
                      {asn.id}
                    </span>
                    <Badge
                      variant={
                        asn.status === 'Graded'
                          ? 'success'
                          : isSubmitted
                          ? 'info'
                          : 'warning'
                      }
                      dot
                    >
                      {asn.status}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                    {asn.title}
                  </h3>

                  <p className="text-xs text-[#4F46E5] font-medium">
                    {asn.subject}
                  </p>

                  <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                    {asn.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E2E8F0] text-xs">
                  <div className="grid grid-cols-2 gap-2 text-[#64748B]">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-[#64748B]" />
                      <span className="truncate">{asn.teacher}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#64748B]" />
                      <span>Due: {asn.dueDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold text-[#0F172A] text-[11px]">
                      Score: {asn.marks}
                    </span>

                    <Button
                      variant={isPending ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleOpenDetail(asn)}
                    >
                      {isPending ? 'Submit Work' : 'View Submission'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Assignment Detail & Demo Submission Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={submissionModalOpen}
          onClose={() => setSubmissionModalOpen(false)}
          title={`Assignment: ${selectedAssignment.id}`}
          maxWidth="max-w-lg"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmissionModalOpen(false)}
              >
                Close
              </Button>
              {selectedAssignment.status === 'Pending' && (
                <Button size="sm" onClick={handleDemoSubmit}>
                  Submit Assignment
                </Button>
              )}
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">
                {selectedAssignment.title}
              </h4>
              <p className="text-[#4F46E5] font-medium mt-0.5">
                {selectedAssignment.subject}
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-md border border-[#E2E8F0] space-y-1">
              <span className="font-semibold text-[#0F172A] block">
                Detailed Assignment Prompt:
              </span>
              <p className="text-[#475569] leading-relaxed">
                {selectedAssignment.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[#64748B]">
              <p>
                <strong>Instructor:</strong> {selectedAssignment.teacher}
              </p>
              <p>
                <strong>Submission Deadline:</strong> {selectedAssignment.dueDate}
              </p>
            </div>

            {selectedAssignment.status === 'Pending' ? (
              <form onSubmit={handleDemoSubmit} className="space-y-3 pt-2 border-t border-[#E2E8F0]">
                <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-[#B45309] text-[11px] flex items-start gap-1.5">
                  <Info className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    Demonstration Submission: Files selected here are evaluated on client-side state and are not transmitted to a live professor server.
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-[#0F172A]">
                    Submission Notes / Executive Summary <span className="text-[#DC2626]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNote}
                    onChange={(e) => {
                      setSubmissionNote(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Provide Github repository link, document summary, or implementation notes..."
                    className="w-full rounded-md border border-[#E2E8F0] p-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5]"
                  />
                  {errorMsg && (
                    <p className="text-[#DC2626] text-[11px] font-medium">{errorMsg}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-[#0F172A]">
                    Attach Solution Document (Optional Demo Attachment)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="text-xs text-[#64748B] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-[#0F172A] hover:file:bg-slate-200 cursor-pointer"
                  />
                  {selectedFile && (
                    <span className="text-[11px] text-[#15803D]">
                      Selected: {selectedFile.name}
                    </span>
                  )}
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-[#15803D] space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Submission Recorded</span>
                </div>
                <p className="text-[#475569] text-[11px]">
                  Your coursework was logged into the portal archive. Status: <strong>{selectedAssignment.status}</strong> ({selectedAssignment.marks}).
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
