import { LucideIcon } from "lucide-react"

export interface HeaderLink {
  href: string
  label: string
  icon?: LucideIcon
  description?: string
}

export interface HeaderConfig {
  brand: {
    title: string
    icon: string
  }
  navigationLinks: HeaderLink[]
}

export const headerConfig: HeaderConfig = {
  brand: {
    title: "Cricklytics",
    icon: "/logo.png"
  },
  navigationLinks: [
    {
      href: "/",
      label: "Home"
    },
    {
      href: "/player-analysis",
      label: "Player Analysis"
    },
    {
      href: "/injury-prediction",
      label: "Injury Prediction"
    }
  ]
}