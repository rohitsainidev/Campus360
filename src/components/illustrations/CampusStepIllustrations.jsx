export function HostelStepIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Hostel & Admissions Illustration">
      <rect width="260" height="140" rx="12" fill="#F4F8FA" />
      <path d="M 0 100 Q 130 90 260 100 L 260 140 L 0 140 Z" fill="#E2F0E7" />
      <path d="M 0 115 Q 130 105 260 115 L 260 140 L 0 140 Z" fill="#D3E8DC" />
      {/* Hostel Building */}
      <rect x="70" y="32" width="105" height="80" rx="4" fill="#D98A72" />
      <rect x="80" y="24" width="85" height="10" rx="2" fill="#B8664F" />
      {/* Roof Sign */}
      <rect x="90" y="14" width="65" height="12" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <text x="122" y="23" fill="#0F172A" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">HOSTEL BLOCK</text>
      {/* Windows */}
      <rect x="80" y="44" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0.95" />
      <rect x="104" y="44" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0.95" />
      <rect x="128" y="44" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0.95" />
      <rect x="150" y="44" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0.95" />
      <rect x="80" y="70" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0.95" />
      <rect x="150" y="70" width="16" height="18" rx="2" fill="#FFFFFF" opacity="0.95" />
      {/* Entrance Door */}
      <rect x="110" y="82" width="24" height="30" rx="3" fill="#0F172A" />
      {/* Trees */}
      <ellipse cx="42" cy="95" rx="18" ry="26" fill="#43B064" />
      <ellipse cx="45" cy="88" rx="14" ry="20" fill="#5CAC32" />
      <ellipse cx="205" cy="98" rx="16" ry="22" fill="#43B064" />
      {/* Arriving Student with Suitcase */}
      <g transform="translate(180, 80)">
        <circle cx="8" cy="5" r="4.5" fill="#E0A98B" />
        <rect x="4" y="11" width="8" height="14" rx="2" fill="#2563EB" />
        <line x1="6" y1="25" x2="4" y2="38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="25" x2="12" y2="38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="17" y="22" width="10" height="14" rx="2" fill="#E11D48" />
        <line x1="17" y1="17" x2="17" y2="22" stroke="#475569" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function AcademicsStepIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Academics & Attendance Illustration">
      <rect width="260" height="140" rx="12" fill="#F4F8FA" />
      <path d="M 0 100 Q 130 90 260 100 L 260 140 L 0 140 Z" fill="#E2F0E7" />
      {/* Lecture Hall Building */}
      <rect x="65" y="38" width="120" height="74" rx="4" fill="#D98A72" />
      {/* Clock Tower */}
      <rect x="105" y="14" width="40" height="26" rx="2" fill="#C4735C" />
      <polygon points="105,14 125,0 145,14" fill="#B8664F" />
      <circle cx="125" cy="24" r="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2" />
      <line x1="125" y1="24" x2="125" y2="20" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="125" y1="24" x2="128" y2="24" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Windows */}
      <rect x="75" y="48" width="20" height="24" rx="2" fill="#FFFFFF" opacity="0.95" />
      <rect x="155" y="48" width="20" height="24" rx="2" fill="#FFFFFF" opacity="0.95" />
      {/* Arched Entrance */}
      <path d="M 112 112 L 112 82 Q 125 74 138 82 L 138 112 Z" fill="#0F172A" />
      {/* 75% Cutoff Tag Badge */}
      <rect x="14" y="24" width="66" height="22" rx="11" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="26" cy="35" r="4" fill="#10B981" />
      <text x="50" y="39" fill="#065F46" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">75% SAFE</text>
      {/* Student with Backpack */}
      <g transform="translate(195, 76)">
        <circle cx="7" cy="5" r="4.5" fill="#D49B7B" />
        <rect x="3" y="11" width="8" height="13" rx="2" fill="#10B981" />
        <rect x="10" y="12" width="5" height="10" rx="2" fill="#334155" />
        <line x1="5" y1="24" x2="3" y2="38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9" y1="24" x2="11" y2="38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function FinanceStepIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Fee Collection & Accounts Ledger Illustration">
      <rect width="260" height="140" rx="12" fill="#F4F8FA" />
      <path d="M 0 100 Q 130 90 260 100 L 260 140 L 0 140 Z" fill="#E2F0E7" />
      {/* University Accounts & Administration Building */}
      <rect x="55" y="42" width="115" height="70" rx="4" fill="#EDE5DA" />
      <polygon points="50,42 112.5,18 175,42" fill="#DDD2C4" />
      {/* Classical Portico Columns */}
      <rect x="65" y="50" width="9" height="54" rx="1" fill="#FFFFFF" />
      <rect x="89" y="50" width="9" height="54" rx="1" fill="#FFFFFF" />
      <rect x="122" y="50" width="9" height="54" rx="1" fill="#FFFFFF" />
      <rect x="146" y="50" width="9" height="54" rx="1" fill="#FFFFFF" />
      <rect x="50" y="106" width="125" height="8" rx="1" fill="#CBD5E1" />
      {/* Institutional Accounts Seal */}
      <circle cx="112.5" cy="34" r="8" fill="#2563EB" />
      <text x="112.5" y="39" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">₹</text>

      {/* Floating Accounts Ledger & Collection Slip */}
      <g transform="translate(176, 20)">
        <rect width="74" height="60" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
        {/* Ledger Header */}
        <rect x="6" y="8" width="40" height="5" rx="2" fill="#2563EB" />
        <rect x="6" y="18" width="50" height="4" rx="2" fill="#94A3B8" />
        <rect x="6" y="26" width="34" height="4" rx="2" fill="#94A3B8" />
        <rect x="6" y="34" width="44" height="4" rx="2" fill="#CBD5E1" />
        {/* Verified Ledger Stamp */}
        <rect x="6" y="42" width="62" height="13" rx="3" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="0.5" />
        <text x="37" y="51" fill="#15803D" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LEDGER RECONCILED ✔</text>
      </g>
    </svg>
  );
}

