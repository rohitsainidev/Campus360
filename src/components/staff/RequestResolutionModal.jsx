import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';

function RequestResolutionFormBody({ request, onSaveResolution, onClose }) {
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolvedDate, setResolvedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resolutionNotes.trim()) {
      setError('Please provide resolution notes detailing the facility repair or verification.');
      return;
    }

    onSaveResolution({
      requestId: request.id,
      resolutionNotes: resolutionNotes.trim(),
      resolvedDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#475569]">
      <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
        <span className="font-mono text-[10px] text-[#64748B] block font-semibold">
          {request.id} • {request.category}
        </span>
        <h4 className="font-bold text-xs text-[#0F172A]">{request.title}</h4>
        <p className="text-[11px] text-[#64748B]">{request.location}</p>
      </div>

      <Input
        label="Date Resolved"
        type="date"
        required
        value={resolvedDate}
        onChange={(e) => setResolvedDate(e.target.value)}
        max={new Date().toISOString().split('T')[0]}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
          <span>Resolution Findings & Action Summary <span className="text-[#DC2626]">*</span></span>
        </label>
        <textarea
          rows={4}
          value={resolutionNotes}
          onChange={(e) => {
            setResolutionNotes(e.target.value);
            if (error) setError('');
          }}
          placeholder="Describe how the reported campus issue was resolved and inspected..."
          className={`w-full rounded-md border bg-white text-[#0F172A] text-xs p-3 focus:outline-none focus:ring-1 ${
            error
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
              : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]'
          }`}
        />
        {error && (
          <p className="text-xs text-[#DC2626] font-medium">{error}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
        <Button variant="outline" size="sm" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button size="sm" type="submit" className="bg-[#15803D] hover:bg-[#166534]">
          Confirm Resolution
        </Button>
      </div>
    </form>
  );
}

export default function RequestResolutionModal({
  isOpen,
  onClose,
  request,
  onSaveResolution,
}) {
  if (!isOpen || !request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resolve Maintenance Ticket"
      maxWidth="max-w-md"
    >
      <RequestResolutionFormBody
        key={request.id}
        request={request}
        onSaveResolution={onSaveResolution}
        onClose={onClose}
      />
    </Modal>
  );
}
