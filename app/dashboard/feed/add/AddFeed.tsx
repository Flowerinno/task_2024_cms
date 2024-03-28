'use client'

import { AddFeedForm, VerifyRss } from '@/components/feed'
import { useAddFeed } from 'store'

export function AddFeed() {
  const { step, setStep } = useAddFeed((state) => state)

  switch (step) {
    case 1:
      return <VerifyRss setStep={setStep} />
    case 2:
      return <AddFeedForm setStep={setStep} />
    default:
      return <VerifyRss setStep={setStep} />
  }
}
