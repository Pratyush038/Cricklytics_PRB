"use client"

import { HeroBadge } from "./hero-badge"
import { HeroTitle } from "./hero-title"
import { HeroDescription } from "./hero-description"
import { HeroActions } from "./hero-actions"
import { HeroStats } from "./hero-stats"

export function Hero() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <HeroBadge />

      <div className="mt-10 text-center">
        <HeroTitle />
        <HeroDescription />
      </div>

      <HeroActions />
      <HeroStats />
    </section>
  )
}