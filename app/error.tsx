'use client'

import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-row items-center justify-center gap-3 h-screen'>
      <Label>Something went wrong!</Label>
      <Link className='text-sm font-bold text-blue-400' href='/'>
        Go Home
      </Link>
    </div>
  )
}
