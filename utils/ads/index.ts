import { Advertisement, AdvertisementDraft } from '@prisma/client'
import toast from 'react-hot-toast'

const base = process.env.NEXT_PUBLIC_API_URL

export const createAd = async (
  payload: Partial<AdvertisementDraft>,
): Promise<Advertisement | undefined> => {
  try {
    const url = base + `/admin/ads/create`
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!data?.id) {
      toast.error('Failed to create ad')
      return
    }

    toast.success('Ad created successfully')

    return data
  } catch (error: { message: string } | any) {
    toast.error('Failed to create ad')
    return
  }
}

export const updateAd = async (payload: { id: number; is_active: boolean }) => {
  try {
    const url = base + `/admin/ads/update/active`
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!data?.id) {
      toast.error('Failed to update ad')
      return
    }

    toast.success('Ad updated successfully')

    return data
  } catch (error: { message: string } | any) {
    toast.error('Failed to update ad')
    return
  }
}

export const deleteAd = async (id: number) => {
  try {
    const url = base + `/admin/ads/delete`
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.status !== 200) {
      toast.error('Failed to delete ad')
      return
    }

    return data
  } catch (error) {
    toast.error('Failed to delete ad')
    return
  }
}

export const getAdDrafts = async (): Promise<AdvertisementDraft[] | []> => {
  try {
    const url = base + `/admin/ads/drafts`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      cache: 'no-store',
    })

    const data = await res.json()

    if (res.status !== 200) {
      toast.error('Failed to fetch drafts')
      return []
    }

    return data
  } catch (error: { message: string } | any) {
    toast.error('Failed to fetch drafts')
    return []
  }
}

export const createAdDraft = async (
  payload: Partial<AdvertisementDraft>,
): Promise<AdvertisementDraft | undefined> => {
  try {
    const url = base + `/admin/ads/drafts/create`
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.status !== 201) {
      toast.error('Failed to create draft')
      return
    }

    toast.success('Draft created successfully')

    return data?.draft
  } catch (error: { message: string } | any) {
    toast.error('Failed to create draft')
    return
  }
}

export const deleteAdDraft = async (id: number) => {
  try {
    const url = base + `/admin/ads/drafts/delete`
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.status !== 200) {
      toast.error('Failed to delete draft')
      return
    }

    return data
  } catch (error: { message: string } | any) {
    toast.error('Failed to delete draft')
    return
  }
}
