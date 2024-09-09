'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import Cart from '@/components/Cart'
import { ChevronDown } from 'lucide-react'
import UserBox from './UserBox'
import { wixClientServer } from '@/lib/wixClientServer'
import { useAppSelector } from '@/lib/hooks'

const NAVIGATION_LINKS = [
  {
    label: 'HOME',
    href: '/'
  },
  {
    label: 'PRODUCTS',
    href: '/products'
  },
  {
    label: 'ABOUT',
    href: '/about'
  },
  {
    label: 'CONTACT',
    href: '/contact'
  },
]

const CATEGORY_LINKS = ['New', 'Sale', 'Bestsellers', 'Dresses', 'Shoes', 'Bags', 'Accessories']

 function Navbar({ className }: { className?: string }) {

  const isLoggedIn = useAppSelector((state) => state.cartSlice.isLoggedIn)
  console.log(isLoggedIn)

  return (
    <nav className="hidden sticky top-0 left-0 z-[1000] bg-white md:flex flex-col items-center justify-between w-full xl:px-0 border-b-[1px] border-black">
      <div className="flex items-center justify-between w-full mx-auto max-w-[1440px] px-4">
        <Link href='/'><Image src='/logo.svg' alt='Trendora' width={160} height={160} /></Link>
        <div className='flex items-center justify-between gap-20'>
        <ul className='flex items-center gap-6 max-w-[50%]'>
          {NAVIGATION_LINKS.map((link) => (
            <li 
              className='nav-link  hover:bg-black hover:text-white transition-colors p-4 w-full h-full text-center group relative' 
              key={link.label}
            >
              <Link className='flex gap-2 items-center' href={link.href}>{link.label} {link.label === 'PRODUCTS' && <ChevronDown size={20} />}</Link>
              {(link.label === 'PRODUCTS') &&
                <ul className="hidden group-hover:flex flex-col  absolute top-full left-0 w-full bg-white shadow-md z-50">
                  {CATEGORY_LINKS.map((category) => (
                    
                    <Link key={category} href={`${link.href}/${category}`} className="p-2 hover:text-white transition-colors hover:bg-black text-black uppercase">
                    <li  className=" text-start ">
                     
                        {category}
                      
                    </li>
                    </Link>
                  ))}
                </ul>
              }
            </li>
          ))}
        </ul>
       <div className='flex items-center gap-6'>
       <UserBox />
      <Cart />
       </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar