'use client';

import { products } from '@wix/stores';
import { useState } from 'react';
import ProductOptions from './ProductOptions';
import AddToCartButton from './AddToCartButton';
import QuantityChanger from './QuantityChanger';

export default function ProductDetails({ product }: { product: products.Product }) {
  const [selectedVariant, setSelectedVariant] = useState<products.Variant | undefined>();

  const handleVariantChange = (variant: products.Variant | undefined) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="w-full md:w-1/2 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold capitalize mb-2">{product.name}</h1>
        {product.ribbon && (
          <span className="bg-gray-200 rounded-full w-max px-3 py-1 text-sm capitalize">
            {product.ribbon}
          </span>
        )}
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap">
          {product.stock?.inventoryStatus === 'IN_STOCK' ? (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">In Stock</span>
              {product.stock.quantity! < 10 && (
                <p className="text-orange-500">Only {product.stock.quantity} left</p>
              )}
            </div>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
          <div className="flex flex-col items-end">
            {product.discount?.type !== 'NONE' && (
              <span className="text-2xl font-bold text-red-600">
                {selectedVariant?.priceData?.formatted?.discountedPrice || product.priceData?.formatted?.discountedPrice}
              </span>
            )}
            <span
              className={`text-xl ${
                product.discount?.type !== 'NONE' ? 'line-through text-gray-500' : 'font-bold'
              }`}
            >
              {selectedVariant?.priceData?.formatted?.price || product.priceData?.formatted?.price}
            </span>
          </div>
        </div>
        
        <ProductOptions
          productOptions={product.productOptions!}
          variants={product.variants!}
          productId={product._id!}
          onVariantChange={handleVariantChange}
        />
        
        <QuantityChanger variant={selectedVariant} />
        
        <AddToCartButton id={product._id!} variant={selectedVariant} />
        
        {product.brand && (
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
        )}
        
        {product.sku && (
          <div className="text-sm text-gray-500">
            <span className="font-semibold">SKU:</span> {product.sku}
          </div>
        )}
        
        {product.weight && (
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Weight:</span> {product.weight.value} {product.weight.unit}
          </div>
        )}
      </div>
    </div>
  );
}