import { useState } from 'react';
import { CheckCircle2, Wrench, Package } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';

function TaskCompletionFormBody({ task, onSaveCompletion, onClose }) {
  const [workPerformed, setWorkPerformed] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [completionDate, setCompletionDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!workPerformed.trim()) {
      errs.workPerformed = 'Please describe the specific maintenance work performed.';
    }
    if (!resolutionNotes.trim()) {
      errs.resolutionNotes = 'Resolution findings and post-repair verification notes are required.';
    }
    if (!completionDate) {
      errs.completionDate = 'Completion date is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSaveCompletion({
      taskId: task.id,
      completionNotes: {
        workPerformed: workPerformed.trim(),
        resolutionNotes: resolutionNotes.trim(),
        materialsUsed: materialsUsed.trim(),
        completionDate,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#475569]">
      {/* Context banner */}
      <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
        <span className="font-mono text-[10px] text-[#64748B] block font-semibold">
          {task.id} • {task.category}
        </span>
        <h4 className="font-bold text-xs text-[#0F172A]">{task.title}</h4>
        <p className="text-[11px] text-[#64748B]">{task.location}</p>
      </div>

      {/* Completion Date */}
      <Input
        label="Service Completion Date"
        type="date"
        required
        value={completionDate}
        onChange={(e) => {
          setCompletionDate(e.target.value);
          if (errors.completionDate) setErrors((prev) => ({ ...prev, completionDate: null }));
        }}
        max={new Date().toISOString().split('T')[0]}
        error={errors.completionDate}
      />

      {/* Work Performed */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
          <Wrench className="h-3.5 w-3.5 text-[#4F46E5]" />
          <span>Work Performed / Operations Executed <span className="text-[#DC2626]">*</span></span>
        </label>
        <textarea
          rows={3}
          value={workPerformed}
          onChange={(e) => {
            setWorkPerformed(e.target.value);
            if (errors.workPerformed) setErrors((prev) => ({ ...prev, workPerformed: null }));
          }}
          placeholder="e.g. Replaced faulty circuit breaker module, re-wired terminal lugs, and tested grounding..."
          className={`w-full rounded-md border bg-white text-[#0F172A] text-xs p-3 focus:outline-none focus:ring-1 ${
            errors.workPerformed
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
              : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]'
          }`}
        />
        {errors.workPerformed && (
          <p className="text-xs text-[#DC2626] font-medium">{errors.workPerformed}</p>
        )}
      </div>

      {/* Resolution Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
          <span>Resolution Findings & Verification Protocol <span className="text-[#DC2626]">*</span></span>
        </label>
        <textarea
          rows={3}
          value={resolutionNotes}
          onChange={(e) => {
            setResolutionNotes(e.target.value);
            if (errors.resolutionNotes) setErrors((prev) => ({ ...prev, resolutionNotes: null }));
          }}
          placeholder="e.g. Voltage tested at 230V stable; thermal imaging confirmed no overheating under load..."
          className={`w-full rounded-md border bg-white text-[#0F172A] text-xs p-3 focus:outline-none focus:ring-1 ${
            errors.resolutionNotes
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
              : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]'
          }`}
        />
        {errors.resolutionNotes && (
          <p className="text-xs text-[#DC2626] font-medium">{errors.resolutionNotes}</p>
        )}
      </div>

      {/* Materials Used (Optional) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
          <Package className="h-3.5 w-3.5 text-[#64748B]" />
          <span>Parts / Materials Consumed (Optional)</span>
        </label>
        <input
          type="text"
          value={materialsUsed}
          onChange={(e) => setMaterialsUsed(e.target.value)}
          placeholder="e.g. 1x 16A Schneider MCB, 2m heat-shrink tubing"
          className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
        />
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
        <Button variant="outline" size="sm" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button size="sm" type="submit" className="bg-[#15803D] hover:bg-[#166534]">
          Submit & Mark Completed
        </Button>
      </div>
    </form>
  );
}

export default function TaskCompletionModal({
  isOpen,
  onClose,
  task,
  onSaveCompletion,
}) {
  if (!isOpen || !task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Maintenance Task"
      maxWidth="max-w-lg"
    >
      <TaskCompletionFormBody
        key={task.id}
        task={task}
        onSaveCompletion={onSaveCompletion}
        onClose={onClose}
      />
    </Modal>
  );
}
