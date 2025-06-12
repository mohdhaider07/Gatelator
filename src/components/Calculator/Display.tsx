import { motion } from "framer-motion";

interface DisplayProps {
  inputA: string;
  inputB: string;
  operation: string;
  result: number | null;
  isCalculating: boolean;
}

export function Display({
  inputA,
  inputB,
  operation,
  result,
  isCalculating,
}: DisplayProps) {
  const formatNumber = (num: string) => {
    return num || "0";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/70 text-white p-4 rounded-xl border border-purple-500/30 shadow-xl"
    >
      <div className="space-y-4">
        {/* Input display */}
        <div className="text-center">
          <div className="text-xl lg:text-2xl font-mono font-bold">
            <span className="text-blue-400">{formatNumber(inputA)}</span>
            <span className="text-orange-400 mx-2 text-2xl lg:text-3xl">
              {operation}
            </span>
            <span className="text-green-400">{formatNumber(inputB)}</span>
          </div>
        </div>

        {/* Equals line */}
        <div className="border-t border-purple-500/50"></div>

        {/* Result display */}
        <div className="text-center">
          {isCalculating ? (
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl lg:text-3xl font-mono text-yellow-400 font-bold"
            >
              <div className="flex items-center justify-center space-x-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ⚙️
                </motion.span>
                <span>Processing Binary...</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-3xl lg:text-4xl font-mono text-white font-bold"
            >
              {result !== null ? (
                <div className="space-y-2">
                  <div className="text-3xl lg:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {result}
                  </div>
                  <div className="text-xs text-gray-400">Decimal Result</div>
                </div>
              ) : (
                <div className="text-gray-500 text-lg">Ready to Calculate</div>
              )}
            </motion.div>
          )}
        </div>

        {/* Binary calculation hint */}
        {!isCalculating && result !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 font-bold mb-2">
                🔍 Binary Journey Complete!
              </p>
              <p className="text-blue-200 text-sm">
                Scroll down to see how this result was calculated using binary
                arithmetic and logic gates
              </p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl mt-2"
              >
                ↓
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
