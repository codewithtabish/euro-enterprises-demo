"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  CalendarCheckIcon,
  HomeIcon,
  UsersIcon,
} from "lucide-react";
import Logo from "@/assets/logo/logo";
import { BrandLogo } from "./dashboard/brand-logo-text";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: BookOpenIcon,
      isActive: false,
    },
    {
      title: "Sales",
      url: "/dashboard/sales",
      icon: BookOpenIcon,
      isActive: false,
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: CalendarCheckIcon,
      isActive: false,
    },
    {
      title: "Rental",
      url: "/dashboard/rental",
      icon: HomeIcon,
      isActive: false,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: UsersIcon,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-5">
        <SidebarMenu>
          <BrandLogo />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-3 py-6">
        <SidebarMenu className="flex flex-col">
          {data.navMain.map((item, index) => (
            <React.Fragment key={item.title}>
              <SidebarMenuItem className="py-1">
                <SidebarMenuButton
                  className={`
                    group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ease-out w-full
                    ${
                      item.isActive
                        ? "bg-primary/10 text-primary shadow-[0_2px_8px_rgba(var(--primary),0.15)] border border-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
                    }
                  `}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 w-full"
                  >
                    {item.isActive && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-l-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
                    )}
                    <div
                      className={`
                      flex size-9 items-center justify-center rounded-lg transition-all duration-300 shrink-0
                      ${
                        item.isActive
                          ? "bg-primary/15 text-primary scale-110"
                          : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-105"
                      }
                    `}
                    >
                      <item.icon className="size-5" />
                    </div>
                    <span
                      className={
                        item.isActive
                          ? "text-primary font-semibold"
                          : "group-hover:font-medium"
                      }
                    >
                      {item.title}
                    </span>
                    {item.isActive && (
                      <span className="ml-auto size-2 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary),0.6)] animate-pulse shrink-0" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {index < data.navMain.length - 1 && (
                <Separator className="my-1 bg-border/60" />
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-5 mt-auto">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
