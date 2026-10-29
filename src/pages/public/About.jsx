import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Wrench,
  Shield,
  Users,
  Layers,
  Award,
} from 'lucide-react';
import Button from '../../components/common/Button';
import AboutHeroIllustration from '../../components/illustrations/AboutHeroIllustration';

export default function About() {
  return (
    <div className="-mt-16 space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION (Illustration Seamlessly In The Background Behind Text) */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between bg-gradient-to-b from-[#CCE5FC] via-[#E2F0FD] to-[#F1F7FE] border-b border-slate-200/90 overflow-hidden">
        {/* Background Campus Illustration Layer (Sitting directly BEHIND the text) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <AboutHeroIllustration className="w-full h-full object-cover object-bottom" />
        </div>

        {/* Soft Ambient Sky Clouds Left & Right */}
        <div className="absolute top-10 -left-12 w-64 sm:w-80 h-32 bg-white/70 rounded-full blur-2xl pointer-events-none z-[1]" />
        <div className="absolute top-12 -right-12 w-72 sm:w-96 h-36 bg-white/70 rounded-full blur-2xl pointer-events-none z-[1]" />

        {/* Foreground Content: Text Overlay (Sitting directly IN FRONT of the illustration) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4 pt-20 sm:pt-24 lg:pt-28 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Our Purpose &amp; Mission
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.18] max-w-3xl mx-auto">
            Empowering Higher Education Through{' '}
            <span className="text-[#2563EB]">Unified Campus Intelligence</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-normal">
            Campus360 was built on a straightforward conviction: higher education institutions shouldn’t have to battle fragmented software, manual paperwork, and disconnected departments to deliver an exceptional campus experience.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
                Explore Enterprise Modules
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full justify-center">
                Speak With Academic IT
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Spacer: Gives the team characters anchored at the bottom edge natural clearance */}
        <div className="relative z-0 h-40 sm:h-52 lg:h-64 pointer-events-none" />
      </section>

      {/* INNER CONTENT WRAPPER (100% BOX-FREE, OPEN ARCHITECTURAL LAYOUT) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* 2. THE STORY & MISSION - 100% Box-Free Two Column Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2">
          {/* Left Column: Sticky Narrative Anchor */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Core Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Purpose-Built For Universities, Not Retrofitted Corporate Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every day across colleges and universities, students register for courses, professors evaluate coursework, maintenance staff resolve infrastructure issues, and administrators navigate institutional compliance.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Historically, each of these workflows lived in isolated software tools or paper registries. Campus360 integrates every stakeholder into a singular, cohesive ecosystem where data moves securely with zero duplication.
            </p>
            <div className="pt-3 border-t border-slate-200/70">
              <span className="text-xs font-semibold text-slate-700 block mb-1">
                Looking for specific module details?
              </span>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
              >
                <span>View All 6 Core Subsystems</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 100% Box-Free Hairline Pillars (Zero Boxes, Zero Cards) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Item 1: Ecosystem Cohesion */}
            <div className="border-t border-slate-200/90 pt-6 space-y-2.5 text-left group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Layers className="h-6 w-6 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Ecosystem Cohesion, Not Software Clutter
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                  Unified Schema
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We design software specifically around the institutional rhythm of universities—from semester registrations and attendance tracking to hostel room clearances and recruitment placements, eliminating fragmented spreadsheets and manual CSV imports.
              </p>
            </div>

            {/* Item 2: Role-Based Governance */}
            <div className="border-t border-slate-200/90 pt-6 space-y-2.5 text-left group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Rigorous Role-Based Governance (RBAC)
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                  Enterprise Security
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Security is foundational. Students, faculty members, facilities personnel, and campus administrators each access an interface strictly tailored to their duties, preserving institutional privacy, ledger confidentiality, and grade security.
              </p>
            </div>

            {/* Item 3: Audit-Ready Operations */}
            <div className="border-t border-slate-200/90 pt-6 space-y-2.5 text-left group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Verified &amp; Audit-Ready Operations
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                  NAAC &amp; NIRF
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every academic grade submission, maintenance dispatch, and fee ledger entry is recorded with verifiable audit history to simplify accreditation and statutory reporting for state universities and apex bodies.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FOUR INSTITUTIONAL STAKEHOLDER PILLARS (100% Box-Free Architectural Grid) */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Stakeholder Centric
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Built for Every Campus Community Member
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tailored interfaces designed specifically around the distinct operational duties of students, faculty, staff, and leadership.
            </p>
          </div>

          {/* 100% Box-Free 4 Columns with Top Hairline Border (NO BOXES, NO CARDS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Pillar 1: Students */}
            <div className="border-t border-slate-200/90 pt-6 space-y-4 text-left flex flex-col justify-between group">
              <div className="space-y-3.5">
                <GraduationCap className="h-7 w-7 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                  For Students &amp; Scholars
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Personalized portal for real-time lecture attendance tracking with 75% cutoff warnings, instant online fee clearance, and exam admit card downloads.
                </p>
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <span>Academic Portal</span>
                </span>
              </div>
            </div>

            {/* Pillar 2: Faculty */}
            <div className="border-t border-slate-200/90 pt-6 space-y-4 text-left flex flex-col justify-between group">
              <div className="space-y-3.5">
                <Users className="h-7 w-7 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                  For Faculty &amp; Educators
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  15-second mobile lecture roll call, digital coursework evaluation, internal assessments marks entry, and automated defaulter shortage alerts.
                </p>
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <span>Teaching Suite</span>
                </span>
              </div>
            </div>

            {/* Pillar 3: Facilities Staff */}
            <div className="border-t border-slate-200/90 pt-6 space-y-4 text-left flex flex-col justify-between group">
              <div className="space-y-3.5">
                <Wrench className="h-7 w-7 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                  For Estate &amp; Facilities
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Central maintenance operations desk for tracking electrical, plumbing, and hostel repairs with strict SLA turnaround and photo sign-offs.
                </p>
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <span>Operations Desk</span>
                </span>
              </div>
            </div>

            {/* Pillar 4: Administration */}
            <div className="border-t border-slate-200/90 pt-6 space-y-4 text-left flex flex-col justify-between group">
              <div className="space-y-3.5">
                <Shield className="h-7 w-7 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                  For Institutional Leaders
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Central administration console for batch student onboarding, multi-tier tuition fee reconciliation, examination clearance, and NAAC SSR reports.
                </p>
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <span>Admin Console</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. INSTITUTIONAL STANDARDS & COMPLIANCE (100% Box-Free Open Strip) */}
        <section className="border-t border-slate-200/90 pt-10 sm:pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-[#2563EB] shrink-0" strokeWidth={2} />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                  Institutional Standards &amp; Regulatory Compliance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rigorous governance frameworks engineered specifically to protect campus records and audit readiness
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
              <span>Audit Certified</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Strict RBAC Security:</strong> Role-based access ensures student, faculty, and administrative credentials never cross authorization boundaries.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>NAAC SSR &amp; NIRF Ready:</strong> Pre-aggregated parameters simplify regulatory audits and statutory institutional ranking submissions.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Semester SGPA/CGPA Engine:</strong> Full support for relative/absolute grading scales, credit weighting, backlog tracks, and transcripts.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Double-Entry Ledger Tracking:</strong> Online payment gateway reconciliations with instantaneous GST-compliant university invoices.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Automated 75% Cutoff Guard:</strong> Real-time shortage calculations lock examination hall tickets until authorized dean condonations.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong>Estate Maintenance SLAs:</strong> Structured facilities ticketing with automated technician dispatch and verified photo sign-offs.</span>
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION (100% Box-Free Clean Hairline Section) */}
        <section className="border-t border-slate-200/90 pt-10 sm:pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                Ready to Experience Campus360?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
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
