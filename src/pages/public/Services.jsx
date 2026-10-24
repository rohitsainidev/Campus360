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
  Bell,
  ArrowRight,
} from 'lucide-react';
import Button from '../../components/common/Button';

export default function Services() {
  const serviceCategories = [
    {
      category: 'Academic Operations & Curriculum',
      subtitle: 'End-to-end course management, lecture attendance engines, and continuous credit evaluations.',
      items: [
        {
          name: 'Course Enrollment & Credits',
          desc: 'Automated subject allotment conforming to departmental credit schemes and prerequisite validations.',
          icon: BookOpen,
          solidBg: 'bg-indigo-600',
          features: ['Credit-based enrollment', 'Prerequisite verification', 'Automated course rosters'],
        },
        {
          name: 'Real-Time Attendance Engine',
          desc: 'Lecture-by-lecture attendance logging with automated condonation calculations and threshold alerts.',
          icon: Users,
          solidBg: 'bg-blue-600',
          features: ['Daily session logging', 'Threshold notifications', 'Medical leave adjustments'],
        },
        {
          name: 'Continuous Gradebook & SGPA',
          desc: 'Internal continuous assessment scoring, midterm grading, and standardized GPA/CGPA compilation.',
          icon: FileSpreadsheet,
          solidBg: 'bg-emerald-600',
          features: ['Internal marks entry', 'SGPA / CGPA computation', 'Official transcript generation'],
        },
      ],
    },
    {
      category: 'Campus Facilities & Logistics',
      subtitle: 'Residential logistics, digital library catalogues, and rapid maintenance ticketing.',
      items: [
        {
          name: 'Hostel Housing & Logistics',
          desc: 'Digital room allocation, fee verification, resident inventory check-ins, and leave permit requests.',
          icon: Building,
          solidBg: 'bg-violet-600',
          features: ['Room allotment records', 'Mess dining allocations', 'Digital gate pass approvals'],
        },
        {
          name: 'Integrated Library Automation',
          desc: 'Digital catalogue search, borrowing limit tracking, reservation hold queues, and due date alerts.',
          icon: Library,
          solidBg: 'bg-indigo-600',
          features: ['Catalogue search & holds', 'Automated due date alerts', 'Digital resource repository'],
        },
        {
          name: 'Maintenance Ticket Desk',
          desc: 'Campus-wide facility fault reporting, automatic trade allocation, and SLA turnaround monitoring.',
          icon: Wrench,
          solidBg: 'bg-[#FA5A2A]',
          features: ['Priority ticket routing', 'Technician task dispatch', 'Resolution turnaround logs'],
        },
      ],
    },
    {
      category: 'Career & Institutional Governance',
      subtitle: 'Corporate recruitment drives, transparent grievance redressal, and official administrative notices.',
      items: [
        {
          name: 'Corporate Recruitment & Placements',
          desc: 'Verified student resume profiles, campus recruitment drives, interview scheduling, and offer archives.',
          icon: Briefcase,
          solidBg: 'bg-emerald-600',
          features: ['Drive eligibility filters', 'Interview slot allocation', 'Offer letter repository'],
        },
        {
          name: 'Grievance Redressal Desk',
          desc: 'Confidential dispute submissions with structured departmental committee review and escalation matrices.',
          icon: ShieldCheck,
          solidBg: 'bg-blue-600',
          features: ['Confidential submission', 'Departmental escalation', 'Resolution audit trails'],
        },
        {
          name: 'Institutional Circulars & Notices',
          desc: 'Official verified administrative announcements, exam schedules, and circular distribution.',
          icon: Bell,
          solidBg: 'bg-[#FA5A2A]',
          features: ['Targeted role broadcasts', 'Examination schedules', 'Official circular archive'],
        },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Editorial Hero Header */}
      <section className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
          Institutional Capabilities & Services
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Comprehensive, modular subsystems engineered to power academic operations, student life, campus facilities, and institutional administration.
        </p>
      </section>

      {/* Service Categories - Open Editorial Layout without Heavy Boxes */}
      <div className="space-y-16 pt-6 border-t border-slate-200/90">
        {serviceCategories.map((section, sIdx) => (
          <section key={sIdx} className="space-y-8">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                {section.category}
              </h2>
              <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                {section.subtitle}
              </p>
            </div>

            {/* Open 3-Column Features (Zero Box Clutter) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start">
              {section.items.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div key={idx} className="space-y-3.5">
                    {/* Solid Colored Icon Badge */}
                    <div
                      className={`flex items-center justify-center h-11 w-11 rounded-xl ${svc.solidBg} text-white shadow-2xs shrink-0`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A]">
                      {svc.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.desc}
                    </p>

                    {/* Subtle micro capability list */}
                    <ul className="space-y-1.5 pt-1">
                      {svc.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FA5A2A] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Gateway Call to Action (Open, Clean & Minimalist) */}
      <section className="text-center space-y-4 pt-12 border-t border-slate-200/90 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-[#0F172A]">
          Access Your Assigned Institutional Desk
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Log in with your official university credentials to interact with your role’s permitted services and workflows.
        </p>
        <div className="pt-2">
          <Link to="/login">
            <Button size="lg" icon={ArrowRight} iconPosition="right">
              Choose Your Portal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
