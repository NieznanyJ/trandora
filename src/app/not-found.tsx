import { Button } from '@/components/ui/button';
import Link from 'next/link'

export default function Page404() {
    return (
        <main className=' fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black text-white'>
            <div className='flex flex-col gap-4 font-heading items-center'>
                <span className='text-2xl'>Error 404</span>
                <h1 className='text-2xl uppercase  '>This page could not be found</h1>
                <div className='flex items-center justify-between gap-4'>
                    <Link href='/'>
                        <Button className='bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-medium hover:border-white'>GOT TO HOMEPAGE</Button>

                    </Link>
                    or

                    <Link href='/contact'>
                        <Button className='bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors font-medium hover:border-white'>CONTACT US</Button>

                    </Link>
                </div>
            </div>
        </main>
    );
}