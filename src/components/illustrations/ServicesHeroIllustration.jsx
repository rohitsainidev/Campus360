export default function ServicesHeroIllustration({ className = 'w-full h-full object-cover object-bottom' }) {
  return (
    <svg
      viewBox="0 0 1200 425"
      preserveAspectRatio="xMidYBottom slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Campus360 Institutional Capabilities and Connected Systems Illustration"
    >
      <defs>
        {/* Soft Ambient Sky Gradient */}
        <linearGradient id="srvSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CCE5FC" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#E2F0FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F1F7FE" />
        </linearGradient>

        {/* Blueprint Pastel Architecture Gradients */}
        <linearGradient id="srvBldgFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6E9F8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#C0DCF3" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="srvBldgMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DFEEFA" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#CCE3F6" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="srvBldgNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBF4FC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D6EBF9" stopOpacity="0.9" />
        </linearGradient>

        {/* Glass Dome Gradient for Central Hub */}
        <linearGradient id="glassDome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.65" />
        </linearGradient>

        {/* Ground Plaza Gradient */}
        <linearGradient id="srvPlaza" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5F0FA" />
          <stop offset="100%" stopColor="#F1F7FE" />
        </linearGradient>
      </defs>

      {/* Sky & Clouds */}
      <rect width="1200" height="425" fill="url(#srvSky)" />

      {/* Puffy Architectural Clouds */}
      <g id="sky-clouds" opacity="0.85">
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
        <path
          d="M 480 35 Q 465 35 465 24 Q 465 14 480 14 Q 486 4 506 4 Q 524 4 532 14 Q 544 10 556 16 Q 568 16 568 26 Q 568 35 554 35 Z"
          fill="#FFFFFF"
          opacity="0.7"
        />
        <path
          d="M 640 40 Q 625 40 625 30 Q 625 20 640 20 Q 646 10 666 10 Q 684 10 692 20 Q 704 16 716 22 Q 728 22 728 32 Q 728 40 714 40 Z"
          fill="#FFFFFF"
          opacity="0.7"
        />
      </g>

      {/* Subsystem Network Rays */}
      <g id="subsystem-network-arcs" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.3">
        <path d="M 210 130 Q 400 70 600 100" fill="none" />
        <path d="M 600 100 Q 800 70 990 120" fill="none" />
        <path d="M 390 140 Q 600 115 810 130" fill="none" />
      </g>

      {/* Network Node Beacons over Subsystem Towers */}
      <g id="network-nodes">
        <circle cx="210" cy="130" r="5" fill="#2563EB" opacity="0.7" />
        <circle cx="210" cy="130" r="2" fill="#FFFFFF" />
        <circle cx="600" cy="100" r="6" fill="#2563EB" opacity="0.8" />
        <circle cx="600" cy="100" r="2.5" fill="#FFFFFF" />
        <circle cx="990" cy="120" r="5" fill="#2563EB" opacity="0.7" />
        <circle cx="990" cy="120" r="2" fill="#FFFFFF" />
      </g>

      {/* Campus Subsystems Skyline */}

      {/* FAR-LEFT: LEARNING COMMONS & LIBRARY TOWER */}
      <g id="bldg-library-left" opacity="0.85">
        <rect x="25" y="150" width="155" height="270" rx="4" fill="url(#srvBldgFar)" />
        <rect x="18" y="142" width="169" height="9" rx="2" fill="#AAC7E4" />
        {/* Pediment / Clock Tower */}
        <polygon points="102,105 50,142 154,142" fill="url(#srvBldgMid)" />
        <circle cx="102" cy="126" r="10" fill="#FFFFFF" opacity="0.9" />
        <circle cx="102" cy="126" r="8" fill="#E2F0FD" />
        <line x1="102" y1="126" x2="102" y2="120" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="102" y1="126" x2="106" y2="126" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />

        {/* Arched Library Windows */}
        {[0, 1, 2, 3].map((r) => (
          <g key={`lib-r-${r}`}>
            {[0, 1, 2].map((c) => (
              <path
                key={`lib-${r}-${c}`}
                d={`M ${45 + c * 40} ${200 + r * 44} 
                    L ${45 + c * 40} ${178 + r * 44} 
                    Q ${57 + c * 40} ${166 + r * 44} ${69 + c * 40} ${178 + r * 44} 
                    L ${69 + c * 40} ${200 + r * 44} Z`}
                fill="#FFFFFF"
                opacity="0.85"
              />
            ))}
          </g>
        ))}
      </g>

      {/* MID-LEFT: ACADEMIC & CURRICULUM WING */}
      <g id="bldg-academics" opacity="0.8">
        <rect x="200" y="120" width="175" height="300" rx="4" fill="url(#srvBldgMid)" />
        <rect x="194" y="112" width="187" height="9" rx="2" fill="#9BC0E3" />
        {/* Windows Grid */}
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={`acad-r-${r}`}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={`acad-${r}-${c}`}
                x={218 + c * 36}
                y={140 + r * 42}
                width="22"
                height="24"
                rx="2"
                fill="#FFFFFF"
                opacity="0.85"
              />
            ))}
          </g>
        ))}
      </g>

      {/* CENTER: CENTRAL ADMINISTRATIVE ARCHITECTURE (Soft, calm background) */}
      <g id="bldg-center-dome" opacity="0.45">
        <rect x="400" y="150" width="400" height="270" rx="4" fill="url(#srvBldgNear)" />
        <rect x="394" y="142" width="412" height="9" rx="2" fill="#A8CEEF" />

        {/* Classical Grand Dome */}
        <path
          d="M 530 142 C 530 85 670 85 670 142 Z"
          fill="url(#glassDome)"
          opacity="0.85"
        />
        {/* Subtle Lantern Top */}
        <rect x="594" y="80" width="12" height="8" rx="1" fill="#D6EBF9" />

        {/* Center Pillars Colonnade */}
        {[0, 1, 2, 3, 4, 5, 6].map((p) => (
          <rect
            key={`col-${p}`}
            x={440 + p * 48}
            y={220}
            width="14"
            height="195"
            rx="2"
            fill="#FFFFFF"
            opacity="0.75"
          />
        ))}

        {/* Windows Grid on Left & Right Wings of Center Building */}
        {[0, 1, 2].map((r) => (
          <g key={`cw-r-${r}`}>
            {[0, 1].map((c) => (
              <g key={`cw-l-${r}-${c}`}>
                <rect
                  x={430 + c * 40}
                  y={170 + r * 35}
                  width="22"
                  height="22"
                  rx="2"
                  fill="#FFFFFF"
                  opacity="0.75"
                />
              </g>
            ))}
            {[0, 1].map((c) => (
              <g key={`cw-r-${r}-${c}`}>
                <rect
                  x={710 + c * 40}
                  y={170 + r * 35}
                  width="22"
                  height="22"
                  rx="2"
                  fill="#FFFFFF"
                  opacity="0.75"
                />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* MID-RIGHT: SCIENCE & INNOVATION PAVILION */}
      <g id="bldg-innovation" opacity="0.8">
        <rect x="825" y="120" width="175" height="300" rx="4" fill="url(#srvBldgMid)" />
        <rect x="819" y="112" width="187" height="9" rx="2" fill="#9BC0E3" />
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={`innov-r-${r}`}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={`innov-${r}-${c}`}
                x={843 + c * 36}
                y={140 + r * 42}
                width="22"
                height="24"
                rx="2"
                fill="#FFFFFF"
                opacity="0.85"
              />
            ))}
          </g>
        ))}
      </g>

      {/* FAR-RIGHT: HOSTEL & LOGISTICS BLOCK */}
      <g id="bldg-hostel-right" opacity="0.85">
        <rect x="1020" y="150" width="155" height="270" rx="4" fill="url(#srvBldgFar)" />
        <rect x="1013" y="142" width="169" height="9" rx="2" fill="#AAC7E4" />
        <polygon points="1097,105 1045,142 1149,142" fill="url(#srvBldgMid)" />
        {[0, 1, 2, 3].map((r) => (
          <g key={`hr-r-${r}`}>
            {[0, 1, 2].map((c) => (
              <rect
                key={`hr-${r}-${c}`}
                x={1045 + c * 40}
                y={180 + r * 44}
                width="22"
                height="26"
                rx="2"
                fill="#FFFFFF"
                opacity="0.85"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Ground Plaza & Trees */}
      <rect x="0" y="415" width="1200" height="10" fill="url(#srvPlaza)" />
      <line x1="0" y1="415" x2="1200" y2="415" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Courtyard Walkway Stone Patterns */}
      <g id="plaza-lines" stroke="#D1E4F5" strokeWidth="1" opacity="0.6">
        <line x1="200" y1="415" x2="200" y2="425" />
        <line x1="400" y1="415" x2="400" y2="425" />
        <line x1="600" y1="415" x2="600" y2="425" />
        <line x1="800" y1="415" x2="800" y2="425" />
        <line x1="1000" y1="415" x2="1000" y2="425" />
      </g>

      {/* Courtyard Trees & Greenery */}
      <g id="campus-trees">
        <circle cx="185" cy="415" r="16" fill="#86EFAC" />
        <circle cx="205" cy="415" r="22" fill="#4ADE80" />
        <circle cx="225" cy="415" r="15" fill="#22C55E" />

        <circle cx="385" cy="415" r="15" fill="#86EFAC" />
        <circle cx="405" cy="415" r="20" fill="#4ADE80" />
        <circle cx="425" cy="415" r="14" fill="#22C55E" />

        <circle cx="775" cy="415" r="15" fill="#86EFAC" />
        <circle cx="795" cy="415" r="20" fill="#4ADE80" />
        <circle cx="815" cy="415" r="14" fill="#22C55E" />

        <circle cx="975" cy="415" r="16" fill="#86EFAC" />
        <circle cx="995" cy="415" r="22" fill="#4ADE80" />
        <circle cx="1015" cy="415" r="15" fill="#22C55E" />
      </g>
    </svg>
  );
}
