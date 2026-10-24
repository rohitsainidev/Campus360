import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Building2,
  Shield,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const categories = [
    'General Inquiry',
    'Admissions & Enrollment',
    'IT & Portal Access',
    'Hostel & Facilities',
    'Placements',
  ];

  const faqs = [
    {
      question: 'How do students and faculty receive their portal login credentials?',
      answer:
        'All student and faculty accounts are officially provisioned by the university administration. Institutional IDs and temporary setup passwords are issued directly during semester onboarding by the registrar or dean’s office.',
    },
    {
      question: 'Can students or staff self-register on the platform?',
      answer:
        'No. In compliance with institutional security and accreditation policies, public self-registration is disabled. All user accounts must be provisioned and authorized by an authenticated administrator.',
    },
    {
      question: 'How can urgent facility or hostel maintenance issues be reported?',
      answer:
        'Authenticated users can dispatch a ticket directly from the Maintenance Desk in their portal. For after-hours campus emergencies, contact the Facilities control room at +91 11 2345 6790.',
    },
    {
      question: 'How do I reset my password if I forget it?',
      answer:
        'Use the "Forgot Password" link on your role login page to receive instructions, or contact your departmental IT coordinator for administrative credential verification.',
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
      errs.email = 'Please provide a valid email address.';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Unified Executive Contact Hero Unit */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Professional Institutional Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/90 border-r border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FA5A2A]">
                Contact & Administration
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                Let’s Connect With Your Campus Team
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Have questions regarding academic enrollment, institutional desks, or technical systems? Reach out to our campus coordinators.
              </p>
            </div>

            {/* Direct Contact Points with Solid Colored Badges */}
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#FA5A2A] text-white shadow-2xs shrink-0">
                  <Mail className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Official Email</p>
                  <a href="mailto:contact@campus360.edu" className="font-semibold text-[#FA5A2A] hover:text-[#E5481B] transition-colors">
                    contact@campus360.edu
                  </a>
                  <p className="text-[11px] text-slate-500">support@campus360.edu</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-600 text-white shadow-2xs shrink-0">
                  <Phone className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Campus Telephone</p>
                  <p className="font-semibold text-[#0F172A]">+91 (0) 11 2345 6780 / 81</p>
                  <p className="text-[11px] text-slate-500">Security Hotline: +91 11 2345 6790</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white shadow-2xs shrink-0">
                  <MapPin className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Main Campus Location</p>
                  <p className="font-medium text-[#0F172A] leading-relaxed">
                    Administrative Block, Sector 4, University Enclave, Central Campus District
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Live Office Hours Pill & Portal Access */}
          <div className="space-y-3.5 pt-4 border-t border-slate-200/80">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Office Hours: Mon – Fri, 9:00 AM – 5:00 PM IST</span>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Enrolled Student or Faculty?</span>
              <Link
                to="/login"
                className="font-bold text-[#FA5A2A] hover:text-[#E5481B] inline-flex items-center gap-1"
              >
                <span>Portal Login</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Clean Form Panel (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-white flex flex-col justify-center">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="h-14 w-14 text-emerald-600 mx-auto" strokeWidth={1.8} />
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Message Sent Successfully
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We have logged your inquiry and our designated departmental coordinator will respond within 24 business hours.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Send Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">
                  Send Us an Inquiry
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  We typically respond within one business day.
                </p>
              </div>

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
                />
                <Input
                  label="Last Name"
                  placeholder="e.g. Sen"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  error={errors.lastName}
                />
              </div>

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
              />

              {/* Inquiry Category Pills */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Topic of Inquiry
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        formData.category === cat
                          ? 'bg-[#FA5A2A] text-white shadow-2xs'
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
                label="Subject"
                placeholder="Brief summary of your inquiry..."
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                error={errors.subject}
              />

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Please describe your question or requirement..."
                  className={`w-full rounded-xl border bg-white text-[#0F172A] placeholder:text-slate-400 text-xs p-3.5 focus:outline-none focus:ring-1 transition-colors ${
                    errors.message
                      ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
                      : 'border-slate-200 hover:border-slate-300 focus:border-[#FA5A2A] focus:ring-[#FA5A2A]'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-[#DC2626] font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Protected under university privacy standards.
                </span>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  icon={Send}
                  iconPosition="right"
                  className="bg-[#FA5A2A] hover:bg-[#E5481B] text-white border-transparent"
                >
                  Send Inquiry
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions Section (Open & Clean) */}
      <section className="space-y-8 pt-4">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FA5A2A]">
            <HelpCircle className="h-4 w-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Quick answers regarding portal credentials, account policies, and campus maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5"
            >
              <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Minimalist Portal Call to Action */}
      <section className="text-center space-y-4 pt-10 border-t border-slate-200/90 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-[#0F172A]">
          Looking for Direct Portal Access?
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Log in with your official university credentials to view your academic dashboard or operational workspace.
        </p>
        <div className="pt-2">
          <Link to="/login">
            <Button
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-[#FA5A2A] hover:bg-[#E5481B] text-white border-transparent"
            >
              Choose Your Portal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
