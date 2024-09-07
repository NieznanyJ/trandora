'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { products } from '@wix/stores'


function ItemImageGallery({media} : {media: products.Media}) {
  const [mainImage, setMainImage] = useState<string>(media.mainMedia?.image?.url!)
  

  return (
    <div className='w-full md:w-1/2 flex flex-col gap-2'>
      <Image 
        className='object-cover object-center w-full rounded-md  h-auto md:h-[500px]' 
        src={mainImage} 
        alt='Main product image' 
        width={400}
        height={400}
      />
      <div className='flex items-center justify-between gap-2 flex-wrap'>
        {media.items?.map((item, index) => (
          <Image 
            key={index}
            className={`object-cover rounded-md cursor-pointer transition-opacity  md:h-[100px] aspect-square h-[70px]  duration-300 ${mainImage === item.thumbnail?.url! ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
            src={item.image?.url!} 
            alt={`Thumbnail ${index + 1}`} 
            width={100} 
            height={100}
            onClick={() => setMainImage(item.image?.url!)}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemImageGallery