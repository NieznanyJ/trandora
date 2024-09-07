'use client'


import Image from "next/image";
import Link from "next/link";
import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"


interface CategoryItem {
    href: string;
    src: string;
    alt: string;
    title: string;
  }
  
  const categories: CategoryItem[] = [
    { href: '/products/Women', src: '/Women.webp', alt: 'Women', title: 'WOMEN' },
    { href: '/products/Men', src: '/Men.webp', alt: 'Men', title: 'MEN' },
    { href: '/products/Kids', src: '/Kids.webp', alt: 'Kids', title: 'KIDS' },
  ]
  
  function CategoryItem({ href, src, alt, title }: CategoryItem) {
    const [isLoading, setIsLoading] = useState(true)
  
    return (
      <Link href={href} className="relative md:h-[400px]  h-full flex-1 xl:h-[760px] overflow-hidden group">
        {isLoading && (
          <Skeleton className="w-full h-full absolute inset-0" />
        )}
        <Image 
          className={`object-cover   object-top brightness-75 group-hover:scale-105 transition-all duration-300  ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
          src={src} 
          alt={alt} 
          fill
           
          onLoad={() => setIsLoading(false)}
        />
        <h2 className="absolute bottom-10 left-1/2 -translate-x-[50%] text-white text-4xl">{title}</h2>
      </Link>
    )
  }
  
  function Categories() {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 xl:flex  items-center w-full max-w-[1440px] xl:h-full h-screen md:h-auto  gap-6 p-4">
        {categories.map((category, index) => (
          <CategoryItem key={index} {...category} />
        ))}
      </section>
    )
  }


  export default Categories