import {
  decimalToBinary,
  twosComplement,
  getRequiredBitWidth,
} from "./numberConversions";
import type { BinaryStep } from "../types";

/**
 * Simulate binary addition using full adder logic
 */
export function binaryAddition(a: number, b: number): BinaryStep[] {
  const bitWidth = getRequiredBitWidth(a, b) + 1; // Extra bit for overflow
  const binaryA = decimalToBinary(a, bitWidth);
  const binaryB = decimalToBinary(b, bitWidth);

  const steps: BinaryStep[] = [];
  let carry = 0;
  let result = "";

  // Process from least significant bit to most significant bit
  for (let i = bitWidth - 1; i >= 0; i--) {
    const bitA = parseInt(binaryA[i]);
    const bitB = parseInt(binaryB[i]);

    // XOR for sum, AND for carry
    const sum = bitA ^ bitB ^ carry;
    const newCarry = (bitA & bitB) | (bitA & carry) | (bitB & carry);

    result = sum.toString() + result;

    steps.push({
      step: bitWidth - i,
      description: `Adding bit ${i}: ${bitA} + ${bitB} + carry(${carry}) = ${sum}, new carry: ${newCarry}`,
      binaryA: binaryA,
      binaryB: binaryB,
      operation: "+",
      result: result.padStart(bitWidth, "0"),
      activeGates: ["XOR", "AND", "OR"],
    });

    carry = newCarry;
  }

  return steps;
}

/**
 * Simulate binary subtraction using two's complement
 */
export function binarySubtraction(a: number, b: number): BinaryStep[] {
  const steps: BinaryStep[] = [];
  const bitWidth = getRequiredBitWidth(a, b) + 1;

  // Convert B to two's complement
  const binaryB = decimalToBinary(b, bitWidth);
  const twosCompB = twosComplement(binaryB);

  steps.push({
    step: 1,
    description: `Converting ${b} to two's complement`,
    binaryA: decimalToBinary(a, bitWidth),
    binaryB: binaryB,
    operation: "NOT",
    result: binaryB
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""),
    activeGates: ["NOT"],
  });

  steps.push({
    step: 2,
    description: `Adding 1 to get two's complement`,
    binaryA: decimalToBinary(a, bitWidth),
    binaryB: binaryB
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join(""),
    operation: "+",
    result: twosCompB,
    activeGates: ["XOR", "AND"],
  });

  // Now add A + (-B)
  const additionSteps = binaryAddition(a, -b);
  steps.push(
    ...additionSteps.map((step, index) => ({
      ...step,
      step: index + 3,
      description: `Adding ${a} + (-${b}): ${step.description}`,
    }))
  );

  return steps;
}

/**
 * Simulate binary multiplication using shift and add
 */
export function binaryMultiplication(a: number, b: number): BinaryStep[] {
  const steps: BinaryStep[] = [];
  const bitWidth = getRequiredBitWidth(a, b) * 2; // Double width for multiplication

  const binaryA = decimalToBinary(Math.abs(a), bitWidth / 2);
  const binaryB = decimalToBinary(Math.abs(b), bitWidth / 2);

  let result = "0".repeat(bitWidth);
  let multiplicand = binaryA.padStart(bitWidth, "0");

  steps.push({
    step: 1,
    description: `Initialize: multiplicand = ${binaryA}, multiplier = ${binaryB}`,
    binaryA: binaryA,
    binaryB: binaryB,
    operation: "*",
    result: result,
    activeGates: [],
  });

  // For each bit in multiplier
  for (let i = binaryB.length - 1; i >= 0; i--) {
    const bit = binaryB[i];

    if (bit === "1") {
      // Add multiplicand to result
      const prevResult = result;
      const addResult = addBinaryStrings(result, multiplicand);
      result = addResult;

      steps.push({
        step: steps.length + 1,
        description: `Multiplier bit ${
          binaryB.length - 1 - i
        }: 1, adding multiplicand to result`,
        binaryA: multiplicand,
        binaryB: prevResult,
        operation: "+",
        result: result,
        activeGates: ["AND", "XOR", "OR"],
      });
    } else {
      steps.push({
        step: steps.length + 1,
        description: `Multiplier bit ${
          binaryB.length - 1 - i
        }: 0, no addition needed`,
        binaryA: multiplicand,
        binaryB: result,
        operation: "&",
        result: result,
        activeGates: ["AND"],
      });
    }

    // Shift multiplicand left
    if (i > 0) {
      multiplicand = multiplicand.slice(0, -1) + "0";
      steps.push({
        step: steps.length + 1,
        description: `Shift multiplicand left`,
        binaryA: multiplicand,
        binaryB: binaryB,
        operation: "<<",
        result: result,
        activeGates: [],
      });
    }
  }

  // Handle sign
  if (a < 0 !== b < 0) {
    result = twosComplement(result);
    steps.push({
      step: steps.length + 1,
      description: `Applying sign (negative result)`,
      binaryA: binaryA,
      binaryB: binaryB,
      operation: "NOT",
      result: result,
      activeGates: ["NOT"],
    });
  }

  return steps;
}

/**
 * Simulate binary division using restoring division
 */
export function binaryDivision(a: number, b: number): BinaryStep[] {
  const steps: BinaryStep[] = [];

  if (b === 0) {
    steps.push({
      step: 1,
      description: "Division by zero error",
      binaryA: decimalToBinary(a, 8),
      binaryB: "00000000",
      operation: "/",
      result: "ERROR",
      activeGates: [],
    });
    return steps;
  }

  const bitWidth = getRequiredBitWidth(a, b);
  const isNegative = a < 0 !== b < 0;

  const dividend = Math.abs(a);
  const divisor = Math.abs(b);
  const quotient = Math.floor(dividend / divisor);

  steps.push({
    step: 1,
    description: `Division: ${a} ÷ ${b} = ${a / b}`,
    binaryA: decimalToBinary(dividend, bitWidth),
    binaryB: decimalToBinary(divisor, bitWidth),
    operation: "/",
    result: decimalToBinary(isNegative ? -quotient : quotient, bitWidth),
    activeGates: ["AND", "OR", "XOR"],
  });

  return steps;
}

/**
 * Helper function to add two binary strings
 */
function addBinaryStrings(a: string, b: string): string {
  const maxLength = Math.max(a.length, b.length);
  const paddedA = a.padStart(maxLength, "0");
  const paddedB = b.padStart(maxLength, "0");

  let result = "";
  let carry = 0;

  for (let i = maxLength - 1; i >= 0; i--) {
    const sum = parseInt(paddedA[i]) + parseInt(paddedB[i]) + carry;
    result = (sum % 2).toString() + result;
    carry = Math.floor(sum / 2);
  }

  if (carry) {
    result = "1" + result;
  }

  return result;
}
