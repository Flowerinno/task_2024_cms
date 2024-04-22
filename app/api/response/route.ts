import { handleResponse } from '@/lib/errors'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  return handleResponse({ message: 'Hello, World!' }, null)
}
