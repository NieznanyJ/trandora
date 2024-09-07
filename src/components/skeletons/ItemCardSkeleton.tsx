import { Skeleton } from "../ui/skeleton";

function ItemCardSkeleton(){
    return(

        <div className='xl:w-[300px] w-full   h-[400px] max-h-[500px] flex flex-col gap-4' >
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-6 " />
        </div>
    );
}

export default ItemCardSkeleton