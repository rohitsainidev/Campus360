import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Download,
  ArrowUpDown,
  ArrowRight,
  GraduationCap,
  Users,
  Wrench,
  Shield,
  CheckCircle2,
  BookOpen,
  Award,
  Building,
  Briefcase,
  X,
  Send,
  FileText,
  Check,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Laptop,
  Cpu,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';

export default function Home() {
  const [activePortalTab, setActivePortalTab] = useState('student');
  const [openFaq, setOpenFaq] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const faqs = [
    {
      q: 'How do students, faculty, and staff access their respective portals?',
      a: 'Authorized users receive institutional credentials (email / roll number & password) upon admission or onboarding. Simply switch to the "Dedicated Portals" section above and click "Log in" to access your tailored dashboard.',
    },
    {
      q: 'Can students pay semester tuition and hostel fees online?',
      a: 'Yes. The Student Portal has an integrated payment gateway supporting UPI, Net Banking, and Debit/Credit cards. Receipts are generated instantly and stored under fee transaction history for paperless audit.',
    },
    {
      q: 'How does lecture attendance tracking and shortage notification work?',
      a: 'Faculty mark attendance per lecture in real-time. If a student’s overall or subject-wise attendance drops below the 75% regulatory requirement, automated notifications are sent to the student and their mentor.',
    },
    {
      q: 'Where do students download examination admit cards and semester grade cards?',
      a: 'Once fee clearances and attendance eligibility are verified, hall tickets become downloadable directly from the "Exams & Results" tab. Official SGPA/CGPA marksheets are published post-evaluation.',
    },
    {
      q: 'How can students and staff submit maintenance or campus grievance tickets?',
      a: 'Any campus grievance (academic, hostel room, plumbing, electrical) can be lodged via the Grievance & Maintenance module. Tickets are assigned to designated campus engineers with real-time status and SLA tracking.',
    },
    {
      q: 'Who do I contact if I am locked out or forgot my portal password?',
      a: 'You can use the "Forgot Password" link on the portal login screen to reset via registered mobile/email OTP, or visit the Campus Computer Center / IT Helpdesk for instant identity verification.',
    },
  ];

  // Form states
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'B.Tech Computer Science & Engineering',
    message: '',
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    setTimeout(() => {
      setIsEnquiryModalOpen(false);
      setEnquirySubmitted(false);
      setEnquiryForm({
        name: '',
        email: '',
        phone: '',
        course: 'B.Tech Computer Science & Engineering',
        message: '',
      });
    }, 2000);
  };

  const handleBrochureDownload = () => {
    setBrochureDownloaded(true);
    setTimeout(() => {
      setBrochureDownloaded(false);
      setIsBrochureModalOpen(false);
    }, 2200);
  };

  // Compare courses data
  const compareData = [
    {
      course: 'B.Tech Computer Science & Engineering',
      duration: '4 Years (8 Semesters)',
      seats: '240 Seats',
      fee: '₹1,85,000 / Year',
      avgPackage: '₹14.2 LPA',
      highestPackage: '₹48.0 LPA',
      eligibility: '10+2 with 60% (PCM) + JEE / CUET',
      highlight: 'Cloud Computing, DevOps & Systems specialization',
    },
    {
      course: 'B.Tech AI & Data Science',
      duration: '4 Years (8 Semesters)',
      seats: '120 Seats',
      fee: '₹1,95,000 / Year',
      avgPackage: '₹15.8 LPA',
      highestPackage: '₹52.0 LPA',
      eligibility: '10+2 with 60% (PCM) + JEE / CUET',
      highlight: 'Deep Learning, NLP & GenAI Laboratory Access',
    },
    {
      course: 'B.Tech Electronics & Robotics',
      duration: '4 Years (8 Semesters)',
      seats: '90 Seats',
      fee: '₹1,70,000 / Year',
      avgPackage: '₹11.5 LPA',
      highestPackage: '₹34.0 LPA',
      eligibility: '10+2 with 55% (PCM) + State Entrance',
      highlight: 'Embedded Systems, IoT & Mechatronics Lab',
    },
  ];

  const portals = [
    {
      id: 'student',
      title: 'Student Portal',
      roleName: 'Students',
      icon: GraduationCap,
      color: 'text-emerald-600',
      solidBg: 'bg-emerald-600',
      badge: 'Academics & Life',
      description:
        'Personalized student dashboard for semester schedules, attendance tracking, digital fee payments, exam grades, and hostel requests.',
      loginPath: '/login/student',
      highlights: [
        'Real-time lecture attendance & alerts',
        'Semester exam admit cards & grade sheets',
        'Paperless fee receipts & pending dues',
        'Hostel room allocation & gate passes',
      ],
      specs: [
        { label: 'Security Standard', value: '256-bit SSL & Role RBAC' },
        { label: 'Authentication', value: 'Student ID & Biometric SSO' },
        { label: 'Device Compatibility', value: 'Desktop, Tablet & Mobile' },
        { label: 'Real-time Sync', value: 'Live Cloud Attendance' },
      ],
    },
    {
      id: 'teacher',
      title: 'Faculty Portal',
      roleName: 'Faculty',
      icon: Users,
      color: 'text-indigo-600',
      solidBg: 'bg-indigo-600',
      badge: 'Teaching & Mentorship',
      description:
        'Comprehensive classroom workspace for session attendance logging, syllabus milestone tracking, assignment assessments, and student progress reports.',
      loginPath: '/login/teacher',
      highlights: [
        'One-click lecture attendance capture',
        'Continuous internal assessments & marks',
        'Course syllabus progress milestones',
        'Mentorship & academic advisement',
      ],
      specs: [
        { label: 'Security Standard', value: '256-bit SSL & Role RBAC' },
        { label: 'Authentication', value: 'Faculty Institutional ID' },
        { label: 'Device Compatibility', value: 'Desktop, Tablet & Mobile' },
        { label: 'Real-time Sync', value: 'Sub-second Grade Sync' },
      ],
    },
    {
      id: 'staff',
      title: 'Maintenance Staff Portal',
      roleName: 'Operations Staff',
      icon: Wrench,
      color: 'text-[#FA5A2A]',
      solidBg: 'bg-[#FA5A2A]',
      badge: 'Facilities & Logistics',
      description:
        'Campus operations desk for tracking maintenance work-orders, electrical and plumbing repairs, facility tickets, and asset servicing turnaround.',
      loginPath: '/login/staff',
      highlights: [
        'Prioritized maintenance work tickets',
        'Campus asset & equipment logs',
        'Rapid inspection & resolution workflows',
        'Service turnaround & SLA compliance',
      ],
      specs: [
        { label: 'Security Standard', value: '256-bit SSL & Role RBAC' },
        { label: 'Authentication', value: 'Institutional ID & SSO' },
        { label: 'Device Compatibility', value: 'Desktop, Tablet & Mobile' },
        { label: 'Real-time Sync', value: 'Sub-second Updates' },
      ],
    },
    {
      id: 'admin',
      title: 'Administrative Console',
      roleName: 'Administrators',
      icon: Shield,
      color: 'text-blue-600',
      solidBg: 'bg-blue-600',
      badge: 'Governance & Analytics',
      description:
        'Central administrative command center for institutional user directory, departmental course allocations, finance audits, and grievance monitoring.',
      loginPath: '/login/admin',
      highlights: [
        'Enterprise role-based permissions',
        'Fee collections & financial audits',
        'Campus grievance escalation desk',
        'Accreditation reports & analytics',
      ],
      specs: [
        { label: 'Security Standard', value: '256-bit SSL & Role RBAC' },
        { label: 'Authentication', value: 'Multi-factor Admin Auth' },
        { label: 'Device Compatibility', value: 'Desktop, Tablet & Mobile' },
        { label: 'Real-time Sync', value: 'Zero-latency Audit Trail' },
      ],
    },
  ];

  const academicPrograms = [
    {
      icon: Laptop,
      iconBg: 'bg-indigo-600',
      badge: 'Engineering',
      title: 'School of Computing & IT',
      degrees: 'B.Tech, M.Tech, Ph.D.',
      duration: '4 / 2 Years',
      package: '₹48 LPA Highest',
      description: 'Cutting-edge curricula in Software Engineering, Cloud Architectures, and Full-Stack Engineering.',
    },
    {
      icon: Cpu,
      iconBg: 'bg-[#FA5A2A]',
      badge: 'Emerging Tech',
      title: 'Artificial Intelligence & Data',
      degrees: 'B.Tech AI-DS, M.Sc. Data',
      duration: '4 / 2 Years',
      package: '₹52 LPA Highest',
      description: 'Advanced machine learning, generative models, natural language processing, and neural computing.',
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-emerald-600',
      badge: 'Business',
      title: 'School of Management',
      degrees: 'MBA, BBA, Executive MBA',
      duration: '2 / 3 Years',
      package: '₹28 LPA Highest',
      description: 'FinTech, Global Supply Chain, Digital Marketing, and Strategic Leadership training.',
    },
  ];

  const coreModules = [
    {
      icon: BookOpen,
      solidBg: 'bg-indigo-600',
      title: 'Academic Management',
      desc: 'Seamless course scheduling, lecture timetables, curriculum blueprints, and continuous grading.',
    },
    {
      icon: Briefcase,
      solidBg: 'bg-emerald-600',
      title: 'Placement & Career Hub',
      desc: 'Automated campus recruitments, resume builders, interview schedules, and recruiter dashboards.',
    },
    {
      icon: Building,
      solidBg: 'bg-amber-600',
      title: 'Hostel & Residential Life',
      desc: 'Real-time room allotment, mess menu voting, hostel fee tracking, and digital gate pass management.',
    },
    {
      icon: Award,
      solidBg: 'bg-blue-600',
      title: 'Examinations & Results',
      desc: 'Automated admit card generation, marks recording, CGPA calculation, and transcript downloads.',
    },
    {
      icon: Wrench,
      solidBg: 'bg-rose-600',
      title: 'Campus Grievance Desk',
      desc: 'Structured ticketing for electrical, plumbing, academic, and administrative requests with SLAs.',
    },
    {
      icon: Shield,
      solidBg: 'bg-[#FA5A2A]',
      title: 'Financial Management',
      desc: 'Instant fee payments, installments, auto-generated tax receipts, and student ledger tracking.',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16 sm:pb-20 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="bg-white border-b border-slate-200/90 pt-8 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.18]">
                One Campus. <br className="hidden sm:inline" />
                <span className="text-slate-900">One Connected</span>{' '}
                <span className="text-[#FA5A2A]">Digital Experience.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Campus360 unifies academic tracking, faculty operations, facilities maintenance, and institutional governance into a single intuitive cloud workspace.
              </p>

              {/* PRIMARY CTA BUTTONS - BALANCED & RESPONSIVE */}
              <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
                {/* Primary Action: Solid Coral Orange (Full-width on mobile) */}
                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="col-span-2 sm:col-auto bg-[#FA5A2A] hover:bg-[#E5481B] active:scale-[0.98] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HelpCircle className="h-4 w-4" strokeWidth={2.2} />
                  <span>Enquire Now</span>
                </button>

                {/* Secondary Action: Clean White Outline (50% on mobile) */}
                <button
                  type="button"
                  onClick={() => setIsBrochureModalOpen(true)}
                  className="col-span-1 sm:col-auto bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 active:scale-[0.98] px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="h-4 w-4 text-slate-500" strokeWidth={2} />
                  <span>Brochure</span>
                </button>

                {/* Tertiary Action: Clean White Outline (50% on mobile) */}
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="col-span-1 sm:col-auto bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 active:scale-[0.98] px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowUpDown className="h-4 w-4 text-slate-500" strokeWidth={2} />
                  <span>Compare</span>
                </button>
              </div>

              {/* Quick Role Direct Access - Clean Open Links (NO Background Boxes) */}
              <div className="pt-4 border-t border-slate-200/80 space-y-1.5 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-x-3.5 sm:gap-y-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-800 block sm:inline">Quick Access:</span>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-3.5">
                  <Link
                    to="/login/student"
                    className="font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    Student Portal
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    to="/login/teacher"
                    className="font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Faculty Portal
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    to="/login/staff"
                    className="font-medium text-slate-600 hover:text-[#FA5A2A] transition-colors"
                  >
                    Staff Portal
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    to="/login/admin"
                    className="font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    Admin Console
                  </Link>
                </div>
              </div>
            </div>

            {/* Right High-Quality Campus Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group bg-slate-100">
                <img
                  src="/images/campus_hero.jpg?v=2"
                  alt="Modern Campus360 Institutional Environment"
                  className="w-full h-[230px] sm:h-[340px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL TRUST & KEY METRICS (NO BOXES, NO BACKGROUND BEHIND TEXT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accreditations Ribbon */}
        <div className="pb-8 border-b border-slate-200/80">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Accredited & Recognized by National Statutory Bodies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Award className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <span className="text-xs font-bold text-slate-800">NAAC A++</span>
              <span className="text-[11px] text-slate-500">Highest Rating</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <span className="text-xs font-bold text-slate-800">AICTE Approved</span>
              <span className="text-[11px] text-slate-500">Apex Technical Body</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Shield className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <span className="text-xs font-bold text-slate-800">NBA Tier-1</span>
              <span className="text-[11px] text-slate-500">Accredited Degrees</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <GraduationCap className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <span className="text-xs font-bold text-slate-800">UGC Recognized</span>
              <span className="text-[11px] text-slate-500">Section 2(f) & 12(B)</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TrendingUp className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <span className="text-xs font-bold text-slate-800">NIRF Top 50</span>
              <span className="text-[11px] text-slate-500">National Ranking</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Building className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <span className="text-xs font-bold text-slate-800">ISO 27001</span>
              <span className="text-[11px] text-slate-500">Security Certified</span>
            </div>
          </div>
        </div>

        {/* 4-Column Impact Metrics Strip */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              15,000+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Active Enrolled Students
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Across all departments and degree programs.
            </p>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#FA5A2A] tracking-tight">
              99.9%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Cloud Platform Uptime SLA
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              High-concurrency infrastructure.
            </p>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              500+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Faculty & Researchers
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Mentoring scholars and engineering innovators.
            </p>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Paperless Campus Operations
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated fees, hall tickets, and gate passes.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR PORTALS GATEWAY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FA5A2A]">
            Role-Based Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Dedicated Portals for Every Campus Stakeholder
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Secure, tailored access for students, educators, maintenance engineers, and leadership.
          </p>
        </div>

        {/* Open, Clean Centered Tab Selector (Smooth Horizontal Swipe on Mobile) */}
        <div className="flex justify-start sm:justify-center border-b border-slate-200 overflow-x-auto gap-2 sm:gap-4 mb-8 pb-px scrollbar-none px-2 sm:px-0">
          {portals.map((p) => {
            const Icon = p.icon;
            const isSelected = activePortalTab === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePortalTab(p.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer -mb-px ${
                  isSelected
                    ? 'border-[#FA5A2A] text-[#FA5A2A]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <div
                  className={`flex items-center justify-center h-7 w-7 rounded-lg shrink-0 ${p.solidBg} text-white shadow-2xs`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Portal Details - Open & Clean Layout */}
        <div>
          {portals
            .filter((p) => p.id === activePortalTab)
            .map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left: Role Details */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex items-center justify-center h-12 w-12 rounded-xl ${p.solidBg} text-white shadow-xs shrink-0`}
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#FA5A2A]">
                          {p.badge}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{p.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-xl">{p.description}</p>

                    {/* Key Workflows Included */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Key Workflows Included:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 pt-1">
                        {p.highlights.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                      <Link
                        to={p.loginPath}
                        className={`inline-flex items-center justify-center gap-2 ${p.solidBg} hover:opacity-90 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer w-full sm:w-auto`}
                      >
                        <span>Log in to {p.roleName} Portal</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsEnquiryModalOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <HelpCircle className="h-3.5 w-3.5 text-[#FA5A2A]" />
                        <span>Portal Help & Access Support</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Portal Specifications - Clean, Open Panel */}
                  <div className="lg:col-span-5 space-y-4 lg:pl-10 lg:border-l lg:border-slate-200 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-200/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200">
                      Portal Specifications
                    </div>
                    <div className="divide-y divide-slate-100 text-xs">
                      {p.specs.map((sp, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between py-3">
                          <span className="text-slate-500 font-medium">{sp.label}</span>
                          <span className={`font-bold ${sIdx === 3 ? 'text-emerald-700' : 'text-slate-900'}`}>
                            {sp.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* TOP ACADEMIC PROGRAMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA5A2A]">
              Flagship Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Top Undergraduate & Postgraduate Schools
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1.5">
              Industry-accredited degrees engineered for global careers, practical research, and innovation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCompareModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FA5A2A] hover:text-[#E5481B] transition-colors cursor-pointer"
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Compare Course Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academicPrograms.map((program, idx) => {
            const Icon = program.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#FA5A2A]/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FA5A2A]">
                      {program.badge}
                    </span>
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-xl ${program.iconBg} text-white shadow-2xs`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{program.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {program.degrees} • {program.duration}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Placement Benchmark</span>
                    <span className="font-bold text-emerald-700">{program.package}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEnquiryForm((prev) => ({ ...prev, course: program.title }));
                      setIsEnquiryModalOpen(true);
                    }}
                    className="flex-1 bg-[#FA5A2A] hover:bg-[#E5481B] text-white text-xs font-semibold py-2.5 rounded-xl shadow-2xs transition-all text-center cursor-pointer"
                  >
                    Enquire Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBrochureModalOpen(true)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-[#FA5A2A] hover:border-[#FA5A2A]/50 text-xs font-medium transition-colors cursor-pointer"
                    title="Download Syllabus"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE INTEGRATED MODULES */}
      <section className="bg-white border-y border-slate-200/90 py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2.5 mb-10 sm:mb-16 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA5A2A]">
              Campus Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Six Enterprise Modules, Zero Fragmentation
            </h2>
            <p className="text-sm text-slate-600">
              Every critical dimension of university administration united in a centralized, responsive interface.
            </p>
          </div>

          {/* Open Clean 3-Column Feature Grid with Generous Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-12 sm:gap-x-12 lg:gap-x-16 lg:gap-y-14">
            {coreModules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div key={idx} className="space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-xl ${mod.solidBg} text-white shadow-2xs shrink-0`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{mod.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-0.5">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (Q&A) SECTION - 2-COLUMN FULL-WIDTH GRID */}
      <section className="bg-slate-50/50 border-b border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Top Heading */}
          <div className="space-y-2 mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA5A2A]">
              Questions & Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Everything you need to know about campus portals, enrollment, attendance rules, fee clearance, and student support.
            </p>
          </div>

          {/* 2-Column Full-Width Grid (3 Left, 3 Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-start">
            {/* Left Column (Q1 - Q3) */}
            <div className="space-y-4">
              {faqs.slice(0, 3).map((faq, idx) => {
                const actualIdx = idx;
                const isOpen = openFaq === actualIdx;
                return (
                  <div
                    key={actualIdx}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : actualIdx)}
                      className="w-full flex items-start justify-between gap-3.5 p-5 text-left font-semibold text-slate-900 text-sm sm:text-base hover:text-[#FA5A2A] transition-colors cursor-pointer"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 mt-0.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FA5A2A]' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column (Q4 - Q6) */}
            <div className="space-y-4">
              {faqs.slice(3, 6).map((faq, idx) => {
                const actualIdx = idx + 3;
                const isOpen = openFaq === actualIdx;
                return (
                  <div
                    key={actualIdx}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : actualIdx)}
                      className="w-full flex items-start justify-between gap-3.5 p-5 text-left font-semibold text-slate-900 text-sm sm:text-base hover:text-[#FA5A2A] transition-colors cursor-pointer"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 mt-0.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FA5A2A]' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Support Help Prompt */}
          <div className="mt-12 text-center max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-slate-600">
              Still have questions? Our academic counselors and campus helpdesk are ready to guide you.
            </p>
            <button
              type="button"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="mt-3.5 inline-flex items-center gap-2 bg-[#FA5A2A] hover:bg-[#E5481B] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Ask a Question / Submit Enquiry</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* MODAL 1: ENQUIRY MODAL */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFF4EE] text-[#FA5A2A]">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Enquire for Admissions</h3>
                  <p className="text-[11px] text-slate-500">Academic Year 2026-27</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {enquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <div className="text-base font-bold text-slate-900">Enquiry Submitted!</div>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Our admissions representative will call you shortly on{' '}
                  <span className="font-semibold text-slate-900">{enquiryForm.phone}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FA5A2A]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FA5A2A]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FA5A2A]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Program Preference</label>
                  <select
                    value={enquiryForm.course}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, course: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#FA5A2A]"
                  >
                    <option>B.Tech Computer Science & Engineering</option>
                    <option>B.Tech AI & Data Science</option>
                    <option>B.Tech Electronics & Robotics</option>
                    <option>Master of Business Administration (MBA)</option>
                    <option>Other Academic Inquiries</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Query / Message</label>
                  <textarea
                    rows={2}
                    placeholder="Ask about entrance cutoffs, scholarships, hostel fees..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FA5A2A]"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FA5A2A] hover:bg-[#E5481B] text-white px-5 py-2 text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: BROCHURE DOWNLOAD MODAL */}
      {isBrochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFF4EE] text-[#FA5A2A]">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Download Campus Brochure</h3>
                  <p className="text-[11px] text-slate-500">Official Prospectus 2026-27 (PDF, 8.4 MB)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBrochureModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {brochureDownloaded ? (
              <div className="py-6 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <div className="text-base font-bold text-slate-900">Brochure Downloaded!</div>
                <p className="text-xs text-slate-600">
                  Your official 2026-27 Campus Prospectus is ready. A copy has also been sent to your device.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">What is inside this brochure?</div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Full syllabus of B.Tech, M.Tech & Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Year-wise fee structures & hostel charges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Recruiter list, highest packages & placement stats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Merit scholarships & financial aid criteria</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsBrochureModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleBrochureDownload}
                    className="bg-[#FA5A2A] hover:bg-[#E5481B] text-white px-5 py-2 text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: PROGRAM COMPARE MODAL */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-4xl w-full p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#FFF4EE] text-[#FA5A2A]">
                  <ArrowUpDown className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Compare Undergraduate Programs</h3>
                  <p className="text-[11px] text-slate-500">Side-by-side comparison for 2026-27 admission session</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 px-3 font-semibold text-slate-500 w-1/4">Key Metrics</th>
                    {compareData.map((item, idx) => (
                      <th key={idx} className="py-3 px-3 font-bold text-slate-900 w-1/4">
                        {item.course}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Course Duration</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 text-slate-800">{item.duration}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Annual Tuition Fee</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 font-semibold text-slate-900">{item.fee}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Average Placement</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 font-bold text-emerald-700">{item.avgPackage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Highest Package</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 font-bold text-[#FA5A2A]">{item.highestPackage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Total Sanctioned Seats</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 text-slate-800">{item.seats}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Minimum Eligibility</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 text-slate-700">{item.eligibility}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-500">Specialization Focus</td>
                    {compareData.map((item, idx) => (
                      <td key={idx} className="py-3 px-3 text-slate-600">{item.highlight}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Need personalized guidance? Our counseling cell is open for campus visits.
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsCompareModalOpen(false);
                  setIsEnquiryModalOpen(true);
                }}
                className="bg-[#FA5A2A] hover:bg-[#E5481B] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                Book Free Counseling
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

