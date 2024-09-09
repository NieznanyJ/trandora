import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";
import Image from "next/image";
import Link from "next/link";
import ShopNow from "@/components/ShopNow"
import Categories from "@/components/Categories"
import ItemsCarousel from '@/components/ItemsCarousel'

import Collections from "@/components/Collections";
import { Suspense } from "react";
import ItemsCarouselSkeleton from "@/components/skeletons/ItemsCarouselSkeleton";
import { wixClientServer } from "@/lib/wixClientServer";
import CarouselWrapper from "@/components/CarouselWrapper";


export const dynamic = 'force-dynamic'


export default async function Home() {


  return (




    <main className="flex min-h-screen flex-col items-center justify-between gap-[5em]  ">



      {/* HERO SECTION */}
      <section className="w-full h-[400px] xl:h-screen max-h-[800px]  relative">

        <div className="w-full flex items-end h-full  z-10 relative">
          <div className="z-10 w-full p-4 flex flex-col items-start  w-1440 pb-4">
            <ShopNow className="text-xl w-full ml-1  md:text-[1.5rem] xl:text-4xl" />
            <h1 className="font-heading text-4xl md:text-[5rem] xl:text-[10em] leading-[150%]  text-white  uppercase  tracking-[5%]">Redefine Your Style</h1>
          </div>
          <Image className='object-cover brightness-[80%] w-full h-full z-0' src='/Hero.png' alt='Redefine Your Style' fill />
        </div>
      </section>


      <Categories />




      <section className='flex flex-col w-full  xl:max-w-[1440px] mx-auto  p-4'>
        <div className='flex w-full items-center justify-between border-b-[1px] pb-2 border-black'>
          <h2 className='font-heading text-2xl tracking-[2px]'>BESTSELLERS</h2>
          <Link href='collection/bestsellers' className="text-sm font-semibold flex items-center  gap-2 ">
            <span >View All</span>
            <Image src='/arrow.svg' alt='view all' width={10} height={10} />
          </Link>
        </div>
        <Suspense fallback={<ItemsCarouselSkeleton />}>

          <CarouselWrapper categoryId={process.env.FEATURED_ITEMS_CATEGORY_ID} limit={12} />
        </Suspense>


      </section>

      <section className='flex flex-col w-full  xl:max-w-[1440px] mx-auto  p-4' >
        <div className='flex w-full items-center justify-between border-b-[1px] pb-2 border-black'>
          <h2 className='font-heading text-2xl tracking-[2px]'>FEATURED</h2>
          <Link href='collection/new' className="text-sm font-semibold flex items-center  gap-2 ">
            <span >View All</span>
            <Image src='/arrow.svg' alt='view all' width={10} height={10} />
          </Link>
        </div>
        <Suspense fallback={<ItemsCarouselSkeleton />}>
          <CarouselWrapper categoryId={process.env.BESTSELLERS_CATEGORY_ID} limit={12} />



        </Suspense>
      </section>





      <section className="flex flex-col w-full  xl:max-w-[1440px] mx-auto  p-4">
        <div className='flex  items-center justify-between border-b-[1px] pb-2 border-black'>
          <h2 className='font-heading text-2xl tracking-[2px]'>COLLECTIONS</h2>

        </div>

        {/* <Collections /> */}
      </section>



      <section className="w-full h-[400px] md:h-[600px] xl:h-[800px] relative">

        <div className="w-full flex items-end h-full  z-10 relative pb-10">
          <div className="z-10 w-full text-center flex flex-col gap-4 md:gap-10 items-start  w-1440 pb-4">
            <div className="w-full flex flex-col items-center">
              <h3 className="font-heading w-full text-2xl p-2 md:text-[2.2em] md:w-2/3 xl:text-[4em] xl:w-2/3  text-center leading-[150%] tracking-[1px] text-white  uppercase  ">FIND YOUR UNIQUE STYLE WITH OUR
                FASHION COLLECTION</h3>
              <p className="font-heading w-full text-xs md:text-[1em] xl:text-[1.5em] text-center leading-[150%]  text-white  uppercase  ">Exclusive Selections, Just for You</p>
            </div>
            <ShopNow className=" text-lg w-full md:text-[1.5em] xl:text-2xl ml-1" />

          </div>
          <Image className='object-cover object-center xl:object-top brightness-[80%] w-full h-full z-0' src='/Collection.png' alt='Redefine Your Style' fill />
        </div>
      </section>


    </main>
  );
}
