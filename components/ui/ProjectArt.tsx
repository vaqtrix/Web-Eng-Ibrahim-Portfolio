import type { ArtKey } from "@/content/work";

/**
 * A drawn illustration for each project, so every card carries an image
 * rather than a generic thumbnail. All strokes use theme variables, so they
 * repaint correctly in both day and night.
 */
export function ProjectArt({ art }: { art: ArtKey }) {
  const common = {
    viewBox: "0 0 400 200",
    className: "h-full w-full",
    role: "img" as const,
  };

  if (art === "field") {
    return (
      <svg {...common} aria-label="Sensor node in a field, sending readings up">
        <defs>
          <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="140" width="400" height="60" fill="url(#soil)" />
        <path
          d="M0 140 Q 100 126 200 140 T 400 138"
          stroke="var(--dim)"
          strokeWidth="1"
          fill="none"
        />
        {[40, 92, 300, 352].map((x, i) => (
          <g key={x} stroke="var(--plasma)" strokeWidth="1.4" fill="none">
            <path d={`M${x} 140 L${x} ${112 - i * 4}`} />
            <path d={`M${x} ${124 - i * 2} q -12 -10 -18 -22`} />
            <path d={`M${x} ${130 - i * 2} q 12 -10 18 -22`} />
          </g>
        ))}
        {/* sensor post */}
        <g stroke="var(--ink)" strokeWidth="1.6" fill="none">
          <path d="M200 140 L200 78" />
          <rect x="188" y="58" width="24" height="20" rx="4" />
          <path d="M194 78 L194 88 M206 78 L206 88" strokeWidth="1" />
        </g>
        {/* transmission arcs */}
        {[16, 28, 40].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="58"
            r={r}
            fill="none"
            stroke="var(--plasma)"
            strokeWidth="1"
            opacity={0.5 - i * 0.12}
          >
            <animate
              attributeName="r"
              values={`${r};${r + 14};${r}`}
              dur={`${2.4 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.55;0;0.55"
              dur={`${2.4 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle cx="200" cy="58" r="3" fill="var(--solar)" />
      </svg>
    );
  }

  if (art === "pipeline") {
    return (
      <svg {...common} aria-label="Data flowing through a scoring pipeline">
        <path
          d="M30 100 H120 M160 100 H240 M280 100 H370"
          stroke="var(--line)"
          strokeWidth="2"
        />
        {[
          { x: 30, label: "in" },
          { x: 140, label: "clean" },
          { x: 260, label: "score" },
          { x: 370, label: "rank" },
        ].map((node, i) => (
          <g key={node.x}>
            <circle
              cx={node.x}
              cy="100"
              r="14"
              fill="var(--panel)"
              stroke={i === 3 ? "var(--solar)" : "var(--plasma)"}
              strokeWidth="1.5"
            />
            <circle cx={node.x} cy="100" r="4" fill="var(--violet)" />
          </g>
        ))}
        {/* packets travelling the line */}
        {[0, 1, 2].map((i) => (
          <circle key={i} r="3.2" fill="var(--plasma)">
            <animateMotion
              dur={`${3.2 + i * 0.6}s`}
              begin={`${i * 0.9}s`}
              repeatCount="indefinite"
              path="M30 100 H370"
            />
          </circle>
        ))}
        {/* discarded candidates falling away */}
        {[150, 200, 250].map((x, i) => (
          <circle key={x} cx={x} cy="100" r="2.4" fill="var(--dim)">
            <animate
              attributeName="cy"
              values="100;170"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    );
  }

  if (art === "dashboard") {
    const bars = [42, 78, 56, 96, 64, 110, 84];
    return (
      <svg {...common} aria-label="A dashboard of yield trends by region">
        <rect
          x="24"
          y="24"
          width="352"
          height="152"
          rx="10"
          fill="var(--panel)"
          stroke="var(--line)"
        />
        <path d="M24 52 H376" stroke="var(--line)" />
        <circle cx="40" cy="38" r="3" fill="var(--solar)" />
        <circle cx="52" cy="38" r="3" fill="var(--plasma)" />
        {bars.map((value, i) => (
          <rect
            key={i}
            x={52 + i * 44}
            y={160 - value}
            width="22"
            rx="4"
            height={value}
            fill={i % 2 ? "var(--violet)" : "var(--plasma)"}
            opacity="0.8"
          >
            <animate
              attributeName="height"
              values={`0;${value}`}
              dur="1.2s"
              begin={`${i * 0.09}s`}
              fill="freeze"
            />
            <animate
              attributeName="y"
              values={`160;${160 - value}`}
              dur="1.2s"
              begin={`${i * 0.09}s`}
              fill="freeze"
            />
          </rect>
        ))}
        <path
          d="M63 118 L107 82 L151 104 L195 64 L239 96 L283 50 L327 76"
          fill="none"
          stroke="var(--solar)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="320"
          strokeDashoffset="320"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="320;0"
            dur="1.8s"
            fill="freeze"
          />
        </path>
      </svg>
    );
  }

  return (
    <svg {...common} aria-label="A browser window orbited by small satellites">
      <rect
        x="70"
        y="52"
        width="260"
        height="112"
        rx="10"
        fill="var(--panel)"
        stroke="var(--line)"
      />
      <path d="M70 78 H330" stroke="var(--line)" />
      <circle cx="86" cy="65" r="3" fill="var(--solar)" />
      <circle cx="98" cy="65" r="3" fill="var(--plasma)" />
      <circle cx="110" cy="65" r="3" fill="var(--violet)" />
      <rect x="90" y="96" width="120" height="8" rx="4" fill="var(--dim)" opacity="0.5" />
      <rect x="90" y="114" width="180" height="6" rx="3" fill="var(--dim)" opacity="0.3" />
      <rect x="90" y="130" width="90" height="6" rx="3" fill="var(--plasma)" opacity="0.6" />
      <ellipse
        cx="200"
        cy="108"
        rx="150"
        ry="58"
        fill="none"
        stroke="var(--plasma)"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle r="4" fill="var(--solar)">
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          path="M350 108 a150 58 0 1 1 -300 0 a150 58 0 1 1 300 0"
        />
      </circle>
      <circle r="2.6" fill="var(--violet)">
        <animateMotion
          dur="11s"
          repeatCount="indefinite"
          path="M50 108 a150 58 0 1 0 300 0 a150 58 0 1 0 -300 0"
        />
      </circle>
    </svg>
  );
}
