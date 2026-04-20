const TECHS = [
  {
    label: 'React',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="2.05" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    label: 'TypeScript',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" fillOpacity="0.12" />
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <text
          x="5.2"
          y="16.8"
          fontFamily="monospace"
          fontSize="9"
          fontWeight="800"
          fill="currentColor"
        >
          TS
        </text>
      </svg>
    ),
  },
  {
    label: 'Next.js',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M8.5 16V8l8 9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Tailwind CSS',
    icon: (
      <svg width="18" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.175.665 1.715 1.21C13.29 10.41 14.28 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.175-.665-1.715-1.21C15.21 6.99 14.22 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.175.665 1.715 1.21C8.79 15.81 9.78 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.175-.665-1.715-1.21C10.71 12.39 9.72 11.4 7.5 11.4z" />
      </svg>
    ),
  },
  {
    label: 'AWS',
    icon: (
      <svg width="20" height="16" viewBox="0 0 28 20" fill="currentColor" aria-hidden="true">
        <text
          x="0"
          y="14"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="800"
          letterSpacing="0.5"
          fill="currentColor"
        >
          AWS
        </text>
        <path
          d="M3 17.5 Q14 20.5 25 17.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Storybook',
    icon: (
      <svg width="14" height="16" viewBox="0 0 14 18" fill="none" aria-hidden="true">
        <path
          d="M1.5 1.5h11l-.5 14-10.5.5V1.5z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d="M5 5.5h4M5 8.5h4M5 11.5h2.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Figma',
    icon: (
      <svg width="12" height="16" viewBox="0 0 16 22" fill="currentColor" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="3" opacity="0.5" />
        <rect x="9" y="1" width="6" height="6" rx="3" opacity="0.3" />
        <rect x="1" y="9" width="6" height="6" rx="1" opacity="0.4" />
        <rect x="1" y="15" width="6" height="6" rx="3" opacity="0.25" />
        <circle cx="12" cy="12" r="3" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

const TRACK = [...TECHS, ...TECHS, ...TECHS, ...TECHS];

export function TechStripSection() {
  return (
    <div className="overflow-hidden bg-white py-4 border-y border-ink/[0.06]">
      <div className="flex flex-nowrap">
        {TRACK.map(({ label, icon }, i) => (
          <div
            key={`${label}-${i}`}
            className="mx-1.5 flex flex-shrink-0 items-center gap-2 rounded-full bg-ink/[0.045] px-4 py-2 text-ink/50"
          >
            {icon}
            <span className="whitespace-nowrap font-body text-[0.76rem] tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
