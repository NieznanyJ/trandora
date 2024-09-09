'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from 'react'

import { Button } from "@/components/ui/button"
import CartItem from "./CartItem"
import { useWixClient } from "@/hooks/useWixClient"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCart, setNrOfItems } from "@/lib/features/cartSlice"
import { ShoppingCart } from 'lucide-react'

function Cart({ className }: { className?: string }) {
    const [cartOpen, setCartOpen] = useState(false)
    const cartRef = useRef<HTMLDivElement>(null)
    const wixClient = useWixClient()
    const dispatch = useAppDispatch()
    const nrOfItems = useAppSelector((state) => state.cartSlice.nrOfCartItems)
    const total = useAppSelector((state) => state.cartSlice.total)
    const cart = useAppSelector((state) => state.cartSlice.cart)
    const isLoggedIn = useAppSelector((state) => state.cartSlice.isLoggedIn)

    useEffect(() => {
        function getCart() {
            dispatch(fetchCart(wixClient))
        }
        isLoggedIn && getCart()
        isLoggedIn && dispatch(setNrOfItems(cart?.lineItems))

        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setCartOpen(false)
            }
        }

        if (cartOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [cartOpen, wixClient, cart, isLoggedIn, dispatch])

    return (
        <div className='relative flex items-center'>
            <button className='relative ' onClick={() => setCartOpen((prev) => !prev)}>
                <ShoppingCart size={25} />
                {nrOfItems! > 0 && (
                    <span className='absolute  bg-red-600 text-white rounded-full flex items-center justify-center -top-1 -right-1 size-4 text-xs'>
                        {nrOfItems}
                    </span>
                )}
            </button>

            {cartOpen && (
                <div
                    ref={cartRef}
                    className='bg-white shadow-md rounded-md w-screen h-[calc(100vw-80px)] top-14 -right-2 absolute flex flex-col justify-between gap-4 p-4 md:min-w-[400px] md:min-h-[300px] md:w-full md:h-max md:max-h-[600px] z-20'
                >
                    <p className="text-md font-semibold w-full border-b-[1px] border-black pb-2">
                        CART ({nrOfItems || 0})
                    </p>

                    {cart?.lineItems?.length! > 0 ? (
                        <ul className="flex flex-col gap-2 border-b-[1px] border-black pb-4">
                            {cart?.lineItems?.map((item, index) => (
                                <div key={item._id}>
                                    {index < 4 && <CartItem product={item} key={item._id} />}
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xl text-center pb-4">Your cart is empty</p>
                    )}

                    <div className="flex items-center justify-end">
                        {cart?.lineItems && cart?.lineItems.length > 0 && (
                            <p className="flex items-center gap-4">Total: {total}</p>
                        )}
                    </div>

                    <Link
                        href={`/${cart?.lineItems && cart?.lineItems?.length > 0 ? 'checkout' : 'products'}`}
                        onClick={() => setCartOpen(false)}
                    >
                        <Button className='bg-black font-medium hover:bg-black w-full'>
                            {cart?.lineItems && cart?.lineItems?.length > 0 ? 'GO TO CHECKOUT' : 'BROWSE PRODUCTS'}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cart
