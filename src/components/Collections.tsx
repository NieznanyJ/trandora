"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

interface CollectionItem {
  href: string;
  src: string;
  alt: string;
  title: string;
  className: string;
}

const COLLECTION_ITEMS: CollectionItem[] = [
  { href: '/collection/women', src: '/Elegant.webp', alt: 'FOR HER', title: 'FOR HER', className: 'col-span-1 h-[300px] ' },
  { href: '/collection/men', src: '/forHim.jpg', alt: 'FOR HIM', title: 'FOR HIM', className: 'col-span-1 h-[300px] ' },
  { href: '/collection/streetwear', src: '/Streetware.png', alt: 'Streetwear', title: 'STREETWEAR', className: 'col-span-1 row-span-2 h-full' },
  { href: '/collection/casual', src: '/Casual.png', alt: 'Casual', title: 'CASUAL', className: 'col-span-2 row-span-2 xl:col-span-2 h-full ' },
  { href: '/collection/bags', src: '/bags.jpg', alt: 'bags', title: 'BAGS', className: 'col-span-1 h-[300px] ' },
  { href: '/collection/summertime', src: '/Summer.png', alt: 'Summertime', title: 'SUMMERTIME', className: 'col-span-1 xl:col-span-2 h-[300px] ' },
]

function CollectionItem({ href, src, alt, title, className }: CollectionItem) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Link href={href} className={`${className} relative w-full group overflow-hidden`}>
      {isLoading && (
        <Skeleton className="w-full h-full absolute inset-0" />
      )}
      <Image 
        className={`w-full h-full object-cover brightness-[90%] object-center group-hover:scale-105 transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
        src={src} 
        alt={alt} 
        fill 
        onLoadingComplete={() => setIsLoading(false)}
      />
      {!isLoading && <p className='absolute bottom-5 left-5 font-heading text-white tracking-[2px] text-3xl'>{title}</p>}
    </Link>
  )
}

function Collections() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:grid-rows-2  grid-rows-4 xl:grid-cols-3 xl:gap-2 pt-4'>
      {COLLECTION_ITEMS.map((item, index) => (
        <CollectionItem key={index} {...item} />
      ))}

      
    </div>
  )
}

export default Collections