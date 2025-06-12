import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import type { BinaryStep } from "../../types";
import { BitAnimation } from "./BitAnimation";
import { ANDGate } from "../LogicGates/ANDGate";
import { ORGate } from "../LogicGates/ORGate";
import { NOTGate } from "../LogicGates/NOTGate";
import { XORGate } from "../LogicGates/XORGate";
import { binaryToDecimal } from "../../utils/numberConversions";

interface BinaryVisualizationProps {
  step: BinaryStep;
  isActive: boolean;
}

export function BinaryVisualization({
  step,
  isActive,
}: BinaryVisualizationProps) {
  // State for step-by-step gate animation
  const [currentGateIndex, setCurrentGateIndex] = useState(0);
  const [gateActivationSteps, setGateActivationSteps] = useState<boolean[]>([]);

  useEffect(() => {
    if (isActive && step?.activeGates) {
      setCurrentGateIndex(0);
      setGateActivationSteps(new Array(step.activeGates.length).fill(false));

      // Activate gates one by one with delays
      step.activeGates.forEach((_, index) => {
        setTimeout(() => {
          setGateActivationSteps((prev) => {
            const newSteps = [...prev];
            newSteps[index] = true;
            return newSteps;
          });
          setCurrentGateIndex(index);
        }, index * 1000); // 1 second delay between each gate
      });
    } else {
      setCurrentGateIndex(0);
      setGateActivationSteps([]);
    }
  }, [isActive, step?.activeGates]);

  if (!step) return null;

  const renderGates = () => {
    const gates: React.ReactElement[] = [];
    const maxBits = Math.min(
      Math.max(step.binaryA.length, step.binaryB.length),
      4
    );

    // For addition operations, show full adder circuit
    if (step.operation === "+" && step.activeGates.includes("XOR")) {
      for (let bitPos = 0; bitPos < maxBits; bitPos++) {
        const bitIndexA = step.binaryA.length - 1 - bitPos;
        const bitIndexB = step.binaryB.length - 1 - bitPos;

        // Get actual bit values for this position
        const bitA = bitIndexA >= 0 ? step.binaryA[bitIndexA] === "1" : false;
        const bitB = bitIndexB >= 0 ? step.binaryB[bitIndexB] === "1" : false;
        const carryIn = bitPos > 0; // Simplified carry logic

        // Calculate actual outputs
        const xorOutput = bitA !== bitB;
        const sumOutput = xorOutput !== carryIn;
        const carryOutput = (bitA && bitB) || (xorOutput && carryIn);

        const baseX = 60 + bitPos * 180;
        const baseY = 80;

        // Determine if this gate should be animated based on timing
        const gateDelay = bitPos * 0.8;
        const isThisBitActive = gateActivationSteps[bitPos] && isActive;

        // XOR gate for A ⊕ B with animated timing
        gates.push(
          <motion.div
            key={`xor1-wrapper-${bitPos}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: gateDelay, duration: 0.6 }}
          >
            <XORGate
              inputs={[bitA, bitB]}
              isActive={isThisBitActive}
              position={{ x: baseX, y: baseY }}
              label={`Bit ${bitPos}: ${bitA ? "1" : "0"} ⊕ ${
                bitB ? "1" : "0"
              } = ${xorOutput ? "1" : "0"}`}
            />
          </motion.div>
        );

        // XOR gate for final sum
        gates.push(
          <motion.div
            key={`xor2-wrapper-${bitPos}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: gateDelay + 1.0, duration: 0.6 }}
          >
            <XORGate
              inputs={[xorOutput, carryIn]}
              isActive={isThisBitActive}
              position={{ x: baseX, y: baseY + 80 }}
              label={`Sum ${bitPos}: ${xorOutput ? "1" : "0"} ⊕ C = ${
                sumOutput ? "1" : "0"
              }`}
            />
          </motion.div>
        );

        // AND gate for carry
        gates.push(
          <motion.div
            key={`and-wrapper-${bitPos}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: gateDelay + 0.5, duration: 0.6 }}
          >
            <ANDGate
              inputs={[bitA, bitB]}
              isActive={isThisBitActive}
              position={{ x: baseX + 90, y: baseY + 40 }}
              label={`Carry: ${bitA ? "1" : "0"} & ${bitB ? "1" : "0"} = ${
                carryOutput ? "1" : "0"
              }`}
            />
          </motion.div>
        );
      }
    } else {
      // For other operations, show step-by-step gate calculation
      step.activeGates.forEach((gateName, gateIndex) => {
        const maxDisplayBits = Math.min(maxBits, 3);

        for (let bitPos = 0; bitPos < maxDisplayBits; bitPos++) {
          const bitIndexA = step.binaryA.length - 1 - bitPos;
          const bitIndexB = step.binaryB.length - 1 - bitPos;

          const bitA = bitIndexA >= 0 ? step.binaryA[bitIndexA] === "1" : false;
          const bitB = bitIndexB >= 0 ? step.binaryB[bitIndexB] === "1" : false;

          const position = {
            x: 100 + bitPos * 160 + gateIndex * 60,
            y: 120 + gateIndex * 70,
          };

          // Calculate expected output
          let expectedOutput = false;
          let inputs: boolean[] = [];

          switch (gateName) {
            case "AND":
              expectedOutput = bitA && bitB;
              inputs = [bitA, bitB];
              break;
            case "OR":
              expectedOutput = bitA || bitB;
              inputs = [bitA, bitB];
              break;
            case "XOR":
              expectedOutput = bitA !== bitB;
              inputs = [bitA, bitB];
              break;
            case "NOT":
              expectedOutput = !bitA;
              inputs = [bitA];
              break;
          }

          const gateKey = `${gateName}-${bitPos}-${gateIndex}`;
          const gateLabel =
            gateName === "NOT"
              ? `!${bitA ? "1" : "0"} = ${expectedOutput ? "1" : "0"}`
              : `${bitA ? "1" : "0"} ${getGateSymbol(gateName)} ${
                  bitB ? "1" : "0"
                } = ${expectedOutput ? "1" : "0"}`;

          // Animation timing for step-by-step calculation
          const animationDelay = (gateIndex * maxDisplayBits + bitPos) * 0.6;
          const isThisGateActive = gateActivationSteps[gateIndex] && isActive;

          let gateComponent: React.ReactElement | null = null;

          switch (gateName) {
            case "AND":
              gateComponent = (
                <motion.div
                  key={`${gateKey}-wrapper`}
                  initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: animationDelay, duration: 0.8 }}
                >
                  <ANDGate
                    inputs={inputs}
                    isActive={isThisGateActive}
                    position={position}
                    label={gateLabel}
                  />
                </motion.div>
              );
              break;
            case "OR":
              gateComponent = (
                <motion.div
                  key={`${gateKey}-wrapper`}
                  initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: animationDelay, duration: 0.8 }}
                >
                  <ORGate
                    inputs={inputs}
                    isActive={isThisGateActive}
                    position={position}
                    label={gateLabel}
                  />
                </motion.div>
              );
              break;
            case "NOT":
              gateComponent = (
                <motion.div
                  key={`${gateKey}-wrapper`}
                  initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: animationDelay, duration: 0.8 }}
                >
                  <NOTGate
                    inputs={inputs}
                    isActive={isThisGateActive}
                    position={position}
                    label={gateLabel}
                  />
                </motion.div>
              );
              break;
            case "XOR":
              gateComponent = (
                <motion.div
                  key={`${gateKey}-wrapper`}
                  initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: animationDelay, duration: 0.8 }}
                >
                  <XORGate
                    inputs={inputs}
                    isActive={isThisGateActive}
                    position={position}
                    label={gateLabel}
                  />
                </motion.div>
              );
              break;
          }

          if (gateComponent) {
            gates.push(gateComponent);
          }
        }
      });
    }

    return gates;
  };

  const getGateSymbol = (gateName: string): string => {
    switch (gateName) {
      case "AND":
        return "&";
      case "OR":
        return "|";
      case "XOR":
        return "^";
      case "NOT":
        return "!";
      default:
        return "?";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-2xl border border-blue-500/30 p-8 mb-6"
    >
      {/* Binary Numbers Display - MUCH LARGER */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-300 mb-6 text-center">
          Binary Representation & Operation
        </h3>

        <div className="space-y-6">
          {/* Input A - Larger bits */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl font-bold text-blue-300 w-24">
              Input A:
            </span>
            <div className="flex space-x-2">
              {step.binaryA.split("").map((bit, index) => (
                <BitAnimation
                  key={`a-${index}`}
                  bit={bit}
                  index={index}
                  isActive={isActive}
                  delay={0}
                />
              ))}
            </div>
            <span className="text-lg text-gray-400 ml-4">
              (Decimal: {binaryToDecimal(step.binaryA)})
            </span>
          </div>

          {/* Operation Symbol - Prominent */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600/30 rounded-full border-2 border-orange-400">
              <span className="text-3xl font-bold text-orange-300">
                {step.operation}
              </span>
            </div>
          </div>

          {/* Input B - Larger bits */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl font-bold text-green-300 w-24">
              Input B:
            </span>
            <div className="flex space-x-2">
              {step.binaryB.split("").map((bit, index) => (
                <BitAnimation
                  key={`b-${index}`}
                  bit={bit}
                  index={index}
                  isActive={isActive}
                  delay={0.3}
                />
              ))}
            </div>
            <span className="text-lg text-gray-400 ml-4">
              (Decimal: {binaryToDecimal(step.binaryB)})
            </span>
          </div>

          {/* Equals line with animation */}
          <div className="flex justify-center">
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
              initial={{ width: 0 }}
              animate={{ width: isActive ? "400px" : "300px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </div>

          {/* Result - Most prominent */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-xl font-bold text-purple-300 w-24">
              Result:
            </span>
            <div className="flex space-x-2">
              {step.result !== "ERROR" &&
                step.result
                  .split("")
                  .map((bit, index) => (
                    <BitAnimation
                      key={`result-${index}`}
                      bit={bit}
                      index={index}
                      isActive={isActive}
                      delay={0.8}
                    />
                  ))}
              {step.result === "ERROR" && (
                <div className="text-2xl font-bold text-red-400 px-4 py-2 bg-red-900/30 rounded-lg border border-red-500/30">
                  ERROR
                </div>
              )}
            </div>
            {step.result !== "ERROR" && (
              <span className="text-lg text-gray-400 ml-4">
                (Decimal: {binaryToDecimal(step.result)})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Logic Gates Visualization - ENHANCED FOR STEP-BY-STEP ANIMATION */}
      {step.activeGates.length > 0 && (
        <div className="bg-gray-900/50 rounded-xl border border-purple-500/30 p-6">
          <h4 className="text-xl font-bold text-purple-300 mb-4 text-center">
            {step.operation === "+"
              ? "🔧 Full Adder Circuit - Step-by-Step Calculation"
              : "⚡ Logic Gate Circuit - Bit-by-Bit Operation"}
          </h4>

          {/* Animation Progress Indicator */}
          <div className="mb-4">
            <div className="flex justify-center space-x-2 mb-2">
              {step.activeGates.map((gateName, index) => (
                <motion.div
                  key={`progress-${index}`}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    gateActivationSteps[index]
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: gateActivationSteps[index] ? [1, 1.2, 1] : 1,
                    backgroundColor: gateActivationSteps[index]
                      ? "#16A34A"
                      : "#4B5563",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {gateName}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${
                  (gateActivationSteps.filter(Boolean).length /
                    step.activeGates.length) *
                  100
                }%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="relative h-96 bg-gray-800/30 rounded-lg border-2 border-dashed border-purple-400/30 overflow-hidden">
            <div className="absolute top-4 left-4 text-lg font-medium text-purple-300 z-10">
              {step.operation === "+"
                ? "🧮 Binary Addition Circuit:"
                : "🔍 Logic Gate Operations:"}
            </div>

            {/* Current Step Indicator */}
            {isActive && (
              <motion.div
                className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold z-10"
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              >
                STEP {currentGateIndex + 1}/{step.activeGates.length}
              </motion.div>
            )}

            {/* Gates rendered with enhanced spacing and scaling */}
            <div className="absolute inset-0 transform scale-75 lg:scale-90 origin-center overflow-hidden">
              <div className="relative w-full h-full">{renderGates()}</div>
            </div>

            {/* Enhanced connection wires with signal flow animation */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Input signal lines */}
              <motion.g>
                <motion.line
                  x1="20"
                  y1="100"
                  x2="100"
                  y2="150"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="6,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: isActive ? 1 : 0.5, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.text
                  x="25"
                  y="95"
                  fill="#3B82F6"
                  fontSize="12"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Input A
                </motion.text>
              </motion.g>

              <motion.g>
                <motion.line
                  x1="20"
                  y1="300"
                  x2="100"
                  y2="250"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="6,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: isActive ? 1 : 0.5, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                <motion.text
                  x="25"
                  y="320"
                  fill="#10B981"
                  fontSize="12"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Input B
                </motion.text>
              </motion.g>

              {/* Signal flow particles */}
              {isActive && (
                <>
                  <motion.circle
                    cx="20"
                    cy="100"
                    r="3"
                    fill="#FBBF24"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 80, 150] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="20"
                    cy="300"
                    r="3"
                    fill="#FBBF24"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 80, 150] }}
                    transition={{ duration: 2, delay: 1.2, repeat: Infinity }}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Gate explanation */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {step.activeGates.map((gate, index) => (
              <motion.div
                key={`gate-info-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-lg"
              >
                <span className="text-purple-300 font-bold">{gate} Gate</span>
                <span className="text-purple-200 text-sm ml-2">
                  {gate === "AND" && "• Output 1 only if both inputs are 1"}
                  {gate === "OR" && "• Output 1 if any input is 1"}
                  {gate === "XOR" && "• Output 1 if inputs are different"}
                  {gate === "NOT" && "• Inverts the input"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
