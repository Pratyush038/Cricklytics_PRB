import Icons from "@/components/global/icons";
import { SidebarConfig } from "@/components/global/app-sidebar";

const sidebarConfig: SidebarConfig = {
  brand: {
    title: "Cricklytics",
    icon: Icons.home,
    href: "/"
  },
  sections: [
    {
      label: "Predictions",
      items: [
        {
          title: "Player Analysis",
          href: "/player-analysis",
          icon: Icons.brain
        },
        {
          title: "Injury Prediction",
          href: "/injury-prediction",
          icon: Icons.shield
        },
        {
          title: "Chat",
          href: "/chat",
          icon: Icons.chat
        }
      ]
    },
  ]
}

export default sidebarConfig