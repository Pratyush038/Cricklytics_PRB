"use client"

import { motion } from "framer-motion"
import { Feature } from "@/lib/config/features"

interface FeatureCardVisualizationProps {
  feature: Feature
}

export function FeatureCardVisualization({ feature }: FeatureCardVisualizationProps) {
  return (
    <div className="flex-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80"
      >
        <div className="relative rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 shadow-2xl ring-1 ring-foreground/10">
          <div className={`inline-flex size-16 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} ${feature.shadowColor} shadow-lg mx-auto mb-6`}>
            <feature.icon className="size-8 text-white" />
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Interactive dashboard showcasing {feature.title.toLowerCase()} with real-time data visualization and analysis capabilities.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/50 dark:bg-slate-800/50 p-3 text-center">
              <div className="text-lg font-bold text-foreground">91%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-slate-800/50 p-3 text-center">
              <div className="text-lg font-bold text-foreground">&lt;1s</div>
              <div className="text-xs text-muted-foreground">Response</div>
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-')} opacity-0 transition-opacity duration-300 hover:opacity-10`} />
      </motion.div>
    </div>
  )
}
