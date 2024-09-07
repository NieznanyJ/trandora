"use client"

import ItemCard from "./ItemCard";
import { useParams } from "next/navigation";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ItemsCarouselSkeleton from "./skeletons/ItemsCarouselSkeleton";
import { products } from "@wix/stores";
import Link from "next/link";

type Item = products.Product

interface ItemsCarouselProps {
    items?: Item[]
    isLoading?: boolean;

}



function ItemsCarousel({ items, isLoading = false }: ItemsCarouselProps) {


    const params = useParams<{collection:string}>();



    return (
        <div className='w-full'>

            {items ? <Carousel className="pt-4">
                <CarouselContent>
                    {items?.map((item: Item, index: number) => (
                        <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/4 xl:basis-1/5">
                            <Link href={`/products/${params.collection ? encodeURIComponent(params.collection) : encodeURIComponent('all products')}/${item.slug}`}>
                            <ItemCard item={item} />
                            </Link>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious className='hidden md:flex' />
                <CarouselNext className='hidden md:flex' />
            </Carousel> : <ItemsCarouselSkeleton />}


        </div>
    );
}



export default ItemsCarousel


