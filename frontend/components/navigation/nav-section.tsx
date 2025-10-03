"use client"

import { ChevronRight, LucideIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MenuItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

interface NavSectionProps {
  label: string
  items: MenuItem[]
  collapsible?: boolean
  defaultOpen?: boolean
  icon?: LucideIcon
  collapsibleTitle?: string
}

export function NavSection({
  label,
  items,
  collapsible = false,
  defaultOpen = true,
  icon: SectionIcon,
  collapsibleTitle,
}: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const pathname = usePathname()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  const collapsibleVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.15 }
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    }
  }

  // Common button styles
  const baseButtonClass = "group/menu-button font-medium gap-3 h-9 rounded-md text-sm"
  // "Panda" active state: Light background, dark text/icon
  const activeClasses = "bg-muted text-primary shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)]"
  const hoverClasses = "hover:bg-accent"

  const baseIconClass = "h-4 w-4 text-muted-foreground group-hover/menu-button:text-foreground"
  // "Panda" active icon state
  const activeIconClass = "group-data-[active=true]/menu-button:text-primary"

  const MenuItems = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <motion.div key={item.title} variants={itemVariants} custom={index}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn(
                  baseButtonClass,
                  hoverClasses,
                  isActive && activeClasses
                )}
                data-active={isActive}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon
                      className={cn(
                        baseIconClass,
                        isActive && activeIconClass
                      )}
                    />
                  </motion.div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </motion.div>
        )
      })}
    </motion.div>
  )

  const CollapsibleItems = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <motion.div key={item.title} variants={itemVariants} custom={index}>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                asChild
                className={cn(
                  baseButtonClass,
                  hoverClasses,
                  isActive && activeClasses
                )}
                data-active={isActive}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon
                       className={cn(
                        baseIconClass,
                        isActive && activeIconClass
                      )}
                    />
                  </motion.div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </motion.div>
        )
      })}
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <SidebarGroup>
        <SidebarGroupLabel>{label}</SidebarGroupLabel>
        <SidebarMenu>
          {collapsible ? (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SidebarMenuButton className={cn(baseButtonClass, hoverClasses)}>
                    {SectionIcon && <SectionIcon className={cn(baseIconClass, "mr-2")} />}
                    <span>{collapsibleTitle}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </SidebarMenuButton>
                </motion.div>
              </CollapsibleTrigger>
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={collapsibleVariants}
                    className="overflow-hidden"
                  >
                    <CollapsibleContent className="ml-4">
                      <CollapsibleItems />
                    </CollapsibleContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Collapsible>
          ) : (
            <MenuItems />
          )}
        </SidebarMenu>
      </SidebarGroup>
    </motion.div>
  )
} 