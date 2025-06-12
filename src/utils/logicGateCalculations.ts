/**
 * AND Gate Logic
 */
export function andGate(inputA: boolean, inputB: boolean): boolean {
  return inputA && inputB;
}

/**
 * OR Gate Logic
 */
export function orGate(inputA: boolean, inputB: boolean): boolean {
  return inputA || inputB;
}

/**
 * NOT Gate Logic
 */
export function notGate(input: boolean): boolean {
  return !input;
}

/**
 * XOR Gate Logic
 */
export function xorGate(inputA: boolean, inputB: boolean): boolean {
  return inputA !== inputB;
}

/**
 * NAND Gate Logic
 */
export function nandGate(inputA: boolean, inputB: boolean): boolean {
  return !(inputA && inputB);
}

/**
 * NOR Gate Logic
 */
export function norGate(inputA: boolean, inputB: boolean): boolean {
  return !(inputA || inputB);
}

/**
 * Full Adder using basic gates
 */
export function fullAdder(
  a: boolean,
  b: boolean,
  carryIn: boolean
): { sum: boolean; carryOut: boolean } {
  // Sum = A XOR B XOR CarryIn
  const sum = xorGate(xorGate(a, b), carryIn);

  // CarryOut = (A AND B) OR (A AND CarryIn) OR (B AND CarryIn)
  const carryOut = orGate(
    orGate(andGate(a, b), andGate(a, carryIn)),
    andGate(b, carryIn)
  );

  return { sum, carryOut };
}

/**
 * Half Adder using basic gates
 */
export function halfAdder(
  a: boolean,
  b: boolean
): { sum: boolean; carry: boolean } {
  // Sum = A XOR B
  const sum = xorGate(a, b);

  // Carry = A AND B
  const carry = andGate(a, b);

  return { sum, carry };
}

/**
 * Convert string bit to boolean
 */
export function bitToBoolean(bit: string): boolean {
  return bit === "1";
}

/**
 * Convert boolean to string bit
 */
export function booleanToBit(value: boolean): string {
  return value ? "1" : "0";
}

/**
 * Simulate gate propagation delay
 */
export function getGateDelay(gateType: string): number {
  const delays = {
    AND: 100,
    OR: 100,
    NOT: 50,
    XOR: 150,
    NAND: 120,
    NOR: 120,
  };
  return delays[gateType as keyof typeof delays] || 100;
}
