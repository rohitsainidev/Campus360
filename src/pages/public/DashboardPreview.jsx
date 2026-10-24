import { useState, useMemo } from 'react';
import {
  Plus,
  BookOpen,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/ui/StatCard';
import SearchBar from '../../components/ui/SearchBar';
import DataTable from '../../components/ui/DataTable';
import { mockStatCards, mockTableColumns, mockTableData } from '../../data/mockData';

export default function DashboardPreview({ activeRole = 'student' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  // Filter table data based on search input
  const filteredData = useMemo(() => {
    if (simulateEmpty) return [];
    if (!searchTerm.trim()) return mockTableData;
    const term = searchTerm.toLowerCase();
    return mockTableData.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term) ||
        item.instructor.toLowerCase().includes(term)
    );
  }, [searchTerm, simulateEmpty]);

  // Enhanced columns with Badge render for status
  const columnsWithRenders = useMemo(() => {
    return mockTableColumns.map((col) => {
      if (col.accessor === 'status') {
        return {
          ...col,
          render: (val) => (
            <Badge
              variant={val === 'Completed' ? 'success' : 'primary'}
              dot
            >
              {val}
            </Badge>
          ),
        };
      }
      return col;
    });
  }, []);

  const roleLabels = {
    student: 'Student Portal Simulation',
    teacher: 'Teacher Portal Simulation',
    staff: 'Maintenance Desk Simulation',
    admin: 'Administrator Console Simulation',
  };

  return (
    <div className="space-y-6">
      {/* Demo Notice Banner */}
      <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-[#4F46E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-0.5">
          <p className="font-bold flex items-center gap-1.5">
            <Layers className="h-4 w-4 shrink-0" />
            <span>Phase 3 Dashboard Architecture & Component Verification</span>
          </p>
          <p className="text-[#475569]">
            This route verifies the shared shell, navigation items, StatCards, SearchBar, DataTable, and Modal.
          </p>
        </div>
        <Badge variant="primary">Demo Preview Only</Badge>
      </div>

      {/* PageHeader Component */}
      <PageHeader
        title={roleLabels[activeRole]}
        description="Unified portal workspace showing shared components and navigation integration."
        breadcrumbs={[
          { label: 'Campus360', path: '/' },
          { label: 'Dashboard Preview' },
        ]}
        badge={<Badge variant="info">Phase 3 Shell</Badge>}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              icon={Filter}
              onClick={() => setSimulateEmpty(!simulateEmpty)}
            >
              {simulateEmpty ? 'Show Mock Records' : 'Test Empty State'}
            </Button>
            <Button
              size="sm"
              icon={Plus}
              onClick={() => setIsModalOpen(true)}
            >
              Open Test Modal
            </Button>
          </>
        }
      />

      {/* StatCards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mockStatCards.map((card, idx) => (
          <StatCard
            key={idx}
            title={card.title}
            value={card.value}
            description={card.description}
            trend={card.trend}
            trendLabel={card.trendLabel}
            icon={idx === 0 ? BookOpen : idx === 1 ? CheckCircle2 : Clock}
          />
        ))}
      </div>

      {/* Table Section with SearchBar & DataTable */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Course Allocation & Enrollment Ledger
            </h2>
            <p className="text-xs text-[#64748B]">
              Testing reusable DataTable filtering and empty state behavior.
            </p>
          </div>

          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Filter by title, code, or faculty..."
          />
        </div>

        {/* Reusable DataTable Component */}
        <DataTable
          columns={columnsWithRenders}
          data={filteredData}
          keyField="id"
          emptyTitle={simulateEmpty ? 'Empty State Verification' : 'No matching records found'}
          emptyDescription={
            simulateEmpty
              ? 'EmptyState component displayed correctly when no records are present in the table.'
              : 'Try clearing your search query to view all available mock records.'
          }
        />
      </div>

      {/* Test Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reusable Modal Component"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(false)}>
              Confirm Action
            </Button>
          </>
        }
      >
        <p>
          This modal demonstrates keyboard accessibility (ESC key to dismiss), backdrop click handling, customizable headers, and action buttons.
        </p>
        <p className="text-xs text-[#64748B]">
          It functions without third-party heavy dependencies and adheres strictly to the Campus360 design system.
        </p>
      </Modal>
    </div>
  );
}
