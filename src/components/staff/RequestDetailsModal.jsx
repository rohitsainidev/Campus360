import {
  FileText,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Play,
  UserCheck,
  AlertCircle,
  Clock,
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function RequestDetailsModal({
  isOpen,
  onClose,
  request,
  onUpdateStatus,
  onOpenResolveModal,
  onOpenCreateTask,
}) {
  if (!isOpen || !request) return null;

  const isSubmitted = request.status === 'Submitted';
  const isAssigned = request.status === 'Assigned';
  const isInProgress = request.status === 'In Progress';
  const isResolved = request.status === 'Resolved';

  const getPriorityBadgeVariant = (priority) => {
    if (priority === 'High') return 'error';
    if (priority === 'Medium') return 'warning';
    return 'neutral';
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'Resolved') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'Assigned') return 'info';
    return 'warning';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Maintenance Ticket: ${request.id}`}
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 flex-wrap">
            {isSubmitted && onOpenCreateTask && (
              <Button
                size="sm"
                variant="primary"
                icon={PlusCircle}
                onClick={() => {
                  onClose();
                  onOpenCreateTask(request);
                }}
              >
                Create Task from Request
              </Button>
            )}

            {isSubmitted && (
              <Button
                size="sm"
                variant="outline"
                icon={UserCheck}
                onClick={() => onUpdateStatus(request.id, 'Assigned')}
              >
                Mark Assigned
              </Button>
            )}

            {isAssigned && (
              <Button
                size="sm"
                variant="primary"
                icon={Play}
                onClick={() => onUpdateStatus(request.id, 'In Progress')}
              >
                Start Investigation
              </Button>
            )}

            {(isAssigned || isInProgress) && onOpenResolveModal && (
              <Button
                size="sm"
                variant="primary"
                className="bg-[#15803D] hover:bg-[#166534]"
                icon={CheckCircle2}
                onClick={() => {
                  onClose();
                  onOpenResolveModal(request);
                }}
              >
                Resolve Ticket
              </Button>
            )}
          </div>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-4 text-xs text-[#475569]">
        {/* Ticket Header Card */}
        <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[11px] font-semibold text-[#64748B]">
                {request.id} • {request.category}
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] leading-snug mt-0.5">
                {request.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge variant={getPriorityBadgeVariant(request.priority)}>
                {request.priority} Priority
              </Badge>
              <Badge variant={getStatusBadgeVariant(request.status)} dot>
                {request.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#64748B] text-[11px]">
            <MapPin className="h-3.5 w-3.5 text-[#4F46E5] shrink-0" />
            <span className="font-medium text-[#0F172A]">{request.location}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Reported: {request.reportedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>
                Staff: {request.assignedStaffName ? request.assignedStaffName : 'Unassigned'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Workflow: Level 1 Facility</span>
            </div>
          </div>
        </div>

        {/* Reported Problem Description */}
        <div className="p-3.5 rounded-md bg-white border border-[#E2E8F0] space-y-1">
          <span className="font-bold text-[#0F172A] block text-xs">
            Reported Issue Details:
          </span>
          <p className="text-[#475569] leading-relaxed">
            {request.description}
          </p>
        </div>

        {/* Linked Task Card if linked */}
        {request.relatedTaskId ? (
          <div className="p-3 rounded-md bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-[11px] text-[#4F46E5]">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 shrink-0" />
              <div>
                <span className="font-bold block">Assigned Work Order Active</span>
                <span className="text-[#475569]">
                  Linked to Staff Task: <strong>{request.relatedTaskId}</strong>
                </span>
              </div>
            </div>
            <Badge variant="primary">Work Order Linked</Badge>
          </div>
        ) : isSubmitted ? (
          <div className="p-3 rounded-md bg-amber-50 border border-amber-200 text-[#B45309] text-[11px] flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Action Required: Triage & Assignment</span>
              <span>
                This request was submitted from campus and is awaiting allocation into a maintenance work order.
              </span>
            </div>
          </div>
        ) : null}

        {/* Resolution Notes Section (if resolved) */}
        {isResolved ? (
          <div className="p-3.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#15803D] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Ticket Resolved & Archived
              </span>
              <span className="text-[#64748B]">
                Resolved on: {request.resolvedDate || 'Recorded'}
              </span>
            </div>
            <p className="text-[#0F172A] leading-relaxed">
              <strong>Resolution Summary:</strong> {request.resolutionNotes || 'Facility inspected and verified operational.'}
            </p>
          </div>
        ) : (
          <div className="p-2.5 rounded-md bg-slate-50 border border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#4F46E5] shrink-0" />
            <span>
              Standard campus SLA: 24 to 48 business hours for general maintenance requests.
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}
