import { motion } from "framer-motion";

export function LogoSVG({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      className={`${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* Background circuit board pattern */}
      <defs>
        <pattern
          id="circuitPattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect width="20" height="20" fill="rgba(59, 130, 246, 0.1)" />
          <circle cx="10" cy="10" r="1" fill="rgba(34, 197, 94, 0.3)" />
          <line
            x1="0"
            y1="10"
            x2="20"
            y2="10"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="20"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Gradient definitions */}
        <linearGradient id="gateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        <linearGradient id="numberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="120" height="60" fill="url(#circuitPattern)" rx="8" />

      {/* Logic gate containers with binary numbers */}
      {/* Gate 1 - AND Gate with "1" */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <rect
          x="5"
          y="5"
          width="22"
          height="18"
          rx="3"
          fill="url(#gateGradient)"
          opacity="0.8"
        />
        <path
          d="M 8 8 L 15 8 Q 20 8 20 14 Q 20 20 15 20 L 8 20 Z"
          fill="rgba(255,255,255,0.9)"
          stroke="#3B82F6"
          strokeWidth="1"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#1E40AF"
        >
          1
        </text>
      </motion.g>

      {/* Gate 2 - OR Gate with "2" */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <rect
          x="32"
          y="5"
          width="22"
          height="18"
          rx="3"
          fill="url(#gateGradient)"
          opacity="0.8"
        />
        <path
          d="M 35 8 Q 40 8 45 14 Q 40 20 35 20 Q 40 14 35 8"
          fill="rgba(255,255,255,0.9)"
          stroke="#8B5CF6"
          strokeWidth="1"
        />
        <text
          x="42"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#7C3AED"
        >
          2
        </text>
      </motion.g>

      {/* Gate 3 - XOR Gate with "3" */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <rect
          x="5"
          y="32"
          width="22"
          height="18"
          rx="3"
          fill="url(#gateGradient)"
          opacity="0.8"
        />
        <path
          d="M 8 35 Q 13 35 18 41 Q 13 47 8 47 Q 13 41 8 35"
          fill="rgba(255,255,255,0.9)"
          stroke="#EC4899"
          strokeWidth="1"
        />
        <path
          d="M 6 35 Q 11 41 6 47"
          fill="none"
          stroke="#EC4899"
          strokeWidth="1"
        />
        <text
          x="12"
          y="43"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#DB2777"
        >
          3
        </text>
      </motion.g>

      {/* Gate 4 - NOT Gate with "4" */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <rect
          x="32"
          y="32"
          width="22"
          height="18"
          rx="3"
          fill="url(#gateGradient)"
          opacity="0.8"
        />
        <path
          d="M 35 35 L 45 41 L 35 47 Z"
          fill="rgba(255,255,255,0.9)"
          stroke="#10B981"
          strokeWidth="1"
        />
        <circle
          cx="47"
          cy="41"
          r="2"
          fill="none"
          stroke="#10B981"
          strokeWidth="1"
        />
        <text
          x="42"
          y="43"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#059669"
        >
          4
        </text>
      </motion.g>

      {/* Connection wires */}
      <motion.g
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <line
          x1="27"
          y1="14"
          x2="32"
          y2="14"
          stroke="url(#numberGradient)"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
        <line
          x1="27"
          y1="41"
          x2="32"
          y2="41"
          stroke="url(#numberGradient)"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
        <line
          x1="16"
          y1="23"
          x2="16"
          y2="32"
          stroke="url(#numberGradient)"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
        <line
          x1="43"
          y1="23"
          x2="43"
          y2="32"
          stroke="url(#numberGradient)"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
      </motion.g>

      {/* Central processing indicator */}
      <motion.circle
        cx="60"
        cy="30"
        r="8"
        fill="none"
        stroke="url(#gateGradient)"
        strokeWidth="2"
        strokeDasharray="4,2"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          delay: 1.2,
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <text
        x="60"
        y="33"
        textAnchor="middle"
        fontSize="8"
        fontWeight="bold"
        fill="#FBBF24"
      >
        ⚡
      </text>

      {/* Title text "LOGIC" */}
      <motion.text
        x="85"
        y="20"
        fontSize="12"
        fontWeight="bold"
        fill="url(#gateGradient)"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        LOGIC
      </motion.text>

      {/* Subtitle "CALC" */}
      <motion.text
        x="85"
        y="35"
        fontSize="10"
        fontWeight="600"
        fill="rgba(255,255,255,0.8)"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        CALC
      </motion.text>

      {/* Binary decoration */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <text x="85" y="50" fontSize="6" fill="rgba(34, 197, 94, 0.6)">
          10110101
        </text>
      </motion.g>
    </motion.svg>
  );
}

export function MobileLogoSVG({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="60"
      height="30"
      viewBox="0 0 60 30"
      className={`${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* Simplified gradient */}
      <defs>
        <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="60" height="30" rx="4" fill="url(#mobileGradient)" />

      {/* Simplified logic gates */}
      <rect
        x="2"
        y="2"
        width="12"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.9)"
      />
      <text
        x="8"
        y="7"
        textAnchor="middle"
        fontSize="4"
        fontWeight="bold"
        fill="#1E40AF"
      >
        1
      </text>

      <rect
        x="16"
        y="2"
        width="12"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.9)"
      />
      <text
        x="22"
        y="7"
        textAnchor="middle"
        fontSize="4"
        fontWeight="bold"
        fill="#7C3AED"
      >
        2
      </text>

      <rect
        x="2"
        y="22"
        width="12"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.9)"
      />
      <text
        x="8"
        y="27"
        textAnchor="middle"
        fontSize="4"
        fontWeight="bold"
        fill="#DB2777"
      >
        3
      </text>

      <rect
        x="16"
        y="22"
        width="12"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.9)"
      />
      <text
        x="22"
        y="27"
        textAnchor="middle"
        fontSize="4"
        fontWeight="bold"
        fill="#059669"
      >
        4
      </text>

      {/* Central indicator */}
      <circle
        cx="30"
        cy="15"
        r="3"
        fill="none"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="1"
      />
      <text x="30" y="17" textAnchor="middle" fontSize="3" fill="white">
        ⚡
      </text>

      {/* Title */}
      <text x="40" y="12" fontSize="6" fontWeight="bold" fill="white">
        LOGIC
      </text>
      <text
        x="40"
        y="20"
        fontSize="4"
        fontWeight="600"
        fill="rgba(255,255,255,0.8)"
      >
        CALC
      </text>
    </motion.svg>
  );
}
