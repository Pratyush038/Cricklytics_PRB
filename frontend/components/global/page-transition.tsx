"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.99
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -10,
    scale: 1.01
  }
}

const pageTransition = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1] as const, // Custom easing for smoother feel
  duration: 0.3
}

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`page-${pathname}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`min-h-screen w-full ${className}`}
        style={{
          willChange: "opacity, transform",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="h-full w-full">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
