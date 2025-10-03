import { TrendingUp, Target, BarChart3, Activity } from "lucide-react"

export interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  shadowColor: string
  image: string
  darkImage: string
  alt: string
}

export const features: Feature[] = [
  {
    title: "Player Performance Analysis",
    description: "Comprehensive analysis of batsman and bowler performance using advanced metrics including strike rate, economy, averages, and career trajectories to identify player strengths and improvement areas.",
    icon: TrendingUp,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    shadowColor: "shadow-emerald-500/25",
    image: "/api/placeholder/600/400",
    darkImage: "/api/placeholder/600/400",
    alt: "Player Performance Analysis Dashboard",
  },
  {
    title: "AI-Powered Predictions",
    description: "Machine learning models trained on historical cricket data to predict player classifications and performance outcomes, helping teams make data-driven decisions for matches and strategies.",
    icon: Target,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    shadowColor: "shadow-blue-500/25",
    image: "/api/placeholder/600/400",
    darkImage: "/api/placeholder/600/400",
    alt: "AI Prediction Models",
  },
  {
    title: "Interactive Data Visualization",
    description: "Beautiful, interactive charts and graphs that bring cricket statistics to life. Compare players, track performance trends, and visualize complex data in intuitive dashboards.",
    icon: BarChart3,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadowColor: "shadow-orange-500/25",
    image: "/api/placeholder/600/400",
    darkImage: "/api/placeholder/600/400",
    alt: "Interactive Cricket Data Visualizations",
  },
  {
    title: "Injury Prediction & Workload Analysis",
    description: "Advanced ML models analyze player workload patterns, match intensity, and recovery periods to predict injury risks and optimize training schedules for peak performance and player safety.",
    icon: Activity,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    shadowColor: "shadow-purple-500/25",
    image: "/api/placeholder/600/400",
    darkImage: "/api/placeholder/600/400",
    alt: "Injury Prediction and Workload Analysis",
  },
]
