import { useState } from 'react';
import { FileText } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { staffTaskCategories } from '../../data/mockData';

function CreateTaskFromRequestBody({ request, onCreateTask, onClose }) {
  const [title, setTitle] = useState(`Repair: ${request.title}`);
  const [category, setCategory] = useState(
    staffTaskCategories.includes(request.category) ? request.category : 'General Maintenance'
  );
  const [location, setLocation] = useState(request.location);
  const [priority, setPriority] = useState(request.priority || 'Medium');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Task title is required.';
    }
    if (!dueDate) {
      errs.dueDate = 'Due date is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onCreateTask({
      requestId: request.id,
      title: title.trim(),
      description: request.description,
      category,
      location,
      priority,
      dueDate,
      instructions: instructions.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#475569]">
      {/* Linked Request Pill */}
      <div className="p-3.5 rounded-lg bg-indigo-50/70 border border-indigo-100 space-y-1">
        <span className="font-mono text-[10px] text-[#4F46E5] block font-semibold">
          Source Ticket: {request.id}
        </span>
        <h4 className="font-bold text-xs text-[#0F172A]">{request.title}</h4>
        <p className="text-[11px] text-[#475569]">{request.description}</p>
      </div>

      <Input
        label="Work Order Task Title"
        required
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
        }}
        error={errors.title}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F172A]">
            Maintenance Category <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
          >
            {staffTaskCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F172A]">
            Priority Level <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs px-3 py-2 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Campus Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Input
          label="Target Due Date"
          type="date"
          required
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
          }}
          min={new Date().toISOString().split('T')[0]}
          error={errors.dueDate}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-[#4F46E5]" />
          <span>Special Operating Instructions / Tool Checklist (Optional)</span>
        </label>
        <textarea
          rows={2}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g. Bring digital multimeter, spare capacitor, and isolate room breaker before commencing work..."
          className="w-full rounded-md border border-[#E2E8F0] bg-white text-[#0F172A] text-xs p-2.5 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
        />
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
        <Button variant="outline" size="sm" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button size="sm" type="submit">
          Generate Work Order
        </Button>
      </div>
    </form>
  );
}

export default function CreateTaskFromRequestModal({
  isOpen,
  onClose,
  request,
  onCreateTask,
}) {
  if (!isOpen || !request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Assigned Task from Ticket"
      maxWidth="max-w-xl"
    >
      <CreateTaskFromRequestBody
        key={request.id}
        request={request}
        onCreateTask={onCreateTask}
        onClose={onClose}
      />
    </Modal>
  );
}
