'use client'

import { Advertisement } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import Image from 'next/image'

import { AdPopover } from './ad-popover'
import { Session } from 'next-auth'

export const SingleAdvertisement = ({
  ad,
  session,
}: {
  ad: Advertisement
  session: Session | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = session?.user?.role === 'ADMIN'

  const handleConfiguration = () => {
    if (isAdmin) {
      setIsOpen(true)
    }
  }

  if (ad?.link && !isAdmin) {
    return (
      <Link
        className='relative h-24 min-h-24 min-w-[300px] w-5/12 border-[2px] rounded-md hover:border-blue-400 transition-all overflow-hidden cursor-pointer'
        href={ad.link}
        target='_blank'
        aria-label={ad.title + ' advertisement link'}
      >
        {ad?.media && (
          <Image
            src={ad.media ?? ''}
            alt={ad.title}
            width={200}
            height={200}
            priority
            className='w-full h-24 rounded-sm object-fill'
          />
        )}
        <Label
          className='absolute left-2 top-5 font-bold text-xl cursor-pointer text-center'
          style={{
            color: ad?.media ? 'red' : 'black',
          }}
          aria-label={ad.title}
        >
          {ad.title}
        </Label>
        {isAdmin && <AdPopover isOpen={isOpen} onOpen={setIsOpen} ad={ad} />}
      </Link>
    )
  }

  return (
    <div
      className='relative w-5/12 min-w-[300px] h-24 min-h-24 border-[2px] rounded-md cursor-pointer'
      onClick={handleConfiguration}
    >
      {ad?.media && (
        <Image
          src={ad.media ?? ''}
          alt={ad.title}
          width={200}
          height={200}
          priority
          className='w-full h-24 rounded-sm object-fill opacity-80'
        />
      )}
      <Label
        aria-label={ad.title}
        className='absolute left-2 top-6 font-bold text-xl text-center cursor-pointer'
        style={{
          color: ad?.media ? 'red' : 'black',
        }}
      >
        {ad.title}
      </Label>
      {isAdmin && <AdPopover isOpen={isOpen} onOpen={setIsOpen} ad={ad} />}
    </div>
  )
}
