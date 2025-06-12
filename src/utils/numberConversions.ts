/**
 * Convert decimal number to binary string with specified bit width
 */
export function decimalToBinary(num: number, bitWidth: number = 8): string {
  if (num < 0) {
    // Two's complement for negative numbers
    const positive = Math.abs(num);
    const binary = positive.toString(2).padStart(bitWidth, "0");
    return twosComplement(binary);
  }
  return num.toString(2).padStart(bitWidth, "0");
}

/**
 * Convert binary string to decimal number
 */
export function binaryToDecimal(binary: string): number {
  // Check if it's a negative number (MSB is 1)
  if (binary[0] === "1" && binary.length > 1) {
    // Convert from two's complement
    const inverted = binary
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join("");
    const decimal = parseInt(inverted, 2) + 1;
    return -decimal;
  }
  return parseInt(binary, 2);
}

/**
 * Calculate two's complement of a binary string
 */
export function twosComplement(binary: string): string {
  // Invert all bits
  const inverted = binary
    .split("")
    .map((bit) => (bit === "0" ? "1" : "0"))
    .join("");

  // Add 1
  let carry = 1;
  const result = inverted
    .split("")
    .reverse()
    .map((bit) => {
      const sum = parseInt(bit) + carry;
      carry = sum > 1 ? 1 : 0;
      return (sum % 2).toString();
    })
    .reverse()
    .join("");

  return result;
}

/**
 * Get the bit width needed for a number
 */
export function getRequiredBitWidth(a: number, b: number): number {
  const maxNum = Math.max(Math.abs(a), Math.abs(b));
  const minBits = Math.ceil(Math.log2(maxNum + 1)) + 1; // +1 for sign bit
  return Math.max(minBits, 8); // Minimum 8 bits
}

/**
 * Pad binary strings to same length
 */
export function padBinaryStrings(a: string, b: string): [string, string] {
  const maxLength = Math.max(a.length, b.length);
  return [
    a.padStart(maxLength, a[0] || "0"),
    b.padStart(maxLength, b[0] || "0"),
  ];
}
