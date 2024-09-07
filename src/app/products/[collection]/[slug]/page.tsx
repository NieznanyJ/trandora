
import ProductOptions from '@/components/ProductOptions';
import ItemImageGallery from '@/components/ItemImageGallery';
import QuantityChanger from '@/components/QuantityChanger';
import { Button } from '@/components/ui/button';
import { wixClientServer } from '@/lib/wixClientServer';
import { products, collections } from '@wix/stores';
import { notFound } from 'next/navigation';
import ItemsCarousel from '@/components/ItemsCarousel';
import GoBack from '@/components/GoBack'
import Breadcrumbs from '@/components/Breadcrumbs';
import AddToCartButton from '@/components/AddToCartButton';




export default async function SingleItemPage({ params }: { params: { collection: string, slug: string } }) {



    const wixClient = wixClientServer();
    const products = await (await wixClient).products.queryProducts().eq('slug', params.slug).find();
    const product = products.items[0]
    const similiar = await (await wixClient).products.queryProducts().eq('collectionIds', product.collectionIds![0]).limit(12).find()
    const similiarProducts = similiar.items
    
    console.log(product.productOptions)
    



    return (
        <main className='mx-auto w-full max-w-[1440px] p-4 space-y-20'>


            <div className='flex flex-col items-start gap-6 mt-10'>
                <GoBack />
                <Breadcrumbs productName={product.name!} collection={params.collection}/>
            </div>
            <section className='flex flex-col md:flex-row items-start justify-between gap-10'>



                <ItemImageGallery media={product.media!} />




                <div className='w-full md:w-2/3 space-y-6  '>

                    <div className='flex flex-col '>
                        <h1 className='text-2xl capitalize'>{product.name}</h1>
                        {product.ribbon && <span className='bg-gray-200 rounded-full w-max p-1 text-sm capitalize'>{product.ribbon} </span>}
                    </div>

                    <p className=''>{product.description}</p>

                    

                    <div className='flex flex-col md:items-start  gap-6'>
                        <div className='flex items-center justify-between md:items-start gap-4 flex-wrap w-full ' >
                            {product.stock?.inventoryStatus === 'IN_STOCK' ? <div className='flex items-center gap-6'>
                                
                              {product.stock.quantity! < 10 &&   <p className='text-sm text-gray-500'>Only {product.stock.quantity} products  left</p>}
                            </div> : <span>OUT OF STOCK</span>}
                            <div className='flex flex-col items-center '>
                                {product.discount?.type !== 'NONE' && <span className='text-lg'>{product.priceData?.formatted?.discountedPrice}</span>}
                                <span className={`${product.discount?.type !== 'NONE' && 'line-through text-gray-500 text-xs'}`}>{product.priceData?.formatted?.price}</span>
                            </div>
                        </div>
                        <ProductOptions productOptions={product.productOptions!} variants={product.variants!} productId={product._id!}  />
                    </div>






                </div>

            </section>


            {product.additionalInfoSections &&
                product.additionalInfoSections.map(info => (
                    <section key={info.title} className='flex flex-col w-full  xl:max-w-[1440px] mx-auto  p-4 space-y-4'>
                        <div className='flex w-full items-center justify-between border-b-[1px] pb-2 border-black'>
                            <h2 className='font-heading text-2xl tracking-[2px]'>{info.title}</h2>
                        </div>


                        <p>{info.description}</p>

                    </section>
                ))
            }


            {similiarProducts.length > 0 &&
                <section className='flex flex-col w-full  xl:max-w-[1440px] mx-auto  p-4 space-y-4'>
                    <div className='flex w-full items-center justify-between border-b-[1px] pb-2 border-black'>
                        <h2 className='font-heading text-2xl tracking-[2px]'>SIMILIAR ITEMS</h2>
                    </div>


                    <ItemsCarousel items={similiarProducts} />

                </section>
            }

        </main>
    );
}


