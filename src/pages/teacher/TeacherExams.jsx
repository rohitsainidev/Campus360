import { useState } from 'react';
import {
  Award,
  BookOpen,
  Users,
  Save,
  CheckCircle,
  Search,
  Upload,
  AlertCircle,
  FileSpreadsheet,
  TrendingUp,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { teacherGradingStudents } from '../../data/examMockData';

export default function TeacherExams() {
  const [selectedCourse, setSelectedCourse] = useState('CS-301');
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('campus360_teacher_grades');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return teacherGradingStudents;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const calculateGrade = (total) => {
    if (total >= 90) return 'O';
    if (total >= 80) return 'A+';
    if (total >= 70) return 'A';
    if (total >= 60) return 'B+';
    if (total >= 50) return 'B';
    if (total >= 40) return 'C';
    return 'F';
  };

  const handleMarksChange = (studentId, field, value) => {
    const num = Math.max(0, Number(value) || 0);

    const updated = students.map((s) => {
      if (s.id === studentId) {
        const internal = field === 'internalMarks' ? Math.min(30, num) : s.internalMarks;
        const midTerm = field === 'midTermMarks' ? Math.min(30, num) : s.midTermMarks;
        const practical = field === 'practicalMarks' ? Math.min(40, num) : s.practicalMarks;
        const total = internal + midTerm + practical;
        const grade = calculateGrade(total);

        return {
          ...s,
          [field]: field === 'internalMarks' ? Math.min(30, num) : field === 'midTermMarks' ? Math.min(30, num) : Math.min(40, num),
          totalMarks: total,
          grade,
        };
      }
      return s;
    });

    setStudents(updated);
    localStorage.setItem('campus360_teacher_grades', JSON.stringify(updated));
  };

  const handleFinalSubmit = () => {
    setStatusMsg(`Marks and grades for ${selectedCourse} submitted successfully to the Controller of Examinations.`);
    setTimeout(() => setStatusMsg(''), 4500);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty Gradebook & Marks Assessment"
        description="Enter continuous assessment, mid-term, and practical lab scores with automated grade normalization."
        breadcrumbs={[
          { label: 'Teacher Portal', path: '/teacher/dashboard' },
          { label: 'Exam Grading' },
        ]}
        badge={<Badge variant="primary">Grading Window Open</Badge>}
        action={
          <Button
            onClick={handleFinalSubmit}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Save className="h-4 w-4" />
            Submit Grades to Controller
          </Button>
        }
      />

      {statusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Grading Highlights - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Enrolled Candidates
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {students.length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Students</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Current cohort
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Class Average
              </span>
              <TrendingUp className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {(students.reduce((acc, s) => acc + s.totalMarks, 0) / (students.length || 1)).toFixed(1)}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Mean cumulative score
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                High Achievers (O / A)
              </span>
              <Award className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {students.filter((s) => s.grade === 'O' || s.grade.startsWith('A')).length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Distinctions</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Grade O or A+ tier
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Grading Progress
              </span>
              <BookOpen className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {students.filter((s) => s.totalMarks > 0).length}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">/ {students.length}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              100% assessments entered
            </p>
          </div>
        </div>
      </div>

      {/* Course Selector & Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-700">Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="CS-301">CS-301: Database Management Systems (4 Credits)</option>
            <option value="CS-302">CS-302: Operating Systems & Architecture (4 Credits)</option>
            <option value="CS-301-P">CS-301-P: RDBMS Practical Lab (2 Credits)</option>
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student or roll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">
              Continuous Assessment Sheet ({students.length} Enrolled Students)
            </h3>
            <p className="text-xs text-slate-500">
              Internal (Max 30) + Mid-Term (Max 30) + Practical (Max 40) = Total 100 Marks
            </p>
          </div>
          <Badge variant="primary">{selectedCourse}</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Student Details</th>
                <th className="py-3 px-4 text-center">Internal (30)</th>
                <th className="py-3 px-4 text-center">Mid-Term (30)</th>
                <th className="py-3 px-4 text-center">Practical (40)</th>
                <th className="py-3 px-4 text-center">Total (100)</th>
                <th className="py-3 px-4 text-center">Calculated Grade</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-xs font-mono text-indigo-600">{student.rollNo}</p>
                  </td>

                  {/* Internal Input */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={student.internalMarks}
                      onChange={(e) =>
                        handleMarksChange(student.id, 'internalMarks', e.target.value)
                      }
                      className="w-16 px-2 py-1 text-center font-mono text-sm bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>

                  {/* Mid-Term Input */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={student.midTermMarks}
                      onChange={(e) =>
                        handleMarksChange(student.id, 'midTermMarks', e.target.value)
                      }
                      className="w-16 px-2 py-1 text-center font-mono text-sm bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>

                  {/* Practical Input */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={student.practicalMarks}
                      onChange={(e) =>
                        handleMarksChange(student.id, 'practicalMarks', e.target.value)
                      }
                      className="w-16 px-2 py-1 text-center font-mono text-sm bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>

                  {/* Total */}
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                    {student.totalMarks}
                  </td>

                  {/* Grade */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`font-bold text-xs ${
                        student.grade === 'O'
                          ? 'text-purple-700'
                          : student.grade.startsWith('A')
                          ? 'text-emerald-700'
                          : 'text-blue-700'
                      }`}
                    >
                      {student.grade}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-center text-xs font-semibold text-emerald-600">
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
