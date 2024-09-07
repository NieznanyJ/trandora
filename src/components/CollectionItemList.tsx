'use client'

import { collections, products } from "@wix/stores"
import Link from "next/link"
import ItemCard from "./ItemCard"
import { useAppSelector } from "@/lib/hooks";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";



function CollectionItemList({items}: {items: products.Product[]}) {

    const params = useParams<{collection: string}>()
    console.log(params.collection)
    
    const searchTerm = useAppSelector((state) => state.filterSlice.searchTerm);
    const category = useAppSelector((state) => state.filterSlice.category);
    const sort = useAppSelector((state) => state.filterSlice.sort);
    const priceRange = useAppSelector((state) => state.filterSlice.priceRange);


    const filteredItems = useRef(items)


    const filterItems = useMemo(() => {
      let filtered = items.filter(i => {
          const matchesSearchTerm = searchTerm 
              ? i.name?.toLowerCase().includes(searchTerm.toLowerCase()) 
              : true;
          const matchesCategory = category 
              ? i.collectionIds?.find(c => c === category) 
              : true;
              const isInPriceRange = priceRange.min || priceRange.max
              ? (priceRange.min ? i.priceData?.discountedPrice! >= priceRange.min : true) &&
                (priceRange.max ? i.priceData?.discountedPrice! <= priceRange.max : true)
              : true;
          return matchesSearchTerm && matchesCategory && isInPriceRange;
      });
  
     
        if (sort && sort === 'desc') {
            filtered.sort((a, b) => 
              (b.priceData?.discountedPrice || 0) - (a.priceData?.discountedPrice || 0) );
        }
        else{
          filtered.sort((a, b) => 
              (a.priceData?.discountedPrice || 0) - (b.priceData?.discountedPrice || 0) );
        }

        if(priceRange.min || priceRange.max){
            priceRange
        }
      
  
      return filtered;
  }, [searchTerm, category, sort, priceRange, items]);
  
  
  filteredItems.current = filterItems;


  return (
    <>
        {filteredItems.current.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-4 p-4">
                {items.map((item: products.Product) => (
                    <Link key={item._id} href={`/products/${`${params.collection || encodeURIComponent('all products')}`}/${item.slug}`}>
                        <ItemCard item={item} />
                    </Link>
                ))}
            </ul>
        ) : (
            <h2 className="text-center text-2xl">No items found</h2>
        )}
    </>
);

}

export default CollectionItemList