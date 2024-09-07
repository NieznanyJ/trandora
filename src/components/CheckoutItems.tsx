'use client'

import { useWixClient } from "@/hooks/useWixClient"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Button } from "./ui/button"
import Image from "next/image"
import { media as wixMedia } from "@wix/sdk"
import { removeItem } from "@/lib/features/cartSlice"
import Link from "next/link"
import CartItem from "./CartItem"

function CheckoutItems() {

    const wixClient = useWixClient()
    const dispatch = useAppDispatch()
    const checkoutItems = useAppSelector((state) => state.cartSlice.cart)
    const total = useAppSelector((state) => state.cartSlice.total)

    function handleRemoveItem(itemId: string) {
        dispatch(removeItem({ wixClient, itemId }))
    }


    return (
        <div className="flex flex-col gap-4">
            {checkoutItems?.length! > 0 ?
                <ul className="flex flex-col gap-4">
                    {checkoutItems?.map(item => (
                        <CartItem key={item._id} product={item}  />
                    ))}
                </ul> :

                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-center font-heading text-2xl">Cart empty </h3>
                    <Link href='/products'><Button className='bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>GO TO PRODUCTS PAGE</Button>
                    </Link></div>
            }

            {checkoutItems && checkoutItems.length > 0 && <p className="flex items-center gap-4 justify-end border-t-[1px] border-black pt-4">Total: {total}</p>}

        </div>
    )
}

export default CheckoutItems