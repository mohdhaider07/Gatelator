import { motion } from "framer-motion";

interface BitAnimationProps {
  bit: string;
  isActive?: boolean;
  index: number;
  delay?: number;
}

export function BitAnimation({
  bit,
  isActive = false,
  index,
  delay = 0,
}: BitAnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 20 }}
      animate={{
        scale: isActive ? 1.3 : 1.1,
        opacity: 1,
        y: 0,
        backgroundColor: isActive
          ? bit === "1"
            ? "#10B981"
            : "#EF4444"
          : bit === "1"
          ? "#059669"
          : "#DC2626",
        boxShadow: isActive
          ? bit === "1"
            ? "0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)"
            : "0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)"
          : "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
      transition={{
        delay: delay + index * 0.1,
        duration: 0.4,
        backgroundColor: { duration: 0.3 },
        boxShadow: { duration: 0.3 },
      }}
      className={`
        inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-xl
        border-2 transition-all duration-300
        ${
          bit === "1"
            ? "bg-green-600 border-green-400"
            : "bg-red-600 border-red-400"
        }
        ${isActive ? "ring-4 ring-blue-400/50" : ""}
        cursor-pointer hover:scale-110
      `}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={{
          rotate: isActive ? [0, 360] : 0,
          scale: isActive ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          delay: delay + index * 0.1,
          rotate: { duration: 0.8 },
          scale: {
            duration: 0.4,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 1,
          },
        }}
      >
        {bit}
      </motion.span>

      {/* Bit position indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.8 : 0.5 }}
        className="absolute -bottom-6 text-xs text-gray-400 font-mono"
      >
        2^{7 - index}
      </motion.div>
    </motion.div>
  );
}
