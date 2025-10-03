"use client"

import { Users, TrendingUp, BarChart3 } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"

export function HeroStats() {
  return (
    <div className="relative mx-auto mt-16 sm:mt-20 lg:mt-24">
      <BlurFade delay={1.5} inView>
        <div className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80">
          <div className="relative rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/20 p-8 shadow-2xl ring-1 ring-foreground/10">

            {/* Grid container for responsive layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">

              {/* Card 1 */}
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-foreground">4,000+</div>
                  <div className="text-sm text-muted-foreground">Players Analyzed</div>
                </div>
              </div>

              {/* Card 2 */}
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-foreground">91%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>

              {/* Card 3 */}
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-foreground">Injury Prediction</div>
                  <div className="text-sm text-muted-foreground">Based on Workload Analysis</div>
                </div>
              </div>

            </div>

          </div>

          {/* Border beam animation */}
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </BlurFade>
    </div>
  )
}
