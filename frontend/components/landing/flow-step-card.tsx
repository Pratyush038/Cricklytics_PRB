"use client"

import { motion } from "framer-motion"
import { FlowStep } from "@/lib/config/flow-steps"

interface FlowStepCardProps {
  step: FlowStep
  index: number
  isLast: boolean
}

export function FlowStepCard({ step, index, isLast }: FlowStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="flex items-start gap-4">
        <div className={`
          flex size-14 items-center justify-center rounded-lg bg-gradient-to-br ${step.gradient}
          ${step.shadowColor} shadow-lg transition-all duration-300 group-hover:scale-110
        `}>
          <step.icon className="size-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
              Step {index + 1}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute -bottom-4 left-7 w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent" />
      )}
    </motion.div>
  )
}
