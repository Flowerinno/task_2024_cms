import { Metadata } from 'next'
import { Users } from './Users'

export const metadata: Metadata = {
  title: 'Users | News CMS',
  description: 'Users page | News CMS',
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    page?: number
    email?: string
  }
}) {
  return <Users searchParams={searchParams} />
}
