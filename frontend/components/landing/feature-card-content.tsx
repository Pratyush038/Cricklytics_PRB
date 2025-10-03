"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Feature } from "@/lib/config/features"

interface FeatureCardContentProps {
  feature: Feature
  index: number
}

export function FeatureCardContent({ feature, index }: FeatureCardContentProps) {
  return (
    <div className="flex-1 space-y-4">
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={`inline-flex size-14 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} ${feature.shadowColor} shadow-lg`}>
          <feature.icon className="size-7 text-white" />
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {feature.description}
        </p>
        <div className="mt-6">
          <button className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500">
            Learn more
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
