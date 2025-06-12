import { motion } from "framer-motion";
import type { GateProps } from "../../types";
import { LogicGate } from "./LogicGate";
import { notGate } from "../../utils/logicGateCalculations";

export function NOTGate(props: GateProps) {
  const { inputs, isActive, label, position } = props;
  const output = inputs.length >= 1 ? notGate(inputs[0]) : false;

  return (
    <LogicGate
      {...props}
      output={output}
      isActive={isActive}
      label={label || "NOT"}
      position={position}
    >
      <svg width="80" height="50" viewBox="0 0 80 50">
        {/* NOT gate shape (triangle) with animation */}
        <motion.path
          d="M 10 10 L 10 40 L 45 25 Z"
          fill={isActive ? "#EF4444" : "#374151"}
          stroke="#F87171"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: isActive ? 1.1 : 1,
            fill: isActive ? "#EF4444" : "#374151",
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Inversion bubble with animation */}
        <motion.circle
          cx="48"
          cy="25"
          r="4"
          fill={isActive ? "#EF4444" : "#374151"}
          stroke="#F87171"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
            fill: isActive ? "#EF4444" : "#374151",
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            repeat: isActive ? Infinity : 0,
          }}
        />

        {/* Input line with signal animation */}
        <motion.line
          x1="0"
          y1="25"
          x2="10"
          y2="25"
          stroke={inputs[0] ? "#10B981" : "#EF4444"}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />

        {/* Output line with result animation */}
        <motion.line
          x1="52"
          y1="25"
          x2="80"
          y2="25"
          stroke={output ? "#10B981" : "#EF4444"}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Animated input signal */}
        <motion.circle
          cx="5"
          cy="25"
          r="3"
          fill={inputs[0] ? "#10B981" : "#EF4444"}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: inputs[0] ? [0, 1, 1] : [0, 0.5, 0.5],
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Animated output signal */}
        <motion.circle
          cx="75"
          cy="25"
          r="4"
          fill={output ? "#10B981" : "#EF4444"}
          initial={{ scale: 0 }}
          animate={{
            scale: isActive ? [0, 1.5, 1.2] : [0, 1, 1],
            opacity: output ? [0, 1, 1] : [0, 0.5, 0.5],
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* NOT operation animation inside gate */}
        {isActive && (
          <motion.text
            x="27"
            y="27"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#FFFFFF"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.8] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
          >
            !
          </motion.text>
        )}

        {/* Signal flow animation */}
        {isActive && (
          <motion.circle
            cx="0"
            cy="25"
            r="2"
            fill="#FBBF24"
            initial={{ x: 0 }}
            animate={{ x: [0, 25, 50] }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
          />
        )}

        {/* Inversion effect animation */}
        {isActive && (
          <motion.path
            d="M 45 25 Q 48 20 52 25 Q 48 30 45 25"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2"
            strokeDasharray="2,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: 0.8, repeat: Infinity }}
          />
        )}

        {/* Input to output relationship visualization */}
        {isActive && (
          <motion.line
            x1="10"
            y1="25"
            x2="45"
            y2="25"
            stroke={inputs[0] ? "#10B981" : "#EF4444"}
            strokeWidth="2"
            strokeDasharray="3,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
          />
        )}
      </svg>
    </LogicGate>
  );
}
