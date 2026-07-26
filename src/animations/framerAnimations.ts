import { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: (custom = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
      delay: custom,
    },
  }),
};

export const blurReveal: Variants = {
  hidden: {
    filter: "blur(12px)",
    opacity: 0,
    y: 30,
  },
  visible: (custom = 0) => ({
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // Custom elegant ease-out
      delay: custom,
    },
  }),
};

export const imageReveal: Variants = {
  hidden: {
    scale: 1.15,
    filter: "brightness(0.5) contrast(1.1)",
  },
  visible: {
    scale: 1,
    filter: "brightness(1) contrast(1)",
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const floatingEffect = (duration = 3, yOffset = 12): Variants => ({
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
