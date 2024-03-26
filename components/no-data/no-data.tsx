import React from 'react'
import { Label } from '../ui/label'
import Link from 'next/link'

export const NoData = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className='p-10 flex flex-row gap-2 items-center'>
      <Label>{title}</Label>{' '}
      <Link className='text-blue-400 text-sm' href={href}>
        Create one.
      </Link>
    </div>
  )
}
