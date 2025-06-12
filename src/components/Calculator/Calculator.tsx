import { motion } from "framer-motion";
import { useCalculator } from "../../hooks/useCalculator";
import { Display } from "./Display";
import { Controls } from "./Controls";
import { BinaryVisualization } from "../BinaryDisplay/BinaryVisualization";
import { BinaryConversion } from "../BinaryDisplay/BinaryConversion";

export function Calculator() {
  const {
    state,
    binarySteps,
    currentStep,
    updateInput,
    setOperation,
    calculate,
    reset,
    hideAnimation,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 bg-black/20 border-b border-blue-500/30"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔢 Binary Logic Calculator
        </h1>
        <p className="text-blue-200 text-xl max-w-3xl mx-auto">
          Watch how computers really calculate: Step-by-step binary arithmetic
          with animated logic gates
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Controls (Optimized) */}
        <div className="lg:w-1/3 xl:w-80 p-4 lg:p-6 bg-black/30 border-r border-blue-500/20 min-h-screen overflow-y-auto">
          <div className="space-y-4 max-w-sm mx-auto">
            <Controls
              inputA={state.inputA}
              inputB={state.inputB}
              operation={state.operation}
              onInputAChange={(value) => updateInput("inputA", value)}
              onInputBChange={(value) => updateInput("inputB", value)}
              onOperationChange={setOperation}
              onCalculate={calculate}
              onReset={reset}
              isCalculating={state.isCalculating}
            />

            <Display
              inputA={state.inputA}
              inputB={state.inputB}
              operation={state.operation}
              result={state.result}
              isCalculating={state.isCalculating}
            />
          </div>
        </div>

        {/* Right Panel - Binary Visualization (Main Focus) */}
        <div className="lg:w-2/3 xl:flex-1 p-4 lg:p-6">
          {/* Show binary conversions when numbers are entered but not calculating */}
          {!state.showAnimation && (state.inputA || state.inputB) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">
                🔄 Live Binary Conversion
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.inputA && (
                  <BinaryConversion
                    decimal={parseInt(state.inputA) || 0}
                    label="Number A"
                    color="blue"
                    delay={0}
                  />
                )}
                {state.inputB && (
                  <BinaryConversion
                    decimal={parseInt(state.inputB) || 0}
                    label="Number B"
                    color="green"
                    delay={0.2}
                  />
                )}
              </div>
              {state.inputA && state.inputB && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8"
                >
                  <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">
                      🚀 Ready for Binary Magic!
                    </h3>
                    <p className="text-yellow-200 text-lg">
                      Click "Calculate Binary" to see how these numbers are
                      processed using logic gates
                    </p>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl mt-4"
                    >
                      ⚡
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {state.showAnimation && binarySteps.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-300">
                  🧠 Binary Arithmetic in Action
                </h2>
                <button
                  onClick={hideAnimation}
                  className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  Hide Animation
                </button>
              </div>

              {/* Current step visualization - MUCH LARGER */}
              {binarySteps[currentStep] && (
                <div className="mb-8">
                  <BinaryVisualization
                    step={binarySteps[currentStep]}
                    isActive={state.isCalculating}
                  />
                </div>
              )}

              {/* Step progress with larger visual */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/30 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-blue-300">
                    Step {currentStep + 1} of {binarySteps.length}
                  </span>
                  <span className="text-blue-400 text-lg">
                    {Math.round(((currentStep + 1) / binarySteps.length) * 100)}
                    % Complete
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((currentStep + 1) / binarySteps.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Current step description - PROMINENT */}
                {binarySteps[currentStep] && (
                  <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                    <p className="text-xl text-blue-100 font-medium">
                      {binarySteps[currentStep].description}
                    </p>
                  </div>
                )}
              </div>

              {/* All steps summary - More visual */}
              {!state.isCalculating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/30"
                >
                  <h3 className="text-2xl font-bold text-blue-300 mb-4">
                    📋 Complete Calculation Journey
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {binarySteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 transition-all ${
                          index === currentStep
                            ? "bg-blue-900/50 border-blue-400 text-blue-100"
                            : "bg-gray-700/30 border-gray-600 text-gray-300"
                        }`}
                      >
                        <span className="font-bold text-lg">
                          Step {step.step}:
                        </span>
                        <p className="mt-1">{step.description}</p>
                        {step.activeGates.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {step.activeGates.map((gate, gateIndex) => (
                              <span
                                key={gateIndex}
                                className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-sm font-mono"
                              >
                                {gate}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Default state - Encourage calculation */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-8xl mb-8">🔍</div>
                <h2 className="text-4xl font-bold text-blue-300 mb-4">
                  Ready to Explore Binary Magic?
                </h2>
                <p className="text-xl text-blue-200 mb-8 max-w-2xl">
                  Enter two numbers and select an operation to see how computers
                  perform calculations using binary arithmetic and logic gates.
                </p>
                <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto text-left">
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                    <h3 className="font-bold text-blue-300 mb-2">
                      Addition (+)
                    </h3>
                    <p className="text-sm text-blue-200">
                      Full adder circuits with XOR, AND gates
                    </p>
                  </div>
                  <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                    <h3 className="font-bold text-purple-300 mb-2">
                      Subtraction (-)
                    </h3>
                    <p className="text-sm text-purple-200">
                      Two's complement with NOT gates
                    </p>
                  </div>
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-300 mb-2">
                      Multiplication (×)
                    </h3>
                    <p className="text-sm text-green-200">
                      Shift and add algorithm
                    </p>
                  </div>
                  <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                    <h3 className="font-bold text-orange-300 mb-2">
                      Division (÷)
                    </h3>
                    <p className="text-sm text-orange-200">
                      Restoring division method
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
