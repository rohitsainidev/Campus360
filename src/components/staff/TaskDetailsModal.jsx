import {
  Wrench,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Play,
  Pause,
  AlertCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
  onUpdateStatus,
  onOpenCompleteModal,
}) {
  if (!isOpen || !task) return null;

  const isCompleted = task.status === 'Completed';
  const isInProgress = task.status === 'In Progress';
  const isAssigned = task.status === 'Assigned';
  const isOnHold = task.status === 'On Hold';

  const getPriorityBadgeVariant = (priority) => {
    if (priority === 'High') return 'error';
    if (priority === 'Medium') return 'warning';
    return 'neutral';
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'On Hold') return 'warning';
    return 'info';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Maintenance Work Order: ${task.id}`}
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {!isCompleted && isAssigned && (
              <Button
                size="sm"
                variant="primary"
                icon={Play}
                onClick={() => onUpdateStatus(task.id, 'In Progress')}
              >
                Start Work
              </Button>
            )}

            {!isCompleted && isInProgress && (
              <>
                <Button
                  size="sm"
                  variant="primary"
                  className="bg-[#15803D] hover:bg-[#166534]"
                  icon={CheckCircle2}
                  onClick={() => {
                    onClose();
                    onOpenCompleteModal(task);
                  }}
                >
                  Mark Completed
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  icon={Pause}
                  onClick={() => onUpdateStatus(task.id, 'On Hold')}
                >
                  Put On Hold
                </Button>
              </>
            )}

            {!isCompleted && isOnHold && (
              <Button
                size="sm"
                variant="primary"
                icon={Play}
                onClick={() => onUpdateStatus(task.id, 'In Progress')}
              >
                Resume Work
              </Button>
            )}

            {!isCompleted && (isAssigned || isOnHold) && (
              <Button
                size="sm"
                variant="outline"
                className="text-[#15803D] hover:bg-emerald-50"
                icon={CheckCircle2}
                onClick={() => {
                  onClose();
                  onOpenCompleteModal(task);
                }}
              >
                Complete Task
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
        {/* Header Block */}
        <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[11px] font-semibold text-[#64748B]">
                {task.id} • {task.category}
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] leading-snug mt-0.5">
                {task.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge variant={getPriorityBadgeVariant(task.priority)}>
                {task.priority} Priority
              </Badge>
              <Badge variant={getStatusBadgeVariant(task.status)} dot>
                {task.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#64748B] text-[11px]">
            <MapPin className="h-3.5 w-3.5 text-[#4F46E5] shrink-0" />
            <span className="font-medium text-[#0F172A]">{task.location}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Assigned: {task.assignedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#DC2626]" />
              <span className="font-semibold text-[#0F172A]">Due: {task.dueDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span>Staff: {task.assignedStaffName || 'Michael Chen'}</span>
            </div>
          </div>
        </div>

        {/* Task Scope & Full Description */}
        <div className="p-3.5 rounded-md bg-white border border-[#E2E8F0] space-y-1">
          <span className="font-bold text-[#0F172A] block text-xs">
            Work Scope & Description:
          </span>
          <p className="text-[#475569] leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Special Instructions */}
        {task.instructions && (
          <div className="p-3 rounded-md bg-slate-50 border border-[#E2E8F0] space-y-1 text-[11px]">
            <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#4F46E5]" />
              Standard Operating Instructions:
            </span>
            <p className="text-[#64748B] leading-relaxed">
              {task.instructions}
            </p>
          </div>
        )}

        {/* Linked Request Notice */}
        {task.relatedRequestId && (
          <div className="p-2.5 rounded-md bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-[11px] text-[#4F46E5]">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              <span>
                Generated from Maintenance Ticket: <strong>{task.relatedRequestId}</strong>
              </span>
            </div>
            <Badge variant="primary">Linked Request</Badge>
          </div>
        )}

        {/* Completion Notes Section (if completed) */}
        {task.completionNotes ? (
          <div className="p-3.5 rounded-md bg-emerald-50/70 border border-emerald-200 space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#15803D] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Work Completed & Verified
              </span>
              <span className="text-[#64748B]">
                Date: {task.completionNotes.completionDate || 'Recorded'}
              </span>
            </div>

            <div className="space-y-1 text-[#0F172A]">
              <p>
                <strong>Work Performed:</strong> {task.completionNotes.workPerformed}
              </p>
              <p>
                <strong>Resolution Findings:</strong> {task.completionNotes.resolutionNotes}
              </p>
              {task.completionNotes.materialsUsed && (
                <p className="text-[#64748B]">
                  <strong>Materials / Parts:</strong> {task.completionNotes.materialsUsed}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-md bg-slate-50 border border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5 text-[#B45309] shrink-0" />
            <span>
              Work order is active. Status updates sync in real time across the Maintenance Portal.
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}
