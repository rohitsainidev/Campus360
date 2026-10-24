import { useState, useMemo } from 'react';
import {
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import { initialStudentPlacements } from '../../data/mockData';

export default function StudentPlacements() {
  const [placements, setPlacements] = useState(() => {
    const saved = localStorage.getItem('campus360_student_placements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStudentPlacements;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('ALL');
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const filteredPlacements = useMemo(() => {
    return placements.filter((p) => {
      const matchesSearch =
        p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.requiredSkills.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesType =
        jobTypeFilter === 'ALL' ? true : p.jobType === jobTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [placements, searchTerm, jobTypeFilter]);

  const handleApply = (placement) => {
    // Prevent duplicate application
    if (placement.status === 'Applied') return;

    const updated = placements.map((item) =>
      item.id === placement.id ? { ...item, status: 'Applied' } : item
    );

    setPlacements(updated);
    localStorage.setItem(
      'campus360_student_placements',
      JSON.stringify(updated)
    );

    setApplyModalOpen(false);
    setActionSuccess(
      `Your verified student profile was dispatched to ${placement.company} for the "${placement.jobTitle}" recruitment drive.`
    );
    setTimeout(() => setActionSuccess(''), 5000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campus Placements & Corporate Drives"
        description="Verified recruitment notices, internship listings, and corporate on-campus placement sessions."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Placements' },
        ]}
        badge={<Badge variant="primary">Graduating Batch 2027</Badge>}
      />

      {actionSuccess && (
        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder="Search by company, title, or skills..."
        />

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64748B] font-medium">Drive Type:</span>
          <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] rounded-md border border-[#E2E8F0]">
            {['ALL', 'Full-time', 'Internship'].map((jt) => (
              <button
                key={jt}
                type="button"
                onClick={() => setJobTypeFilter(jt)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  jobTypeFilter === jt
                    ? 'bg-white text-[#4F46E5] shadow-xs border border-[#E2E8F0]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {jt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      {filteredPlacements.length === 0 ? (
        <EmptyState
          title="No drives match your filters"
          description="Adjust your search keywords or clear filters to view active campus recruitment openings."
          icon={Briefcase}
          actionLabel="Reset Search"
          onAction={() => {
            setSearchTerm('');
            setJobTypeFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlacements.map((plc) => {
            const isApplied = plc.status === 'Applied';
            return (
              <div
                key={plc.id}
                className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant={plc.jobType === 'Full-time' ? 'primary' : 'info'}>
                      {plc.jobType}
                    </Badge>
                    <Badge variant={isApplied ? 'success' : 'neutral'} dot={isApplied}>
                      {isApplied ? 'Application Submitted' : 'Eligible to Apply'}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                      {plc.jobTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#4F46E5] mt-0.5">
                      {plc.company}
                    </p>
                  </div>

                  <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                    {plc.description}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plc.requiredSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-medium text-[#475569]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E2E8F0] text-xs">
                  <div className="space-y-1 text-[#64748B] text-[11px]">
                    <div className="flex items-center justify-between">
                      <span>Min Eligibility:</span>
                      <span className="font-semibold text-[#0F172A]">
                        CGPA {plc.minCgpa}+
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Compensation:</span>
                      <span className="font-semibold text-[#15803D]">
                        {plc.compensation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deadline:</span>
                      <span className="text-[#DC2626] font-medium">
                        {plc.deadline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-1/2"
                      onClick={() => {
                        setSelectedPlacement(plc);
                        setApplyModalOpen(false);
                      }}
                    >
                      View Details
                    </Button>

                    <Button
                      size="sm"
                      className="w-1/2"
                      variant={isApplied ? 'secondary' : 'primary'}
                      disabled={isApplied}
                      onClick={() => {
                        setSelectedPlacement(plc);
                        setApplyModalOpen(true);
                      }}
                    >
                      {isApplied ? 'Applied' : 'Apply Now'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details & Apply Confirmation Modal */}
      {selectedPlacement && (
        <Modal
          isOpen={Boolean(selectedPlacement)}
          onClose={() => {
            setSelectedPlacement(null);
            setApplyModalOpen(false);
          }}
          title={selectedPlacement.company}
          maxWidth="max-w-lg"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedPlacement(null);
                  setApplyModalOpen(false);
                }}
              >
                Close
              </Button>
              {selectedPlacement.status !== 'Applied' && (
                <Button
                  size="sm"
                  onClick={() => handleApply(selectedPlacement)}
                >
                  Confirm & Submit Profile
                </Button>
              )}
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="text-base font-bold text-[#0F172A]">
                {selectedPlacement.jobTitle}
              </h4>
              <p className="text-xs text-[#4F46E5] font-semibold mt-0.5">
                {selectedPlacement.company} • {selectedPlacement.location}
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-md border border-[#E2E8F0] space-y-1">
              <span className="font-semibold text-[#0F172A]">Role Overview:</span>
              <p className="text-[#475569] leading-relaxed">
                {selectedPlacement.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[#64748B]">
              <p>
                <strong>Eligible Cohorts:</strong> {selectedPlacement.eligibleCourse}
              </p>
              <p>
                <strong>Package:</strong> {selectedPlacement.compensation}
              </p>
              <p>
                <strong>Minimum CGPA:</strong> {selectedPlacement.minCgpa}
              </p>
              <p>
                <strong>Drive Deadline:</strong> {selectedPlacement.deadline}
              </p>
            </div>

            <div>
              <span className="font-semibold text-[#0F172A] block mb-1.5">
                Required Technical Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlacement.requiredSkills.map((s, idx) => (
                  <Badge key={idx} variant="neutral">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {applyModalOpen ? (
              <div className="p-3 rounded bg-amber-50 border border-amber-200 text-[#B45309] text-[11px] space-y-1">
                <p className="font-bold">Application Disclaimer:</p>
                <p>
                  Applying through this demo logs the application to your student portal state. It does not send an actual resume to external corporate recruiters.
                </p>
              </div>
            ) : selectedPlacement.status === 'Applied' ? (
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-[#15803D] text-[11px] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>You have already registered your candidacy for this placement drive.</span>
              </div>
            ) : null}
          </div>
        </Modal>
      )}
    </div>
  );
}
