import React, { forwardRef } from 'react';

// MindForge primary logo: stylized M/F monogram + logotype
// Colors
const DEEP_BLUE = '#0a2540';
const BRIGHT_ORANGE = '#ff7a00';
const GRAY = '#94a3b8';

const Logo = forwardRef(function Logo({ theme = 'dark' }, ref) {
  const isDark = theme === 'dark';
  const titleFill = isDark ? 'white' : DEEP_BLUE;
  const forgeFill = BRIGHT_ORANGE;
  const taglineFill = isDark ? 'rgba(226,232,240,0.85)' : '#475569';

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 240"
      width="100%"
      height="100%"
      role="img"
      aria-label="MindForge logo"
    >
      <g>
        {/* Monogram container */}
        <g transform="translate(12,12)">
          <rect x="0" y="0" width="216" height="216" rx="20" ry="20" fill="none" stroke={GRAY} strokeWidth="10" />
          {/* M in deep blue */}
          <path d="M48 160 L48 60 L78 100 L108 60 L108 160" fill="none" stroke={DEEP_BLUE} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          {/* F in bright orange */}
          <path d="M168 60 L168 160 M168 60 L108 60 M168 100 L118 100" fill="none" stroke={BRIGHT_ORANGE} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Wordmark */}
        <g transform="translate(260,78)">
          <text x="0" y="0" fontFamily="Inter, ui-sans-serif, system-ui, -apple-system" fontWeight="800" fontSize="64" fill={titleFill} dominantBaseline="hanging" letterSpacing="0.5">
            Mind
          </text>
          <text x="220" y="0" fontFamily="Inter, ui-sans-serif, system-ui, -apple-system" fontWeight="800" fontSize="64" fill={forgeFill} dominantBaseline="hanging" letterSpacing="0.5">
            Forge
          </text>
          <text x="0" y="86" fontFamily="Inter, ui-sans-serif, system-ui, -apple-system" fontWeight="600" fontSize="20" fill={taglineFill} letterSpacing="0.3">
            Knowledge That Pays
          </text>
        </g>
      </g>
    </svg>
  );
});

export default Logo;
