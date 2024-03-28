import { Metadata } from 'next'
import { AddFeed } from './AddFeed'

export const metadata: Metadata = {
  title: 'Add feed source | News CMS',
}

export default async function Page() {
  return <AddFeed />
}
