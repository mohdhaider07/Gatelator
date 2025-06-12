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
      <svg width="60" height="40" viewBox="0 0 60 40">
        {/* NOT gate shape (triangle) */}
        <path
          d="M 5 5 L 5 35 L 40 20 Z"
          fill={isActive ? "#3B82F6" : "#E5E7EB"}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Inversion bubble */}
        <circle
          cx="43"
          cy="20"
          r="3"
          fill={isActive ? "#3B82F6" : "#E5E7EB"}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Input line */}
        <line x1="0" y1="20" x2="5" y2="20" stroke="#374151" strokeWidth="2" />

        {/* Output line */}
        <line
          x1="46"
          y1="20"
          x2="60"
          y2="20"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Input dot */}
        <circle cx="2" cy="20" r="2" fill={inputs[0] ? "#10B981" : "#EF4444"} />

        {/* Output dot */}
        <circle cx="58" cy="20" r="2" fill={output ? "#10B981" : "#EF4444"} />
      </svg>
    </LogicGate>
  );
}
