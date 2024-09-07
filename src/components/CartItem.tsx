import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import {media as wixMedia} from '@wix/sdk'
import {  currentCart } from '@wix/ecom'
import { useWixClient } from '@/hooks/useWixClient'
import { useAppDispatch } from '@/lib/hooks'
import { removeItem } from '@/lib/features/cartSlice'



function CartItem({ product }: {product: currentCart.LineItem}) {
    const wixClient = useWixClient();
    const dispatch = useAppDispatch()

    function handleRemoveItem(){
        dispatch(removeItem({wixClient, itemId:product._id!}))
    }



    return (
        <div className="flex items-center justify-between h-full min-h-[80px] ">
            <div className='flex gap-4'>
            <Image className="size-20 object-cover object-center" src={wixMedia.getScaledToFillImageUrl(product.image!, 80, 80, {})} alt="" width={40} height={40} />
            <div className="flex flex-col justify-between h-full">
                <p className='text-sm font-medium'>{product.productName?.original}</p>
                {product.descriptionLines && product.descriptionLines.map((desc, index) => 
                    (
                        <p className='text-xs text-gray-500' key={index}>{desc.name?.original} : {desc.plainText?.original}</p>
                    )
                )}
                <span className='text-xs text-gray-500'>Quantity: {product.quantity}</span>
            </div>
            </div>
            <div className="flex flex-col  items-center justify-betweenh-full gap-6">

                <p>{product.price?.formattedAmount}</p>
                <Button onClick={handleRemoveItem} className='bg-transparent h-max hover:bg-transparent text-black py-0'>Remove</Button>
            </div>
        </div>
    )
}

export default CartItem