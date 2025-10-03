import { Database, TrendingUp, BarChart3, Users, Target, CheckCircle } from "lucide-react"

export interface FlowStep {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  shadowColor: string
}

export const flowSteps: FlowStep[] = [
  {
    title: "Input Player Data",
    description: "Enter comprehensive cricket statistics including matches played, runs scored, strike rate, bowling economy, and career details for accurate analysis.",
    icon: Database,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    shadowColor: "shadow-emerald-500/25",
  },
  {
    title: "AI Analysis Engine",
    description: "Our advanced machine learning models process the data, analyzing patterns, calculating metrics, identifying key performance indicators, and assessing workload patterns for injury risk prediction.",
    icon: TrendingUp,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    shadowColor: "shadow-blue-500/25",
  },
  {
    title: "Performance Classification",
    description: "Get detailed player classifications and performance categorizations based on historical data patterns and statistical analysis.",
    icon: Target,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadowColor: "shadow-orange-500/25",
  },
  {
    title: "Visual Data Insights",
    description: "Interactive charts and graphs transform complex statistics into clear, actionable visualizations for better decision making.",
    icon: BarChart3,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    shadowColor: "shadow-purple-500/25",
  },
  {
    title: "Team Strategy Planning",
    description: "Use insights to optimize team selection, match strategies, and player development plans based on data-driven recommendations.",
    icon: Users,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    shadowColor: "shadow-green-500/25",
  },
  {
    title: "Track & Improve",
    description: "Monitor player progress over time, compare performance metrics, and continuously refine strategies for optimal results.",
    icon: CheckCircle,
    gradient: "from-red-500 via-rose-500 to-pink-500",
    shadowColor: "shadow-red-500/25",
  },
]
