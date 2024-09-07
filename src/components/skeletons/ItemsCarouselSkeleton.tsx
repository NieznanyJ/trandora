import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import ItemCardSkeleton from "./ItemCardSkeleton";


function ItemsCarouselSkeleton(){
    return (
        <section className='w-full p-2 max-w-[1440px] mx-auto'>
           
            <Carousel className="pt-4 ">
                <CarouselContent className="flex items-center justify-between max-w-[1440px] xl:gap-2">
                    {[...Array(9)].map((_, index) => (
                        <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/4 xl:basis-1/4 w-full">
                            <ItemCardSkeleton />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='hidden md:flex md:left-5 md:size-16 md:top-[110%] lg:top-1/2 lg:size-10 lg:-left-5 cursor-pointer' />
                <CarouselNext className='hidden md:flex md:right-5 md:size-16 md:top-[110%] lg:top-1/2 lg:size-10 lg:-right-5 cursor-pointer' />
            </Carousel>
        </section>
    );
}


export default ItemsCarouselSkeleton