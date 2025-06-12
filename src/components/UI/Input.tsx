import { motion } from "framer-motion";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: "text" | "number";
  className?: string;
}

export function Input({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  className = "",
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-base lg:text-lg font-bold text-blue-300 mb-2">
          {label}
        </label>
      )}
      <motion.input
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
        }}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-3 py-2 bg-gray-700/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base font-mono"
      />
    </div>
  );
}
