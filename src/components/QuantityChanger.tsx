'use client'


import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setQuantity } from '@/lib/features/cartSlice'
import { products } from '@wix/stores'



function QuantityChanger({min = 0, max = 99, variant}: {min?:number; max?: number; variant?:products.Variant}){

  const quantity = useAppSelector((state) => state.cartSlice.quantity)
  const dispatch = useAppDispatch();


  if(variant){
    max = variant.stock?.quantity!
  }

  const handleIncrease = () => {
    if (quantity < max) {
      dispatch(setQuantity(quantity+1))
    }
  }

  const handleDecrease = () => {
    if (quantity > min+1 ) {
      dispatch(setQuantity(quantity-1))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value)
    if (!isNaN(newQuantity) && newQuantity >= min+1 && newQuantity <= max) {
      dispatch(setQuantity(quantity+newQuantity))
    }
  }

  return (
    <div className="flex items-center ">
      <Button
      className='rounded-none'
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={quantity <= min+1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        
        
        value={quantity}
       
        onChange={handleInputChange}
        className="w-16 text-center focus-visible:ring-0 focus-visible:outline-none rounded-none"
        min={min}
        max={max}
      />
      <Button
      className='rounded-none'
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default QuantityChanger