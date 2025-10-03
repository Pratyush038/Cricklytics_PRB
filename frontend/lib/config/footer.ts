export interface FooterLink {
  href: string
  label: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterConfig {
  brand: {
    title: string
    description: string
  }
  sections: FooterSection[]
  copyright: string
}

export const footerConfig: FooterConfig = {
  brand: {
    title: "Cricklytics",
    description: "Advanced cricket analytics platform powered by machine learning for data-driven insights and player performance analysis."
  },
  sections: [
    {
      title: "Platform",
      links: [
        { href: "/player-analysis", label: "Player Analysis" },
        { href: "/injury-prediction", label: "Injury Prediction" },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "#features", label: "Features" },
        { href: "#how-it-works", label: "How It Works" },
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
      ]
    }
  ],
  copyright: `© ${new Date().getFullYear()} Cricklytics. All rights reserved.`
}
