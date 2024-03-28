import { Feed } from './Feed'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feed | News CMS',
  description: 'Home feed page | News CMS',
}

export default function Page() {
  return <Feed />
}
