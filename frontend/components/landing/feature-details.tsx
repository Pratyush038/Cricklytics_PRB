import { motion } from "framer-motion"
import { FeatureSectionHeader } from "./feature-section-header"
import { FeatureCardContent } from "./feature-card-content"
import { FeatureCardVisualization } from "./feature-card-visualization"
import { features } from "@/lib/config/features"

export function FeatureDetails() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-32">
      <FeatureSectionHeader
        title="Analytics Tools"
        description="Discover how Cricklytics transforms raw cricket data into actionable insights that help teams, coaches, and analysts make better decisions. From player performance analysis to injury prediction and workload management."
      />

      <div className="mt-16 grid grid-cols-1 gap-16 sm:gap-24">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col gap-8 lg:items-center ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            <FeatureCardContent feature={feature} index={index} />
            <FeatureCardVisualization feature={feature} />
          </motion.div>
        ))}
      </div>
    </section>
  )
} 