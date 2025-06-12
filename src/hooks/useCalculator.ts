import { useState, useCallback } from "react";
import type { CalculatorState, Operation, BinaryStep } from "../types";
import {
  binaryAddition,
  binarySubtraction,
  binaryMultiplication,
  binaryDivision,
} from "../utils/binaryOperations";
import { binaryToDecimal } from "../utils/numberConversions";

const initialState: CalculatorState = {
  inputA: "",
  inputB: "",
  operation: "+",
  result: null,
  isCalculating: false,
  showAnimation: false,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [binarySteps, setBinarySteps] = useState<BinaryStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const updateInput = useCallback(
    (field: "inputA" | "inputB", value: string) => {
      // Only allow numbers and negative sign
      const numericValue = value.replace(/[^-0-9]/g, "");
      setState((prev) => ({
        ...prev,
        [field]: numericValue,
      }));
    },
    []
  );

  const setOperation = useCallback((operation: Operation) => {
    setState((prev) => ({
      ...prev,
      operation,
    }));
  }, []);

  const calculate = useCallback(async () => {
    const numA = parseInt(state.inputA) || 0;
    const numB = parseInt(state.inputB) || 0;

    setState((prev) => ({
      ...prev,
      isCalculating: true,
      showAnimation: true,
    }));

    let steps: BinaryStep[] = [];

    try {
      switch (state.operation) {
        case "+":
          steps = binaryAddition(numA, numB);
          break;
        case "-":
          steps = binarySubtraction(numA, numB);
          break;
        case "*":
          steps = binaryMultiplication(numA, numB);
          break;
        case "/":
          steps = binaryDivision(numA, numB);
          break;
      }

      setBinarySteps(steps);
      setCurrentStep(0);

      // Simulate step-by-step animation with longer delays for better understanding
      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2500)); // Increased to 2.5 seconds per step
        setCurrentStep(i);
      }

      // Calculate final result
      const finalStep = steps[steps.length - 1];
      const result =
        finalStep.result === "ERROR" ? NaN : binaryToDecimal(finalStep.result);

      setState((prev) => ({
        ...prev,
        result,
        isCalculating: false,
      }));
    } catch (error) {
      console.error("Calculation error:", error);
      setState((prev) => ({
        ...prev,
        result: NaN,
        isCalculating: false,
      }));
    }
  }, [state.inputA, state.inputB, state.operation]);

  const reset = useCallback(() => {
    setState(initialState);
    setBinarySteps([]);
    setCurrentStep(0);
  }, []);

  const hideAnimation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showAnimation: false,
    }));
  }, []);

  return {
    state,
    binarySteps,
    currentStep,
    updateInput,
    setOperation,
    calculate,
    reset,
    hideAnimation,
  };
}
