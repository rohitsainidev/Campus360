import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { teacherSubjects, teacherCourses, teacherSemesters } from '../../data/mockData';

function getInitialFormData(assignmentToEdit) {
  if (assignmentToEdit) {
    return {
      title: assignmentToEdit.title || '',
      subject: assignmentToEdit.subject || '',
      course: assignmentToEdit.course || teacherCourses[0] || '',
      semester: assignmentToEdit.semester || 'Semester 6',
      assignedDate:
        assignmentToEdit.createdDate ||
        assignmentToEdit.assignedDate ||
        new Date().toISOString().split('T')[0],
      dueDate: assignmentToEdit.dueDate || '',
      maxMarks: String(assignmentToEdit.maxMarks || '50'),
      description: assignmentToEdit.description || '',
      instructions: assignmentToEdit.instructions || '',
    };
  }

  const defaultDue = new Date();
  defaultDue.setDate(defaultDue.getDate() + 14);
  return {
    title: '',
    subject: teacherSubjects[0]?.name
      ? `${teacherSubjects[0].name} (${teacherSubjects[0].code})`
      : '',
    course: teacherCourses[0] || '',
    semester: teacherSemesters[1] || 'Semester 6',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: defaultDue.toISOString().split('T')[0],
    maxMarks: '50',
    description: '',
    instructions: '',
  };
}

function AssignmentFormBody({ assignmentToEdit, onSubmit, onClose }) {
  const isEditing = Boolean(assignmentToEdit);
  const [formData, setFormData] = useState(() => getInitialFormData(assignmentToEdit));
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubjectChange = (subjectString) => {
    const match = teacherSubjects.find(
      (s) => `${s.name} (${s.code})` === subjectString || s.name === subjectString
    );
    if (match) {
      setFormData((prev) => ({
        ...prev,
        subject: subjectString,
        course: match.course || prev.course,
        semester: match.semester || prev.semester,
      }));
    } else {
      setFormData((prev) => ({ ...prev, subject: subjectString }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Assignment title is required.';
    }
    if (!formData.subject) {
      errs.subject = 'Subject selection is required.';
    }
    if (!formData.course) {
      errs.course = 'Target course is required.';
    }
    if (!formData.semester) {
      errs.semester = 'Academic semester is required.';
    }
    if (!formData.assignedDate) {
      errs.assignedDate = 'Assigned date is required.';
    }
    if (!formData.dueDate) {
      errs.dueDate = 'Submission due date is required.';
    } else if (formData.assignedDate && formData.dueDate < formData.assignedDate) {
      errs.dueDate = 'Due date cannot be earlier than assigned date.';
    }

    const marksNum = Number(formData.maxMarks);
    if (formData.maxMarks === '' || isNaN(marksNum) || marksNum <= 0) {
      errs.maxMarks = 'Maximum marks must be a positive number greater than 0.';
    }

    if (!formData.description.trim()) {
      errs.description = 'Assignment prompt description is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      maxMarks: Number(formData.maxMarks),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Title */}
        <Input
          label="Assignment Title"
          required
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Relational Schema Normalization & Query Tuning"
          error={errors.title}
        />

        {/* Subject dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F172A] flex items-center justify-between">
            <span>
              Subject / Course Unit <span className="text-[#DC2626]">*</span>
            </span>
          </label>
          <select
            value={formData.subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-sm px-3.5 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
          >
            {teacherSubjects.map((sub) => (
              <option key={sub.code} value={`${sub.name} (${sub.code})`}>
                {sub.name} ({sub.code}) — {sub.semester}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-xs text-[#DC2626] font-medium">{errors.subject}</p>
          )}
        </div>

        {/* Course and Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">
              Course / Degree <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.course}
              onChange={(e) => handleChange('course', e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-sm px-3.5 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              {teacherCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-xs text-[#DC2626] font-medium">{errors.course}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">
              Semester <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={formData.semester}
              onChange={(e) => handleChange('semester', e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-sm px-3.5 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              {teacherSemesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.semester && (
              <p className="text-xs text-[#DC2626] font-medium">{errors.semester}</p>
            )}
          </div>
        </div>

        {/* Dates & Marks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Assigned Date"
            type="date"
            required
            value={formData.assignedDate}
            onChange={(e) => handleChange('assignedDate', e.target.value)}
            error={errors.assignedDate}
          />

          <Input
            label="Due Date"
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            error={errors.dueDate}
          />

          <Input
            label="Maximum Marks"
            type="number"
            min="1"
            max="1000"
            required
            value={formData.maxMarks}
            onChange={(e) => handleChange('maxMarks', e.target.value)}
            error={errors.maxMarks}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F172A] flex items-center justify-between">
            <span>
              Problem Statement / Description <span className="text-[#DC2626]">*</span>
            </span>
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Detailed description of the coursework task or problem set..."
            className={`w-full rounded-md border bg-white text-[#0F172A] text-xs p-3 transition-colors focus:outline-none focus:ring-1 ${
              errors.description
                ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
                : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-[#DC2626] font-medium">{errors.description}</p>
          )}
        </div>

        {/* Optional Instructions */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F172A]">
            Submission Guidelines / Special Instructions (Optional)
          </label>
          <textarea
            rows={2}
            value={formData.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="e.g. Include PDF document with query execution plans and group member names..."
            className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs p-3 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
          />
        </div>

        {/* Modal Action Buttons inside form */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button size="sm" type="submit">
            {isEditing ? 'Save Changes' : 'Publish Assignment'}
          </Button>
        </div>
      </form>
    </>
  );
}

export default function AssignmentFormModal({
  isOpen,
  onClose,
  onSubmit,
  assignmentToEdit = null,
}) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={assignmentToEdit ? 'Edit Assignment' : 'Create New Course Assignment'}
      maxWidth="max-w-xl"
    >
      <AssignmentFormBody
        key={assignmentToEdit ? assignmentToEdit.id : 'new-assignment'}
        assignmentToEdit={assignmentToEdit}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Modal>
  );
}
