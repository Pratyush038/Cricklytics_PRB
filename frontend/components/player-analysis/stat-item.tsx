"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatItemProps {
  icon: LucideIcon
  label: string
  value: string | number
  delay?: number
}

export function StatItem({ icon: Icon, label, value, delay = 0.2 }: StatItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
          }
        }
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="bg-muted/30 rounded-lg p-3 border hover:bg-muted/50 transition-colors duration-200"
    >
      <div className="flex items-center gap-2 mb-1">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
        </motion.div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <motion.p
        className="text-lg font-bold"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.p>
    </motion.div>
  )
}
