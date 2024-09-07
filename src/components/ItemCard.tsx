import Image from 'next/image'
import Link from 'next/link'
import { products } from '@wix/stores'

interface ItemCardProps {
    item: products.Product
}

function ItemCard({ item }: ItemCardProps) {


    return (
        <div className='w-full h-full max-h-[500px] flex flex-col gap-4 xl:min-w-[270px]'  >

            <div >
                <Image className='w-full h-full max-h-[220px]  object-cover' src={item.media?.mainMedia?.image?.url!} alt={item.name!} width={200} height={400} />
            </div>
            <div className='flex items-start justify-between border-t-[1px] border-black border-spacing-2 text-sm'>
                <p>{item.name}</p>
                <div className='flex flex-col items-center '>
                    { item.discount?.type !== 'NONE' && <span>{item.priceData?.formatted?.discountedPrice}</span>}
                    <span className={`${item.discount?.type !== 'NONE' && 'line-through text-gray-500 text-xs'}`}>{item.priceData?.formatted?.price}</span>
                </div>
                
            </div>

        </div>
    );
}


export default ItemCard