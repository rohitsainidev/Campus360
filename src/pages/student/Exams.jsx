import { useState, useEffect } from 'react';
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  Download,
  Printer,
  QrCode,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  GraduationCap,
  TrendingUp,
  Search,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { studentExamData } from '../../data/examMockData';
import examService from '../../services/examService';

const TIMETABLE_THEMES = [
  {
    container: 'bg-gradient-to-br from-emerald-50/70 via-white to-white border-emerald-200 border-l-4 border-l-emerald-500 hover:border-emerald-300',
    badge: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
    typeText: 'text-emerald-700 font-semibold',
    accentIcon: 'text-emerald-600',
    dateText: 'text-emerald-950 font-bold',
    divider: 'border-emerald-100/80',
  },
  {
    container: 'bg-gradient-to-br from-blue-50/70 via-white to-white border-blue-200 border-l-4 border-l-blue-500 hover:border-blue-300',
    badge: 'bg-blue-100/90 text-blue-800 border-blue-200',
    typeText: 'text-blue-700 font-semibold',
    accentIcon: 'text-blue-600',
    dateText: 'text-blue-950 font-bold',
    divider: 'border-blue-100/80',
  },
  {
    container: 'bg-gradient-to-br from-purple-50/70 via-white to-white border-purple-200 border-l-4 border-l-purple-500 hover:border-purple-300',
    badge: 'bg-purple-100/90 text-purple-800 border-purple-200',
    typeText: 'text-purple-700 font-semibold',
    accentIcon: 'text-purple-600',
    dateText: 'text-purple-950 font-bold',
    divider: 'border-purple-100/80',
  },
  {
    container: 'bg-gradient-to-br from-amber-50/70 via-white to-white border-amber-200 border-l-4 border-l-amber-500 hover:border-amber-300',
    badge: 'bg-amber-100/90 text-amber-900 border-amber-200',
    typeText: 'text-amber-800 font-semibold',
    accentIcon: 'text-amber-600',
    dateText: 'text-amber-950 font-bold',
    divider: 'border-amber-100/80',
  },
  {
    container: 'bg-gradient-to-br from-rose-50/70 via-white to-white border-rose-200 border-l-4 border-l-rose-500 hover:border-rose-300',
    badge: 'bg-rose-100/90 text-rose-800 border-rose-200',
    typeText: 'text-rose-700 font-semibold',
    accentIcon: 'text-rose-600',
    dateText: 'text-rose-950 font-bold',
    divider: 'border-rose-100/80',
  },
  {
    container: 'bg-gradient-to-br from-teal-50/70 via-white to-white border-teal-200 border-l-4 border-l-teal-500 hover:border-teal-300',
    badge: 'bg-teal-100/90 text-teal-800 border-teal-200',
    typeText: 'text-teal-700 font-semibold',
    accentIcon: 'text-teal-600',
    dateText: 'text-teal-950 font-bold',
    divider: 'border-teal-100/80',
  },
];

