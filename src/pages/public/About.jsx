import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Wrench,
  Shield,
  Users,
} from 'lucide-react';
import Button from '../../components/common/Button';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Editorial Hero Section */}
      <section className="space-y-6 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
          Modernizing Higher Education Through One Unified Platform.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Campus360 was built on a straightforward conviction: higher education institutions shouldn’t have to battle fragmented software, manual paperwork, and disconnected departments to deliver an exceptional campus experience.
        </p>
      </section>

      {/* The Story & Mission - Two Column Editorial */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4 border-t border-slate-200/90">
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Our Purpose & Vision
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every day across colleges and universities, students register for courses, professors evaluate coursework, maintenance staff resolve infrastructure issues, and administrators navigate institutional compliance.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Historically, each of these workflows lived in isolated software tools or paper registries. Campus360 integrates every stakeholder into a singular, cohesive ecosystem where data moves seamlessly and securely.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="border-l-2 border-[#FA5A2A] pl-5 space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              Ecosystem Cohesion, Not Software Clutter
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We design software specifically around the institutional rhythm of universities—from semester registrations and attendance tracking to hostel room clearances and recruitment placements.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 pl-5 space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              Rigorous Role-Based Governance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Security is foundational. Students, faculty members, facilities personnel, and campus administrators each access an interface strictly tailored to their duties, preserving institutional privacy and accountability.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 pl-5 space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              Deterministic & Audit-Ready Operations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every academic grade submission, maintenance request dispatch, and administrative adjustment is recorded with verifiable audit history to simplify accreditation and institutional reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Four Institutional Focus Areas */}
      <section className="space-y-8 pt-8 border-t border-slate-200/90">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            How Campus360 Serves the Institution
          </h2>
          <p className="text-sm text-slate-600">
            Purpose-built interfaces designed for the unique responsibilities of each campus community member.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Students */}
          <div className="space-y-3.5 pb-6 border-b sm:border-b-0 sm:border-r border-slate-200/90 sm:pr-8">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-600 text-white shadow-2xs">
              <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">For Students</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Provides students with a centralized portal for monitoring academic progress, checking verified attendance, submitting coursework, managing hostel accommodation, and applying for placement drives.
            </p>
          </div>

          {/* Faculty */}
          <div className="space-y-3.5 pb-6 border-b sm:border-b-0 border-slate-200/90 sm:pl-4">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-indigo-600 text-white shadow-2xs">
              <Users className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">For Faculty</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Eliminates administrative burden for educators with fast daily lecture attendance recording, continuous internal assessment scoring, and transparent student performance advisement.
            </p>
          </div>

          {/* Maintenance Staff */}
          <div className="space-y-3.5 pt-2 sm:border-r border-slate-200/90 sm:pr-8">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-[#FA5A2A] text-white shadow-2xs">
              <Wrench className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">For Facilities & Maintenance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Organizes campus operations into structured workorders with priority dispatching, physical asset inventory linkage, and SLA turnaround tracking.
            </p>
          </div>

          {/* Administrators */}
          <div className="space-y-3.5 pt-2 sm:pl-4">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-blue-600 text-white shadow-2xs">
              <Shield className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">For Administration & Governance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Grants campus leadership total visibility with central user directory provisioning, departmental curriculum configurations, grievance escalation desks, and institutional reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Standards & Compliance - Clean Open Layout */}
      <section className="pt-8 border-t border-slate-200/90 space-y-6">
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-600 text-white shadow-2xs shrink-0">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Security & Regulatory Compliance
            </h3>
            <p className="text-xs text-slate-500">
              Institutional governance frameworks that protect campus data integrity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Strict Role-Based Access Control (RBAC) ensuring credentials never cross authorization domains.</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Compliant with standard semester grading systems (SGPA/CGPA) and credit requirements.</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Structured maintenance ticketing with SLA accountability and complete service resolution logs.</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>End-to-end audit trails on grievance redressals, grade updates, and departmental allocations.</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4 pt-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          Ready to experience Campus360?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Access your institutional role portal to view your academic dashboard or operational workspace.
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
