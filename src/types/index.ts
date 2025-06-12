export type Operation = "+" | "-" | "*" | "/";

export interface CalculatorState {
  inputA: string;
  inputB: string;
  operation: Operation;
  result: number | null;
  isCalculating: boolean;
  showAnimation: boolean;
}

export interface BinaryStep {
  step: number;
  description: string;
  binaryA: string;
  binaryB: string;
  operation: string;
  result: string;
  activeGates: string[];
}

export interface GateProps {
  inputs: boolean[];
  output?: boolean;
  isActive?: boolean;
  label?: string;
  position?: { x: number; y: number };
}

export interface WireProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isActive?: boolean;
  signal?: boolean;
}

export interface AnimationStep {
  id: string;
  type: "gate" | "wire" | "result";
  delay: number;
  duration: number;
  data: Record<string, unknown>;
}
