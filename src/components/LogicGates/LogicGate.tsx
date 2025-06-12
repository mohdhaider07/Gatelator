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
      animate={{
        scale: isActive ? 1.1 : 1,
        filter: isActive
          ? "brightness(1.2) drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))"
          : "brightness(1)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {children}

        {/* Input labels */}
        {inputs.map((input, index) => (
          <div
            key={`input-${index}`}
            className={`absolute text-xs font-bold ${
              input ? "text-green-600" : "text-red-600"
            }`}
            style={{
              left: -20,
              top: 15 + index * 20,
            }}
          >
            {input ? "1" : "0"}
          </div>
        ))}

        {/* Output label */}
        {output !== undefined && (
          <div
            className={`absolute text-xs font-bold ${
              output ? "text-green-600" : "text-red-600"
            }`}
            style={{
              right: -20,
              top: 25,
            }}
          >
            {output ? "1" : "0"}
          </div>
        )}

        {/* Gate label */}
        {label && (
          <div className="absolute text-xs font-bold text-gray-700 -bottom-6 left-1/2 transform -translate-x-1/2">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  );
}
