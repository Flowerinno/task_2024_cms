import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center mt-20'>
      <Label>
        Could not find requested resource.{' '}
        <Link className='text-sm font-bold text-blue-400' href='/'>
          Return Home.
        </Link>
      </Label>
    </div>
  )
}
