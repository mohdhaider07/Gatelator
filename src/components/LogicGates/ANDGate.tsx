import type { GateProps } from "../../types";
import { LogicGate } from "./LogicGate";
import { andGate } from "../../utils/logicGateCalculations";

export function ANDGate(props: GateProps) {
  const { inputs, isActive, label, position } = props;
  const output = inputs.length >= 2 ? andGate(inputs[0], inputs[1]) : false;

  return (
    <LogicGate
      {...props}
      output={output}
      isActive={isActive}
      label={label || "AND"}
      position={position}
    >
      <svg width="60" height="50" viewBox="0 0 60 50">
        {/* AND gate shape */}
        <path
          d="M 5 5 L 30 5 A 20 20 0 0 1 30 45 L 5 45 Z"
          fill={isActive ? "#3B82F6" : "#E5E7EB"}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Input lines */}
        <line x1="0" y1="15" x2="5" y2="15" stroke="#374151" strokeWidth="2" />
        <line x1="0" y1="35" x2="5" y2="35" stroke="#374151" strokeWidth="2" />

        {/* Output line */}
        <line
          x1="50"
          y1="25"
          x2="60"
          y2="25"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Input dots */}
        <circle cx="2" cy="15" r="2" fill={inputs[0] ? "#10B981" : "#EF4444"} />
        <circle cx="2" cy="35" r="2" fill={inputs[1] ? "#10B981" : "#EF4444"} />

        {/* Output dot */}
        <circle cx="58" cy="25" r="2" fill={output ? "#10B981" : "#EF4444"} />
      </svg>
    </LogicGate>
  );
}
