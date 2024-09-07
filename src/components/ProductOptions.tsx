'use client'

import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select'
import { products } from '@wix/stores'
import React, { useEffect, useState } from 'react'
import AddToCartButton from './AddToCartButton';
import QuantityChanger from './QuantityChanger';



const ProductOptions = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">{option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === "Color" ? (
                <li
                  className={`w-full  rounded-md ring-gray-300 relative flex items-center  gap-2 p-2  capitalize transition-colors border-2 ${selected ? ' border-black  ' : 'border-gray-300'} ${disabled && 'opacity-50'}`}
                  style={{
                    
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  <div className='size-4 rounded-full ring-[1px] ring-gray-400' style={{backgroundColor: choice.value}}></div>
                  {choice.description}
                 
                </li>
              ) : (
                <li
                  className={  `w-max  rounded-md ring-gray-300 relative flex items-center  gap-2 p-2  capitalize transition-colors border-2 px-4 text-sm  ${selected ? ' border-black  ' : 'border-gray-300'} ${disabled && 'opacity-50'}` }
                  style={{
                    
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <QuantityChanger variant={selectedVariant } />
      <AddToCartButton id={productId} variant={selectedVariant} />
    </div>
  );
};

export default ProductOptions;


