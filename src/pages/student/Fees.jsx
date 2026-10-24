import { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  Receipt,
  AlertCircle,
  ShieldCheck,
  Building2,
  ArrowUpRight,
  Smartphone,
  Landmark,
  Printer,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { studentFeeSummary } from '../../data/feeMockData';
import feeService from '../../services/feeService';

export default function StudentFees() {
  const [feeData, setFeeData] = useState(() => {
    const saved = localStorage.getItem('campus360_student_fees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return studentFeeSummary;
  });

  // Load live fee records from backend MongoDB
  useEffect(() => {
    let isMounted = true;
    const fetchFee = async () => {
      try {
        const res = await feeService.getMyFees();
        if (isMounted && res.fee) {
          const f = res.fee;
          const formatted = {
            studentName: f.student?.name || 'Alex Johnson',
            rollNo: f.student?.identifier || 'CS23-081',
            course: f.student?.profileDetails?.course || 'B.Tech in Computer Science & Engineering',
            currentSemester: f.semester || 'Semester 6',
            academicYear: f.academicYear || '2026-2027',
            totalFee: f.totalFee,
            paidAmount: f.paidAmount,
            pendingDue: f.pendingDue,
            dueDate: f.dueDate,
            feeStructure: f.feeStructure || [],
            transactions: f.transactions || [],
          };
          setFeeData(formatted);
          localStorage.setItem('campus360_student_fees', JSON.stringify(formatted));
        }
      } catch {
        // fallback
      }
    };
    fetchFee();
    return () => {
      isMounted = false;
    };
  }, []);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  // Handle simulated payment
  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const paidAmount = feeData.pendingDue;
      const newTxn = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        receiptNo: `CP360-REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        amount: paidAmount,
        paymentMethod: paymentMethod === 'UPI' ? 'UPI (Google Pay/PhonePe)' : paymentMethod === 'CARD' ? 'Debit Card' : 'Net Banking (SBI)',
        category: 'Semester 6 Balance Cleared (Tuition + Hostel + Exam)',
        status: 'Success',
        transactionRef: `REF${Date.now()}`,
      };

      const updatedFeeStructure = feeData.feeStructure.map((item) => ({
        ...item,
        paid: item.total,
        balance: 0,
        status: 'Paid',
      }));

      const updated = {
        ...feeData,
        paidAmount: feeData.totalFee,
        pendingDue: 0,
        feeStructure: updatedFeeStructure,
        transactions: [newTxn, ...feeData.transactions],
      };

      setFeeData(updated);
      localStorage.setItem('campus360_student_fees', JSON.stringify(updated));

      setPaymentModalOpen(false);
      setPaymentSuccessMsg(
        `Payment of ₹ ${paidAmount.toLocaleString()} completed successfully! Receipt generated: ${newTxn.receiptNo}`
      );
      setTimeout(() => setPaymentSuccessMsg(''), 6000);
    }, 1800);
  };

  const handleOpenReceipt = (txn) => {
    setSelectedReceipt(txn);
    setReceiptModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Fee & Dues Management"
        description="View semester fee structure, clear outstanding dues via secure gateway, and access official tax receipts."
        breadcrumbs={[
          { label: 'Student Portal', path: '/student/dashboard' },
          { label: 'Fee Payments' },
        ]}
        badge={<Badge variant="primary">{feeData.currentSemester}</Badge>}
        action={
          feeData.pendingDue > 0 ? (
            <Button
              onClick={() => setPaymentModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CreditCard className="h-4 w-4" />
              Pay Balance (₹ {feeData.pendingDue.toLocaleString()})
            </Button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              All Semester Dues Cleared
            </div>
          )
        }
      />

      {paymentSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <p className="font-medium">{paymentSuccessMsg}</p>
        </div>
      )}

      {/* KPI Stats Cards - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Term Fee
              </span>
              <Receipt className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                ₹ {feeData.totalFee.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {feeData.academicYear}
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Fee Paid
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                ₹ {feeData.paidAmount.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {Math.round((feeData.paidAmount / feeData.totalFee) * 100)}% Settled
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Pending Balance
              </span>
              {feeData.pendingDue > 0 ? (
                <AlertCircle className="h-4 w-4 text-amber-500 transition-transform group-hover:scale-110" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
              )}
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                ₹ {feeData.pendingDue.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {feeData.pendingDue > 0 ? `Due by ${feeData.dueDate}` : 'No overdue balance'}
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Next Due Date
              </span>
              <Clock className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {feeData.dueDate}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Late fine applicable after
            </p>
          </div>
        </div>
      </div>

      {/* Fee Breakdown Structure */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">
              Semester 6 Detailed Fee Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Department of Computer Science & Engineering • Roll No: {feeData.rollNo}
            </p>
          </div>
          {feeData.pendingDue > 0 && (
            <span className="text-xs font-semibold text-amber-700 self-start sm:self-auto">
              Pending Dues: ₹ {feeData.pendingDue.toLocaleString()}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Fee Head / Component</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-right">Amount Paid</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeData.feeStructure.map((head) => (
                <tr key={head.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900">{head.category}</p>
                    <p className="text-[11px] text-slate-500">
                      Ref Code: {head.id} {head.mandatory ? '• Compulsory' : '• Institutional'}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-800">
                    ₹ {head.total.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-medium">
                    ₹ {head.paid.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-rose-600">
                    ₹ {head.balance.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                    {head.dueDate}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-xs font-semibold ${
                        head.status === 'Paid'
                          ? 'text-emerald-700'
                          : head.status === 'Partial'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {head.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold border-t-2 border-slate-200 text-slate-900">
              <tr>
                <td className="py-3.5 px-4">Total Aggregate</td>
                <td className="py-3.5 px-4 text-right font-mono">
                  ₹ {feeData.totalFee.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-600">
                  ₹ {feeData.paidAmount.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-rose-600">
                  ₹ {feeData.pendingDue.toLocaleString()}
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment History & Receipts */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">
              Transaction History & Official Receipts
            </h3>
            <p className="text-xs text-slate-500">
              Generated digitally with automated verification hashes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Receipt Number</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Category Description</th>
                <th className="py-3 px-4">Payment Channel</th>
                <th className="py-3 px-4 text-right">Amount Paid</th>
                <th className="py-3 px-4 text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeData.transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-semibold text-indigo-600">
                      {txn.receiptNo}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono">{txn.transactionRef}</p>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 font-mono">
                    {txn.date}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-800 font-medium">
                    {txn.category}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    {txn.paymentMethod}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-600">
                    ₹ {txn.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenReceipt(txn)}
                      className="flex items-center gap-1.5 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    >
                      <Receipt className="h-3.5 w-3.5" />
                      View Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Payment Modal */}
      {paymentModalOpen && (
        <Modal
          isOpen={paymentModalOpen}
          onClose={() => !isProcessing && setPaymentModalOpen(false)}
          title="Campus360 Secure Payment Gateway"
          size="md"
        >
          <form onSubmit={handleSimulatePayment} className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 rounded-xl border border-indigo-200">
              <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
                Total Payable Amount
              </p>
              <p className="text-2xl font-bold text-indigo-700 font-mono mt-1">
                ₹ {feeData.pendingDue.toLocaleString()}
              </p>
              <p className="text-xs text-indigo-600 mt-0.5">
                For {feeData.studentName} ({feeData.rollNo}) • {feeData.currentSemester}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Choose Payment Mode
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'UPI'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs">UPI Apps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANK')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'NETBANK'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Landmark className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'CARD'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs">Debit Card</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'UPI' && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Supported UPI Handles:</p>
                <p>Google Pay, PhonePe, Paytm, BHIM UPI (Instant settlement)</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>256-Bit SSL Encrypted Institutional Payment Sandbox</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <Button
                variant="secondary"
                type="button"
                disabled={isProcessing}
                onClick={() => setPaymentModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-32"
              >
                {isProcessing ? 'Processing...' : `Pay ₹ ${feeData.pendingDue.toLocaleString()}`}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Receipt Modal */}
      {receiptModalOpen && selectedReceipt && (
        <Modal
          isOpen={receiptModalOpen}
          onClose={() => setReceiptModalOpen(false)}
          title="Official Institution Fee Payment Receipt"
          size="lg"
        >
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-6 text-sm" id="printable-receipt">
            {/* Institution Header */}
            <div className="flex items-start justify-between border-b pb-4 border-slate-200">
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-slate-900 tracking-tight">
                  CAMPUS360 UNIVERSITY OF TECHNOLOGY
                </h4>
                <p className="text-xs text-slate-500">
                  Central Accounts & Finance Division • GSTIN: 07AAATC8921B1Z9
                </p>
                <p className="text-xs text-slate-500">
                  Campus Enclave, Sector 14, Institutional Area, India
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-bold uppercase">
                  Payment Verified
                </span>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Date: {selectedReceipt.date}
                </p>
              </div>
            </div>

            {/* Student & Txn Info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div>
                <p className="text-slate-500">Student Name:</p>
                <p className="font-semibold text-slate-800 text-sm">{feeData.studentName}</p>
                <p className="text-slate-500 mt-1">Roll / Identifier:</p>
                <p className="font-mono font-semibold text-slate-800">{feeData.rollNo}</p>
              </div>
              <div>
                <p className="text-slate-500">Receipt Voucher No:</p>
                <p className="font-mono font-bold text-indigo-600 text-sm">
                  {selectedReceipt.receiptNo}
                </p>
                <p className="text-slate-500 mt-1">Gateway Transaction ID:</p>
                <p className="font-mono text-slate-700">{selectedReceipt.transactionRef}</p>
              </div>
            </div>

            {/* Payment Details Table */}
            <table className="w-full text-xs">
              <thead className="bg-slate-100 font-semibold text-slate-700">
                <tr>
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-left">Mode</th>
                  <th className="py-2 px-3 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900">
                    {selectedReceipt.category}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {selectedReceipt.paymentMethod}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    ₹ {selectedReceipt.amount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer Signatory */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
              <div>
                <p className="font-semibold text-slate-700">System Generated Document</p>
                <p>No physical signature required. Verified by Campus360 Finance Core.</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">Finance & Accounts Officer</p>
                <p>Campus360 Institutional ERP</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs"
              >
                <Printer className="h-3.5 w-3.5" />
                Print / Save PDF
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setReceiptModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
