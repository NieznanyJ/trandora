'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from "@/components/ui/button"
import CartItem from "./CartItem"
import { useWixClient } from "@/hooks/useWixClient"
import { cart } from "@wix/ecom"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCart, setNrOfItems } from "@/lib/features/cartSlice"

function Cart({ className }: { className?: string }) {
    const [cartOpen, setCartOpen] = useState(false)

    /*  const [cartItems, setCartItems] = useState<cart.LineItem[]>([]) */
    const cartRef = useRef<HTMLDivElement>(null)
    const wixClient = useWixClient()
    const dispatch = useAppDispatch()
    const nrOfItems = useAppSelector((state) => state.cartSlice.nrOfCartItems)
    const total = useAppSelector((state) => state.cartSlice.total)
    const cartItems = useAppSelector((state) => state.cartSlice.cart)



    useEffect(() => {

        dispatch(setNrOfItems(cartItems))
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setCartOpen(false)
            }
        }

        if (cartOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [cartOpen, wixClient.currentCart, dispatch, wixClient, cartItems])


    useMemo(() => {
        function getCart() {
            dispatch(fetchCart(wixClient))




        }


        getCart()
    }, [dispatch, wixClient])

    return (
        <div className='relative flex items-center'>
            <button className='relative' onClick={() => setCartOpen(prev => !prev)}>
                <Image src='/cart.svg' alt='cart' width={25} height={25} />
                {nrOfItems! > 0 && <span className='absolute bg-red-600 text-white rounded-full flex items-center justify-center -top-1 -right-1 size-4 text-xs'> {nrOfItems}</span>}
            </button>

            {cartOpen && (
                <div ref={cartRef} className='bg-white shadow-md rounded-md w-screen h-screen top-14 -right-2 absolute flex flex-col justify-between gap-4 p-4 md:min-w-[400px] md:min-h-[300px] md:w-full md:h-max md:max-h-[600px] z-20'>
                    <p className="text-md font-semibold w-full border-b-[1px] border-black pb-2">CART ({nrOfItems || 0})</p>

                    {cartItems?.length! > 0 ?
                        <ul className="flex flex-col gap-2 border-b-[1px] border-black pb-4">
                            {cartItems?.map((item, index) =>
                                <div key={item._id}>
                                    {index < 4 && <CartItem product={item} key={item._id} />}
                                </div>
                            )}
                        </ul> : <p className="text-xl text-center  pb-4">Your cart is empty</p>}

                    <div className="flex items-center justify-end">

                        {cartItems && cartItems.length > 0 && <p className="flex items-center gap-4">Total: {total}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button className='bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>GO TO CART</Button>
                        <Link href='/checkout' onClick={() => setCartOpen(false)}>
                            <Button className='bg-black font-medium hover:bg-black'>GO TO CHECKOUT</Button></Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
