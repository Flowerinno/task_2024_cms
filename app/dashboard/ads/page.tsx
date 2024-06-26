import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { minio } from '@/lib/minio'
import { Advertisement } from '@prisma/client'
import { SingleAdvertisement } from '@/components/ads'
import { auth } from 'utils/auth'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import prisma from '@/lib/prisma'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advertisement | News CMS',
  description: 'List of current advertisements.',
}

export default async function Ads() {
  const adsPromise = prisma?.advertisement.findMany()
  const settingsPromise = prisma?.settings.findFirst()
  const sessionPromise = auth()

  const [ads, settings, session] = await Promise.all([adsPromise, settingsPromise, sessionPromise])

  let adsWithMedia: Advertisement[] | [] = []

  if (ads && ads?.length > 0) {
    adsWithMedia = await Promise.all(
      ads.map(async (ad) => {
        if (ad.media) {
          const adMedia = await minio.client.presignedGetObject('default', `ads_${ad.id}.webp`)

          return {
            ...ad,
            media: adMedia ?? null,
          }
        }
        return ad
      }),
    )
  }

  if (ads?.length === 0) {
    return (
      <div className='text-center p-5'>
        <Label className='text-md'>
          No ads available.{' '}
          <Link
            aria-label='Create an advertisement'
            className='text-blue-400'
            href='/dashboard/ads/create'
          >
            Create one.
          </Link>
        </Label>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-row flex-wrap justify-center gap-10 p-3 relative'>
      <Sheet>
        <SheetTrigger className='absolute right-0 top-0 -translate-y-10 z-50' asChild>
          <Button variant='default'>Config</Button>
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-10'>
          <Label className='font-bold text-xl'>Configure ads appearance</Label>

          <form
            action='/api/admin/ads/update/settings'
            method='POST'
            className='flex flex-col gap-3'
          >
            <Label htmlFor='feed_ads_per_page'>Visibile ads per feed page</Label>
            <Input
              id='feed_ads_per_page'
              name='feed_ads_per_page'
              type='number'
              defaultValue={settings?.feed_ads_per_page ?? 1}
              min={1}
              max={5}
              required
              aria-label='Advertisement count per feed page'
            />
            <Label htmlFor='search_ads_per_page'>Visibile ads in search results</Label>
            <Input
              id='search_ads_per_page'
              name='search_ads_per_page'
              type='number'
              defaultValue={settings?.search_ads_per_page ?? 1}
              min={1}
              max={5}
              required
              aria-label='Advertisement count per feed page'
            />
            <Button type='submit'>Save</Button>
          </form>
        </SheetContent>
      </Sheet>
      {adsWithMedia?.length &&
        adsWithMedia.map((ad) => {
          return <SingleAdvertisement key={ad.id} session={session} ad={ad} />
        })}
    </div>
  )
}
