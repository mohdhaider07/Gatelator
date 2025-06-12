import type { GateProps } from "../../types";
import { LogicGate } from "./LogicGate";
import { xorGate } from "../../utils/logicGateCalculations";

export function XORGate(props: GateProps) {
  const { inputs, isActive, label, position } = props;
  const output = inputs.length >= 2 ? xorGate(inputs[0], inputs[1]) : false;

  return (
    <LogicGate
      {...props}
      output={output}
      isActive={isActive}
      label={label || "XOR"}
      position={position}
    >
      <svg width="60" height="50" viewBox="0 0 60 50">
        {/* XOR gate shape with extra curved line */}
        <path
          d="M 8 5 Q 18 5 33 25 Q 18 45 8 45 Q 23 25 8 5"
          fill={isActive ? "#3B82F6" : "#E5E7EB"}
          stroke="#374151"
          strokeWidth="2"
        />
        <path
          d="M 33 25 Q 48 15 53 25 Q 48 35 33 25"
          fill={isActive ? "#3B82F6" : "#E5E7EB"}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Extra curved line for XOR */}
        <path
          d="M 5 5 Q 20 25 5 45"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Input lines */}
        <line x1="0" y1="15" x2="12" y2="15" stroke="#374151" strokeWidth="2" />
        <line x1="0" y1="35" x2="12" y2="35" stroke="#374151" strokeWidth="2" />

        {/* Output line */}
        <line
          x1="53"
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
