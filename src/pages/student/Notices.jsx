import { useState, useMemo, useEffect } from 'react';
import {
  Megaphone,
  Pin,
  Calendar,
  Building,
  User,
  Paperclip,
  Download,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { initialNotices } from '../../data/noticeMockData';
import noticeService from '../../services/noticeService';

export default function StudentNotices() {
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState('');

  // Fetch live notices from backend MongoDB
  useEffect(() => {
    let isMounted = true;
    const loadNotices = async () => {
      try {
        const res = await noticeService.getNotices({ audience: 'student' });
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
      } catch (err) {
        // Keep offline / fallback
      }
    };
    loadNotices();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['ALL', 'Examination', 'Fees', 'Academic', 'Event', 'General'];

  // Filter notices based on student audience + search + category
  const filteredNotices = useMemo(() => {
    return notices.filter((item) => {
      const matchAudience =
        item.targetAudience === 'all' || item.targetAudience === 'student';
      const matchCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchAudience && matchCategory && matchSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  const pinnedNotices = useMemo(
    () => filteredNotices.filter((n) => n.isPinned),
    [filteredNotices]
  );
  const regularNotices = useMemo(
    () => filteredNotices.filter((n) => !n.isPinned),
    [filteredNotices]
  );

  const handleDownload = (fileName) => {
    setDownloadSuccess(`Simulating download of ${fileName}...`);
    setTimeout(() => setDownloadSuccess(''), 3500);
  };

  const getPriorityBadge = (priority) => {
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

  const getCategoryColor = () => {
    return 'text-slate-800 font-semibold';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notice & Circular Board"
        description="Official campus announcements, academic notifications, examination orders, and fee circulars."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Notice Board' },
        ]}
        badge={
          <Badge variant="primary">
            {filteredNotices.length} Active Circulars
          </Badge>
        }
      />

      {downloadSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
          {downloadSuccess}
        </div>
      )}

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3.5 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars, topics, or departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Notices' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Urgent Announcements */}
      {pinnedNotices.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Pin className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span>Pinned Announcements</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-gradient-to-br from-indigo-50/60 via-white to-amber-50/40 rounded-xl p-5 border border-indigo-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-800">
                      {notice.category}
                    </span>
                    {getPriorityBadge(notice.priority)}
                  </div>

                  <h3 className="font-semibold text-slate-900 text-base leading-snug hover:text-indigo-600 transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{notice.publishedDate}</span>
                  </div>

                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    View Circular →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Circulars Feed */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">
          All Circulars ({regularNotices.length})
        </h3>

        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 space-y-2">
            <Info className="h-8 w-8 text-slate-400 mx-auto" />
            <p className="font-medium text-slate-700">No notices found</p>
            <p className="text-xs text-slate-500">
              Try searching with another keyword or change the category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {regularNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-800">
                      {notice.category}
                    </span>
                    {getPriorityBadge(notice.priority)}
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      {notice.department}
                    </span>
                  </div>

                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {notice.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {notice.content}
                  </p>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0 gap-2 text-xs text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                    <Calendar className="h-3 w-3" />
                    {notice.publishedDate}
                  </span>
                  {notice.attachments && notice.attachments.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-indigo-600 font-medium">
                      <Paperclip className="h-3 w-3" />
                      {notice.attachments.length} file(s)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          size="lg"
        >
          <div className="space-y-5 text-sm">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  {selectedNotice.department}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  Published by: {selectedNotice.publishedBy}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getCategoryColor(
                    selectedNotice.category
                  )}`}
                >
                  {selectedNotice.category}
                </span>
                {getPriorityBadge(selectedNotice.priority)}
              </div>
            </div>

            {/* Notice Body */}
            <div className="text-slate-700 leading-relaxed space-y-3 whitespace-pre-line text-sm">
              {selectedNotice.content}
            </div>

            {/* Attachments Section */}
            {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <p className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
                  Attached Documents ({selectedNotice.attachments.length})
                </p>
                <div className="space-y-2">
                  {selectedNotice.attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Paperclip className="h-4 w-4 text-indigo-600" />
                        <div>
                          <p className="font-medium text-xs text-slate-800">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {file.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(file.name)}
                        className="flex items-center gap-1 text-xs"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end pt-2">
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
