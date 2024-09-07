'use client'

import { ArrowLeft, ArrowRight } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";


interface PaginationProps {
    currentPage: number;
     hasPrev: boolean; 
     hasNext: boolean
}

function Pagination({ currentPage, hasPrev, hasNext }: PaginationProps) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();

    function createPageURL(pageNr:number){
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNr.toString());
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-full flex items-center justify-between">

            <Button disabled={!hasPrev} onClick={() => createPageURL(currentPage-1)}  className='bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'><ArrowLeft />Prev</Button>
            <Button disabled={!hasNext} onClick={() => createPageURL(currentPage+1)} className='bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'><ArrowRight />Next</Button>

        </div>
        

    )
}

export default Pagination

