import { useState, useMemo } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  RotateCcw,
  Save,
  CheckCheck,
  Calendar,
  BookOpen,
  GraduationCap,
  Info,
  Clock,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import AttendanceTable from '../../components/teacher/AttendanceTable';
import AttendanceSummary from '../../components/teacher/AttendanceSummary';
import EmptyState from '../../components/ui/EmptyState';
import {
  teacherCourses,
  teacherSemesters,
  teacherSubjects,
  initialTeacherStudents,
  initialTeacherAttendanceRecords,
} from '../../data/mockData';

function AttendanceSessionWorkspace({
  selectedCourse,
  selectedSemester,
  selectedSubject,
  selectedDate,
  enrolledStudents,
  existingRecord,
  onSaveAttendance,
  currentSubjectObj,
}) {
  const [attendanceState, setAttendanceState] = useState(() => {
    if (existingRecord && existingRecord.records) {
      return existingRecord.records;
    }
    const initial = {};
    enrolledStudents.forEach((stu) => {
      initial[stu.id] = 'present';
    });
    return initial;
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [overwriteConfirmOpen, setOverwriteConfirmOpen] = useState(false);

  const totalCount = enrolledStudents.length;
  const presentCount = Object.values(attendanceState).filter((s) => s === 'present').length;
  const absentCount = Object.values(attendanceState).filter((s) => s === 'absent').length;

  const handleToggleStatus = (studentId, status) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: status,
    }));
    setHasUnsavedChanges(true);
    if (validationError) setValidationError('');
  };

  const handleMarkAllPresent = () => {
    const next = {};
    enrolledStudents.forEach((stu) => {
      next[stu.id] = 'present';
    });
    setAttendanceState(next);
    setHasUnsavedChanges(true);
    if (validationError) setValidationError('');
  };

  const handleResetCurrent = () => {
    if (existingRecord && existingRecord.records) {
      setAttendanceState(existingRecord.records);
    } else {
      const reset = {};
      enrolledStudents.forEach((stu) => {
        reset[stu.id] = 'present';
      });
      setAttendanceState(reset);
    }
    setHasUnsavedChanges(false);
    setValidationError('');
  };

  const handleAttemptSave = (force = false) => {
    if (!selectedCourse || !selectedSemester || !selectedSubject || !selectedDate) {
      setValidationError('Please select a valid course, semester, subject, and class date.');
      return;
    }

    if (enrolledStudents.length === 0) {
      setValidationError('Cannot save attendance for an empty class cohort.');
      return;
    }

    const unmarked = enrolledStudents.filter((s) => !attendanceState[s.id]);
    if (unmarked.length > 0) {
      setValidationError(`Please mark attendance status for all students (${unmarked.length} remaining).`);
      return;
    }

    if (existingRecord && hasUnsavedChanges && !force && !overwriteConfirmOpen) {
      setOverwriteConfirmOpen(true);
      return;
    }

    onSaveAttendance({
      attendanceState,
      presentCount,
      absentCount,
    });
    setHasUnsavedChanges(false);
    setOverwriteConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Overwrite Confirmation Alert */}
      {overwriteConfirmOpen && (
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-[#B45309] space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Attendance Record Already Exists For This Date</span>
          </div>
          <p className="text-[11px]">
            A previously saved attendance roll is already on file for <strong>{currentSubjectObj?.name}</strong> on <strong>{selectedDate}</strong>. Overwriting will replace the existing record.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              variant="primary"
              className="bg-[#B45309] hover:bg-[#92400E]"
              onClick={() => handleAttemptSave(true)}
            >
              Confirm & Overwrite
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOverwriteConfirmOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="font-medium">{validationError}</span>
        </div>
      )}

      {/* Attendance Summary Cards */}
      <AttendanceSummary
        total={totalCount}
        present={presentCount}
        absent={absentCount}
      />

      {/* Attendance Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={CheckCheck}
            onClick={handleMarkAllPresent}
            disabled={enrolledStudents.length === 0}
          >
            Mark All Present
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={handleResetCurrent}
            disabled={!hasUnsavedChanges}
          >
            Reset Unsaved
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          {hasUnsavedChanges && (
            <span className="text-xs text-[#B45309] font-medium hidden sm:inline">
              Unsaved modifications
            </span>
          )}
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={() => handleAttemptSave(false)}
            disabled={enrolledStudents.length === 0}
          >
            {existingRecord ? 'Update Saved Record' : 'Save Attendance'}
          </Button>
        </div>
      </div>

      {/* Student Attendance Roster Table */}
      {enrolledStudents.length === 0 ? (
        <EmptyState
          title="No students enrolled in selected cohort"
          description="There are currently no students mapped to this course and semester combination."
          icon={Users}
        />
      ) : (
        <div className="space-y-3">
          <AttendanceTable
            students={enrolledStudents}
            attendanceState={attendanceState}
            onToggleStatus={handleToggleStatus}
          />

          <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
            <span>
              Session: <strong>{currentSubjectObj?.name} ({selectedSubject})</strong> • {selectedDate}
            </span>
            <span>
              Enrolled: {totalCount} • Present: <strong className="text-[#15803D]">{presentCount}</strong> • Absent: <strong className="text-[#DC2626]">{absentCount}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeacherAttendance() {
  const [selectedCourse, setSelectedCourse] = useState(teacherCourses[0]);
  const [selectedSemester, setSelectedSemester] = useState(teacherSemesters[1]); // Semester 6
  const [selectedSubject, setSelectedSubject] = useState(teacherSubjects[0].code); // CS-301
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Saved records storage (loaded from localStorage or initialized from mock records)
  const [savedRecords, setSavedRecords] = useState(() => {
    const stored = localStorage.getItem('campus360_teacher_attendance');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    return initialTeacherAttendanceRecords;
  });

  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Filter subjects matching selected course and semester
  const availableSubjects = useMemo(() => {
    const list = teacherSubjects.filter(
      (sub) => sub.course === selectedCourse && sub.semester === selectedSemester
    );
    return list.length > 0 ? list : teacherSubjects;
  }, [selectedCourse, selectedSemester]);

  // Handlers for selectors that cleanly synchronize subject choice
  const handleCourseChange = (newCourse) => {
    setSelectedCourse(newCourse);
    const valid = teacherSubjects.filter(
      (s) => s.course === newCourse && s.semester === selectedSemester
    );
    if (valid.length > 0) {
      setSelectedSubject(valid[0].code);
    }
    setSaveSuccessMessage('');
  };

  const handleSemesterChange = (newSemester) => {
    setSelectedSemester(newSemester);
    const valid = teacherSubjects.filter(
      (s) => s.course === selectedCourse && s.semester === newSemester
    );
    if (valid.length > 0) {
      setSelectedSubject(valid[0].code);
    }
    setSaveSuccessMessage('');
  };

  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    setSaveSuccessMessage('');
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSaveSuccessMessage('');
  };

  // Filter students enrolled in the selected course and semester
  const enrolledStudents = useMemo(() => {
    return initialTeacherStudents.filter(
      (stu) => stu.course === selectedCourse && stu.semester === selectedSemester
    );
  }, [selectedCourse, selectedSemester]);

  // Composite key for unique class + date session
  const sessionKey = `${selectedCourse}_${selectedSemester}_${selectedSubject}_${selectedDate}`;
  const existingRecord = savedRecords[sessionKey];

  const currentSubjectObj = teacherSubjects.find((s) => s.code === selectedSubject);

  const handleSaveAttendance = ({ attendanceState, presentCount, absentCount }) => {
    const newRecord = {
      course: selectedCourse,
      semester: selectedSemester,
      subject: selectedSubject,
      subjectName: currentSubjectObj ? currentSubjectObj.name : selectedSubject,
      date: selectedDate,
      timestamp: new Date().toISOString(),
      records: attendanceState,
    };

    const updated = {
      ...savedRecords,
      [sessionKey]: newRecord,
    };

    setSavedRecords(updated);
    localStorage.setItem('campus360_teacher_attendance', JSON.stringify(updated));

    setSaveSuccessMessage(
      `Attendance for ${newRecord.subjectName} (${selectedDate}) saved successfully! ${presentCount} Present, ${absentCount} Absent.`
    );

    setTimeout(() => {
      setSaveSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Attendance Management"
        description="Record, verify, and archive daily classroom attendance for your assigned academic batches."
        breadcrumbs={[
          { label: 'Teacher Portal', path: '/teacher/dashboard' },
          { label: 'Attendance' },
        ]}
        badge={
          existingRecord ? (
            <Badge variant="success" dot>
              Record Saved Locally
            </Badge>
          ) : (
            <Badge variant="warning" dot>
              Unsaved Session
            </Badge>
          )
        }
      />

      {/* Demo Persistence Notice */}
      <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-start gap-2.5 text-xs text-[#4F46E5]">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold">Simulated Departmental Biometric Attendance Engine</span>
          <p className="text-[#475569] text-[11px] mt-0.5">
            Demonstration attendance records are persisted in local browser storage for testing and inspection. Data is scoped per subject and date.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccessMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
          <span className="font-semibold">{saveSuccessMessage}</span>
        </div>
      )}

      {/* Class Selection Controls */}
      <div className="bg-white p-5 rounded-lg border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4.5 w-4.5 text-[#4F46E5]" />
            <h2 className="text-sm font-bold text-[#0F172A]">Class Cohort & Date Selectors</h2>
          </div>
          {existingRecord && (
            <span className="text-[11px] text-[#64748B] flex items-center gap-1 font-mono">
              <Clock className="h-3 w-3 text-[#15803D]" />
              Saved on: {new Date(existingRecord.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Course */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1 text-[11px]">
              <GraduationCap className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Program / Course</span>
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              {teacherCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1 text-[11px]">
              <Calendar className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Semester</span>
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => handleSemesterChange(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              {teacherSemesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1 text-[11px]">
              <BookOpen className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Subject Unit</span>
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            >
              {availableSubjects.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          {/* Class Date */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0F172A] flex items-center gap-1 text-[11px]">
              <Calendar className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Session Date</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Keyed Attendance Session Workspace */}
      <AttendanceSessionWorkspace
        key={sessionKey}
        selectedCourse={selectedCourse}
        selectedSemester={selectedSemester}
        selectedSubject={selectedSubject}
        selectedDate={selectedDate}
        enrolledStudents={enrolledStudents}
        existingRecord={existingRecord}
        onSaveAttendance={handleSaveAttendance}
        currentSubjectObj={currentSubjectObj}
      />
    </div>
  );
}
