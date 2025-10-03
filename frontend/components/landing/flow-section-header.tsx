"use client"

import { motion } from "framer-motion"

interface FlowSectionHeaderProps {
  title: string
  description: string
}

export function FlowSectionHeader({ title, description }: FlowSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        How Cricklytics{" "}
        <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  )
}
