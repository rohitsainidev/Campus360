import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck,
  Building,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import ContactHeroIllustration from '../../components/illustrations/ContactHeroIllustration';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'General Inquiry',
    'Student Enrollment & Records',
    'Portal Credentials & IT',
    'Hostel & Facilities',
    'Finance & Fee Ledger',
  ];

  const faqs = [
    {
      question: 'How do students and faculty receive their portal login credentials?',
      answer:
        'All student and faculty accounts are officially provisioned by the university administration. Institutional IDs and temporary setup passwords are issued directly during semester onboarding by the registrar or dean’s office.',
    },
    {
      question: 'Can students or staff publicly self-register on the platform?',
      answer:
        'No. In compliance with statutory university security and NAAC/NIRF accreditation policies, public self-registration is strictly disabled. Every user account must be provisioned and authorized by an authenticated institutional administrator.',
    },
    {
      question: 'How are urgent facility or hostel maintenance issues dispatched?',
      answer:
        'Authenticated residents dispatch tickets directly from the Maintenance Desk in their portal. For immediate after-hours campus emergencies, contact the 24/7 Facilities control room at +91 11 2345 6790.',
    },
    {
      question: 'What is the protocol for resetting forgotten portal passwords?',
      answer:
        'Use the "Portal Help & Support" link on your role login page to trigger an administrative credential review, or visit your departmental IT coordinator in the Central Administration Block for identity verification.',
    },
  ];

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid institutional or personal email.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 600);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      category: 'General Inquiry',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="-mt-16 space-y-16 sm:space-y-24 pb-20">
      {/* 1. HALF HERO SECTION (Illustration In The Background Behind Text) */}
      <section className="relative bg-gradient-to-b from-[#CCE5FC] via-[#E2F0FD] to-[#F1F7FE] border-b border-slate-200/90 overflow-hidden">
        {/* Background Support Desk Illustration Layer (Sitting directly BEHIND text) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <ContactHeroIllustration className="w-full h-full object-cover object-bottom" />
        </div>

        {/* Soft Ambient Sky Clouds Left & Right */}
        <div className="absolute top-10 -left-12 w-64 sm:w-80 h-32 bg-white/70 rounded-full blur-2xl pointer-events-none z-[1]" />
        <div className="absolute top-12 -right-12 w-72 sm:w-96 h-36 bg-white/70 rounded-full blur-2xl pointer-events-none z-[1]" />

        {/* Foreground Content: Text Overlay (Sitting directly in front of illustration) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Institutional Administration &amp; Support
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.18] max-w-3xl mx-auto">
            Campus Inquiries &amp; Communications Desk
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-normal">
            Connect with university registrars, departmental IT coordinators, and campus facilities desks through unified institutional communication channels.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
                Access Dedicated Portals
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full justify-center">
                Browse All Subsystems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* INNER CONTENT WRAPPER (100% BOX-FREE, OPEN ARCHITECTURAL LAYOUT) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* 2. MAIN SPLIT: CONTACT DESKS & INQUIRY FORM (Zero Card Containers) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-2">
          {/* Left Column: Official Direct Desks (100% Box-Free) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Direct Coordination
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Official University Operational Desks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct communication lines for admitted students, appointed faculty, campus vendors, and statutory university accreditation bodies.
              </p>
            </div>

            {/* 4 Open Architectural Desks with Standalone Royal Blue Icons */}
            <div className="space-y-6">
              {/* Desk 1: Registrar & Academic Records */}
              <div className="border-t border-slate-200/90 pt-5 space-y-2 text-left group">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Registrar &amp; Academic Affairs
                  </h3>
                </div>
                <div className="pl-8 space-y-0.5 text-xs sm:text-sm">
                  <a
                    href="mailto:registrar@campus360.edu"
                    className="font-semibold text-[#2563EB] hover:underline block"
                  >
                    registrar@campus360.edu
                  </a>
                  <p className="text-xs text-slate-500">
                    Semester admissions, credit transfer verifications &amp; degree rosters
                  </p>
                </div>
              </div>

              {/* Desk 2: Campus IT & Portal Access */}
              <div className="border-t border-slate-200/90 pt-5 space-y-2 text-left group">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Campus IT &amp; Authentication Systems
                  </h3>
                </div>
                <div className="pl-8 space-y-0.5 text-xs sm:text-sm">
                  <a
                    href="mailto:it-helpdesk@campus360.edu"
                    className="font-semibold text-[#2563EB] hover:underline block"
                  >
                    it-helpdesk@campus360.edu
                  </a>
                  <p className="text-xs text-slate-500">
                    Role-based portal credential recovery &amp; single sign-on assistance
                  </p>
                </div>
              </div>

              {/* Desk 3: Central Operations & Facilities */}
              <div className="border-t border-slate-200/90 pt-5 space-y-2 text-left group">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Campus Facilities &amp; Security Desk
                  </h3>
                </div>
                <div className="pl-8 space-y-0.5 text-xs sm:text-sm">
                  <p className="font-semibold text-[#0F172A]">
                    +91 (0) 11 2345 6780 / 81
                  </p>
                  <p className="text-xs text-slate-500">
                    24/7 Security &amp; Emergency Dispatch: +91 11 2345 6790
                  </p>
                </div>
              </div>

              {/* Desk 4: Administrative Secretariat Location */}
              <div className="border-t border-slate-200/90 pt-5 space-y-2 text-left group">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#2563EB] group-hover:scale-105 transition-transform shrink-0" strokeWidth={2} />
                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    Administrative Secretariat
                  </h3>
                </div>
                <div className="pl-8 space-y-0.5 text-xs sm:text-sm">
                  <p className="font-medium text-slate-700 leading-relaxed">
                    Main Administrative Block, Sector 4, University Enclave, Central Campus District
                  </p>
                  <p className="text-xs text-slate-500">
                    Pin Code: 110021 • New Delhi, India
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours & Direct Portal Access */}
            <div className="border-t border-slate-200/90 pt-5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-medium">Operating Hours: Mon – Fri, 9:00 AM – 5:00 PM IST</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Enrolled Student or Appointed Faculty?</span>
                <Link
                  to="/login"
                  className="font-bold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Portal Login</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Institutional Inquiry Form (100% Box-Free) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-slate-200/70 pb-4 space-y-1">
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Submit an Official Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Official communications are routed directly to designated departmental coordinators with a 24-business-hour response SLA.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-14 text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-[#2563EB] mx-auto" strokeWidth={1.8} />
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been logged in the university communications desk. Our designated departmental coordinator will review your request and reply to{' '}
                  <span className="font-semibold text-slate-900">{formData.email}</span> within 24 business hours.
                </p>
                <div className="pt-4">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="e.g. Priya"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    placeholder="e.g. Sen"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    error={errors.lastName}
                    required
                  />
                </div>

                {/* Email */}
                <Input
                  label="Official or Personal Email Address"
                  type="email"
                  placeholder="e.g. scholar@university.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                  required
                />

                {/* Inquiry Category Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#0F172A] block">
                    Departmental Scope *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          formData.category === cat
                            ? 'bg-[#2563EB] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <Input
                  label="Inquiry Summary / Subject"
                  placeholder="e.g. Semester 4 course registration credit verification..."
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  error={errors.subject}
                  required
                />

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#0F172A] block">
                    Detailed Inquiry *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Provide specific roll number, department, or administrative context to expedite routing..."
                    className={`w-full rounded-xl border bg-white text-[#0F172A] placeholder:text-slate-400 text-xs sm:text-sm p-3.5 focus:outline-none focus:ring-1 transition-colors ${
                      errors.message
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#2563EB] focus:ring-[#2563EB]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-[#DC2626] font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-[#2563EB] shrink-0" />
                    <span>Protected under university data privacy &amp; RBAC standards.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Inquiry'}</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* 3. FREQUENTLY ASKED INQUIRIES (100% Box-Free 2-Column Split Editorial) */}
        <section className="border-t border-slate-200/90 pt-12 sm:pt-16 space-y-10">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Institutional FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Frequently Clarified Policies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Standard administrative protocols regarding portal account issuance, data governance, and maintenance turnarounds.
            </p>
          </div>

          {/* 100% Box-Free 2-Column Grid with Hairlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-t border-slate-200/90 pt-5 space-y-2.5 text-left"
              >
                <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CALL TO ACTION (100% Box-Free Clean Hairline Section) */}
        <section className="border-t border-slate-200/90 pt-10 sm:pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                Looking for Direct Role-Based Portal Access?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                Log in with your official university credentials to view your assigned academic dashboard or operational console.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
                  Choose Your Portal
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="secondary" size="md" className="w-full justify-center">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
