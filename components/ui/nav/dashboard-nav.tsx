'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

const componentsFeed: { title: string; href: string; description: string }[] = [
  {
    title: 'RSS List',
    href: '/dashboard/feed',
    description: 'RSS feed sources.',
  },
  {
    title: 'Add new RSS feed source',
    href: '/dashboard/feed/add',
    description: 'Add a new RSS feed source to the list of available sources.',
  },
  {
    title: 'Tags',
    href: '/dashboard/feed/tags',
    description: 'Add, remove, or edit tags.',
  },
  {
    title: 'New post',
    href: '/dashboard/feed/posts/create',
    description: 'Create a new post.',
  },
  {
    title: 'Inactive posts',
    href: '/dashboard/feed/posts/inactive',
    description: 'List of inactive posts.',
  },
]

const componentsAdvertisement: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'List ads',
    href: '/dashboard/ads',
    description: 'Current list of advertisements.',
  },
  {
    title: 'Create new advertisement',
    href: '/dashboard/ads/create',
    description: 'Add and configure new advertisement.',
  },
]

const componentsUsers: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'List',
    href: '/dashboard/users',
    description: 'List of users.',
  },
  {
    title: 'Create user',
    href: '/dashboard/users/create',
    description: 'Create a new user.',
  },
]

export function DashboardNavigationMenu() {
  return (
    <NavigationMenu className='p-2'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Users</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 grid-cols-2 p-6 md:w-[500px] lg:w-[600px]'>
              {componentsUsers.map((component) => (
                <ListItem key={component.title} href={component.href} title={component.title}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Feed</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {componentsFeed.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Advertisement</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {componentsAdvertisement.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, href, children, ...props }, ref) => {
    if (!href) return null

    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            prefetch={true}
            href={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)

ListItem.displayName = 'ListItem'
