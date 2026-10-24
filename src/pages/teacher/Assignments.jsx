import { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Info,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import AssignmentFormModal from '../../components/teacher/AssignmentFormModal';
import AssignmentDetailsModal from '../../components/teacher/AssignmentDetailsModal';
import SubmissionReviewModal from '../../components/teacher/SubmissionReviewModal';
import {
  initialTeacherAssignments,
  teacherSubjects,
  initialTeacherStudents,
} from '../../data/mockData';

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('campus360_teacher_assignments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialTeacherAssignments;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [assignmentToEdit, setAssignmentToEdit] = useState(null);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState(null);
  const [reviewSubmissionData, setReviewSubmissionData] = useState(null); // { submission, assignment }
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  // Success messages
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 4500);
  };

  const persistAssignments = (updated) => {
    setAssignments(updated);
    localStorage.setItem('campus360_teacher_assignments', JSON.stringify(updated));
  };

  // Filtered list
  const filteredAssignments = useMemo(() => {
    return assignments.filter((asn) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        asn.title.toLowerCase().includes(term) ||
        asn.subject.toLowerCase().includes(term) ||
        asn.id.toLowerCase().includes(term);

      const matchesSubject =
        subjectFilter === 'ALL' || asn.subject.includes(subjectFilter);

      const matchesStatus =
        statusFilter === 'ALL' || asn.status === statusFilter;

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [assignments, searchTerm, subjectFilter, statusFilter]);

  const hasActiveFilters =
    Boolean(searchTerm) || subjectFilter !== 'ALL' || statusFilter !== 'ALL';

  const handleResetFilters = () => {
    setSearchTerm('');
    setSubjectFilter('ALL');
    setStatusFilter('ALL');
  };

  // Create or Update Assignment Submit
  const handleSaveAssignment = (formData) => {
    if (assignmentToEdit) {
      // Edit
      const updated = assignments.map((asn) => {
        if (asn.id === assignmentToEdit.id) {
          return {
            ...asn,
            title: formData.title,
            subject: formData.subject,
            course: formData.course,
            semester: formData.semester,
            createdDate: formData.assignedDate,
            dueDate: formData.dueDate,
            maxMarks: formData.maxMarks,
            description: formData.description,
            instructions: formData.instructions,
          };
        }
        return asn;
      });

      persistAssignments(updated);
      setCreateModalOpen(false);
      setAssignmentToEdit(null);
      showNotification(`Assignment "${formData.title}" updated successfully.`);
    } else {
      // Create new
      const nextId = `ASN-${300 + assignments.length + 1}`;

      // Generate demo submissions for enrolled students in that course
      const mockSubmissions = initialTeacherStudents.slice(0, 5).map((stu, idx) => ({
        id: `SUB-${nextId}-${idx + 1}`,
        studentId: stu.id,
        studentName: stu.name,
        status: idx < 2 ? 'Submitted' : 'Pending',
        submissionDate: idx < 2 ? new Date().toISOString().split('T')[0] : '',
        marks: '',
        feedback: '',
      }));

      const newAssignment = {
        id: nextId,
        title: formData.title,
        subject: formData.subject,
        course: formData.course,
        semester: formData.semester,
        createdDate: formData.assignedDate,
        dueDate: formData.dueDate,
        maxMarks: formData.maxMarks,
        status: 'Active',
        description: formData.description,
        instructions: formData.instructions,
        submissions: mockSubmissions,
      };

      const updated = [newAssignment, ...assignments];
      persistAssignments(updated);
      setCreateModalOpen(false);
      showNotification(`Assignment "${newAssignment.title}" published successfully.`);
    }
  };

  // Delete Assignment
  const handleConfirmDelete = () => {
    if (!assignmentToDelete) return;
    const updated = assignments.filter((a) => a.id !== assignmentToDelete.id);
    persistAssignments(updated);
    showNotification(`Assignment "${assignmentToDelete.title}" deleted.`);
    setAssignmentToDelete(null);
  };

  // Save Grade & Feedback from SubmissionReviewModal
  const handleSaveGrade = ({ assignmentId, studentId, marks, feedback }) => {
    const updated = assignments.map((asn) => {
      if (asn.id === assignmentId) {
        const updatedSubs = (asn.submissions || []).map((sub) => {
          if (sub.studentId === studentId) {
            return {
              ...sub,
              status: 'Graded',
              marks,
              feedback,
            };
          }
          return sub;
        });
        return {
          ...asn,
          submissions: updatedSubs,
        };
      }
      return asn;
    });

    persistAssignments(updated);

    // Also update selectedAssignmentDetails if open
    if (selectedAssignmentDetails && selectedAssignmentDetails.id === assignmentId) {
      const match = updated.find((a) => a.id === assignmentId);
      setSelectedAssignmentDetails(match);
    }

    setReviewSubmissionData(null);
    showNotification(`Evaluation recorded: ${marks} marks assigned with instructor feedback.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Assignments & Evaluations"
        description="Design course problem sets, inspect student submissions, and record qualitative feedback."
        breadcrumbs={[
          { label: 'Teacher Portal', path: '/teacher/dashboard' },
          { label: 'Assignments' },
        ]}
        badge={
          <Badge variant="primary" dot>
            {assignments.length} Total Assignments
          </Badge>
        }
        actions={
          <Button
            size="sm"
            icon={Plus}
            onClick={() => {
              setAssignmentToEdit(null);
              setCreateModalOpen(true);
            }}
          >
            Create Assignment
          </Button>
        }
      />

      {/* Success Notification */}
      {feedbackMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="font-semibold">{feedbackMessage}</span>
        </div>
      )}

      {/* Demo Context Note */}
      <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5 text-xs text-[#4F46E5]">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold">Coursework Management Console</span>
          <p className="text-[#475569] text-[11px] mt-0.5">
            Assignments created or evaluated here update live dashboard counts and persist in your browser session for presentation.
          </p>
        </div>
      </div>

      {/* Assignment Metrics - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Problem Sets
              </span>
              <FileText className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {assignments.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Sets</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Coursework pipeline
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Active Submissions
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {assignments.filter((a) => a.status === 'Active').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Active</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Accepting student files
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Under Review
              </span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {assignments.filter((a) => a.status === 'Under Review').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Pending</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Awaiting instructor marks
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Archived / Closed
              </span>
              <AlertCircle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {assignments.filter((a) => a.status === 'Closed').length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Closed</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Graded & finalized
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder="Search by assignment title, ID, or subject..."
          className="max-w-md"
        />

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Subject Filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5]"
          >
            <option value="ALL">All Subjects</option>
            {teacherSubjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#4F46E5]"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Closed">Closed</option>
          </select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={handleResetFilters}
              className="text-xs text-[#DC2626] hover:bg-red-50 py-1"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Assignment List */}
      {filteredAssignments.length === 0 ? (
        <EmptyState
          title="No assignments match your search"
          description="Try modifying search keywords or clearing active subject and status filters."
          icon={FileText}
          actionLabel="Clear Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssignments.map((assignment) => {
              const submissions = assignment.submissions || [];
              const totalSubs = submissions.length;
              const submittedSubs = submissions.filter(
                (s) => s.status === 'Submitted' || s.status === 'Graded'
              ).length;
              const pendingSubs = submissions.filter(
                (s) => s.status === 'Pending'
              ).length;
              const gradedSubs = submissions.filter(
                (s) => s.marks !== '' && s.marks !== undefined && s.marks !== null
              ).length;

              const isClosed = assignment.status === 'Closed';
              const isUnderReview = assignment.status === 'Under Review';

              return (
                <div
                  key={assignment.id}
                  className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                >
                  {/* Card Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-[#64748B]">
                        {assignment.id}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isClosed
                            ? 'text-slate-500'
                            : isUnderReview
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {assignment.status || 'Active'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                      {assignment.title}
                    </h3>

                    <p className="text-xs text-[#4F46E5] font-semibold">
                      {assignment.subject}
                    </p>

                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                      {assignment.description}
                    </p>
                  </div>

                  {/* Submission and Date Metrics */}
                  <div className="pt-3 border-t border-[#E2E8F0] space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[#64748B] text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#4F46E5]" />
                        <span>Created: {assignment.createdDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#4F46E5]" />
                        <span className="font-semibold text-[#0F172A]">Due: {assignment.dueDate}</span>
                      </div>
                    </div>

                    {/* Submissions Bar */}
                    <div className="p-2.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-[#64748B] block">Turned In</span>
                        <span className="font-bold text-[#15803D]">
                          {submittedSubs} / {totalSubs}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-[#64748B] block">Graded</span>
                        <span className="font-bold text-[#2563EB]">{gradedSubs}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#64748B] block">Pending</span>
                        <span className="font-bold text-[#B45309]">{pendingSubs}</span>
                      </div>
                      <div className="text-right border-l border-[#E2E8F0] pl-3">
                        <span className="text-[#64748B] block">Max Score</span>
                        <span className="font-bold text-[#0F172A]">{assignment.maxMarks} pts</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Edit}
                          className="text-[11px] py-1 px-2 text-[#64748B] hover:text-[#0F172A]"
                          onClick={() => {
                            setAssignmentToEdit(assignment);
                            setCreateModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          className="text-[11px] py-1 px-2 text-[#DC2626] hover:bg-red-50"
                          onClick={() => setAssignmentToDelete(assignment)}
                        >
                          Delete
                        </Button>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        icon={Eye}
                        className="text-xs py-1.5 px-3"
                        onClick={() => setSelectedAssignmentDetails(assignment)}
                      >
                        Submissions ({submittedSubs})
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create / Edit Assignment Modal */}
      <AssignmentFormModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setAssignmentToEdit(null);
        }}
        onSubmit={handleSaveAssignment}
        assignmentToEdit={assignmentToEdit}
      />

      {/* Assignment Details and Submissions Modal */}
      <AssignmentDetailsModal
        isOpen={Boolean(selectedAssignmentDetails)}
        onClose={() => setSelectedAssignmentDetails(null)}
        assignment={selectedAssignmentDetails}
        onOpenReview={(submission, assignment) => {
          setReviewSubmissionData({ submission, assignment });
        }}
        onEditAssignment={(assignment) => {
          setSelectedAssignmentDetails(null);
          setAssignmentToEdit(assignment);
          setCreateModalOpen(true);
        }}
      />

      {/* Submission Review Modal */}
      {reviewSubmissionData && (
        <SubmissionReviewModal
          isOpen={Boolean(reviewSubmissionData)}
          onClose={() => setReviewSubmissionData(null)}
          submission={reviewSubmissionData.submission}
          assignment={reviewSubmissionData.assignment}
          onSaveGrade={handleSaveGrade}
        />
      )}

      {/* Delete Confirmation Modal */}
      {assignmentToDelete && (
        <Modal
          isOpen={Boolean(assignmentToDelete)}
          onClose={() => setAssignmentToDelete(null)}
          title="Confirm Assignment Deletion"
          maxWidth="max-w-md"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAssignmentToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmDelete}
              >
                Delete Assignment
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-xs text-[#475569]">
            <p>
              Are you sure you want to delete assignment{' '}
              <strong className="text-[#0F172A]">{assignmentToDelete.title}</strong>{' '}
              ({assignmentToDelete.id})?
            </p>
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-[#DC2626] text-[11px] flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                This will remove the assignment and all recorded student submissions for this demo session.
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
