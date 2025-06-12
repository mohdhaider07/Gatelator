import { motion } from "framer-motion";
import type { Operation } from "../../types";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

interface ControlsProps {
  inputA: string;
  inputB: string;
  operation: Operation;
  onInputAChange: (value: string) => void;
  onInputBChange: (value: string) => void;
  onOperationChange: (operation: Operation) => void;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
}

export function Controls({
  inputA,
  inputB,
  operation,
  onInputAChange,
  onInputBChange,
  onOperationChange,
  onCalculate,
  onReset,
  isCalculating,
}: ControlsProps) {
  const operations: { symbol: Operation; label: string }[] = [
    { symbol: "+", label: "Add" },
    { symbol: "-", label: "Subtract" },
    { symbol: "*", label: "Multiply" },
    { symbol: "/", label: "Divide" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gray-800/60 backdrop-blur-sm p-4 lg:p-5 rounded-xl border border-blue-500/40 shadow-xl"
    >
      <h2 className="text-xl lg:text-2xl font-bold text-blue-300 mb-4 text-center">
        🎛️ Calculator Controls
      </h2>

      <div className="space-y-4">
        {/* Input fields */}
        <div className="space-y-3">
          <Input
            label="First Number (A)"
            value={inputA}
            onChange={onInputAChange}
            placeholder="Enter first number"
            type="number"
          />
          <Input
            label="Second Number (B)"
            value={inputB}
            onChange={onInputBChange}
            placeholder="Enter second number"
            type="number"
          />
        </div>

        {/* Operation selection */}
        <div>
          <label className="block text-lg font-bold text-blue-300 mb-3 text-center">
            Operation
          </label>
          <div className="grid grid-cols-2 gap-2">
            {operations.map(({ symbol, label }) => (
              <Button
                key={symbol}
                variant={operation === symbol ? "operation" : "secondary"}
                onClick={() => onOperationChange(symbol)}
                className="text-base font-bold h-12 flex flex-col items-center justify-center"
              >
                <div className="text-xl">{symbol}</div>
                <div className="text-xs">{label}</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-3">
          <Button
            onClick={onCalculate}
            disabled={isCalculating || !inputA || !inputB}
            className="w-full h-14 text-lg"
          >
            {isCalculating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block text-xl"
              >
                ⚙️
              </motion.div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">🚀</span>
                <span>Calculate Binary</span>
              </div>
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={onReset}
            disabled={isCalculating}
            className="w-full h-10 text-sm"
          >
            🔄 Reset Calculator
          </Button>
        </div>

        {/* Compact Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg mt-4"
        >
          <p className="font-bold text-blue-300 mb-2 text-sm">
            🧠 How it works:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-blue-200">
            <li>Enter decimal numbers</li>
            <li>Choose operation</li>
            <li>Watch binary conversion</li>
            <li>See logic gates in action</li>
          </ul>

          <div className="mt-3 p-2 bg-purple-900/20 border border-purple-500/30 rounded">
            <p className="text-purple-300 font-medium text-xs">💡 Pro tip:</p>
            <p className="text-purple-200 text-xs mt-1">
              Try small numbers first for clearest animation!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
