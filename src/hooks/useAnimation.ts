import { useState, useEffect, useCallback } from "react";
import type { AnimationStep } from "../types";

export function useAnimation() {
  const [activeGates, setActiveGates] = useState<string[]>([]);
  const [activeWires, setActiveWires] = useState<string[]>([]);
  const [animationQueue, setAnimationQueue] = useState<AnimationStep[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addAnimation = useCallback((step: AnimationStep) => {
    setAnimationQueue((prev) => [...prev, step]);
  }, []);

  const clearAnimations = useCallback(() => {
    setAnimationQueue([]);
    setActiveGates([]);
    setActiveWires([]);
    setIsAnimating(false);
  }, []);

  const playAnimations = useCallback(async () => {
    if (animationQueue.length === 0) return;

    setIsAnimating(true);

    for (const step of animationQueue) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));

      switch (step.type) {
        case "gate":
          setActiveGates((prev) => [...prev, step.id]);
          setTimeout(() => {
            setActiveGates((prev) => prev.filter((id) => id !== step.id));
          }, step.duration);
          break;

        case "wire":
          setActiveWires((prev) => [...prev, step.id]);
          setTimeout(() => {
            setActiveWires((prev) => prev.filter((id) => id !== step.id));
          }, step.duration);
          break;

        case "result":
          // Handle result animation
          break;
      }
    }

    setIsAnimating(false);
    setAnimationQueue([]);
  }, [animationQueue]);

  useEffect(() => {
    if (animationQueue.length > 0 && !isAnimating) {
      playAnimations();
    }
  }, [animationQueue, isAnimating, playAnimations]);

  const animateGate = useCallback(
    (gateId: string, delay: number = 0, duration: number = 500) => {
      addAnimation({
        id: gateId,
        type: "gate",
        delay,
        duration,
        data: {},
      });
    },
    [addAnimation]
  );

  const animateWire = useCallback(
    (wireId: string, delay: number = 0, duration: number = 300) => {
      addAnimation({
        id: wireId,
        type: "wire",
        delay,
        duration,
        data: {},
      });
    },
    [addAnimation]
  );

  const isGateActive = useCallback(
    (gateId: string) => {
      return activeGates.includes(gateId);
    },
    [activeGates]
  );

  const isWireActive = useCallback(
    (wireId: string) => {
      return activeWires.includes(wireId);
    },
    [activeWires]
  );

  return {
    animateGate,
    animateWire,
    isGateActive,
    isWireActive,
    clearAnimations,
    isAnimating,
  };
}