export function ExamsStepIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Exams & Results Illustration">
      <rect width="260" height="140" rx="12" fill="#F4F8FA" />
      <path d="M 0 100 Q 130 90 260 100 L 260 140 L 0 140 Z" fill="#E2F0E7" />
      {/* Convocation & Exam Auditorium Hall */}
      <rect x="65" y="42" width="115" height="70" rx="4" fill="#D98A72" />
      {/* Dome */}
      <path d="M 90 42 C 90 14 155 14 155 42 Z" fill="#B8664F" />
      <circle cx="122.5" cy="12" r="3.5" fill="#E2E8F0" />
      {/* Arched Windows */}
      <rect x="78" y="54" width="16" height="34" rx="8" fill="#FFFFFF" opacity="0.95" />
      <rect x="114" y="54" width="16" height="34" rx="8" fill="#FFFFFF" opacity="0.95" />
      <rect x="150" y="54" width="16" height="34" rx="8" fill="#FFFFFF" opacity="0.95" />
      <rect x="75" y="104" width="95" height="8" rx="2" fill="#0F172A" />
      {/* Graduation Cap */}
      <path d="M 122.5 20 L 111 26 L 122.5 32 L 134 26 Z" fill="#2563EB" />
      <line x1="134" y1="26" x2="134" y2="34" stroke="#2563EB" strokeWidth="1.5" />
      {/* Floating Admit Card Pass */}
      <g transform="translate(182, 34)">
        <rect width="64" height="46" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="6" y="8" width="30" height="5" rx="2" fill="#2563EB" />
        <rect x="6" y="16" width="44" height="4" rx="2" fill="#64748B" />
        {/* Barcode lines */}
        <line x1="6" y1="28" x2="6" y2="38" stroke="#0F172A" strokeWidth="1.5" />
        <line x1="9" y1="28" x2="9" y2="38" stroke="#0F172A" strokeWidth="1" />
        <line x1="12" y1="28" x2="12" y2="38" stroke="#0F172A" strokeWidth="2" />
        <line x1="16" y1="28" x2="16" y2="38" stroke="#0F172A" strokeWidth="1" />
        <line x1="19" y1="28" x2="19" y2="38" stroke="#0F172A" strokeWidth="1.5" />
        <rect x="25" y="28" width="34" height="11" rx="2" fill="#DCFCE7" />
        <text x="42" y="36" fill="#15803D" fontSize="6.5" fontWeight="bold" textAnchor="middle">ADMIT CARD</text>
      </g>
    </svg>
  );
}

