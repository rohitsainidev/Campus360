import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Wrench,
  Shield,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  FileCheck2,
  ShieldCheck,
  Zap,
  Award,
} from 'lucide-react';
import Button from '../../components/common/Button';
import CampusHeroIllustration from '../../components/illustrations/CampusHeroIllustration';
import {
  HostelStepIllustration,
  AcademicsStepIllustration,
  FinanceStepIllustration,
  ExamsStepIllustration,
} from '../../components/illustrations/CampusStepIllustrations';

export default function Home() {
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Stakeholder Ecosystem Data (Professional Persona Showcase)
  const stakeholders = [
    {
      id: 'student',
      title: 'Students',
      role: 'Student Academic Workspace',
      badge: 'Academic Portal',
      icon: GraduationCap,
      color: 'text-[#2563EB]',
      headline: 'Attendance shortage alerts, online fee clearance & digital admit cards.',
      description:
        'Stay fully in control of your campus journey. Check subject-wise lecture attendance with automated 75% cutoff warnings, clear semester fees with instant receipts, and download exam hall tickets without waiting in administrative queues.',
      features: [
        {
          title: 'Automated 75% Attendance Guard',
          desc: 'Real-time subject-wise tracking with predictive warnings before semester exams.',
        },
        {
          title: 'One-Click Fee Clearance & PDF Receipts',
          desc: 'Instant online tuition payment with official GST-compliant university invoices.',
        },
        {
          title: 'Clearance-Verified Digital Hall Tickets',
          desc: 'Automated exam eligibility verification and semester marksheet downloads.',
        },
      ],
      metrics: [
        {
          stat: '88%',
          label: 'Faster Fee Clearance',
          detail: 'Zero counter queues with instant online UPI, card, and net banking payment reconciliation.',
        },
        {
          stat: '75%',
          label: 'Attendance Cutoff Guard',
          detail: 'Automated subject-wise calculations notify students well before examination cutoffs.',
        },
        {
          stat: '< 1 min',
          label: 'Digital Admit Card Generation',
          detail: 'Automated financial and attendance verification issues hall tickets instantly.',
        },
      ],
      portalLink: '/login',
      portalLabel: 'Student Portal',
    },
    {
      id: 'faculty',
      title: 'Faculty',
      role: 'Faculty Teaching Suite',
      badge: 'Teaching & Mentorship',
      icon: Users,
      color: 'text-indigo-600',
      headline: '1-Tap paperless lecture roll call, digital coursework evaluation & marks ledger.',
      description:
        'Eliminate tedious paper registers. Mark session attendance in under 15 seconds, publish assignment deadlines with PDF review, and synchronize continuous internal assessment marks directly with the examination controller.',
      features: [
        {
          title: '15-Second Mobile Roll Call',
          desc: 'Mark lecture attendance per batch with instant notification sync to student portals.',
        },
        {
          title: 'Digital Assignment Evaluation',
          desc: 'Review PDF submissions, assign grades, and provide feedback without physical papers.',
        },
        {
          title: 'Automated Defaulter Reports',
          desc: 'Instantly generate lists of students below attendance thresholds for dean review.',
        },
      ],
      metrics: [
        {
          stat: '< 15s',
          label: 'Lecture Roll Call Speed',
          detail: 'Mark session attendance per batch with real-time sync to student dashboards.',
        },
        {
          stat: '100%',
          label: 'Paperless Coursework Review',
          detail: 'Review digital PDF submissions and return grades with feedback from any device.',
        },
        {
          stat: 'Auto',
          label: 'Internal Assessment Sync',
          detail: 'Continuous assessment marks synchronize automatically with the exam controller.',
        },
      ],
      portalLink: '/login',
      portalLabel: 'Faculty Portal',
    },
    {
      id: 'staff',
      title: 'Operations Staff',
      role: 'Campus Facilities Desk',
      badge: 'Campus Operations',
      icon: Wrench,
      color: 'text-amber-600',
      headline: 'Automated grievance work orders with strict SLA turnaround tracking.',
      description:
        'Centralized dispatch system for campus infrastructure. Facility technicians receive prioritized work orders for hostel rooms, electrical systems, plumbing, and labs with turnaround tracking and photo verification.',
      features: [
        {
          title: 'Intelligent Ticket Routing',
          desc: 'Automated dispatch to designated electricians, plumbers, and network technicians.',
        },
        {
          title: 'Strict 24-Hour SLA Turnaround',
          desc: 'Real-time countdown and escalation for critical student hostel and lab repairs.',
        },
        {
          title: 'Photo Proof & Digital Sign-Off',
          desc: 'Technicians log resolution notes and student verification signatures upon completion.',
        },
      ],
      metrics: [
        {
          stat: '< 4 hrs',
          label: 'Hostel Repair Turnaround',
          detail: 'High-priority routing for urgent electrical, plumbing, and network grievances.',
        },
        {
          stat: '98.6%',
          label: 'On-Time SLA Compliance',
          detail: 'Real-time technician dispatch with strict resolution deadlines and tracking.',
        },
        {
          stat: '100%',
          label: 'Verified Resolution Proof',
          detail: 'Digital student sign-off and photo proof attached to every closed work order.',
        },
      ],
      portalLink: '/login',
      portalLabel: 'Staff Portal',
    },
    {
      id: 'admin',
      title: 'Administrators',
      role: 'Central Governance Console',
      badge: 'Institutional Governance',
      icon: Shield,
      color: 'text-emerald-600',
      headline: 'Centralized university governance, fee ledger audits & NAAC compliance.',
      description:
        'Total institutional oversight. Manage batch student provisioning, configure multi-tier tuition schedules, enforce examination clearance criteria, and generate statutory audit exports for accreditation bodies.',
      features: [
        {
          title: 'Bulk User Provisioning',
          desc: 'One-click enrollment for entire batches with automated departmental credentialing.',
        },
        {
          title: 'Live Fee Reconciliation Ledger',
          desc: 'Track semester collection targets, pending dues, and real-time bank reconciliation.',
        },
        {
          title: 'Audit & Accreditation Exports',
          desc: 'Pre-formatted data exports for NAAC SSR, NIRF, and state regulatory compliance.',
        },
      ],
      metrics: [
        {
          stat: '100%',
          label: 'Reconciled Tuition Ledger',
          detail: 'Real-time university fee collection tracking with live banking reconciliation.',
        },
        {
          stat: '1-Click',
          label: 'Statutory Audit Exports',
          detail: 'Formatted institutional data exports ready for NAAC SSR and NIRF compliance.',
        },
        {
          stat: 'SSO',
          label: 'Role-Based Provisioning',
          detail: 'Automated account credentialing for students, faculty, and campus departments.',
        },
      ],
      portalLink: '/login',
      portalLabel: 'Admin Console',
    },
  ];

  // Lifecycle Roadmap Milestones (Institutional Management Workflow)
  const roadmapStages = [
    {
      num: '01',
      title: 'Student Enrollment & Hostel Allocation',
      desc: 'Administrative onboarding, roll number provisioning, batch allotment, hostel room assignments, and mess gate pass controls.',
      tags: ['Batch Enrollment', 'Hostel Allotment', 'Gate Pass'],
      Illustration: HostelStepIllustration,
    },
    {
      num: '02',
      title: 'Academic Governance & Attendance Rosters',
      desc: 'Faculty lecture scheduling, subject roll call monitoring, and automated 75% attendance shortage tracking for statutory compliance.',
      tags: ['Faculty Rosters', '75% Cutoff', 'Defaulter Reports'],
      Illustration: AcademicsStepIllustration,
    },
    {
      num: '03',
      title: 'Fee Collection & Accounts Ledger',
      desc: 'Issue semester fee demands, record DD & bank payments, track defaulters with automated alerts, and reconcile institutional ledgers.',
      tags: ['Fee Demands', 'Dues Tracking', 'Accounts Ledger'],
      Illustration: FinanceStepIllustration,
    },
    {
      num: '04',
      title: 'Examination Controllership & Results',
      desc: 'Automate student eligibility checks based on fee clearance and attendance cutoffs to issue admit cards and publish marksheets.',
      tags: ['Admit Card Clearance', 'Exam Timetables', 'Marksheets'],
      Illustration: ExamsStepIllustration,
    },
  ];

  // Institutional Pillars (Reliable University Operations)
  const platformPillars = [
    {
      icon: FileCheck2,
      title: 'Paperless Campus Operations',
      desc: 'Eliminate manual paper registers with digital fee receipts, online admit cards, and electronic maintenance work orders.',
      tag: '100% Digital Workflows',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Role-Based Privacy',
      desc: 'Dedicated interfaces tailored to each stakeholder’s responsibilities, keeping sensitive university records fully protected.',
      tag: 'Enterprise RBAC Security',
    },
    {
      icon: Zap,
      title: 'Live Data Synchronization',
      desc: 'Attendance logs, fee clearances, and examination marks sync instantly across student, faculty, and administrative desks.',
      tag: 'Instant Multi-Desk Sync',
    },
    {
      icon: Award,
      title: 'Audit & Accreditation Ready',
      desc: 'Structured historical data records simplifying reporting for NAAC, NIRF, statutory university bodies, and regulatory audits.',
      tag: 'NAAC & NIRF Compliant',
    },
  ];

  const faqs = [
    {
      q: 'How does Campus360 enforce role-based access control (RBAC) across departments?',
      a: 'Every institutional stakeholder—Students, Faculty, Accounts, Wardens, Deans, and System Administrators—is restricted to dedicated functional workspaces. Sensitive student records, finance ledgers, and grading matrices cannot be accessed across unauthorized role boundaries.',
    },
    {
      q: 'How does automated 75% attendance tracking prevent unauthorized exam entry?',
      a: 'Faculty capture lecture attendance per session in real time. The engine dynamically calculates cumulative and subject-wise percentages. If a student is below the mandatory 75% statutory requirement, examination hall tickets are automatically locked until authorized clearance is recorded.',
    },
    {
      q: 'How is university fee collection and ledger reconciliation managed?',
      a: 'The administrative finance desk sets semester dues, concession categories, and late fine slabs. Payments made via online gateways or campus bank counters are instantly reconciled into audit-ready double-entry ledger records with printable tax receipts.',
    },
    {
      q: 'Can the examination controllership module generate marksheets and CGPA?',
      a: 'Yes. Faculty submit continuous internal assessments (CIA) and semester scores directly into the controller database. The system automatically computes grade points, SGPA/CGPA, checks backlog status, and generates verifiable digital transcripts.',
    },
    {
      q: 'How does the platform assist universities with NAAC SSR & NIRF compliance?',
      a: 'Campus360 standardizes all campus data points—such as student-faculty ratio, enrollment demographics, fee clearances, and examination pass rates—allowing administrators to generate structured, audit-ready data exports for NAAC SSR and NIRF accreditation filings.',
    },
    {
      q: 'Can Campus360 integrate with existing biometric turnstiles and smart RFID cards?',
      a: 'Yes. The platform provides secure institutional REST APIs and webhook listeners to sync real-time entries from hostel turnstiles, biometric facial/fingerprint scanners, and campus RFID identification cards seamlessly.',
    },
  ];

  return (
    <div className="-mt-16 space-y-16 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION (Spacebasic Style: Seamless Transparent Sky & Campus Illustration) */}
      <section className="relative bg-gradient-to-b from-[#CCE5FC] via-[#E2F0FD] to-[#F3F8FE] border-b border-slate-200/90 pt-18 sm:pt-20 lg:pt-22 pb-0 overflow-hidden">
        {/* Soft Ambient Sky Clouds (Left & Right) */}
        <div className="absolute top-10 -left-12 w-64 sm:w-80 h-32 bg-white/70 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-12 -right-12 w-72 sm:w-96 h-36 bg-white/70 rounded-full blur-2xl pointer-events-none" />
        
        {/* Crisp Vector Cloud Accents */}
        <svg className="absolute top-12 left-6 sm:left-14 w-28 sm:w-40 h-auto opacity-75 pointer-events-none" viewBox="0 0 120 60" fill="none">
          <path d="M 20 45 Q 10 45 10 35 Q 10 25 22 25 Q 26 12 42 12 Q 56 12 62 22 Q 72 18 82 25 Q 92 25 92 35 Q 92 45 80 45 Z" fill="#FFFFFF" />
        </svg>
        <svg className="absolute top-14 right-6 sm:right-16 w-32 sm:w-44 h-auto opacity-75 pointer-events-none" viewBox="0 0 140 60" fill="none">
          <path d="M 25 45 Q 15 45 15 35 Q 15 25 28 25 Q 34 10 52 10 Q 68 10 76 22 Q 88 16 100 24 Q 112 24 112 35 Q 112 45 98 45 Z" fill="#FFFFFF" />
        </svg>

        {/* Foreground Content: Text Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          {/* Main Headline - Bold, Prominent & Balanced */}
          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.18] max-w-4xl mx-auto">
            All-in-One <span className="text-[#2563EB]">Campus Management System</span>
            <span className="hidden sm:inline"><br /></span> for Colleges &amp; Universities
          </h1>

          {/* Subtitle - Clean & Spread Naturally */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Streamline student attendance, online fee payments, semester examinations, assignments, hostel rooms, and campus administration in one unified ERP platform.
          </p>

          {/* Single Action Button: Access Portals - Prominent Pill */}
          <div className="pt-1.5 sm:pt-2 flex items-center justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm sm:text-base font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>Access Portals</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Integrated Vector Illustration - Balanced for Laptop Screens */}
        <div className="relative z-0 max-w-5xl mx-auto px-4 mt-5 sm:mt-8 lg:mt-10 select-none pointer-events-none">
          <CampusHeroIllustration className="w-full h-auto block" />
        </div>
      </section>

      {/* 2. CAMPUS STAKEHOLDERS ECOSYSTEM (Professional Interactive Persona Suite) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Stakeholder Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Designed for Every Campus Stakeholder
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Role-tailored digital workspaces ensuring students, professors, facility technicians, and university administration access exactly what they need.
          </p>

          {/* Interactive Role Switcher - 100% Box-Free, Clean Underline Tabs */}
          <div className="pt-4 flex items-center justify-center border-b border-slate-200/80 max-w-xl mx-auto overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-4 sm:gap-9 -mb-px px-2">
              {stakeholders.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeStakeholder === idx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStakeholder(idx)}
                    className={`inline-flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer border-b-2 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#2563EB] font-bold border-[#2563EB]'
                        : 'text-slate-500 hover:text-slate-800 border-transparent hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Persona Showcase - 100% Open & Card-Free (Zero-Box Editorial Layout) */}
        {(() => {
          const s = stakeholders[activeStakeholder];
          const Icon = s.icon;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-4">
              {/* Left Column (6 cols): Role Narrative & Key Capabilities */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    <Icon className="h-4 w-4" />
                    <span>{s.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                    {s.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* 3 Capabilities */}
                <div className="space-y-3.5 pt-1">
                  {s.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-blue-50 text-[#2563EB] shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">{feat.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary CTA Button */}
                <div className="pt-2">
                  <Link
                    to={s.portalLink}
                    className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <span>Sign In to {s.portalLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column (6 cols): Bold Impact Metrics - ZERO BOXES */}
              <div className="lg:col-span-6 space-y-8">
                {s.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="border-l-2 border-[#2563EB] pl-6 space-y-1 text-left">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
                        {m.stat}
                      </span>
                      <span className="text-sm font-bold text-[#0F172A]">
                        {m.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Quick Portal Switcher Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <span>Direct Access:</span>
          <Link to="/login" className="font-semibold text-[#2563EB] hover:underline">Student Portal →</Link>
          <span>•</span>
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Faculty Suite →</Link>
          <span>•</span>
          <Link to="/login" className="font-semibold text-amber-600 hover:underline">Staff Desk →</Link>
          <span>•</span>
          <Link to="/login" className="font-semibold text-emerald-600 hover:underline">Admin Console →</Link>
        </div>
      </section>

      {/* 2.5 INSTITUTIONAL IMPACT STATS STRIP (100% Box-Free, Transparent & Professional) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-y border-slate-200/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-200/60 text-center">
          <div className="md:px-6 space-y-1 text-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2563EB] tracking-tight block">
              50,000+
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#0F172A] block">
              Students &amp; Scholars
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 block">
              Enrolled across university branches
            </span>
          </div>

          <div className="md:px-6 space-y-1 text-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2563EB] tracking-tight block">
              1,200+
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#0F172A] block">
              Faculty &amp; Staff Members
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 block">
              Managing daily lecture rosters
            </span>
          </div>

          <div className="md:px-6 space-y-1 text-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2563EB] tracking-tight block">
              ₹100 Cr+
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#0F172A] block">
              Fee Dues Reconciled
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 block">
              Audit-ready accounts ledger records
            </span>
          </div>

          <div className="md:px-6 space-y-1 text-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2563EB] tracking-tight block">
              99.8%
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#0F172A] block">
              Clearance Accuracy
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 block">
              Mandatory 75% cutoff verification
            </span>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL SUBSYSTEMS (Campus Lifecycle Roadmap with Illustration) */}
      <section className="bg-white/90 border-y border-slate-200/60 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Operational Subsystems
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              What Campus360 Manages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              An institutional ERP roadmap linking student enrollment, academic governance, fee collection ledgers, and examination controllership.
            </p>
          </div>

          {/* 4-Stage Connected Horizontal Roadmap with Embedded Illustrations */}
          <div className="relative">
            {/* Desktop Dotted Journey Highway Line */}
            <div className="hidden lg:block absolute top-[162px] left-[10%] right-[10%] border-t-2 border-dashed border-blue-200 pointer-events-none z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {roadmapStages.map((stage, idx) => {
                const StepVisual = stage.Illustration;
                return (
                  <div key={idx} className="flex flex-col text-left space-y-4 group">
                    {/* Embedded Illustration Directly In the Step */}
                    <div className="rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs group-hover:border-blue-300 group-hover:shadow-sm transition-all bg-[#F4F8FA]">
                      <StepVisual className="w-full h-auto block transform group-hover:scale-[1.02] transition-transform duration-300" />
                    </div>

                    {/* Step Number + Title + Content */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] font-black shadow-2xs shrink-0">
                          {stage.num}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                          Stage {stage.num}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                        {stage.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stage.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>View Full Services Breakdown</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INSTITUTIONAL ADVANTAGES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Core Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Built for Reliable University Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Enterprise-grade security, live synchronization, and paperless operational standards designed for higher education institutions.
          </p>
        </div>

        {/* 100% Box-Free Architectural Grid (Unified Brand Color, No Icon Background) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {platformPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="border-t border-slate-200/90 pt-6 space-y-4 text-left flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Standalone Icon in Single Brand Royal Blue, No Background Box */}
                  <Icon className="h-7 w-7 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />

                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider inline-flex items-center gap-1.5">
                    <span>{p.tag}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (100% Box-Free Editorial Split Layout) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200/70">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Sticky Editorial Heading & Direct Contact */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Governance &amp; Operations
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              Clear answers to how Campus360 secures institutional records, enforces statutory cutoffs, and reconciles university operations.
            </p>

            <div className="pt-4 border-t border-slate-200/60 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Have specific deployment or compliance questions?
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group cursor-pointer"
              >
                <span>Contact University IT Solutions</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 100% Box-Free Hairline Accordion */}
          <div className="lg:col-span-7 divide-y divide-slate-200/80">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 group">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer transition-colors"
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                        isOpen ? 'text-[#2563EB]' : 'text-[#0F172A] group-hover:text-[#2563EB]'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span className="pt-0.5 shrink-0">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#2563EB]' : 'text-slate-400 group-hover:text-[#2563EB]'
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pr-6 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#0F172A]">
              Access Your Designated Role Portal
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              Log in with your official university credentials to view your academic dashboard or operational workspace.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
                Choose Your Portal
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full justify-center">
                Contact Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
