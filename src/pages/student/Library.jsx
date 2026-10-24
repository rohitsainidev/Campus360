import { useState, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  BookmarkCheck,
  Bookmark,
  MapPin,
  Info,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SearchBar from '../../components/ui/SearchBar';
import { studentLibraryInfo } from '../../data/mockData';

export default function StudentLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [reservedBooks, setReservedBooks] = useState({});
  const [reservationNotice, setReservationNotice] = useState('');

  const filteredCatalogue = useMemo(() => {
    return studentLibraryInfo.catalogue.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'ALL' ? true : book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleReserveBook = (book) => {
    setReservedBooks((prev) => ({ ...prev, [book.id]: true }));
    setReservationNotice(
      `Hold placed on "${book.title}". You can collect this copy from ${book.shelfLocation} within 24 hours.`
    );
    setTimeout(() => setReservationNotice(''), 4500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Central University Library"
        description="Active book loans, due date trackers, and searchable institutional resource catalogue."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Library' },
        ]}
        badge={<Badge variant="primary">Borrow Quota: 2/4 Books</Badge>}
      />

      {reservationNotice && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{reservationNotice}</span>
        </div>
      )}

      {/* 1. Currently Issued Books Section */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Currently Issued Books
            </h2>
            <p className="text-xs text-[#64748B]">
              Active loans registered to your institutional RFID library card
            </p>
          </div>
          <Badge variant="info">
            {studentLibraryInfo.activeBorrowings.length} Active Loans
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentLibraryInfo.activeBorrowings.map((book) => (
            <div
              key={book.id}
              className="p-4 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 flex flex-col justify-between text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#64748B] font-semibold">
                    {book.accessionNo}
                  </span>
                  <Badge variant="success" dot>
                    Due in {book.daysRemaining} days
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                  {book.title}
                </h3>
                <p className="text-[#475569]">Author: {book.author}</p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[#64748B] text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Issued: {book.issueDate}
                </span>
                <span className="font-semibold text-[#0F172A]">
                  Return Due: {book.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Library Catalogue Search */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Institutional Catalogue Search
            </h2>
            <p className="text-xs text-[#64748B]">
              Search textbooks, reference volumes, and research publications
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              placeholder="Search by title, author, topic..."
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-[#E2E8F0] bg-white text-xs text-[#0F172A] px-2.5 py-2 focus:outline-none focus:border-[#4F46E5]"
            >
              <option value="ALL">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
        </div>

        {/* Catalogue Books List */}
        <div className="divide-y divide-[#E2E8F0]">
          {filteredCatalogue.map((item) => {
            const isReserved = reservedBooks[item.id];
            return (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral">{item.category}</Badge>
                    <span className="text-[#64748B] text-[11px] font-mono">
                      {item.id}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="text-[#475569]">{item.author}</p>
                  <p className="text-[11px] text-[#64748B] flex items-center gap-1.5 pt-0.5">
                    <MapPin className="h-3 w-3 text-[#4F46E5]" />
                    <span>Location: {item.shelfLocation}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                  <span className="text-xs font-semibold text-[#15803D]">
                    {item.availableCopies} Copies Available
                  </span>
                  <Button
                    variant={isReserved ? 'secondary' : 'outline'}
                    size="sm"
                    icon={isReserved ? BookmarkCheck : Bookmark}
                    disabled={isReserved}
                    onClick={() => handleReserveBook(item)}
                  >
                    {isReserved ? 'Hold Placed' : 'Reserve Copy'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded bg-blue-50 border border-blue-200 text-xs text-[#2563EB] flex items-start gap-2">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="text-[#475569] leading-relaxed">
            Note: All catalogue holdings and checkout records represent student portal demonstration data. Physical checkouts are authenticated with your student RFID card at circulation desk.
          </p>
        </div>
      </div>
    </div>
  );
}
