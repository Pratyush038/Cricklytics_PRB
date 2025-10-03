"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"

interface PlayerInfoSectionProps {
  playerName: string
  playerType: 'batsman' | 'bowler'
}

export function PlayerInfoSection({ playerName, playerType }: PlayerInfoSectionProps) {
  return (
    <motion.div
      className="bg-primary/5 rounded-lg p-4 border-l-4 border-l-primary"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <User className="h-5 w-5 text-primary" />
        </motion.div>
        <div>
          <motion.h3
            className="font-semibold text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {playerName}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground capitalize"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            {playerType} Analysis
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
