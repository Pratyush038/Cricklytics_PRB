import { motion } from "framer-motion"
import { FlowSectionHeader } from "./flow-section-header"
import { FlowStepCard } from "./flow-step-card"
import { DashboardSummary } from "./dashboard-summary"
import { flowSteps } from "@/lib/config/flow-steps"

export function SystemFlow() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <FlowSectionHeader
        title="Works"
        description="Follow our streamlined process to transform raw cricket data into powerful insights that drive better team performance and strategic decisions, including injury prevention through workload analysis."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {flowSteps.map((step, index) => (
          <FlowStepCard
            key={step.title}
            step={step}
            index={index}
            isLast={index === flowSteps.length - 1}
          />
        ))}
      </div>

      <DashboardSummary />
    </section>
  )
}