import { motion } from "framer-motion";
import { decimalToBinary } from "../../utils/numberConversions";

interface BinaryConversionProps {
  decimal: number;
  label: string;
  color: string;
  delay?: number;
}

export function BinaryConversion({
  decimal,
  label,
  color,
  delay = 0,
}: BinaryConversionProps) {
  const binary = decimalToBinary(decimal, 8);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-gray-800/40 border-2 rounded-xl p-6 ${
        color === 'blue' ? 'border-blue-500/30' : 
        color === 'green' ? 'border-green-500/30' : 
        color === 'red' ? 'border-red-500/30' : 
        'border-gray-500/30'
      }`}
    >
      <div className="text-center">
        <h4 className={`text-xl font-bold mb-4 ${
          color === 'blue' ? 'text-blue-300' : 
          color === 'green' ? 'text-green-300' : 
          color === 'red' ? 'text-red-300' : 
          'text-gray-300'
        }`}>{label}</h4>

        {/* Decimal Display */}
        <div className="mb-4">
          <span className="text-gray-400 text-sm">Decimal:</span>
          <div className={`text-4xl font-bold font-mono ${
            color === 'blue' ? 'text-blue-400' : 
            color === 'green' ? 'text-green-400' : 
            color === 'red' ? 'text-red-400' : 
            'text-gray-400'
          }`}>
            {decimal}
          </div>
        </div>

        {/* Conversion Arrow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.3 }}
          className="text-2xl text-gray-400 mb-4"
        >
          ↓
        </motion.div>

        {/* Binary Display with Animation */}
        <div className="mb-2">
          <span className="text-gray-400 text-sm">Binary (8-bit):</span>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          {binary.split("").map((bit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: delay + 0.5 + index * 0.1,
                duration: 0.3,
              }}
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg
                ${
                  bit === "1"
                    ? color === 'blue' ? 'bg-blue-600 text-white border-2 border-blue-400' :
                      color === 'green' ? 'bg-green-600 text-white border-2 border-green-400' :
                      color === 'red' ? 'bg-red-600 text-white border-2 border-red-400' :
                      'bg-gray-600 text-white border-2 border-gray-400'
                    : 'bg-gray-700 text-gray-300 border-2 border-gray-600'
                }
              `}
            >
              {bit}
            </motion.div>
          ))}
        </div>

        {/* Bit positions */}
        <div className="flex justify-center space-x-2 text-xs text-gray-500">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="w-12 text-center">
              2^{7 - i}
            </div>
          ))}
        </div>

        {/* Calculation breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 1.3 }}
          className="mt-4 p-3 bg-gray-900/50 rounded-lg text-xs"
        >
          <div className="text-gray-400 mb-1">Calculation:</div>
          <div className="text-gray-300 font-mono">
            {binary
              .split("")
              .map((bit, index) => {
                const power = 7 - index;
                const value = bit === "1" ? Math.pow(2, power) : 0;
                return value > 0 ? `${value}` : null;
              })
              .filter(Boolean)
              .join(" + ")}{" "}
            = {decimal}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
