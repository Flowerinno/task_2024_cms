"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const componentsFeed: { title: string; href: string; description: string }[] = [
  {
    title: "List",
    href: "/dashboard/feed",
    description: "RSS feed sources.",
  },
  {
    title: "Add new RSS feed source",
    href: "/dashboard/feed/add",
    description: "Add a new RSS feed source to the list of available sources.",
  },
  {
    title: "Tags",
    href: "/dashboard/feed/tags",
    description: "Add, remove, or edit tags.",
  },
  {
    title: "New post",
    href: "/dashboard/feed/posts/create",
    description: "Create a new post.",
  },
];

const componentsAdvertisement: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "List ads",
    href: "/dashboard/ads",
    description: "Current list of advertisements.",
  },
  {
    title: "Create new advertisement",
    href: "/dashboard/ads/add",
    description: "Add and configure new advertisement.",
  },
];

export function DashboardNavigationMenu() {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Users</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 grid-cols-3 p-6 md:w-[400px] lg:w-[500px]">
              <ListItem href="/dashboard/users" title="List">
                List of users
              </ListItem>
              <ListItem href="/dashboard/users/create" title="Create">
                Create user
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Feed</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {componentsFeed.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Advertisement</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {componentsAdvertisement.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
