import { Tags } from './Tags'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags | News CMS',
  description: 'Tags page | News CMS',
}

export default async function Page() {
  return <Tags />
}
