"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { BlurFade } from "@/components/magicui/blur-fade"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"

export function HeroBadge() {
  return (
    <div className="group relative mx-auto flex justify-center">
      <BlurFade delay={0.25} inView>
        <Link
          href="#features"
          className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>🏏 Advanced Cricket Analytics Platform</span>
            <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </Link>
      </BlurFade>
    </div>
  )
}
