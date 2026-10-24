import { useState, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  RotateCcw,
  BookMarked,
  Clock,
  Tag,
  AlertCircle,
  Copy,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import {
  initialAdminBooks,
  initialAdminIssues,
} from '../../data/mockData';

// Subcomponent for Add/Edit Book Form
function BookFormModalBody({ bookToEdit, existingBooks, onSave, onCancel }) {
  const isEditing = Boolean(bookToEdit);

  const [formData, setFormData] = useState({
    title: bookToEdit?.title || '',
    author: bookToEdit?.author || '',
    category: bookToEdit?.category || 'Computer Science',
    isbn: bookToEdit?.isbn || '',
    totalCopies: bookToEdit?.totalCopies || 10,
    availableCopies: bookToEdit ? bookToEdit.availableCopies : 10,
    shelfLocation: bookToEdit?.shelfLocation || 'Stack 1 • Row A-01',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Book title is required.';
    if (!formData.author.trim()) errs.author = 'Author name is required.';
    if (Number(formData.totalCopies) <= 0) {
      errs.totalCopies = 'Total copies must be at least 1.';
    }
    if (Number(formData.availableCopies) < 0) {
      errs.availableCopies = 'Available copies cannot be negative.';
    }
    if (Number(formData.availableCopies) > Number(formData.totalCopies)) {
      errs.availableCopies = 'Available copies cannot exceed total copies.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const total = Number(formData.totalCopies);
    const avail = Number(formData.availableCopies);

    if (isEditing) {
      onSave({
        ...bookToEdit,
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        isbn: formData.isbn.trim(),
        totalCopies: total,
        availableCopies: avail,
        shelfLocation: formData.shelfLocation.trim(),
        status: avail > 0 ? 'Available' : 'Issued Out',
      });
    } else {
      const newId = `CAT-${100 + existingBooks.length + 1}`;
      onSave({
        id: newId,
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        isbn: formData.isbn.trim() || '978-0131103627',
        totalCopies: total,
        availableCopies: avail,
        shelfLocation: formData.shelfLocation.trim(),
        status: avail > 0 ? 'Available' : 'Issued Out',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[#0F172A] mb-1">
          Book Title <span className="text-[#DC2626]">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Clean Architecture: A Craftsman's Guide"
          className={`w-full px-3 py-2 text-xs rounded-md border ${
            errors.title ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
          } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
        />
        {errors.title && <p className="text-[11px] text-[#DC2626] mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Author <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="e.g. Robert C. Martin"
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.author ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.author && <p className="text-[11px] text-[#DC2626] mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Category <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="General Science">General Science</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            ISBN
          </label>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            placeholder="e.g. 978-0134494166"
            className="w-full px-3 py-2 text-xs font-mono rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Shelf / Stack Location
          </label>
          <input
            type="text"
            value={formData.shelfLocation}
            onChange={(e) => setFormData({ ...formData, shelfLocation: e.target.value })}
            placeholder="e.g. Stack 3 • Row B-02"
            className="w-full px-3 py-2 text-xs rounded-md border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Total Copies <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={formData.totalCopies}
            onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.totalCopies ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.totalCopies && <p className="text-[11px] text-[#DC2626] mt-1">{errors.totalCopies}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0F172A] mb-1">
            Available Copies <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            min={0}
            value={formData.availableCopies}
            onChange={(e) => setFormData({ ...formData, availableCopies: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-md border ${
              errors.availableCopies ? 'border-[#DC2626] bg-red-50/20' : 'border-[#E2E8F0]'
            } text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#5CAC32]`}
          />
          {errors.availableCopies && (
            <p className="text-[11px] text-[#DC2626] mt-1">{errors.availableCopies}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? 'Save Changes' : 'Add to Catalogue'}
        </Button>
      </div>
    </form>
  );
}

export default function AdminLibraryManagement() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_books');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminBooks;
  });

  const issues = useMemo(() => {
    const saved = localStorage.getItem('campus360_admin_issues');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialAdminIssues;
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');

  // Modals
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const saveBooks = (updated) => {
    setBooks(updated);
    localStorage.setItem('campus360_admin_books', JSON.stringify(updated));
  };

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(''), 4000);
  };

  // Derive Summary Metrics
  const totalBookTitles = books.length;
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const issuedCopies = Math.max(0, totalCopies - availableCopies);
  const overdueIssues = issues.filter((i) => i.status === 'Overdue').length;

  const categories = useMemo(() => {
    const set = new Set(books.map((b) => b.category));
    return Array.from(set);
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === 'ALL' || b.category === categoryFilter;

      let matchesAvail = true;
      if (availabilityFilter === 'Available') {
        matchesAvail = b.availableCopies > 0;
      } else if (availabilityFilter === 'Issued Out') {
        matchesAvail = b.availableCopies === 0;
      }

      return matchesSearch && matchesCategory && matchesAvail;
    });
  }, [books, searchTerm, categoryFilter, availabilityFilter]);

  const [bookPage, setBookPage] = useState(1);
  const bookPageSize = 6;
  const totalBookPages = Math.ceil(filteredBooks.length / bookPageSize) || 1;

  const paginatedBooks = useMemo(() => {
    const start = (bookPage - 1) * bookPageSize;
    return filteredBooks.slice(start, start + bookPageSize);
  }, [filteredBooks, bookPage, bookPageSize]);

  const handleSaveBook = (bookRecord) => {
    if (editingBook) {
      const updated = books.map((b) => (b.id === bookRecord.id ? bookRecord : b));
      saveBooks(updated);
      showNotification(`Book "${bookRecord.title}" updated in catalogue.`);
    } else {
      const updated = [...books, bookRecord];
      saveBooks(updated);
      showNotification(`New title "${bookRecord.title}" registered with ID ${bookRecord.id}.`);
    }
    setBookModalOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Library Management"
        description="Catalog repository, book acquisition registers, stack circulation and circulation issue records."
        breadcrumbs={[
          { label: 'Administrators Portal', path: '/admin/dashboard' },
          { label: 'Library Management' },
        ]}
      />

      {feedbackMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Summary Metrics Cards - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Book Titles</span>
              <BookOpen className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalBookTitles}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Catalogued titles</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Physical Copies</span>
              <Copy className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {totalCopies}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Total inventory</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Available</span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {availableCopies}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Ready to issue</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Issued</span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {issuedCopies}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">In circulation</p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">Overdue</span>
              <AlertCircle className="h-4 w-4 text-rose-500 transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {overdueIssues}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">Past return date</p>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
          <div className="w-full sm:w-80 md:w-96 flex-shrink-0">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Search by title, author, or ID..."
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium shadow-2xs"
              >
                <option value="ALL">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Availability:</span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-[#5CAC32] font-medium shadow-2xs"
              >
                <option value="ALL">All</option>
                <option value="Available">Available</option>
                <option value="Issued Out">Issued Out</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingBook(null);
            setBookModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#5CAC32] text-white hover:bg-[#4B9228] shadow-2xs transition-colors shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Book</span>
        </button>
      </div>

      {/* Book Catalogue Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#5CAC32]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Library Book Catalogue
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            {filteredBooks.length} of {books.length} Books Displayed
          </span>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={BookOpen}
              title="No Books Found"
              description="No titles match your current search query or filter options."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('ALL');
                    setAvailabilityFilter('ALL');
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reset Filters
                </Button>
              }
            />
          </div>
        ) : (
          <div>
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[1040px]">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Book ID</th>
                    <th className="py-3.5 px-4 min-w-[260px]">Title</th>
                    <th className="py-3.5 px-4 min-w-[160px]">Author</th>
                    <th className="py-3.5 px-4 min-w-[150px] whitespace-nowrap">Category</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">ISBN</th>
                    <th className="py-3.5 px-3 text-center whitespace-nowrap">Total</th>
                    <th className="py-3.5 px-3 text-center whitespace-nowrap">Avail</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {paginatedBooks.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-4 pl-6 pr-4 font-mono font-semibold text-[#5CAC32] whitespace-nowrap text-xs">
                        {b.id}
                      </td>
                      <td className="py-4 px-4 min-w-[260px]">
                        <div className="font-semibold text-slate-900 group-hover:text-[#5CAC32] transition-colors" title={b.title}>
                          {b.title}
                        </div>
                        <div className="text-[11px] font-normal text-slate-500 mt-1">
                          {b.shelfLocation}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 min-w-[160px]" title={b.author}>
                        {b.author}
                      </td>
                      <td className="py-4 px-4 text-slate-600 min-w-[150px] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60">
                          <Tag className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{b.category}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {b.isbn || '—'}
                      </td>
                      <td className="py-4 px-3 text-center font-medium text-slate-700 whitespace-nowrap">
                        {b.totalCopies}
                      </td>
                      <td className="py-4 px-3 text-center font-bold text-emerald-600 whitespace-nowrap">
                        {b.availableCopies}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge variant={b.availableCopies > 0 ? 'success' : 'neutral'}>
                          {b.availableCopies > 0 ? 'Available' : 'Issued Out'}
                        </Badge>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingBook(b)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="View Book Details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingBook(b);
                              setBookModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#5CAC32] hover:bg-[#5CAC32]/10 transition-colors"
                            title="Edit Book Record"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Creative Mobile Responsive Card Feed */}
            <div className="block md:hidden divide-y divide-slate-100">
              {paginatedBooks.map((b) => (
                <div key={b.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] font-semibold text-[#5CAC32] bg-[#5CAC32]/10 px-2 py-0.5 rounded border border-[#5CAC32]/20 inline-block mb-1">
                        {b.id}
                      </span>
                      <h4 className="font-semibold text-slate-900 text-sm">{b.title}</h4>
                      <p className="text-xs text-slate-500">By {b.author}</p>
                    </div>
                    <Badge variant={b.availableCopies > 0 ? 'success' : 'neutral'}>
                      {b.availableCopies > 0 ? 'Available' : 'Issued Out'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Category</span>
                      <span className="font-medium text-slate-800 truncate block">{b.category}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Location</span>
                      <span className="font-medium text-slate-800 truncate block">{b.shelfLocation}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Available / Total</span>
                      <span className="font-bold text-emerald-600">{b.availableCopies} <span className="text-slate-400 font-normal">/ {b.totalCopies}</span></span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">ISBN</span>
                      <span className="font-mono text-slate-600 text-[11px]">{b.isbn || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setViewingBook(b)}
                      className="px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBook(b);
                        setBookModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 rounded-md bg-[#5CAC32]/10 hover:bg-[#5CAC32]/20 text-[#4B9228] text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={bookPage}
              totalPages={totalBookPages}
              totalItems={filteredBooks.length}
              pageSize={bookPageSize}
              onPageChange={setBookPage}
              itemName="books"
            />
          </div>
        )}
      </div>

      {/* Circulation Issue Records Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-[#5CAC32]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Circulation Issue &amp; Return Records
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            {issues.length} Active Records
          </span>
        </div>

        <div>
          {/* Desktop / Tablet Table View */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[960px]">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Issue ID</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Student ID</th>
                  <th className="py-3.5 px-4 min-w-[170px]">Student Name</th>
                  <th className="py-3.5 px-4 min-w-[260px]">Book Title</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Issue Date</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Due Date</th>
                  <th className="py-3.5 pl-4 pr-6 whitespace-nowrap">Return Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {issues.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 pl-6 pr-4 font-mono font-semibold text-[#5CAC32] whitespace-nowrap">
                      {i.id}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {i.studentId}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900 min-w-[170px]">
                      {i.studentName}
                    </td>
                    <td className="py-4 px-4 text-slate-700 min-w-[260px]" title={i.bookTitle}>
                      {i.bookTitle}
                    </td>
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {i.issueDate}
                    </td>
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {i.dueDate}
                      </span>
                    </td>
                    <td className="py-4 pl-4 pr-6 whitespace-nowrap">
                      <Badge
                        variant={
                          i.status === 'Overdue'
                            ? 'danger'
                            : i.status === 'Active'
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {i.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Creative Mobile Responsive Card Feed */}
          <div className="block md:hidden divide-y divide-slate-100">
            {issues.map((i) => (
              <div key={i.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block">{i.id}</span>
                    <h4 className="font-semibold text-slate-900 text-xs">{i.studentName}</h4>
                    <span className="text-[11px] font-mono text-slate-500">{i.studentId}</span>
                  </div>
                  <Badge
                    variant={
                      i.status === 'Overdue'
                        ? 'danger'
                        : i.status === 'Active'
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {i.status}
                  </Badge>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="font-medium text-slate-800">{i.bookTitle}</div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>Issued: {i.issueDate}</span>
                    <span className={i.status === 'Overdue' ? 'text-rose-600 font-semibold' : ''}>Due: {i.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add / Edit Book Modal */}
      <Modal
        isOpen={bookModalOpen}
        onClose={() => {
          setBookModalOpen(false);
          setEditingBook(null);
        }}
        title={editingBook ? `Edit Book: ${editingBook.title}` : 'Add Book to Library Catalogue'}
        maxWidth="max-w-lg"
      >
        <BookFormModalBody
          key={editingBook ? editingBook.id : 'new-book'}
          bookToEdit={editingBook}
          existingBooks={books}
          onSave={handleSaveBook}
          onCancel={() => {
            setBookModalOpen(false);
            setEditingBook(null);
          }}
        />
      </Modal>

      {/* View Book Details Modal */}
      <Modal
        isOpen={Boolean(viewingBook)}
        onClose={() => setViewingBook(null)}
        title="Library Catalogue Record"
        maxWidth="max-w-md"
      >
        {viewingBook && (
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
              <BookOpen className="h-6 w-6 text-[#5CAC32] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-xs font-bold text-[#5CAC32]">
                  {viewingBook.id}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">{viewingBook.title}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">By {viewingBook.author}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Subject Category</span>
                <span className="font-bold text-[#0F172A]">{viewingBook.category}</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">ISBN Number</span>
                <span className="font-mono font-semibold text-[#0F172A]">{viewingBook.isbn || 'N/A'}</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                <span className="text-[#64748B] block text-[11px]">Stack Location</span>
                <span className="font-semibold text-[#0F172A]">{viewingBook.shelfLocation}</span>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-[#15803D] block text-[11px] font-semibold">Available Copies</span>
                <span className="font-bold text-[#15803D]">
                  {viewingBook.availableCopies} of {viewingBook.totalCopies} Available
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#E2E8F0]">
              <Button variant="outline" onClick={() => setViewingBook(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