export default function StudentExams() {
  const [activeTab, setActiveTab] = useState('TIMETABLE'); // TIMETABLE | HALLTICKET | RESULTS
  const [examData, setExamData] = useState(() => {
    const saved = localStorage.getItem('campus360_student_exams');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return studentExamData;
  });

  // Fetch live timetable from backend
  useEffect(() => {
    let isMounted = true;
    const fetchExamData = async () => {
      try {
        const res = await examService.getTimetable();
        if (isMounted && res.timetable && res.timetable.length > 0) {
          const formatted = res.timetable.map((t) => ({
            id: t._id || t.id,
            subjectCode: t.subjectCode,
            subjectName: t.subjectName,
            examType: t.examType,
            date: t.date,
            time: t.time,
            duration: t.duration || '3 Hours',
            hall: t.hall,
            seat: 'CS-A-42',
            facultyInCharge: t.facultyInCharge || 'Dr. Sarah Patel',
            maxMarks: t.maxMarks || 100,
          }));

          setExamData((prev) => ({
            ...prev,
            timetable: formatted,
          }));
        }
      } catch {
        // fallback
      }
    };
    fetchExamData();
    return () => {
      isMounted = false;
    };
  }, []);

  const [downloadMsg, setDownloadMsg] = useState('');

  const handlePrintHallTicket = () => {
    window.print();
  };

  const handleDownloadDateSheet = () => {
    setDownloadMsg('Downloading Official Exam Datesheet (PDF)...');
    setTimeout(() => setDownloadMsg(''), 3500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Examination Cell & Academic Results"
        description="Access upcoming examination timetables, download official hall tickets, and review cumulative grade sheets."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Exams & Results' },
        ]}
        badge={<Badge variant="primary">{examData.activeSession}</Badge>}
        action={
          <Button
            onClick={() => setActiveTab('HALLTICKET')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <QrCode className="h-4 w-4" />
            View Hall Ticket
          </Button>
        }
      />

      {downloadMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
          {downloadMsg}
        </div>
      )}

      {/* Navigation Tab Bar */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('TIMETABLE')}
          className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === 'TIMETABLE'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="h-4 w-4" />
          Exam Timetable ({examData.timetable.length})
        </button>

        <button
          onClick={() => setActiveTab('HALLTICKET')}
          className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === 'HALLTICKET'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <QrCode className="h-4 w-4" />
          Digital Hall Ticket
        </button>

        <button
          onClick={() => setActiveTab('RESULTS')}
          className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer flex items-center gap-2 ${
            activeTab === 'RESULTS'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="h-4 w-4" />
          Grade Card & SGPA
        </button>
      </div>

      {/* TAB 1: EXAM TIMETABLE */}
      {activeTab === 'TIMETABLE' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                End-Semester Theory & Practical Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Reporting time: 30 minutes prior to paper commencement
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadDateSheet}
              className="flex items-center gap-1.5 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              <Download className="h-3.5 w-3.5" />
              Download Date Sheet
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examData.timetable.map((paper, index) => {
              const theme = TIMETABLE_THEMES[index % TIMETABLE_THEMES.length];
              return (
                <div
                  key={paper.id}
                  className={`rounded-xl p-5 border shadow-xs hover:shadow-md transition-all space-y-3 ${theme.container}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-md border ${theme.badge}`}>
                      {paper.subjectCode}
                    </span>
                    <span className={`text-xs ${theme.typeText}`}>
                      {paper.examType} Paper
                    </span>
                  </div>

                  <h4 className="font-semibold text-slate-900 text-base leading-snug">
                    {paper.subjectName}
                  </h4>

                  <div className={`grid grid-cols-2 gap-2 pt-2.5 border-t text-xs text-slate-600 ${theme.divider}`}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className={`h-3.5 w-3.5 ${theme.accentIcon}`} />
                      <span className={theme.dateText}>{paper.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{paper.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{paper.hall}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">Seat: {paper.seat}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL HALL TICKET */}
      {activeTab === 'HALLTICKET' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={handlePrintHallTicket}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Printer className="h-4 w-4" />
              Print / Save Hall Ticket PDF
            </Button>
          </div>

          <div
            id="printable-hallticket"
            className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md space-y-6"
          >
            {/* Header */}
            <div className="text-center border-b-2 border-slate-200 pb-5 space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
                Official Examination Admit Card
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                CAMPUS360 UNIVERSITY OF TECHNOLOGY
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Autonomous Institution • Affiliated to State Technical Board
              </p>
              <p className="text-xs font-semibold text-slate-700 pt-1">
                ADMIT CARD / HALL TICKET - ODD SEMESTER 2026
              </p>
            </div>

            {/* Candidate Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="sm:col-span-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-500">Candidate Name:</p>
                  <p className="font-bold text-slate-900 text-sm">
                    {examData.studentInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Roll / Admit No:</p>
                  <p className="font-mono font-bold text-indigo-700 text-sm">
                    {examData.studentInfo.rollNo}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Degree & Branch:</p>
                  <p className="font-semibold text-slate-800">
                    B.Tech - Computer Science & Engg
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Semester:</p>
                  <p className="font-semibold text-slate-800">
                    {examData.studentInfo.semester}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-500">Allotted Exam Center:</p>
                  <p className="font-semibold text-slate-800">
                    {examData.studentInfo.examCenter} ({examData.studentInfo.seatNumber})
                  </p>
                </div>
              </div>

              {/* QR and Status Box */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-200 text-center space-y-2">
                <div className="h-16 w-16 bg-slate-100 border border-slate-300 rounded flex items-center justify-center">
                  <QrCode className="h-12 w-12 text-slate-800" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {examData.studentInfo.admitCardNumber}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">
                  Verified Candidate
                </span>
              </div>
            </div>

            {/* Timetable Table in Hall ticket */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Authorized Examination Papers
              </p>
              <table className="w-full text-xs text-left border border-slate-200">
                <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Code</th>
                    <th className="py-2 px-3">Subject Name</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Session</th>
                    <th className="py-2 px-3 text-center">Invigilator Sign</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {examData.timetable.map((t) => (
                    <tr key={t.id}>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">
                        {t.subjectCode}
                      </td>
                      <td className="py-2 px-3 font-medium text-slate-900">
                        {t.subjectName}
                      </td>
                      <td className="py-2 px-3 font-mono">{t.date}</td>
                      <td className="py-2 px-3">{t.time}</td>
                      <td className="py-2 px-3 text-center text-slate-300 font-mono">
                        ___________
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <p className="font-bold">Instructions to the Candidate:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Candidates must produce this Hall Ticket along with university identity card for every session.</li>
                <li>Electronic devices, smartwatches, and programmable calculators are strictly prohibited.</li>
                <li>No candidate shall be admitted 15 minutes after the examination start time.</li>
              </ul>
            </div>

            {/* Signatures */}
            <div className="pt-8 flex justify-between items-end text-xs text-slate-600">
              <div className="text-center">
                <div className="h-10 border-b border-slate-400 w-36 mb-1"></div>
                <p className="font-medium">Candidate Signature</p>
              </div>
              <div className="text-center">
                <div className="h-10 border-b border-slate-400 w-36 mb-1 flex items-end justify-center font-serif italic text-slate-800">
                  Vikram Seth
                </div>
                <p className="font-bold text-slate-900">Controller of Examinations</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PUBLISHED GRADE CARDS */}
      {activeTab === 'RESULTS' && (
        <div className="space-y-6">
          {/* CGPA / SGPA Highlights - Unified Enterprise Strip */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-600 transition-colors">
                    Cumulative GPA (CGPA)
                  </span>
                  <GraduationCap className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
                </div>
                <div className="my-0.5 flex items-baseline">
                  <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {examData.publishedResults.cgpa}
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-1">/ 10.0</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  Overall academic standing
                </p>
              </div>

              <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-600 transition-colors">
                    Semester SGPA
                  </span>
                  <TrendingUp className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
                </div>
                <div className="my-0.5 flex items-baseline">
                  <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {examData.publishedResults.sgpa}
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-1">SGPA</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {examData.publishedResults.semester}
                </p>
              </div>

              <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-600 transition-colors">
                    Credits Earned
                  </span>
                  <Award className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
                </div>
                <div className="my-0.5 flex items-baseline">
                  <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {examData.publishedResults.earnedCredits}
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-1">/ {examData.publishedResults.totalCredits}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  100% completion rate
                </p>
              </div>

              <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-600 transition-colors">
                    Classification
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
                </div>
                <div className="my-0.5">
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    Distinction
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  First Class with Honors
                </p>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">
                  Official Statement of Grades - {examData.publishedResults.semester}
                </h3>
                <p className="text-xs text-slate-500">
                  Autonomous Grading Scheme (Relative Normalization System)
                </p>
              </div>
              <Badge variant="success">Passed with Distinction</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Subject Code</th>
                    <th className="py-3 px-4">Subject Title</th>
                    <th className="py-3 px-4 text-center">Credits</th>
                    <th className="py-3 px-4 text-center">Marks Obtained</th>
                    <th className="py-3 px-4 text-center">Letter Grade</th>
                    <th className="py-3 px-4 text-center">Grade Point</th>
                    <th className="py-3 px-4 text-center">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {examData.publishedResults.courses.map((course) => (
                    <tr key={course.code} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-indigo-600">
                        {course.code}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {course.title}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-700">
                        {course.credits}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono">
                        {course.marksObtained} / {course.totalMarks}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-bold px-2.5 py-0.5 rounded-md text-xs ${
                            course.grade === 'O'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : course.grade.startsWith('A')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {course.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                        {course.gradePoint} / 10
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-xs font-semibold text-emerald-600">
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
