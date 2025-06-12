import { motion } from "framer-motion";
import type { GateProps } from "../../types";

export function LogicGate({
  inputs,
  output,
  isActive = false,
  label,
  position = { x: 0, y: 0 },
  children,
}: GateProps & { children: React.ReactNode }) {
  return (
    <motion.div
      className={`absolute select-none ${isActive ? "z-10" : "z-0"}`}
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.15 : 1,
        filter: isActive
          ? "brightness(1.3) drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))"
          : "brightness(1)",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {children}

        {/* Animated input labels with step-by-step calculation */}
        {inputs.map((input, index) => (
          <motion.div
            key={`input-${index}`}
            className={`absolute text-sm font-bold px-2 py-1 rounded shadow-lg ${
              input
                ? "text-green-100 bg-green-600/90"
                : "text-red-100 bg-red-600/90"
            }`}
            style={{
              left: -35,
              top: 10 + index * 25,
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
            >
              {input ? "1" : "0"}
            </motion.span>
          </motion.div>
        ))}

        {/* Animated output label with calculation result */}
        {output !== undefined && (
          <motion.div
            className={`absolute text-sm font-bold px-3 py-1 rounded shadow-lg ${
              output
                ? "text-green-100 bg-green-600/90"
                : "text-red-100 bg-red-600/90"
            }`}
            style={{
              right: -40,
              top: 15,
            }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? [0, 1.5, 1.2] : [0, 1, 1] }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {output ? "1" : "0"}
            </motion.span>
          </motion.div>
        )}

        {/* Enhanced gate label with calculation details */}
        {label && (
          <motion.div
            className="absolute bg-gray-800/90 text-gray-100 text-xs font-bold px-3 py-1 rounded-lg shadow-lg border border-gray-600"
            style={{
              bottom: -35,
              left: "50%",
              transform: "translateX(-50%)",
              minWidth: "120px",
              textAlign: "center",
            }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? [0, 1, 0.8] : 1 }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: isActive ? Infinity : 0,
              }}
            >
              {label}
            </motion.div>
          </motion.div>
        )}

        {/* Active gate glow effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 -m-4 bg-blue-500/20 rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.6, 0.3],
              scale: [0.8, 1.2, 1.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        {/* Step indicator for active calculations */}
        {isActive && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full"
            initial={{ scale: 0, y: -10 }}
            animate={{
              scale: [0, 1.2, 1],
              y: [-10, 0, 0],
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            CALCULATING
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
