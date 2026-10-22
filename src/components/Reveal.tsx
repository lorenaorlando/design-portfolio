import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  from?: 'left' | 'right' | 'bottom';
  delay?: number;
  className?: string;
}

/** Slides content in from the side as it scrolls into view. */
export function Reveal({ children, from = 'bottom', delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const offset = { left: { x: -120, y: 0 }, right: { x: 120, y: 0 }, bottom: { x: 0, y: 60 } }[from];
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...offset, rotate: from === 'bottom' ? 0 : from === 'left' ? -3 : 3 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}
