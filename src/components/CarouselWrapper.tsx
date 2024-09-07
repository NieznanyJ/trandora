import React from 'react'
import ItemsCarousel from './ItemsCarousel';
import { wixClientServer } from '@/lib/wixClientServer';

interface CarouselWrapperProps {
    categoryId?: string;
    limit?: number
}

async function CarouselWrapper({ categoryId, limit }: CarouselWrapperProps) {

    const wixClient = await wixClientServer();
    const items = await (await wixClient.products.queryProducts().eq('collectionIds', categoryId).limit(limit!).find()).items



    return (
        <ItemsCarousel items={items} />
    )
}

export default CarouselWrapper