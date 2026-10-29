export default function AboutHeroIllustration({ className = 'w-full h-full object-cover object-bottom' }) {
  return (
    <svg
      viewBox="0 0 1200 680"
      preserveAspectRatio="xMidYBottom slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Campus360 Institutional Community and Campus Architecture Illustration"
    >
      <defs>
        {/* Soft Ambient Sky Gradients */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CCE5FC" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#E2F0FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F1F7FE" />
        </linearGradient>

        {/* Blueprint Pastel Architecture Gradients (Soft, high-contrast background for text) */}
        <linearGradient id="bldgFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9EBF9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C4DEF5" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bldgMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3F0FA" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#CCE4F7" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="bldgNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ECF5FC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D6EBF9" stopOpacity="0.9" />
        </linearGradient>

        {/* Coral / Rose Team Polo Gradients (Matching Reference Team Attire) */}
        <linearGradient id="coralPolo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="coralPoloDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EE5253" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="coralPoloLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>

        {/* Hair Gradients */}
        <linearGradient id="hairDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="hairBrown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        {/* Ground Plaza Gradient */}
        <linearGradient id="campusPlaza" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5F0FA" />
          <stop offset="100%" stopColor="#F1F7FD" />
        </linearGradient>
      </defs>

      {/* Sky & Clouds */}
      <rect width="1200" height="680" fill="url(#skyGrad)" />

      {/* Puffy Architectural Clouds */}
      <g id="sky-clouds" opacity="0.85">
        <path
          d="M 60 70 Q 40 70 40 55 Q 40 40 60 40 Q 66 22 90 22 Q 112 22 122 36 Q 138 30 152 40 Q 168 40 168 55 Q 168 70 150 70 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M 1020 65 Q 1000 65 1000 50 Q 1000 35 1020 35 Q 1026 18 1050 18 Q 1072 18 1082 32 Q 1098 26 1112 36 Q 1128 36 1128 50 Q 1128 65 1110 65 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M 500 45 Q 480 45 480 32 Q 480 20 500 20 Q 508 8 532 8 Q 554 8 562 18 Q 576 14 590 22 Q 604 22 604 34 Q 604 45 588 45 Z"
          fill="#FFFFFF"
          opacity="0.75"
        />
      </g>

      {/* Campus Architecture Skyline */}

      {/* FAR-LEFT: HOSTEL BLOCK */}
      <g id="bldg-hostel-left" opacity="0.85">
        <rect x="20" y="140" width="145" height="490" rx="4" fill="url(#bldgFar)" />
        <rect x="14" y="132" width="157" height="10" rx="2" fill="#ABC9E5" />
        <text
          x="92"
          y="166"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          letterSpacing="2.5"
          fill="#628BB5"
        >
          HOSTEL
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => (
          <g key={`hl-r-${r}`}>
            {[0, 1, 2].map((c) => (
              <g key={`hl-${r}-${c}`}>
                <rect
                  x={36 + c * 38}
                  y={186 + r * 38}
                  width="22"
                  height="24"
                  rx="2"
                  fill="#FFFFFF"
                  opacity="0.85"
                />
                <line
                  x1={47 + c * 38}
                  y1={186 + r * 38}
                  x2={47 + c * 38}
                  y2={210 + r * 38}
                  stroke="#D2E6F7"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* MID-LEFT: BLOCK - A (Main University Complex) */}
      <g id="bldg-block-a" opacity="0.85">
        <rect x="180" y="80" width="185" height="550" rx="4" fill="url(#bldgMid)" />
        <rect x="174" y="72" width="197" height="10" rx="2" fill="#9CC1E3" />
        <polygon points="272,45 220,72 324,72" fill="url(#bldgFar)" />
        <text
          x="272"
          y="110"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          letterSpacing="3"
          fill="#5885B2"
        >
          BLOCK- A
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
          <g key={`ba-r-${r}`}>
            {[0, 1, 2, 3].map((c) => (
              <g key={`ba-${r}-${c}`}>
                <rect
                  x={202 + c * 36}
                  y={130 + r * 40}
                  width="22"
                  height="25"
                  rx="3"
                  fill="#FFFFFF"
                  opacity="0.9"
                />
                <line
                  x1={202 + c * 36}
                  y1={142 + r * 40}
                  x2={224 + c * 36}
                  y2={142 + r * 40}
                  stroke="#CCE2F5"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* CENTER-LEFT: ADMISSION BLOCK (Very soft backdrop behind text) */}
      <g id="bldg-admission" opacity="0.6">
        <rect x="380" y="160" width="180" height="470" rx="4" fill="url(#bldgNear)" />
        <rect x="374" y="152" width="192" height="10" rx="2" fill="#A4CBED" />
        <text
          x="470"
          y="186"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          letterSpacing="2"
          fill="#8BAECF"
          opacity="0.5"
        >
          ADMISSION BLOCK
        </text>
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <g key={`adm-r-${r}`}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={`adm-${r}-${c}`}
                x={402 + c * 36}
                y={205 + r * 38}
                width="22"
                height="22"
                rx="2"
                fill="#FFFFFF"
                opacity="0.75"
              />
            ))}
          </g>
        ))}
      </g>

      {/* CENTER-RIGHT: RESEARCH & HOSTEL WING (Very soft backdrop behind text) */}
      <g id="bldg-hostel-right" opacity="0.6">
        <rect x="660" y="150" width="180" height="480" rx="4" fill="url(#bldgNear)" />
        <rect x="654" y="142" width="192" height="10" rx="2" fill="#A4CBED" />
        <text
          x="750"
          y="176"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          letterSpacing="2"
          fill="#8BAECF"
          opacity="0.5"
        >
          HOSTEL
        </text>
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <g key={`hr-r-${r}`}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={`hr-${r}-${c}`}
                x={682 + c * 36}
                y={195 + r * 38}
                width="22"
                height="22"
                rx="2"
                fill="#FFFFFF"
                opacity="0.75"
              />
            ))}
          </g>
        ))}
      </g>

      {/* MID-RIGHT: BLOCK - B & LIBRARY */}
      <g id="bldg-block-b" opacity="0.85">
        <rect x="855" y="90" width="190" height="540" rx="4" fill="url(#bldgMid)" />
        <rect x="849" y="82" width="202" height="10" rx="2" fill="#9CC1E3" />
        <polygon points="950,55 900,82 1000,82" fill="url(#bldgFar)" />
        <text
          x="950"
          y="120"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          letterSpacing="3"
          fill="#5885B2"
        >
          BLOCK- B
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
          <g key={`bb-r-${r}`}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={`bb-${r}-${c}`}
                x={878 + c * 38}
                y={140 + r * 40}
                width="24"
                height="25"
                rx="3"
                fill="#FFFFFF"
                opacity="0.9"
              />
            ))}
          </g>
        ))}
      </g>

      {/* FAR-RIGHT EDGE BUILDING */}
      <g id="bldg-far-right" opacity="0.85">
        <rect x="1060" y="150" width="125" height="480" rx="4" fill="url(#bldgFar)" />
        <rect x="1054" y="142" width="137" height="10" rx="2" fill="#ABC9E5" />
        {[0, 1, 2, 3, 4, 5, 6].map((r) => (
          <g key={`fr-r-${r}`}>
            {[0, 1].map((c) => (
              <rect
                key={`fr-${r}-${c}`}
                x={1082 + c * 40}
                y={190 + r * 38}
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

      {/* CAMPUS GROUND PLAZA BASE */}
      <rect x="0" y="630" width="1200" height="50" fill="url(#campusPlaza)" />
      <line x1="0" y1="630" x2="1200" y2="630" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Shrubbery / Landscaping at Corners */}
      <g id="foliage">
        <circle cx="160" cy="630" r="22" fill="#86EFAC" />
        <circle cx="185" cy="630" r="28" fill="#4ADE80" />
        <circle cx="210" cy="630" r="20" fill="#22C55E" />

        <circle cx="1010" cy="630" r="22" fill="#86EFAC" />
        <circle cx="1035" cy="630" r="28" fill="#4ADE80" />
        <circle cx="1060" cy="630" r="20" fill="#22C55E" />
      </g>

      {/* Team Characters */}

      {/* High-Five Triumph Burst Rays in the Center */}
      <g id="triumph-sparkles" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
        <line x1="600" y1="395" x2="600" y2="380" />
        <line x1="590" y1="398" x2="578" y2="389" />
        <line x1="610" y1="398" x2="622" y2="389" />
        <line x1="583" y1="407" x2="572" y2="405" />
        <line x1="617" y1="407" x2="628" y2="405" />
        <circle cx="600" cy="412" r="5" fill="#FBBF24" stroke="none" />
      </g>

      {/* CHARACTER 1 (Leftmost Female Scholar - Ponytail & Coral Polo) */}
      <g id="char-1-left-woman">
        <path d="M 390 590 L 398 650 L 414 650 L 416 590 Z" fill="#1E293B" />
        <path d="M 416 590 L 418 650 L 434 650 L 438 590 Z" fill="#0F172A" />

        <path
          d="M 378 495 C 374 535 378 590 388 590 L 442 590 C 448 570 448 535 446 495 Z"
          fill="url(#coralPolo)"
        />
        <rect x="424" y="520" width="14" height="6" rx="1.5" fill="#FFFFFF" opacity="0.9" />

        <rect x="408" y="475" width="14" height="18" fill="#FBCFE8" />
        <ellipse cx="414" cy="456" rx="18" ry="22" fill="#FBCFE8" />

        <path
          d="M 400 438 C 412 432 430 436 432 454 C 432 464 428 470 416 470 C 404 470 398 458 400 438 Z"
          fill="url(#hairDark)"
        />
        <path
          d="M 398 446 C 382 446 370 458 372 472 C 374 482 384 484 390 474 Z"
          fill="url(#hairDark)"
        />

        <ellipse cx="420" cy="450" rx="2" ry="2.5" fill="#1E293B" />
        <path d="M 420 464 Q 426 466 424 470" stroke="#BE185D" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        <path
          d="M 378 498 L 358 546 L 372 550 L 390 511 Z"
          fill="url(#coralPoloLight)"
        />
        <circle cx="356" cy="554" r="8" fill="#FBCFE8" />

        <path
          d="M 436 490 L 575 410 L 585 424 L 444 512 Z"
          fill="url(#coralPoloDark)"
        />
        <ellipse cx="584" cy="412" rx="9" ry="8" fill="#FBCFE8" transform="rotate(-15 584 412)" />
      </g>

      {/* CHARACTER 2 (Center-Left Teammate) */}
      <g id="char-2-mid-left">
        <path d="M 466 600 L 468 650 L 486 650 L 490 600 Z" fill="#1E293B" />
        <path d="M 494 600 L 496 650 L 514 650 L 516 600 Z" fill="#0F172A" />

        <path
          d="M 456 505 C 452 545 458 600 466 600 L 522 600 C 528 580 528 545 524 505 Z"
          fill="url(#coralPoloDark)"
        />

        <rect x="484" y="482" width="14" height="16" fill="#FBBF24" opacity="0.8" />
        <ellipse cx="490" cy="466" rx="18" ry="20" fill="url(#hairDark)" />
        <ellipse cx="488" cy="468" rx="17" ry="19" fill="#1E293B" />
        <ellipse cx="472" cy="468" rx="4" ry="6" fill="#F59E0B" />

        <path
          d="M 510 500 L 588 412 L 598 424 L 522 516 Z"
          fill="url(#coralPolo)"
        />
        <circle cx="594" cy="412" r="8" fill="#FBBF24" />
      </g>

      {/* CHARACTER 3 (Center-Right Male Scholar - Facing Forward) */}
      <g id="char-3-mid-right-man">
        <path d="M 552 600 L 548 650 L 568 650 L 574 600 Z" fill="#1E293B" />
        <path d="M 578 600 L 582 650 L 602 650 L 604 600 Z" fill="#0F172A" />

        <path
          d="M 536 500 C 532 540 536 600 546 600 L 608 600 C 614 580 616 540 614 500 Z"
          fill="url(#coralPolo)"
        />
        <path d="M 538 530 L 612 530" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.85" />
        <path d="M 540 550 L 610 550" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.85" />
        <path d="M 542 570 L 608 570" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.85" />
        <rect x="582" y="518" width="15" height="7" rx="1.5" fill="#FFFFFF" opacity="0.9" />

        <rect x="568" y="475" width="16" height="18" fill="#FDE68A" />
        <ellipse cx="576" cy="452" rx="19" ry="22" fill="#FDE68A" />

        <path
          d="M 558 444 C 560 428 580 426 594 434 C 598 441 596 450 594 454 C 586 444 566 444 558 444 Z"
          fill="url(#hairBrown)"
        />

        <ellipse cx="570" cy="450" rx="2.2" ry="2.5" fill="#1E293B" />
        <ellipse cx="586" cy="450" rx="2.2" ry="2.5" fill="#1E293B" />
        <path
          d="M 570 462 Q 578 470 586 462"
          stroke="#92400E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M 550 495 L 598 412 L 608 424 L 564 512 Z"
          fill="url(#coralPoloLight)"
        />
        <circle cx="602" cy="412" r="8" fill="#FDE68A" />

        <path
          d="M 610 500 L 658 550 L 646 559 L 598 514 Z"
          fill="url(#coralPoloDark)"
        />
        <circle cx="660" cy="558" r="8" fill="#FDE68A" />
      </g>

      {/* CHARACTER 4 (Rightmost Female Leader) */}
      <g id="char-4-right-woman">
        <path d="M 648 575 L 638 650 L 696 650 L 692 575 Z" fill="#0F172A" />

        <path
          d="M 632 495 C 628 530 634 575 642 575 L 696 575 C 702 560 706 530 700 495 Z"
          fill="url(#coralPoloLight)"
        />
        <path d="M 658 495 L 668 514 L 678 495" stroke="#FFFFFF" strokeWidth="2" fill="none" />

        <rect x="660" y="474" width="14" height="16" fill="#D97706" opacity="0.8" />
        <ellipse cx="668" cy="456" rx="18" ry="22" fill="#FBBF24" />

        <path
          d="M 650 444 C 654 430 682 430 688 444 C 696 456 696 486 688 506 C 684 486 682 466 678 462 C 668 462 658 470 650 444 Z"
          fill="url(#hairDark)"
        />

        <ellipse cx="662" cy="452" rx="2" ry="2.2" fill="#1E293B" />
        <ellipse cx="674" cy="452" rx="2" ry="2.2" fill="#1E293B" />
        <path
          d="M 662 464 Q 668 470 674 464"
          stroke="#78350F"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M 642 492 L 606 412 L 618 406 L 656 484 Z"
          fill="url(#coralPolo)"
        />
        <circle cx="612" cy="410" r="8" fill="#FBBF24" />

        <path
          d="M 698 498 L 715 548 L 702 554 L 688 510 Z"
          fill="url(#coralPoloDark)"
        />
        <circle cx="716" cy="554" r="8" fill="#FBBF24" />
      </g>
    </svg>
  );
}
