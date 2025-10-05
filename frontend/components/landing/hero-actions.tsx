"use client"

import { TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ShimmerButton } from "@/components/magicui/shimmer-button"

export function HeroActions() {
  return (
    <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
      <BlurFade delay={1.0} inView>
        <Link href="/player-analysis">
          <ShimmerButton
            className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
            background="linear-gradient(to right, #10B981, #059669)"
          >
            <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
              Analyze Players
            </span>
            <TrendingUp className="w-4 h-4 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
          </ShimmerButton>
        </Link>
      </BlurFade>
      <BlurFade delay={1.25} inView>
        <Link href="#features">
          <div>
            <ShimmerButton
              className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
              background="linear-gradient(to right, #374151, #111827)"
            >
              <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                View Features
              </span>
              <BarChart3 className="w-4 h-4 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
            </ShimmerButton>
          </div>
        </Link>
      </BlurFade>
      <BlurFade delay={1.25} inView>
        <Link href="#features">
          <div>
            <ShimmerButton
              className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
              background="linear-gradient(to right,rgb(93, 208, 202),rgb(44, 72, 132))"
            >
              <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                View Demo
              </span>
              <BarChart3 className="w-4 h-4 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
            </ShimmerButton>
          </div>
        </Link>
      </BlurFade>
    </div>
  )
}
