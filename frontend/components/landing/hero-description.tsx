"use client"

import { BlurFade } from "@/components/magicui/blur-fade"

export function HeroDescription() {
  return (
    <BlurFade delay={0.75} inView>
      <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:mt-8">
        Unlock data-driven cricket insights with Cricklytics. Analyze performance, classify player roles, and track workload to spot injury trends with AI-powered analytics.
      </p>
    </BlurFade>
  )
}
