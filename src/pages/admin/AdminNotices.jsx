import { useState, useMemo, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Pin,
  Calendar,
  Building,
  User,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Users,
  Search,
  Filter,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { initialNotices } from '../../data/noticeMockData';
import noticeService from '../../services/noticeService';

export default function AdminNotices() {
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('campus360_notices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialNotices;
  });

  // Load notices from backend on mount
  useEffect(() => {
    let isMounted = true;
    const fetchNotices = async () => {
      try {
        const res = await noticeService.getNotices();
        if (isMounted && res.notices && res.notices.length > 0) {
          const formatted = res.notices.map((n) => ({
            id: n._id || n.id,
            title: n.title,
            category: n.category,
            priority: n.priority,
            targetAudience: n.targetAudience,
            department: n.department,
            publishedBy: n.authorName || 'Administration',
            publishedDate: (n.createdAt || new Date().toISOString()).split('T')[0],
            isPinned: Boolean(n.isPinned),
            content: n.content,
            attachments: n.attachments || [],
          }));
          setNotices(formatted);
          localStorage.setItem('campus360_notices', JSON.stringify(formatted));
        }
      } catch {
        // fallback
      }
    };
    fetchNotices();
    return () => {
      isMounted = false;
    };
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Academic');
  const [formAudience, setFormAudience] = useState('all');
  const [formPriority, setFormPriority] = useState('Normal');
  const [formDepartment, setFormDepartment] = useState('Central Administration');
  const [formContent, setFormContent] = useState('');
  const [formPinned, setFormPinned] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredNotices = useMemo(() => {
    return notices.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notices, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: notices.length,
      urgent: notices.filter((n) => n.priority === 'Urgent').length,
      pinned: notices.filter((n) => n.isPinned).length,
      students: notices.filter(
        (n) => n.targetAudience === 'student' || n.targetAudience === 'all'
      ).length,
    };
  }, [notices]);

  const renderPriority = (priority) => {
    if (priority === 'Urgent') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          Urgent
        </span>
      );
    }
    if (priority === 'High') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          High
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        Normal
      </span>
    );
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      setFormError('Title and announcement content are required.');
      return;
    }

    try {
      const payload = {
        title: formTitle.trim(),
        category: formCategory,
        priority: formPriority,
        targetAudience: formAudience,
        department: formDepartment,
        content: formContent.trim(),
        isPinned: formPinned,
      };

      let createdId = `NOTIF-${Date.now()}`;
      try {
        const res = await noticeService.createNotice(payload);
        if (res?.notice?._id) createdId = res.notice._id;
      } catch (err) {
        console.warn('Backend notice create fallback to local:', err);
      }

      const newNotice = {
        id: createdId,
        ...payload,
        publishedBy: 'System Administrator',
        publishedDate: new Date().toISOString().split('T')[0],
        attachments: [],
      };

      const updated = [newNotice, ...notices];
      setNotices(updated);
      localStorage.setItem('campus360_notices', JSON.stringify(updated));

      // Reset Form
      setFormTitle('');
      setFormContent('');
      setFormPinned(false);
      setFormError('');
      setCreateModalOpen(false);

      setStatusMessage('New institutional announcement published successfully!');
      setTimeout(() => setStatusMessage(''), 4000);
    } catch {
      setFormError('Failed to create announcement.');
    }
  };

  const handleTogglePin = async (id) => {
    const updated = notices.map((n) =>
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    );
    setNotices(updated);
    localStorage.setItem('campus360_notices', JSON.stringify(updated));
    try {
      await noticeService.togglePin(id);
    } catch {
      // local fallback handled
    }
  };

  const handleDeleteNotice = async (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      const updated = notices.filter((n) => n.id !== id);
      setNotices(updated);
      localStorage.setItem('campus360_notices', JSON.stringify(updated));
      setStatusMessage('Announcement removed.');
      setTimeout(() => setStatusMessage(''), 3000);
      try {
        await noticeService.deleteNotice(id);
      } catch {
        // local fallback handled
      }
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Announcements & Circulars Management"
        description="Broadcast official institution notices, examination directives, fee circulars, and campus updates."
        breadcrumbs={[
          { label: 'Admin Console', path: '/admin/dashboard' },
          { label: 'Announcements' },
        ]}
        action={
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 bg-[#5CAC32] hover:bg-[#4B9228] text-white font-medium shadow-2xs transition-colors"
          >
            <Plus className="h-4 w-4" />
            Publish Announcement
          </Button>
        }
      />

      {statusMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="h-4.5 w-4.5 text-[#5CAC32] shrink-0" />
          {statusMessage}
        </div>
      )}

      {/* KPI Stats - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Announcements
              </span>
              <Megaphone className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {stats.total}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Published this academic year
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Urgent Directives
              </span>
              <AlertTriangle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {stats.urgent}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              High priority alerts
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Pinned to Top
              </span>
              <Pin className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {stats.pinned}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Highlighted on student dash
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Student Broadcasts
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {stats.students}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Visible on student portal
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 text-[#5CAC32] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, dept, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] transition-all placeholder:text-slate-400"
          />
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Showing {filteredNotices.length} of {notices.length} notices
        </p>
      </div>

      {/* Desktop Notices Table */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm min-w-[940px]">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 pl-6 pr-4 min-w-[280px]">Title & Details</th>
              <th className="py-3.5 px-4 min-w-[140px] whitespace-nowrap">Category</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Target Audience</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Priority</th>
              <th className="py-3.5 px-4 whitespace-nowrap">Date</th>
              <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredNotices.map((notice) => (
              <tr
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-4 pl-6 pr-4 min-w-[280px]">
                  <div className="flex items-start gap-2">
                    {notice.isPinned && (
                      <Pin className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
                    )}
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-[#5CAC32] transition-colors line-clamp-1">
                        {notice.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {notice.department} • <span className="font-mono text-[11px] text-slate-400">Ref: {notice.id}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 min-w-[140px] whitespace-nowrap">
                  <span className="text-xs font-medium text-slate-800">
                    {notice.category}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-xs text-slate-600">
                    {notice.targetAudience === 'all'
                      ? 'All Portals'
                      : `${notice.targetAudience}s Only`}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {renderPriority(notice.priority)}
                </td>
                <td className="py-4 px-4 text-xs text-slate-500 font-mono whitespace-nowrap">
                  {notice.publishedDate}
                </td>
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleTogglePin(notice.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        notice.isPinned
                          ? 'text-amber-600 hover:bg-amber-50'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={notice.isPinned ? 'Unpin Notice' : 'Pin to Top'}
                    >
                      <Pin className={`h-4 w-4 ${notice.isPinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Notice"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards View */}
      <div className="block md:hidden space-y-3">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-2.5 active:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-800">
                    {notice.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  {renderPriority(notice.priority)}
                  {notice.isPinned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
                      <Pin className="h-3 w-3 fill-amber-500 text-amber-500" /> Pinned
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                  {notice.title}
                </h4>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleTogglePin(notice.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    notice.isPinned
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={notice.isPinned ? 'Unpin Notice' : 'Pin to Top'}
                >
                  <Pin className={`h-4 w-4 ${notice.isPinned ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Notice"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {notice.content}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[55%] text-slate-500 font-medium">
                {notice.department}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-slate-400">
                  {notice.targetAudience === 'all' ? 'All' : `${notice.targetAudience}s`}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-slate-400">{notice.publishedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Announcement Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Broadcast New Campus Announcement"
          size="lg"
        >
          <form onSubmit={handleCreateNotice} className="space-y-4">
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Announcement Title *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g., End-Semester Examination Schedule - Winter 2026"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                >
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Fees">Fees & Accounts</option>
                  <option value="Event">Event & Campus Life</option>
                  <option value="General">General Administrative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Audience
                </label>
                <select
                  value={formAudience}
                  onChange={(e) => setFormAudience(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                >
                  <option value="all">Everyone (All Portals)</option>
                  <option value="student">Students Only</option>
                  <option value="teacher">Teachers & Faculty</option>
                  <option value="staff">Maintenance Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Priority
                </label>
                <select
                  value={formPriority}
                  onChange={(e) => setFormPriority(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent Alert</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issuing Department
              </label>
              <input
                type="text"
                value={formDepartment}
                onChange={(e) => setFormDepartment(e.target.value)}
                placeholder="e.g., Examination Cell, Accounts, Registrar"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notice Content / Directives *
              </label>
              <textarea
                rows={4}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Provide detailed instructions, rules, schedules, or guidelines for the campus community..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="pinNotice"
                checked={formPinned}
                onChange={(e) => setFormPinned(e.target.checked)}
                className="h-4 w-4 text-[#5CAC32] rounded border-slate-300 focus:ring-[#5CAC32]"
              />
              <label
                htmlFor="pinNotice"
                className="text-xs font-medium text-slate-700 cursor-pointer"
              >
                Pin this notice to top of Student and Faculty dashboards
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#5CAC32] hover:bg-[#4B9228] text-white"
              >
                Publish Now
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Notice Detail View Modal */}
      {selectedNotice && (
        <Modal
          isOpen={Boolean(selectedNotice)}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">{selectedNotice.category}</span>
                <span className="text-slate-300">•</span>
                {renderPriority(selectedNotice.priority)}
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">
                  {selectedNotice.targetAudience === 'all'
                    ? 'All Portals'
                    : `${selectedNotice.targetAudience}s Only`}
                </span>
              </div>
              <span className="text-slate-500 font-mono">{selectedNotice.publishedDate}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
              {selectedNotice.content}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Department: <strong className="text-slate-700">{selectedNotice.department}</strong></span>
              <span>Issued by: <strong className="text-slate-700">{selectedNotice.publishedBy}</strong></span>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setSelectedNotice(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
