"use client"

import { motion } from "framer-motion"
import { Database, TrendingUp, Target, BarChart3 } from "lucide-react"

interface DashboardFeature {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const dashboardFeatures: DashboardFeature[] = [
  {
    title: "Data Input",
    subtitle: "Secure & Fast",
    icon: Database,
    color: "bg-emerald-500"
  },
  {
    title: "AI Processing",
    subtitle: "Real-time Analysis",
    icon: TrendingUp,
    color: "bg-blue-500"
  },
  {
    title: "Predictions",
    subtitle: "91% Accuracy",
    icon: Target,
    color: "bg-orange-500"
  },
  {
    title: "Insights",
    subtitle: "Interactive Visuals",
    icon: BarChart3,
    color: "bg-purple-500"
  }
]

export function DashboardSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative mx-auto mt-16 sm:mt-20 lg:mt-24"
    >
      <div className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80">
        <div className="relative rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/20 p-8 shadow-2xl ring-1 ring-foreground/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Complete Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Experience the full power of cricket analytics with our comprehensive dashboard that brings all your data together in one place, from performance metrics to injury risk assessments.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className={`mx-auto flex size-12 items-center justify-center rounded-lg ${feature.color} mb-3`}>
                  <feature.icon className="size-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-foreground">{feature.title}</div>
                <div className="text-xs text-muted-foreground">{feature.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
