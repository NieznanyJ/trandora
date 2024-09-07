'use client';

import { Button } from './ui/button';
import { useWixClient } from '@/hooks/useWixClient';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuantity, addToCart } from '@/lib/features/cartSlice';
import { products } from '@wix/stores';
import { useToast } from '@/hooks/use-toast';

function AddToCartButton({ id, variant }: { id: string; variant?: products.Variant }) {
  const wixClient = useWixClient();
  const { toast } = useToast();
  const quantity = useAppSelector((state) => state.cartSlice.quantity);
  const dispatch = useAppDispatch();

  

  function handleAddToCart() {



    dispatch(addToCart({
      wixClient,
      productId: id,
      quantity,
      variantId: variant?._id
  }));

    dispatch(setQuantity(1));
    toast({
      description: 'Item has been added to cart',
      duration: 3000,
    });



  }

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full bg-black text-white hover:bg-gray-800 transition-colors font-medium"
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;