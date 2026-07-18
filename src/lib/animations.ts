import type { Transition, Variants } from "motion/react";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true, amount: 0.15 };

export const fadeUp = (y = 30, duration = 0.8, delay = 0): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, delay, ease: easeOut } },
});

export const fadeLeft = (x = 30, duration = 0.8): Variants => ({
  hidden: { opacity: 0, x: -x },
  visible: { opacity: 1, x: 0, transition: { duration, ease: easeOut } },
});

export const fadeRight = (x = 30, duration = 0.8): Variants => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0, transition: { duration, ease: easeOut } },
});

export const scaleUp = (y = 35, duration = 0.8): Variants => ({
  hidden: { opacity: 0, y, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration, ease: easeOut },
  },
});

export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
