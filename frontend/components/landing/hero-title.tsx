"use client"

import { BlurFade } from "@/components/magicui/blur-fade"

export function HeroTitle() {
  return (
    <BlurFade delay={0.5} inView>
      <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
        <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
          Cricklytics
        </span>
      </h1>
      <h2 className="pt-2 mt-4 text-xl font-semibold text-gray-400 sm:text-2xl lg:text-3xl">
        AI Powered Cricket Analytics Platform
      </h2>
    </BlurFade>
  )
}
