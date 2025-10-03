"use client"

import { motion } from "framer-motion"
import { Activity } from "lucide-react"

interface PerformanceSummaryProps {
  playerName: string
  playerType: 'batsman' | 'bowler'
  stats: {
    avg?: number
    sr: number
    mat?: number
    wickets?: number
    econ?: number
  }
}

export function PerformanceSummary({ playerName, playerType, stats }: PerformanceSummaryProps) {
  return (
    <motion.div
      className="bg-primary/5 rounded-lg p-4 border border-primary/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Activity className="h-4 w-4 text-primary" />
        </motion.div>
        <span className="font-medium text-primary">Performance Summary</span>
      </div>
      <motion.p
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        {playerType === 'batsman'
          ? `${playerName} has maintained a strike rate of ${stats.sr?.toFixed(2)} with an average of ${stats.avg?.toFixed(2)} across ${stats.mat || 0} matches.`
          : `${playerName} has taken ${stats.wickets || 0} wickets with an economy rate of ${stats.econ?.toFixed(2)} and strike rate of ${stats.sr?.toFixed(2)}.`
        }
      </motion.p>
    </motion.div>
  )
}
