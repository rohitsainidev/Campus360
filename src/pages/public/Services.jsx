import { Link } from 'react-router-dom';
import {
  BookOpen,
  Building,
  Briefcase,
  Wrench,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Library,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import ServicesHeroIllustration from '../../components/illustrations/ServicesHeroIllustration';

export default function Services() {
  const serviceCategories = [
    {
      category: 'Academic Operations & Curriculum',
      subtitle: 'End-to-end course management, lecture attendance engines, and continuous credit evaluations.',
      items: [
        {
          name: 'Course Enrollment & Credits',
          desc: 'Automated subject allotment conforming to departmental credit schemes, semester rules, and prerequisite validations.',
          icon: BookOpen,
          tag: 'Curriculum Engine',
          features: ['Credit-based batch enrollment', 'Prerequisite verification', 'Automated course rosters'],
        },
        {
          name: 'Real-Time Attendance Engine',
          desc: 'Lecture-by-lecture attendance logging with automated 75% shortage calculations and automated threshold alerts.',
          icon: Users,
          tag: 'Roll Call System',
          features: ['Daily 15-second session roll call', 'Defaulter alert notifications', 'Medical leave condonation logs'],
        },
        {
          name: 'Examinations, Gradebook & SGPA',
          desc: 'Clearance-verified admit card generation, continuous internal marks entry, and standardized GPA/CGPA compilation.',
          icon: FileSpreadsheet,
          tag: 'Controllership Desk',
          features: ['Admit card clearance verification', 'Internal & semester marks entry', 'Official marksheet compilation'],
        },
      ],
    },
    {
      category: 'Campus Facilities & Residential Logistics',
      subtitle: 'Hostel room allocations, automated library catalogues, and rapid maintenance ticketing.',
      items: [
        {
          name: 'Hostel Housing & Logistics',
          desc: 'Digital room allocation, fee clearance verification, resident inventory check-ins, and leave gate pass approvals.',
          icon: Building,
          tag: 'Residential Life',
          features: ['Room allotment records', 'Mess dining allocations', 'Digital gate pass approvals'],
        },
        {
          name: 'Integrated Library Automation',
          desc: 'Digital catalogue search, borrowing limit tracking, reservation hold queues, and automated due date alerts.',
          icon: Library,
          tag: 'Learning Commons',
          features: ['Catalogue search & hold queues', 'Automated due date alerts', 'Digital reference archives'],
        },
        {
          name: 'Maintenance Ticket Desk',
          desc: 'Campus-wide facility fault reporting, automatic trade allocation, photo verification, and strict SLA turnaround.',
          icon: Wrench,
          tag: 'Facilities Desk',
          features: ['Priority trade ticket routing', 'Technician task dispatch', 'Verified resolution photo sign-offs'],
        },
      ],
    },
    {
      category: 'Finance, Career & Institutional Governance',
      subtitle: 'Digital fee collections, corporate recruitment drives, and verified statutory compliance.',
      items: [
        {
          name: 'Fee Payments & Accounts Ledger',
          desc: 'Online fee payment gateway for tuition and hostel dues, with installment tracking and downloadable GST receipts.',
          icon: CreditCard,
          tag: 'Accounts Ledger',
          features: ['Integrated gateway reconciliation', 'Instant GST-compliant PDF receipts', 'Automated defaulters ledger'],
        },
        {
          name: 'Corporate Recruitment & Placements',
          desc: 'Verified student resume profiles, campus recruitment drives, interview scheduling, and offer letter archives.',
          icon: Briefcase,
          tag: 'Placement Cell',
          features: ['Drive eligibility filters', 'Interview slot allocation', 'Offer letter repository'],
        },
        {
          name: 'Grievance Redressal & Notices',
          desc: 'Confidential dispute submissions with SLA escalation, along with verified circular distribution across departments.',
          icon: ShieldCheck,
          tag: 'Compliance & Audit',
          features: ['Confidential submission channels', 'Resolution audit trails', 'Role-targeted circulars'],
        },
      ],
    },
  ];

  return (
    <div className="-mt-16 space-y-16 sm:space-y-24 pb-20">
      {/* 1. HALF HERO SECTION (Illustration In The Background Behind Text) */}
      <section className="relative bg-gradient-to-b from-[#CCE5FC] via-[#E2F0FD] to-[#F1F7FE] border-b border-slate-200/90 overflow-hidden">
        {/* Background Connected Subsystems Illustration Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <ServicesHeroIllustration className="w-full h-full object-cover object-bottom" />
        </div>

        {/* Soft Ambient Sky Clouds Left & Right */}
        <div className="absolute top-10 -left-12 w-64 sm:w-80 h-32 bg-white/70 rounded-full blur-2xl pointer-events-none z-[1]" />
        <div className="absolute top-12 -right-12 w-72 sm:w-96 h-36 bg-white/70 rounded-full blur-2xl pointer-events-none z-[1]" />

        {/* Foreground Content: Text Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Enterprise Subsystems
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.18] max-w-3xl mx-auto">
            Institutional Capabilities &amp; Services
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-normal">
            Comprehensive, modular subsystems engineered to power academic operations, student life, campus facilities, and institutional administration.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
                Access Dedicated Portals
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full justify-center">
                Consult Solutions Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER (100% BOX-FREE, OPEN ARCHITECTURAL LAYOUT) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {serviceCategories.map((section, sIdx) => (
          <section key={sIdx} className="space-y-8">
            {/* Category Header */}
            <div className="space-y-1.5 border-b border-slate-200/70 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Subsystem Category 0{sIdx + 1}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {section.category}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {section.subtitle}
              </p>
            </div>

            {/* 100% Box-Free 3-Column Architectural Grid (No Card Boxes, No Icon Bubbles) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start">
              {section.items.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div key={idx} className="border-t border-slate-200/90 pt-6 space-y-4 text-left flex flex-col justify-between group">
                    <div className="space-y-3.5">
                      {/* Standalone Brand Icon in Royal Blue (Zero background bubble) */}
                      <Icon className="h-7 w-7 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />

                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                          {svc.name}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                          {svc.desc}
                        </p>
                      </div>

                      {/* Clean Bullet Points with Unified Royal Blue Checkmarks (No Orange Dots) */}
                      <ul className="space-y-2 pt-2 border-t border-slate-100">
                        {svc.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                        {svc.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Bottom Gateway Call to Action (100% Box-Free Open Divider) */}
        <section className="border-t border-slate-200/90 pt-12 sm:pt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                Access Your Assigned Institutional Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                Log in with your official university credentials to interact with your role’s permitted services and workflows.
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
                  Contact Solutions Desk
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
