interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { width: 120, height: 32 },
  md: { width: 160, height: 44 },
  lg: { width: 200, height: 56 },
}

export default function Logo({ variant = 'light', className = '', size = 'md' }: LogoProps) {
  const { width, height } = sizeMap[size]
  const navy = variant === 'light' ? '#ffffff' : '#0d2257'
  const teal = variant === 'light' ? '#7ecfcf' : '#00a8a8'
  const globeStroke = variant === 'light' ? '#7ecfcf' : 'url(#globeGrad)'
  const dotFill1 = variant === 'light' ? '#7ecfcf' : '#1a73e8'
  const dotFill2 = variant === 'light' ? '#ffffff' : '#00a8a8'

  return (
    <span className={`inline-flex items-center ${className}`} aria-label="Global Nexus">
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a73e8" />
            <stop offset="100%" stopColor="#00a8a8" />
          </linearGradient>
        </defs>

        {/* Globe circle */}
        <circle cx="28" cy="28" r="22" stroke={globeStroke} strokeWidth="1.8" fill="none" />

        {/* Horizontal equator */}
        <line x1="6" y1="28" x2="50" y2="28" stroke={globeStroke} strokeWidth="1.4" />

        {/* Vertical meridian */}
        <line x1="28" y1="6" x2="28" y2="50" stroke={globeStroke} strokeWidth="1.4" />

        {/* Diagonal arc lines */}
        <path d="M10 14 Q28 22 46 14" stroke={globeStroke} strokeWidth="1.2" fill="none" />
        <path d="M10 42 Q28 34 46 42" stroke={globeStroke} strokeWidth="1.2" fill="none" />

        {/* Nodes */}
        <circle cx="28" cy="6" r="3.5" fill={dotFill1} />
        <circle cx="28" cy="50" r="3.5" fill={dotFill2} />
        <circle cx="6" cy="28" r="3.5" fill={dotFill1} />
        <circle cx="50" cy="28" r="3.5" fill={dotFill2} />
        <circle cx="40" cy="16" r="3" fill={dotFill2} />
        <circle cx="16" cy="40" r="3" fill={dotFill1} />

        {/* "Global" text */}
        <text
          x="62"
          y="24"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="17"
          fontWeight="700"
          fill={navy}
          letterSpacing="0.5"
        >
          Global
        </text>

        {/* "Nexus" text */}
        <text
          x="62"
          y="46"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="17"
          fontWeight="700"
          fill={teal}
          letterSpacing="0.5"
        >
          Nexus
        </text>
      </svg>
    </span>
  )
}
