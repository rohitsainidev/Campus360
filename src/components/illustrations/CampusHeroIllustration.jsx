export default function CampusHeroIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg
      viewBox="0 65 1200 325"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Campus360 Digital Campus Illustration"
    >
      <defs>
        {/* Terracotta / Peach Building Facade Gradients (Spacebasic Warm Campus Palette) */}
        <linearGradient id="terracottaDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C97860" />
          <stop offset="100%" stopColor="#B8664F" />
        </linearGradient>

        <linearGradient id="terracottaMain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D98A72" />
          <stop offset="100%" stopColor="#C6765F" />
        </linearGradient>

        <linearGradient id="terracottaLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E39D87" />
          <stop offset="100%" stopColor="#D28670" />
        </linearGradient>

        <linearGradient id="terracottaBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAB1A0" />
          <stop offset="100%" stopColor="#DC9A86" />
        </linearGradient>

        {/* Cafeteria Awning Red Gradient */}
        <linearGradient id="awningRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC4D41" />
          <stop offset="100%" stopColor="#C33B30" />
        </linearGradient>

        {/* Subtle Window Glow */}
        <linearGradient id="windowGleam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.85" />
        </linearGradient>

        {/* Lawn & Walkway Gradients */}
        <linearGradient id="lawnGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#43B064" />
          <stop offset="100%" stopColor="#379A55" />
        </linearGradient>

        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE5DA" />
          <stop offset="100%" stopColor="#DFD4C5" />
        </linearGradient>
      </defs>

      {/* Horizon & Distant Trees */}
      <g id="distant-greenery" opacity="0.85">
        <ellipse cx="140" cy="340" rx="55" ry="28" fill="#84CC98" />
        <ellipse cx="270" cy="340" rx="65" ry="32" fill="#72C489" />
        <ellipse cx="940" cy="340" rx="60" ry="30" fill="#72C489" />
        <ellipse cx="1060" cy="340" rx="70" ry="34" fill="#84CC98" />
      </g>

      {/* Campus Architecture */}

      {/* FAR LEFT BLOCK: RESIDENCE WING */}
      <g id="bldg-residence-left">
        <rect x="50" y="210" width="130" height="150" rx="3" fill="url(#terracottaBack)" />
        <rect x="44" y="204" width="142" height="6" rx="2" fill="#BA6A55" />
        {/* Windows Grid 3 x 3 */}
        {[0, 1, 2].map((row) => (
          <g key={`w-fl-${row}`}>
            {[0, 1, 2].map((col) => (
              <rect
                key={`w-fl-${row}-${col}`}
                x={68 + col * 36}
                y={225 + row * 38}
                width="20"
                height="22"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* MID-LEFT TOWER */}
      <g id="bldg-mid-left">
        <rect x="160" y="150" width="135" height="210" rx="3" fill="url(#terracottaMain)" />
        <rect x="154" y="144" width="147" height="6" rx="2" fill="#AD5943" />
        {/* Windows Grid 3 x 4 */}
        {[0, 1, 2, 3].map((row) => (
          <g key={`w-ml-${row}`}>
            {[0, 1, 2].map((col) => (
              <rect
                key={`w-ml-${row}-${col}`}
                x={178 + col * 40}
                y={166 + row * 40}
                width="24"
                height="24"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* CENTER-LEFT TOWER: "A - BLOCK" (Moved left to create wide central valley) */}
      <g id="bldg-a-block">
        <rect x="275" y="100" width="185" height="260" rx="3" fill="url(#terracottaDark)" />
        <rect x="268" y="94" width="199" height="6" rx="2" fill="#994630" />

        {/* Roof Pediment / Badge Label: A - BLOCK */}
        <rect x="325" y="74" width="85" height="20" rx="3" fill="#994630" />
        <text
          x="367"
          y="88"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="800"
          letterSpacing="1.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          A - BLOCK
        </text>

        {/* Windows Grid 4 x 5 */}
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={`w-ab-${row}`}>
            {[0, 1, 2, 3].map((col) => (
              <rect
                key={`w-ab-${row}-${col}`}
                x={293 + col * 42}
                y={118 + row * 40}
                width="24"
                height="24"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* CAFETERIA BUILDING (In Front of A-Block) */}
      <g id="bldg-cafeteria">
        {/* Main Base Structure */}
        <rect x="225" y="235" width="225" height="125" rx="3" fill="#C8725C" />

        {/* Cafeteria Signboard Header */}
        <rect x="225" y="235" width="225" height="30" rx="3" fill="#9F4733" />
        <text
          x="337"
          y="255"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="800"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          CAFETERIA
        </text>

        {/* Scalloped Red/Cream Striped Awning */}
        <g id="cafe-awning">
          {/* Awning Slanted Canopy Base */}
          <path d="M 216 265 L 460 265 L 452 286 L 224 286 Z" fill="#FFFFFF" />
          {/* Alternating Burgundy Red Stripes */}
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <path
              key={`awn-stripe-${s}`}
              d={`M ${216 + s * 40} 265 L ${236 + s * 40} 265 L ${233 + s * 40} 286 L ${219 + s * 40} 286 Z`}
              fill="url(#awningRed)"
            />
          ))}
          {/* Scalloped Valance Waves */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((wave) => (
            <path
              key={`scallop-${wave}`}
              d={`M ${224 + wave * 19} 286 Q ${233.5 + wave * 19} 294 ${243 + wave * 19} 286`}
              fill={wave % 2 === 0 ? '#C33B30' : '#FFFFFF'}
            />
          ))}
        </g>

        {/* Service Window Counter */}
        <rect x="245" y="295" width="185" height="65" rx="3" fill="#752F1F" />
        <rect x="238" y="328" width="199" height="6" rx="2" fill="#EAE0DB" />

        {/* Staff/Barista behind Counter */}
        <ellipse cx="295" cy="312" rx="10" ry="11" fill="#F4B598" />
        <path d="M 285 308 C 285 302 290 298 295 298 C 300 298 305 302 305 308 Z" fill="#292524" />
        <rect x="285" y="320" width="20" height="10" rx="2" fill="#D97706" />

        {/* QR Code Scan Stand on Counter */}
        <g id="qr-scan-stand">
          <rect x="345" y="306" width="22" height="24" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <rect x="348" y="310" width="5" height="5" fill="#0F172A" />
          <rect x="358" y="310" width="5" height="5" fill="#0F172A" />
          <rect x="348" y="320" width="5" height="5" fill="#0F172A" />
          <rect x="355" y="317" width="3" height="3" fill="#0F172A" />
          <rect x="358" y="321" width="3" height="3" fill="#0F172A" />
          {/* Sign board badge */}
          <rect x="340" y="298" width="32" height="8" rx="1.5" fill="#2563EB" />
          <text x="356" y="304" textAnchor="middle" fill="#FFFFFF" fontSize="5" fontWeight="800">
            SCAN HERE
          </text>
        </g>
      </g>

      {/* Center Admin Building */}
      <g id="bldg-center-desk">
        <rect x="475" y="165" width="250" height="195" rx="3" fill="url(#terracottaLight)" />
        <rect x="468" y="159" width="264" height="6" rx="2" fill="#B3654F" />

        {/* Windows Grid 4 x 4 */}
        {[0, 1, 2, 3].map((row) => (
          <g key={`w-cd-${row}`}>
            {[0, 1, 2, 3].map((col) => (
              <rect
                key={`w-cd-${row}-${col}`}
                x={502 + col * 52}
                y={180 + row * 38}
                width="24"
                height="22"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* RIGHT MAIN TOWER: "HOUSING" (Moved right to x=740) */}
      <g id="bldg-housing">
        <rect x="740" y="105" width="195" height="255" rx="3" fill="url(#terracottaDark)" />
        <rect x="732" y="99" width="211" height="6" rx="2" fill="#994630" />

        {/* Roof Pediment / Badge Label: HOUSING */}
        <rect x="790" y="79" width="95" height="20" rx="3" fill="#994630" />
        <text
          x="837"
          y="93"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="800"
          letterSpacing="1.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          HOUSING
        </text>

        {/* Windows Grid 4 x 5 */}
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={`w-hs-${row}`}>
            {[0, 1, 2, 3].map((col) => (
              <rect
                key={`w-hs-${row}-${col}`}
                x={758 + col * 42}
                y={122 + row * 40}
                width="24"
                height="24"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* RIGHT WING EXTENSION */}
      <g id="bldg-right-ext">
        <rect x="915" y="150" width="150" height="210" rx="3" fill="url(#terracottaMain)" />
        <rect x="909" y="144" width="162" height="6" rx="2" fill="#AD5943" />
        {/* Windows Grid 3 x 4 */}
        {[0, 1, 2, 3].map((row) => (
          <g key={`w-re-${row}`}>
            {[0, 1, 2].map((col) => (
              <rect
                key={`w-re-${row}-${col}`}
                x={933 + col * 40}
                y={166 + row * 40}
                width="24"
                height="24"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* FAR RIGHT BUILDING */}
      <g id="bldg-far-right">
        <rect x="1040" y="210" width="130" height="150" rx="3" fill="url(#terracottaBack)" />
        <rect x="1034" y="204" width="142" height="6" rx="2" fill="#BA6A55" />
        {/* Windows Grid 3 x 3 */}
        {[0, 1, 2].map((row) => (
          <g key={`w-fr-${row}`}>
            {[0, 1, 2].map((col) => (
              <rect
                key={`w-fr-${row}-${col}`}
                x={1058 + col * 36}
                y={225 + row * 38}
                width="20"
                height="22"
                rx="2"
                fill="url(#windowGleam)"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Campus Trees */}
      {/* Tree Left */}
      <g id="tree-left">
        <rect x="185" y="305" width="7" height="55" rx="2" fill="#6B3A1E" />
        <circle cx="188" cy="290" r="28" fill="#34A853" />
        <circle cx="200" cy="275" r="20" fill="#46BD66" />
        <circle cx="174" cy="285" r="16" fill="#2E8B45" />
      </g>

      {/* Tree Mid-Left (Between Cafe and Center Desk) */}
      <g id="tree-mid-left">
        <rect x="465" y="295" width="7" height="65" rx="2" fill="#6B3A1E" />
        <circle cx="468" cy="280" r="26" fill="#2E8B45" />
        <circle cx="478" cy="265" r="20" fill="#34A853" />
        <circle cx="456" cy="282" r="16" fill="#46BD66" />
      </g>

      {/* Tree Mid-Right (Between Center Desk and Housing) */}
      <g id="tree-mid-right">
        <rect x="730" y="295" width="7" height="65" rx="2" fill="#6B3A1E" />
        <circle cx="734" cy="280" r="26" fill="#34A853" />
        <circle cx="744" cy="265" r="20" fill="#46BD66" />
        <circle cx="722" cy="282" r="16" fill="#2E8B45" />
      </g>

      {/* Tree Far-Right */}
      <g id="tree-far-right">
        <rect x="1085" y="305" width="7" height="55" rx="2" fill="#6B3A1E" />
        <circle cx="1089" cy="290" r="28" fill="#2E8B45" />
        <circle cx="1100" cy="275" r="20" fill="#34A853" />
        <circle cx="1075" cy="285" r="16" fill="#46BD66" />
      </g>

      {/* Foreground Lawn & Pathway */}
      {/* Left Green Lawn */}
      <path d="M 0 355 L 490 355 L 480 410 L 0 410 Z" fill="url(#lawnGrad)" />

      {/* Right Green Lawn */}
      <path d="M 720 355 L 1200 355 L 1200 410 L 730 410 Z" fill="url(#lawnGrad)" />

      {/* Center Stone Pathway */}
      <polygon points="490,355 720,355 730,410 480,410" fill="url(#pathGrad)" />
      <line x1="490" y1="355" x2="480" y2="410" stroke="#CFC2B0" strokeWidth="2" />
      <line x1="720" y1="355" x2="730" y2="410" stroke="#CFC2B0" strokeWidth="2" />

      {/* Campus People */}

      {/* Character A: Student Girl with Smartphone at Cafeteria */}
      <g id="student-cafeteria" transform="translate(390, 275)">
        {/* Shadow */}
        <ellipse cx="14" cy="85" rx="14" ry="3.5" fill="#0F172A" opacity="0.15" />
        {/* Legs / Jeans */}
        <line x1="10" y1="50" x2="9" y2="82" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="18" y1="50" x2="19" y2="82" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
        {/* White Sneakers */}
        <rect x="5" y="80" width="7" height="4" rx="1.5" fill="#FFFFFF" />
        <rect x="17" y="80" width="7" height="4" rx="1.5" fill="#FFFFFF" />
        {/* Torso / Top */}
        <path d="M 6 25 Q 14 23 22 25 L 20 52 L 8 52 Z" fill="#E11D48" />
        <path d="M 10 25 L 14 33 L 18 25 Z" fill="#FFFFFF" />
        {/* Arms holding phone */}
        <path d="M 8 27 L 3 40 L 12 42" stroke="#F4B598" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 20 27 L 24 40 L 16 42" stroke="#F4B598" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Smartphone */}
        <rect x="11" y="36" width="6" height="10" rx="1" fill="#1E293B" />
        <rect x="12" y="37" width="4" height="8" rx="0.5" fill="#38BDF8" />
        {/* Head & Hair */}
        <ellipse cx="14" cy="14" rx="6.5" ry="7.5" fill="#F4B598" />
        <path d="M 8 12 C 7 6 12 2 17 3 C 21 4 22 9 21 15 C 21 20 19 24 19 24 L 8 22 Z" fill="#1E293B" />
      </g>

      {/* Character B: Student Riding Bicycle across Pathway */}
      <g id="student-cyclist" transform="translate(565, 278)">
        {/* Bike Wheel Shadows */}
        <ellipse cx="18" cy="82" rx="15" ry="3" fill="#0F172A" opacity="0.15" />
        <ellipse cx="76" cy="82" rx="15" ry="3" fill="#0F172A" opacity="0.15" />

        {/* Rear Wheel */}
        <circle cx="18" cy="70" r="16" stroke="#1E293B" strokeWidth="2.5" fill="none" />
        <circle cx="18" cy="70" r="13" stroke="#CBD5E1" strokeWidth="1" fill="none" />
        <circle cx="18" cy="70" r="3" fill="#1E293B" />

        {/* Front Wheel */}
        <circle cx="76" cy="70" r="16" stroke="#1E293B" strokeWidth="2.5" fill="none" />
        <circle cx="76" cy="70" r="13" stroke="#CBD5E1" strokeWidth="1" fill="none" />
        <circle cx="76" cy="70" r="3" fill="#1E293B" />

        {/* Bicycle Diamond Frame */}
        <path d="M 18 70 L 38 70 L 56 52 L 36 52 Z" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 38 70 L 36 52" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <path d="M 76 70 L 64 45" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        {/* Handlebars */}
        <path d="M 60 45 L 68 45 L 71 49" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Saddle */}
        <path d="M 31 48 Q 36 46 43 48" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        {/* Pedal & Crank */}
        <circle cx="38" cy="70" r="3.5" fill="#0F172A" />
        <line x1="38" y1="70" x2="43" y2="77" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        <rect x="41" y="76" width="5" height="2" fill="#1E293B" />

        {/* Student Rider */}
        {/* Legs pedaling */}
        <line x1="36" y1="42" x2="44" y2="58" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="44" y1="58" x2="43" y2="76" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        <rect x="41" y="75" width="6" height="3" rx="1" fill="#FFFFFF" />

        {/* Torso leaning forward */}
        <path d="M 33 42 L 50 30 L 55 38 L 38 48 Z" fill="#0284C7" />
        {/* Backpack */}
        <path d="M 28 32 C 26 39 28 45 33 45 L 33 32 Z" fill="#334155" />
        {/* Arms holding handlebar */}
        <line x1="48" y1="33" x2="65" y2="45" stroke="#F4B598" strokeWidth="3" strokeLinecap="round" />
        {/* Head & Helmet */}
        <ellipse cx="50" cy="21" rx="6" ry="6.5" fill="#F4B598" />
        <path d="M 44 20 C 44 14 50 13 56 15 C 58 16 59 20 56 22 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
