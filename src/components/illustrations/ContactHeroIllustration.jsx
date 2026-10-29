export default function ContactHeroIllustration({ className = 'w-full h-full object-cover object-bottom' }) {
  return (
    <svg
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYBottom slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Campus360 Institutional Support, Communications and Contact Desk Illustration"
    >
      <defs>
        {/* Soft Ambient Sky / Studio Gradient */}
        <linearGradient id="cntBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CCE5FC" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#E2F0FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F1F7FE" />
        </linearGradient>

        {/* Brand Royal Blue Gradients */}
        <linearGradient id="cntBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="cntBlueDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        {/* Coral Accent Gradient */}
        <linearGradient id="cntCoral" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        {/* Emerald Support Accent */}
        <linearGradient id="cntEmerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Amber Star Accent */}
        <linearGradient id="cntAmber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Skin Tones */}
        <linearGradient id="skin1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="skin2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id="skinFair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Hair Gradients */}
        <linearGradient id="hairDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="hairBrown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        {/* Desk Surface Gradient */}
        <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        {/* Floor Shadow Gradient */}
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2EDF8" />
          <stop offset="100%" stopColor="#EDF4FC" />
        </linearGradient>

        {/* Soft Drop Shadow Filter for Badges */}
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Ambient Background & Signals */}
      <rect width="1200" height="480" fill="url(#cntBg)" />

      {/* Subtle Concentric Wireless Communication Ripples */}
      <g id="comm-ripples" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.22">
        <circle cx="600" cy="250" r="140" fill="none" />
        <circle cx="600" cy="250" r="230" fill="none" />
        <circle cx="600" cy="250" r="340" fill="none" />
        <circle cx="600" cy="250" r="460" fill="none" />
      </g>

      {/* Soft Ambient Sky Clouds in Top Corners */}
      <g id="ambient-clouds" opacity="0.8">
        <path
          d="M 50 60 Q 30 60 30 45 Q 30 30 50 30 Q 56 14 78 14 Q 98 14 108 26 Q 122 22 136 30 Q 150 30 150 45 Q 150 60 134 60 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M 1040 55 Q 1020 55 1020 40 Q 1020 28 1040 28 Q 1046 12 1068 12 Q 1088 12 1098 24 Q 1112 20 1126 28 Q 1140 28 1140 40 Q 1140 55 1124 55 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </g>

      {/* Sparkles of Active Connection */}
      <g id="sparkles" fill="#2563EB" opacity="0.6">
        <path d="M 330 90 Q 330 98 338 98 Q 330 98 330 106 Q 330 98 322 98 Q 330 98 330 90 Z" />
        <path d="M 870 85 Q 870 93 878 93 Q 870 93 870 101 Q 870 93 862 93 Q 870 93 870 85 Z" />
        <path d="M 470 60 Q 470 66 476 66 Q 470 66 470 72 Q 470 66 464 66 Q 470 66 470 60 Z" />
        <path d="M 730 65 Q 730 71 736 71 Q 730 71 730 77 Q 730 71 724 71 Q 730 71 730 65 Z" />
      </g>

      {/* Floor Base */}
      <rect x="0" y="430" width="1200" height="50" fill="url(#floorGrad)" />
      <line x1="0" y1="430" x2="1200" y2="430" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Floor Depth Shadow under Desks */}
      <ellipse cx="600" cy="434" rx="380" ry="8" fill="#CBD5E1" opacity="0.6" />

      {/* Central Helpdesk Workstation */}

      {/* Desk Structure */}
      <g id="support-desk">
        {/* Main Desk Top Surface */}
        <rect x="360" y="340" width="480" height="14" rx="4" fill="url(#deskTop)" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Desk Front Apron */}
        <rect x="375" y="354" width="450" height="76" rx="2" fill="#EBF3FB" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="375" y1="385" x2="825" y2="385" stroke="#D1E3F5" strokeWidth="1" strokeDasharray="6 4" />

        {/* Modern Tapered Desk Legs */}
        <line x1="390" y1="354" x2="380" y2="430" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <line x1="810" y1="354" x2="820" y2="430" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <line x1="590" y1="354" x2="590" y2="430" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Central Desktop Display (All-In-One Support Terminal) */}
      <g id="desktop-monitor">
        {/* Monitor Base & Neck */}
        <ellipse cx="600" cy="340" rx="22" ry="5" fill="#94A3B8" />
        <rect x="597" y="318" width="6" height="22" rx="1" fill="#64748B" />
        {/* Display Screen Outer Bezel */}
        <rect x="540" y="225" width="120" height="95" rx="6" fill="#0F172A" />
        {/* Display Screen Active Surface */}
        <rect x="544" y="229" width="112" height="83" rx="4" fill="#FFFFFF" />

        {/* Live Chat Window UI on Screen */}
        <rect x="548" y="233" width="104" height="14" rx="2" fill="#2563EB" />
        <circle cx="555" cy="240" r="3" fill="#FFFFFF" />
        <rect x="562" y="238" width="45" height="4" rx="2" fill="#FFFFFF" opacity="0.85" />

        {/* Incoming Student Chat Bubble */}
        <rect x="552" y="253" width="62" height="12" rx="4" fill="#F1F5F9" />
        <rect x="556" y="257" width="48" height="4" rx="1.5" fill="#94A3B8" />

        {/* Outgoing Advisor Response Bubble */}
        <rect x="586" y="271" width="66" height="14" rx="4" fill="#DBEAFE" />
        <rect x="590" y="275" width="52" height="4" rx="1.5" fill="#2563EB" />
        <rect x="590" y="281" width="30" height="3" rx="1" fill="#3B82F6" />

        {/* Resolved Status Checkmark Indicator */}
        <circle cx="645" cy="298" r="5" fill="#10B981" />
        <path d="M 643 298 L 644.5 299.5 L 647.5 296.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Desk Accessories: Indoor Plant, Ceramic Mug, Document Stack */}
      <g id="desk-accessories">
        {/* Modern Ceramic Plant on Left Desk */}
        <path d="M 418 340 L 414 316 L 434 316 L 430 340 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        {/* Green Leaves */}
        <path d="M 424 316 Q 410 295 414 278 Q 426 295 424 316 Z" fill="#22C55E" />
        <path d="M 424 316 Q 424 285 432 272 Q 436 292 424 316 Z" fill="#16A34A" />
        <path d="M 424 316 Q 440 300 444 286 Q 435 304 424 316 Z" fill="#4ADE80" />

        {/* Coffee / Tea Mug on Right Desk */}
        <rect x="765" y="325" width="14" height="15" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 779 328 C 784 328 784 336 779 336" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
        <path d="M 769 320 Q 771 315 769 311" stroke="#94A3B8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M 773 320 Q 775 315 773 311" stroke="#94A3B8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* Helpdesk Characters */}

      {/* CHARACTER A: UNIVERSITY SUPPORT ADVISOR (Right Side with Headset) */}
      <g id="advisor-specialist">
        {/* Body / Torso */}
        <path
          d="M 685 430 L 690 350 C 690 320 740 320 740 350 L 745 430 Z"
          fill="url(#cntBlue)"
        />
        {/* White Collar Shirt & Lanyard */}
        <polygon points="710,328 715,348 705,348" fill="#FFFFFF" />
        <polygon points="720,328 715,348 725,348" fill="#FFFFFF" />
        <line x1="715" y1="348" x2="715" y2="380" stroke="#FFFFFF" strokeWidth="2" />
        {/* Staff ID Card Badge */}
        <rect x="708" y="380" width="14" height="18" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
        <rect x="710" y="383" width="10" height="4" rx="1" fill="#2563EB" />
        <rect x="710" y="389" width="10" height="2" fill="#94A3B8" />

        {/* Left Arm Typing on Keyboard */}
        <path d="M 692 342 L 670 365 L 685 370 L 702 352 Z" fill="url(#cntBlueDark)" />
        <circle cx="667" cy="365" r="6" fill="url(#skin2)" />

        {/* Right Arm: Friendly Welcoming Wave */}
        <path d="M 738 342 L 764 322 L 775 328 L 745 355 Z" fill="url(#cntBlueDark)" />
        <ellipse cx="772" cy="320" rx="7" ry="8" fill="url(#skin2)" />

        {/* Neck */}
        <rect x="710" y="312" width="10" height="18" fill="url(#skin2)" />

        {/* Head */}
        <ellipse cx="715" cy="285" rx="19" ry="22" fill="url(#skin2)" />

        {/* Smiling Facial Details */}
        <ellipse cx="709" cy="283" rx="2" ry="2.5" fill="#0F172A" />
        <ellipse cx="721" cy="283" rx="2" ry="2.5" fill="#0F172A" />
        {/* Warm Smile */}
        <path d="M 710 294 Q 715 300 720 294" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Modern Professional Hair */}
        <path
          d="M 695 280 C 695 258 735 258 735 280 C 735 272 725 264 715 264 C 705 264 695 272 695 280 Z"
          fill="url(#hairDark)"
        />
        <path d="M 694 280 L 696 295 L 701 285 Z" fill="url(#hairDark)" />

        {/* Communications Headset (Key Contact Symbol) */}
        <g id="headset">
          {/* Headband Arc */}
          <path d="M 694 286 C 694 258 736 258 736 286" stroke="#0F172A" strokeWidth="3" fill="none" />
          {/* Left Ear Cushion */}
          <rect x="691" y="280" width="6" height="14" rx="3" fill="#2563EB" />
          {/* Right Ear Cushion */}
          <rect x="733" y="280" width="6" height="14" rx="3" fill="#2563EB" />
          {/* Microphone Boom Arm curving to mouth */}
          <path d="M 693 288 Q 695 302 708 300" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="708" cy="300" r="2.5" fill="#2563EB" />
        </g>
      </g>

      {/* CHARACTER B: INQUIRING SCHOLAR / STUDENT (Left Side) */}
      <g id="inquiring-scholar">
        {/* Body / Torso */}
        <path
          d="M 455 430 L 460 360 C 460 330 510 330 510 360 L 515 430 Z"
          fill="url(#cntCoral)"
        />
        {/* Yellow Mustard Scarf / Collar Accent */}
        <path d="M 480 340 L 490 355 L 475 355 Z" fill="#FDE047" />

        {/* Arm Holding Smartphone */}
        <path d="M 495 355 L 515 375 L 510 385 L 485 365 Z" fill="#BE123C" />
        <circle cx="516" cy="378" r="6" fill="url(#skin1)" />
        {/* Smartphone */}
        <rect x="514" y="365" width="12" height="20" rx="2" fill="#0F172A" transform="rotate(-15 514 365)" />
        <rect x="516" y="368" width="8" height="14" rx="1" fill="#60A5FA" transform="rotate(-15 514 365)" />

        {/* Neck */}
        <rect x="480" y="322" width="10" height="18" fill="url(#skin1)" />

        {/* Head */}
        <ellipse cx="485" cy="298" rx="18" ry="21" fill="url(#skin1)" />

        {/* Glasses & Friendly Facial Details */}
        <circle cx="479" cy="296" r="5" stroke="#1E293B" strokeWidth="1.5" fill="none" />
        <circle cx="491" cy="296" r="5" stroke="#1E293B" strokeWidth="1.5" fill="none" />
        <line x1="484" y1="296" x2="486" y2="296" stroke="#1E293B" strokeWidth="1.5" />
        <ellipse cx="479" cy="296" rx="1.5" ry="2" fill="#0F172A" />
        <ellipse cx="491" cy="296" rx="1.5" ry="2" fill="#0F172A" />
        <path d="M 481 306 Q 485 311 489 306" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Stylish Hair */}
        <path
          d="M 467 292 C 467 270 503 270 503 292 C 503 285 495 276 485 276 C 475 276 467 285 467 292 Z"
          fill="url(#hairBrown)"
        />
        <path d="M 467 292 L 469 308 L 474 298 Z" fill="url(#hairBrown)" />
      </g>

      {/* Floating Contact Badges */}

      {/* BADGE 1: LIVE EMAIL INBOX (Left Flank) */}
      <g id="badge-email" filter="url(#badgeShadow)">
        <circle cx="160" cy="180" r="36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="160" cy="180" r="32" fill="#EFF6FF" />
        {/* Envelope Icon */}
        <rect x="144" y="168" width="32" height="24" rx="4" fill="#2563EB" />
        <path d="M 144 168 L 160 182 L 176 168" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Notification Dot */}
        <circle cx="178" cy="166" r="6" fill="#EF4444" />
        <circle cx="178" cy="166" r="2" fill="#FFFFFF" />
        {/* Curved Motion Trail */}
        <path d="M 160 216 Q 180 240 220 250" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.6" />
      </g>

      {/* BADGE 2: 24/7 SUPPORT HOTLINE (Left Lower) */}
      <g id="badge-phone" filter="url(#badgeShadow)">
        <circle cx="95" cy="290" r="30" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="95" cy="290" r="26" fill="url(#cntEmerald)" />
        {/* Telephone Handset Vector */}
        <path
          d="M 88 281 C 86 283 86 287 90 293 C 94 299 98 301 101 299 L 103 296 C 104 294 104 292 102 291 L 98 289 C 97 288 95 288 95 289 L 93 291 C 91 289 89 287 88 285 L 90 283 C 91 283 91 281 90 280 L 88 276 C 87 274 85 274 83 275 Z"
          fill="#FFFFFF"
        />
        {/* Acoustic Sound Waves */}
        <path d="M 104 280 A 8 8 0 0 1 106 290" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M 108 276 A 14 14 0 0 1 110 294" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
      </g>

      {/* BADGE 3: LIVE CHAT SPEECH BUBBLE (Upper Left) */}
      <g id="badge-chat-bubble" filter="url(#badgeShadow)">
        <rect x="230" y="115" width="80" height="42" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <polygon points="255,157 265,157 250,168" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <rect x="252" y="156" width="15" height="3" fill="#FFFFFF" />
        {/* 3 Animated Message Dots */}
        <circle cx="254" cy="136" r="4.5" fill="#2563EB" />
        <circle cx="270" cy="136" r="4.5" fill="#3B82F6" />
        <circle cx="286" cy="136" r="4.5" fill="#60A5FA" />
      </g>

      {/* BADGE 4: 24/7 HELPDESK EMBLEM (Right Flank) */}
      <g id="badge-24-7" filter="url(#badgeShadow)">
        <circle cx="1040" cy="180" r="36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="1040" cy="180" r="32" fill="url(#cntBlue)" />
        {/* 24/7 Bold Text */}
        <text
          x="1040"
          y="186"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          letterSpacing="0.5"
          fill="#FFFFFF"
        >
          24/7
        </text>
        <circle cx="1040" cy="180" r="26" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.5" />
      </g>

      {/* BADGE 5: RESOLUTION GUARANTEED CHECKMARK (Right Lower) */}
      <g id="badge-guarantee" filter="url(#badgeShadow)">
        <circle cx="1105" cy="290" r="30" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="1105" cy="290" r="26" fill="#ECFDF5" />
        <circle cx="1105" cy="290" r="18" fill="url(#cntEmerald)" />
        {/* Checkmark */}
        <path d="M 1098 290 L 1103 295 L 1112 285" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* BADGE 6: 5-STAR QUALITY SERVICE RATING (Upper Right) */}
      <g id="badge-rating" filter="url(#badgeShadow)">
        <rect x="880" y="115" width="105" height="38" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* 5 Stars */}
        {[0, 1, 2, 3, 4].map((s) => (
          <path
            key={`star-${s}`}
            d={`M ${895 + s * 18} 130 
                L ${897 + s * 18} 135 
                L ${902 + s * 18} 135 
                L ${898 + s * 18} 138 
                L ${900 + s * 18} 143 
                L ${895 + s * 18} 140 
                L ${890 + s * 18} 143 
                L ${892 + s * 18} 138 
                L ${888 + s * 18} 135 
                L ${893 + s * 18} 135 Z`}
            fill="url(#cntAmber)"
          />
        ))}
      </g>

      {/* SWOOPING PAPER AIRPLANE (Symbol of Fast Inquiry Transmission) */}
      <g id="paper-plane" transform="translate(840, 195) rotate(-15)">
        <path d="M -22 -14 L 20 0 L -22 14 L -12 0 Z" fill="#2563EB" />
        <path d="M -22 -14 L 20 0 L -12 0 Z" fill="#3B82F6" />
        {/* Swooping flight loop trail */}
        <path
          d="M -22 0 C -50 -10 -70 20 -100 10 C -120 2 -140 -20 -180 -10"
          stroke="#2563EB"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* FLANK GREENERY POTS */}
      <g id="flank-plants">
        {/* Left Giant Potted Ficus */}
        <rect x="18" y="405" width="28" height="25" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="28" cy="380" r="18" fill="#86EFAC" />
        <circle cx="36" cy="365" r="20" fill="#4ADE80" />
        <circle cx="24" cy="360" r="16" fill="#22C55E" />

        {/* Right Giant Potted Ficus */}
        <rect x="1154" y="405" width="28" height="25" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="1164" cy="380" r="18" fill="#86EFAC" />
        <circle cx="1172" cy="365" r="20" fill="#4ADE80" />
        <circle cx="1160" cy="360" r="16" fill="#22C55E" />
      </g>
    </svg>
  );
}
