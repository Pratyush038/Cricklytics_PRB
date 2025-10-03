"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -8,
  }
}

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.25
}

interface OptimizedPageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function OptimizedPageTransition({ children, className = "" }: OptimizedPageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`min-h-screen w-full ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
