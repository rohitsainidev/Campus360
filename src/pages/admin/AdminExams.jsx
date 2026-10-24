import { useState, useEffect } from 'react';
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Plus,
  Search,
  BookOpen,
  Users,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { studentExamData } from '../../data/examMockData';
import examService from '../../services/examService';

export default function AdminExams() {
  const [timetable, setTimetable] = useState(studentExamData.timetable);
  const [resultsPublished, setResultsPublished] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Fetch timetable on mount
  useEffect(() => {
    let isMounted = true;
    const fetchTimetable = async () => {
      try {
        const res = await examService.getTimetable();
        if (isMounted && res.timetable && res.timetable.length > 0) {
          setTimetable(res.timetable);
          if (res.resultsPublished !== undefined) {
            setResultsPublished(res.resultsPublished);
          }
        }
      } catch (err) {
        console.warn('Backend timetable fetch fallback:', err);
      }
    };
    fetchTimetable();
    return () => {
      isMounted = false;
    };
  }, []);

  // Schedule Form
  const [formSubjectCode, setFormSubjectCode] = useState('');
  const [formSubjectName, setFormSubjectName] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('10:00 AM - 01:00 PM');
  const [formHall, setFormHall] = useState('CAC Hall-201');
  const [formExamType, setFormExamType] = useState('Theory');

  const handleTogglePublishResults = async () => {
    const nextState = !resultsPublished;
    setResultsPublished(nextState);
    try {
      await examService.togglePublishResults();
    } catch (err) {
      console.warn('Backend togglePublishResults fallback:', err);
    }
    setStatusMsg(
      nextState
        ? 'Official Semester Examination Results have been published across all student portals!'
        : 'Examination results moved back to draft / internal review mode.'
    );
    setTimeout(() => setStatusMsg(''), 4500);
  };

  const handleScheduleExam = async (e) => {
    e.preventDefault();
    if (!formSubjectCode || !formSubjectName || !formDate) {
      alert('Please fill subject code, subject name, and examination date.');
      return;
    }

    const newExam = {
      id: `EXAM-${Math.floor(10 + Math.random() * 90)}`,
      subjectCode: formSubjectCode.trim().toUpperCase(),
      subjectName: formSubjectName.trim(),
      examType: formExamType,
      date: formDate,
      time: formTime,
      duration: '3 Hours',
      hall: formHall,
      seat: 'All Allocated',
      facultyInCharge: 'Academic Registrar',
      maxMarks: formExamType === 'Theory' ? 100 : 50,
    };

    try {
      await examService.schedulePaper(newExam);
    } catch (err) {
      console.warn('Backend schedulePaper fallback:', err);
    }

    setTimetable([...timetable, newExam]);
    setScheduleModalOpen(false);
    setFormSubjectCode('');
    setFormSubjectName('');
    setFormDate('');

    setStatusMsg(`Exam session for ${newExam.subjectCode} scheduled successfully!`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Examination Controller & Results Administration"
        description="Schedule institutional examination rosters, configure admit card issuance, and publish semester result grades."
        breadcrumbs={[
          { label: 'Admin Console', path: '/admin/dashboard' },
          { label: 'Exam Controller' },
        ]}
        action={
          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              onClick={() => setScheduleModalOpen(true)}
              className="flex items-center gap-2 bg-[#5CAC32] hover:bg-[#4B9228] text-white font-medium shadow-2xs transition-colors"
            >
              <Plus className="h-4 w-4" />
              Schedule Paper
            </Button>
            <Button
              onClick={handleTogglePublishResults}
              className={`flex items-center gap-2 text-white font-medium transition-colors ${
                resultsPublished
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <Award className="h-4 w-4" />
              {resultsPublished ? 'Unpublish Results' : 'Publish Results Live'}
            </Button>
          </div>
        }
      />

      {statusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="h-4.5 w-4.5 text-[#5CAC32] shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* KPI Stats - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Scheduled Papers
              </span>
              <Calendar className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {timetable.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Theory &amp; Lab evaluations
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Registered Examinees
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                1,440
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Across 4 academic departments
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Result Publish Status
              </span>
              <Award className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-center min-h-[28px]">
              <span className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {resultsPublished ? 'Published Live' : 'Under Review'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {resultsPublished ? 'Visible on student portal' : 'Draft stage • Pending release'}
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Institutional Avg SGPA
              </span>
              <TrendingUp className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                8.42
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              +0.24 vs previous academic year
            </p>
          </div>
        </div>
      </div>

      {/* Scheduled Papers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/70 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">
              Active Examination Timetable
            </h3>
            <p className="text-xs text-slate-500">
              Odd Semester 2026 Institutional Date Sheet
            </p>
          </div>
          <Badge variant="primary">{timetable.length} Examination Slots</Badge>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[960px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Subject Code</th>
                <th className="py-3.5 px-4 min-w-[220px]">Subject Title</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Type</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Date</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Time Slot</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Exam Hall</th>
                <th className="py-3.5 pl-4 pr-6 text-center whitespace-nowrap">Max Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timetable.map((paper) => (
                <tr key={paper.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4.5 pl-6 pr-4 font-mono font-bold text-[#5CAC32] whitespace-nowrap">
                    {paper.subjectCode}
                  </td>
                  <td className="py-4.5 px-4 font-semibold text-slate-900 min-w-[220px]">
                    {paper.subjectName}
                  </td>
                  <td className="py-4.5 px-4 whitespace-nowrap">
                    <span className="text-xs font-medium text-slate-700">
                      {paper.examType}
                    </span>
                  </td>
                  <td className="py-4.5 px-4 text-xs font-mono text-slate-700 whitespace-nowrap">
                    {paper.date}
                  </td>
                  <td className="py-4.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                    {paper.time}
                  </td>
                  <td className="py-4.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                    {paper.hall}
                  </td>
                  <td className="py-4.5 pl-4 pr-6 text-center font-mono font-bold text-slate-800 whitespace-nowrap">
                    {paper.maxMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards */}
        <div className="block md:hidden divide-y divide-slate-100">
          {timetable.map((paper) => (
            <div key={paper.id} className="p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono font-bold text-[#5CAC32] text-xs">
                    {paper.subjectCode}
                  </span>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    {paper.subjectName}
                  </h4>
                </div>
                <span className="text-xs font-medium text-slate-600 shrink-0">
                  {paper.examType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[11px]">Date</span>
                  <span className="font-mono text-slate-800">{paper.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Time</span>
                  <span className="text-slate-800">{paper.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Hall</span>
                  <span className="text-slate-800">{paper.hall}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Max Marks</span>
                  <span className="font-mono font-bold text-slate-800">{paper.maxMarks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Exam Modal */}
      {scheduleModalOpen && (
        <Modal
          isOpen={scheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          title="Schedule New Examination Paper"
          size="md"
        >
          <form onSubmit={handleScheduleExam} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g. CS-305"
                  value={formSubjectCode}
                  onChange={(e) => setFormSubjectCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exam Type
                </label>
                <select
                  value={formExamType}
                  onChange={(e) => setFormExamType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20"
                >
                  <option value="Theory">Theory Exam</option>
                  <option value="Practical">Practical Lab</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Cloud Computing & DevOps Architecture"
                value={formSubjectName}
                onChange={(e) => setFormSubjectName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exam Date *
                </label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20"
                >
                  <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                  <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exam Hall / Laboratory
              </label>
              <input
                type="text"
                value={formHall}
                onChange={(e) => setFormHall(e.target.value)}
                placeholder="e.g. CAC Hall-201 / Software Lab 2"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setScheduleModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#5CAC32] hover:bg-[#4B9228] text-white"
              >
                Schedule Paper
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
