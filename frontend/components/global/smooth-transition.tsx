"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SmoothTransitionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    // Add transition class to body for smoother page changes
    document.body.classList.add('page-transitioning')

    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning')
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
