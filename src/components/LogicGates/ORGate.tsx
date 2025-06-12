import { motion } from "framer-motion";
import type { GateProps } from "../../types";
import { LogicGate } from "./LogicGate";
import { orGate } from "../../utils/logicGateCalculations";

export function ORGate(props: GateProps) {
  const { inputs, isActive, label, position } = props;
  const output = inputs.length >= 2 ? orGate(inputs[0], inputs[1]) : false;

  return (
    <LogicGate
      {...props}
      output={output}
      isActive={isActive}
      label={label || "OR"}
      position={position}
    >
      <svg width="80" height="60" viewBox="0 0 80 60">
        {/* OR gate shape with animation */}
        <motion.path
          d="M 10 10 Q 20 10 35 30 Q 20 50 10 50 Q 25 30 10 10"
          fill={isActive ? "#F59E0B" : "#374151"}
          stroke="#FBBF24"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: isActive ? 1.1 : 1,
            fill: isActive ? "#F59E0B" : "#374151",
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.path
          d="M 35 30 Q 50 20 55 30 Q 50 40 35 30"
          fill={isActive ? "#F59E0B" : "#374151"}
          stroke="#FBBF24"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: isActive ? 1.1 : 1,
            fill: isActive ? "#F59E0B" : "#374151",
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Input lines with signal animation */}
        <motion.line
          x1="0"
          y1="20"
          x2="15"
          y2="20"
          stroke={inputs[0] ? "#10B981" : "#EF4444"}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.line
          x1="0"
          y1="40"
          x2="15"
          y2="40"
          stroke={inputs[1] ? "#10B981" : "#EF4444"}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Output line with result animation */}
        <motion.line
          x1="55"
          y1="30"
          x2="80"
          y2="30"
          stroke={output ? "#10B981" : "#EF4444"}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Animated input signals */}
        <motion.circle
          cx="5"
          cy="20"
          r="3"
          fill={inputs[0] ? "#10B981" : "#EF4444"}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: inputs[0] ? [0, 1, 1] : [0, 0.5, 0.5],
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.circle
          cx="5"
          cy="40"
          r="3"
          fill={inputs[1] ? "#10B981" : "#EF4444"}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: inputs[1] ? [0, 1, 1] : [0, 0.5, 0.5],
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Animated output signal */}
        <motion.circle
          cx="75"
          cy="30"
          r="4"
          fill={output ? "#10B981" : "#EF4444"}
          initial={{ scale: 0 }}
          animate={{
            scale: isActive ? [0, 1.5, 1.2] : [0, 1, 1],
            opacity: output ? [0, 1, 1] : [0, 0.5, 0.5],
          }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* OR calculation animation inside gate */}
        {isActive && (
          <motion.text
            x="32"
            y="32"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#FFFFFF"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.8] }}
            transition={{ duration: 2, delay: 0.8, repeat: Infinity }}
          >
            |
          </motion.text>
        )}

        {/* Signal flow animation */}
        {isActive && (
          <>
            <motion.circle
              cx="0"
              cy="20"
              r="2"
              fill="#FBBF24"
              initial={{ x: 0 }}
              animate={{ x: [0, 25, 50] }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
            />
            <motion.circle
              cx="0"
              cy="40"
              r="2"
              fill="#FBBF24"
              initial={{ x: 0 }}
              animate={{ x: [0, 25, 50] }}
              transition={{ duration: 1.5, delay: 0.7, repeat: Infinity }}
            />
          </>
        )}

        {/* OR gate specific animation - highlight if any input is true */}
        {isActive && (inputs[0] || inputs[1]) && (
          <motion.circle
            cx="32"
            cy="30"
            r="15"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2"
            strokeDasharray="4,2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 1.5] }}
            transition={{ duration: 1.5, delay: 0.8, repeat: Infinity }}
          />
        )}
      </svg>
    </LogicGate>
  );
}
