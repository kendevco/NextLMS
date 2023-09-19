import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <div> 
    <UserButton 
        afterSignOutUrl='/'
    
    />
    <p className='text-3xl font-medium text-sky-700'>
    Hello World!
    </p>
    <Button variant="destructive">Hello</Button>
    </div>
  )
}
