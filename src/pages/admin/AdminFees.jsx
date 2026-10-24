import { useState, useMemo, useEffect } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Users,
  Send,
  CheckCircle,
  Plus,
  Building,
  Receipt,
  FileText,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { adminFeeOverview } from '../../data/feeMockData';
import feeService from '../../services/feeService';

export default function AdminFees() {
  const [feeOverview, setFeeOverview] = useState(() => {
    const saved = localStorage.getItem('campus360_admin_fees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return adminFeeOverview;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [statusMsg, setStatusMsg] = useState('');
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [issueFeeModalOpen, setIssueFeeModalOpen] = useState(false);

  // Fetch admin fee overview on mount
  useEffect(() => {
    let isMounted = true;
    const fetchFees = async () => {
      try {
        const res = await feeService.getAdminOverview();
        if (isMounted && res.overview) {
          setFeeOverview(res.overview);
        }
      } catch (err) {
        console.warn('Backend fee overview fetch fallback:', err);
      }
    };
    fetchFees();
    return () => {
      isMounted = false;
    };
  }, []);

  // Record modal form
  const [studentRoll, setStudentRoll] = useState('');
  const [settleAmount, setSettleAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Demand Draft');
  const [referenceNo, setReferenceNo] = useState('');

  // Issue fee demand form
  const [newFeeRoll, setNewFeeRoll] = useState('');
  const [newFeeName, setNewFeeName] = useState('');
  const [newFeeDept, setNewFeeDept] = useState('CSE');
  const [newFeeType, setNewFeeType] = useState('Semester Tuition');
  const [newFeeAmount, setNewFeeAmount] = useState('');
  const [newFeeDueDate, setNewFeeDueDate] = useState('');

  const filteredDefaulters = useMemo(() => {
    return feeOverview.defaultersList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = filterDept === 'ALL' || item.department === filterDept;
      return matchSearch && matchDept;
    });
  }, [feeOverview.defaultersList, searchQuery, filterDept]);

  const handleSendReminder = (student) => {
    setStatusMsg(`Payment reminder alert dispatched via SMS & Email to ${student.name} (${student.phone}).`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleRecordOfflinePayment = async (e) => {
    e.preventDefault();
    if (!studentRoll || !settleAmount) {
      alert('Please fill student roll number and payment amount.');
      return;
    }

    const amountNum = Number(settleAmount);

    try {
      await feeService.recordOfflinePayment({
        rollNo: studentRoll.trim().toUpperCase(),
        amount: amountNum,
        paymentMode,
        referenceNo,
      });
    } catch (err) {
      console.warn('Backend record offline payment fallback:', err);
    }

    // Remove or update defaulter from list
    const updatedDefaulters = feeOverview.defaultersList.filter(
      (d) => d.rollNo.toUpperCase() !== studentRoll.trim().toUpperCase()
    );

    const updated = {
      ...feeOverview,
      totalRevenueCollected: feeOverview.totalRevenueCollected + amountNum,
      totalDefaultersCount: Math.max(0, feeOverview.totalDefaultersCount - 1),
      defaultersList: updatedDefaulters,
    };

    setFeeOverview(updated);
    localStorage.setItem('campus360_admin_fees', JSON.stringify(updated));

    setRecordModalOpen(false);
    setStudentRoll('');
    setSettleAmount('');
    setReferenceNo('');

    setStatusMsg(`Offline fee settlement of ₹ ${amountNum.toLocaleString()} recorded successfully!`);
    setTimeout(() => setStatusMsg(''), 4500);
  };

  const handleIssueFeeDemand = (e) => {
    e.preventDefault();
    if (!newFeeRoll || !newFeeName || !newFeeAmount) {
      alert('Please fill student roll number, student name, and fee amount.');
      return;
    }

    const amt = Number(newFeeAmount);
    const newDefaulter = {
      rollNo: newFeeRoll.trim().toUpperCase(),
      name: newFeeName.trim(),
      department: newFeeDept,
      dueAmount: amt,
      dueDate: newFeeDueDate || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      phone: '+91 98765 00000',
      feeType: newFeeType,
    };

    const updated = {
      ...feeOverview,
      totalRevenueExpected: feeOverview.totalRevenueExpected + amt,
      totalDefaultersCount: feeOverview.totalDefaultersCount + 1,
      defaultersList: [newDefaulter, ...feeOverview.defaultersList],
    };

    setFeeOverview(updated);
    localStorage.setItem('campus360_admin_fees', JSON.stringify(updated));

    setIssueFeeModalOpen(false);
    setNewFeeRoll('');
    setNewFeeName('');
    setNewFeeAmount('');
    setNewFeeDueDate('');

    setStatusMsg(`Fee invoice of ₹ ${amt.toLocaleString()} issued for ${newDefaulter.name} (${newDefaulter.rollNo}).`);
    setTimeout(() => setStatusMsg(''), 4500);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Fee Administration & Dues Tracking"
        description="Monitor institutional tuition inflows, departmental collection metrics, and manage outstanding fee defaulters."
        breadcrumbs={[
          { label: 'Admin Console', path: '/admin/dashboard' },
          { label: 'Fee Management' },
        ]}
        actions={
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setIssueFeeModalOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#5CAC32] hover:bg-[#4B9228] text-white text-xs sm:text-sm py-2 font-medium shadow-2xs transition-colors"
            >
              <Plus className="h-4 w-4 shrink-0" />
              Issue Fee Demand
            </Button>
            <Button
              variant="outline"
              onClick={() => setRecordModalOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm py-2"
            >
              <CreditCard className="h-4 w-4 text-[#5CAC32] shrink-0" />
              Record Settlement
            </Button>
          </div>
        }
      />

      {statusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="h-4.5 w-4.5 text-[#5CAC32] shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Financial KPIs - Unified Enterprise Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Expected Revenue
              </span>
              <Receipt className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                ₹ {(feeOverview.totalRevenueExpected / 10000000).toFixed(2)}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Cr</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Session 2026-27
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Total Collected
              </span>
              <TrendingUp className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                ₹ {(feeOverview.totalRevenueCollected / 10000000).toFixed(2)}
              </span>
              <span className="text-xs font-medium text-slate-500 ml-1">Cr</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {feeOverview.collectionRate}% of target met
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Fee Defaulters
              </span>
              <AlertCircle className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {feeOverview.totalDefaultersCount}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              4 branches active
            </p>
          </div>

          <div className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 transition-colors">
                Defaulter Rate
              </span>
              <Users className="h-4 w-4 text-[#5CAC32] transition-transform group-hover:scale-110" />
            </div>
            <div className="my-0.5 flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                4.2
              </span>
              <span className="text-xs font-medium text-slate-500 ml-0.5">%</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              Threshold: &lt; 5%
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 text-[#5CAC32] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-500 font-medium shrink-0">Branch:</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {['ALL', 'CSE', 'Electrical', 'Mechanical', 'Civil'].map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                  filterDept === dept
                    ? 'bg-[#5CAC32] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Defaulters Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                Outstanding Dues & Defaulter Students
              </h3>
              <Badge variant="warning" className="shrink-0 whitespace-nowrap">
                {filteredDefaulters.length} Pending Cases
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing students with uncleared balances for the current semester
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[920px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 pl-6 pr-4 whitespace-nowrap">Student Details</th>
                <th className="py-3.5 px-4 min-w-[160px]">Department & Sem</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Outstanding Due</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Due Date</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">Status</th>
                <th className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">Reminder Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDefaulters.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4.5 pl-6 pr-4 whitespace-nowrap">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs font-mono text-[#5CAC32]">{item.rollNo}</p>
                  </td>
                  <td className="py-4.5 px-4 text-xs text-slate-600 min-w-[160px]">
                    <p className="font-medium text-slate-800">{item.department}</p>
                    <p className="text-slate-500">{item.semester}</p>
                  </td>
                  <td className="py-4.5 px-4 text-right font-mono font-bold text-rose-600 whitespace-nowrap">
                    ₹ {item.totalDue?.toLocaleString() || item.dueAmount?.toLocaleString()}
                  </td>
                  <td className="py-4.5 px-4 text-xs text-slate-500 font-mono whitespace-nowrap">
                    {item.dueDate}
                  </td>
                  <td className="py-4.5 px-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      item.status === 'Overdue' ? 'text-rose-600' : 'text-amber-600'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        item.status === 'Overdue' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                      }`} />
                      {item.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-4.5 pl-4 pr-6 text-right whitespace-nowrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendReminder(item)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-700 border-slate-200 hover:border-[#5CAC32]/40 hover:bg-slate-50 hover:text-[#5CAC32]"
                    >
                      <Send className="h-3 w-3" />
                      Send Reminder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredDefaulters.map((item) => (
            <div key={item.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs font-mono text-[#5CAC32]">
                    {item.rollNo} • {item.department} ({item.semester || 'Current'})
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
                  item.status === 'Overdue' ? 'text-rose-600' : 'text-amber-600'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    item.status === 'Overdue' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                  }`} />
                  {item.status || 'Pending'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[11px]">Due Date</span>
                  <span className="font-mono text-slate-700">{item.dueDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Outstanding Due</span>
                  <span className="font-mono font-bold text-rose-600 text-sm">
                    ₹ {item.totalDue?.toLocaleString() || item.dueAmount?.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSendReminder(item)}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-700 border-slate-200 hover:bg-slate-50"
              >
                <Send className="h-3 w-3" />
                Dispatch Reminder SMS & Email
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Record Offline Settlement Modal */}
      {recordModalOpen && (
        <Modal
          isOpen={recordModalOpen}
          onClose={() => setRecordModalOpen(false)}
          title="Record Counter / Offline Fee Receipt"
          size="md"
        >
          <form onSubmit={handleRecordOfflinePayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Roll Number *
              </label>
              <input
                type="text"
                placeholder="e.g. CS23-081"
                value={studentRoll}
                onChange={(e) => setStudentRoll(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] uppercase font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Settlement Amount (₹) *
                </label>
                <input
                  type="number"
                  placeholder="35000"
                  value={settleAmount}
                  onChange={(e) => setSettleAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instrument / Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                >
                  <option value="Demand Draft">Demand Draft (DD)</option>
                  <option value="Bank Cheque">Bank Cheque</option>
                  <option value="NEFT / RTGS">NEFT / RTGS Transfer</option>
                  <option value="Cash Counter">Cash Counter Voucher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                DD / UTR / Cheque Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g. DD-89410294"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setRecordModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#5CAC32] hover:bg-[#4B9228] text-white"
              >
                Record Payment
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Issue Fee Demand / Invoice Modal */}
      {issueFeeModalOpen && (
        <Modal
          isOpen={issueFeeModalOpen}
          onClose={() => setIssueFeeModalOpen(false)}
          title="Issue New Student Fee Invoice / Demand"
          size="md"
        >
          <form onSubmit={handleIssueFeeDemand} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Roll Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. CS23-112"
                  value={newFeeRoll}
                  onChange={(e) => setNewFeeRoll(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] uppercase font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohit Verma"
                  value={newFeeName}
                  onChange={(e) => setNewFeeName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Branch
                </label>
                <select
                  value={newFeeDept}
                  onChange={(e) => setNewFeeDept(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                >
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="ECE">Electronics (ECE)</option>
                  <option value="MECH">Mechanical (MECH)</option>
                  <option value="CIVIL">Civil Engineering</option>
                  <option value="IT">Information Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fee Category / Head
                </label>
                <select
                  value={newFeeType}
                  onChange={(e) => setNewFeeType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                >
                  <option value="Semester Tuition">Semester Tuition Fee</option>
                  <option value="Examination Fee">Examination & Lab Fee</option>
                  <option value="Hostel & Mess">Hostel & Mess Charges</option>
                  <option value="Transportation">Transportation / Bus Fee</option>
                  <option value="Library Deposit">Library Caution Deposit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fee Amount (₹) *
                </label>
                <input
                  type="number"
                  placeholder="45000"
                  value={newFeeAmount}
                  onChange={(e) => setNewFeeAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32] font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Due Date
                </label>
                <input
                  type="date"
                  value={newFeeDueDate}
                  onChange={(e) => setNewFeeDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAC32]/20 focus:border-[#5CAC32]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIssueFeeModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#5CAC32] hover:bg-[#4B9228] text-white"
              >
                Issue Invoice
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
