import { motion } from "framer-motion";
import type { BinaryStep } from "../../types";
import { BitAnimation } from "./BitAnimation";
import { ANDGate } from "../LogicGates/ANDGate";
import { ORGate } from "../LogicGates/ORGate";
import { NOTGate } from "../LogicGates/NOTGate";
import { XORGate } from "../LogicGates/XORGate";

interface BinaryVisualizationProps {
  step: BinaryStep;
  isActive: boolean;
}

export function BinaryVisualization({
  step,
  isActive,
}: BinaryVisualizationProps) {
  if (!step) return null;

  const renderGates = () => {
    return step.activeGates.map((gateName, index) => {
      const position = { x: 120 + index * 150, y: 200 };
      const inputs = [true, false]; // Sample inputs for demonstration

      switch (gateName) {
        case "AND":
          return (
            <ANDGate
              key={`${gateName}-${index}`}
              inputs={inputs}
              isActive={isActive}
              position={position}
            />
          );
        case "OR":
          return (
            <ORGate
              key={`${gateName}-${index}`}
              inputs={inputs}
              isActive={isActive}
              position={position}
            />
          );
        case "NOT":
          return (
            <NOTGate
              key={`${gateName}-${index}`}
              inputs={[inputs[0]]}
              isActive={isActive}
              position={position}
            />
          );
        case "XOR":
          return (
            <XORGate
              key={`${gateName}-${index}`}
              inputs={inputs}
              isActive={isActive}
              position={position}
            />
          );
        default:
          return null;
      }
    });
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
              (Decimal: {parseInt(step.binaryA, 2)})
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
              (Decimal: {parseInt(step.binaryB, 2)})
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
                (Decimal: {parseInt(step.result, 2)})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Logic Gates Visualization - LARGER */}
      {step.activeGates.length > 0 && (
        <div className="bg-gray-900/50 rounded-xl border border-purple-500/30 p-6">
          <h4 className="text-xl font-bold text-purple-300 mb-4 text-center">
            Active Logic Gates in This Step
          </h4>

          <div className="relative h-80 bg-gray-800/30 rounded-lg border-2 border-dashed border-purple-400/30">
            <div className="absolute top-4 left-4 text-lg font-medium text-purple-300">
              Logic Gate Circuit:
            </div>

            {/* Gates rendered larger */}
            <div className="transform scale-125 origin-center">
              {renderGates()}
            </div>

            {/* Connection wires - more prominent */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {step.activeGates.map((_, index) => (
                <motion.g key={`wire-group-${index}`}>
                  <motion.line
                    x1={60}
                    y1={120}
                    x2={140 + index * 150}
                    y2={220}
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: isActive ? 1 : 0.7, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 * index }}
                  />
                  <motion.circle
                    cx={140 + index * 150}
                    cy={220}
                    r="4"
                    fill="#8B5CF6"
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1.5 : 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + 0.1 * index }}
                  />
                </motion.g>
              ))}
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
