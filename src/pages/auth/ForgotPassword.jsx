import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Info, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoResponse, setDemoResponse] = useState(null);

  const validate = () => {
    if (!email.trim()) {
      return 'Institutional email address is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDemoResponse(null);

    const err = validate();
    setError(err);

    if (!err) {
      setIsLoading(true);

      // Simulate submission with clear honest notice
      setTimeout(() => {
        setIsLoading(false);
        setDemoResponse({
          type: 'info',
          title: 'Recovery Request Logged',
          message:
            'Email format validated successfully. Automated password recovery and reset link generation will become active once email services are connected in the backend phase.',
        });
      }, 600);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs max-w-md mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
          Forgot your password?
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          Enter your registered institutional email address to request a secure password reset.
        </p>
      </div>

      {/* Demo Notice Banner after submission */}
      {demoResponse && (
        <div className="p-4 rounded-md bg-blue-50 border border-blue-200 text-xs text-[#2563EB] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <Info className="h-4 w-4 shrink-0" />
            <span>{demoResponse.title}</span>
          </div>
          <p className="text-[#475569] leading-relaxed">
            {demoResponse.message}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Institutional Email"
          name="email"
          type="email"
          placeholder="name@campus360.edu"
          icon={Mail}
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          error={error}
        />

        <div className="pt-2">
          <Button
            type="submit"
            size="md"
            className="w-full"
            isLoading={isLoading}
          >
            Send Reset Instructions
          </Button>
        </div>
      </form>

      {/* Back to Login Link */}
      <div className="pt-4 border-t border-[#E2E8F0] text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
}
