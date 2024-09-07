'use client'
import {  usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { collections } from "@wix/stores";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { search, setCategory, setSort, setMinPriceRange, setMaxPriceRange } from '@/lib/features/filterSlice'
import { Search } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";

const SORT = [{
    type: 'desc',
    label: 'Highest price'
},
{
    type: 'asc',
    label: 'Lowest price'
},
{
    type: 'a-z',
    label: 'from a-z'
},
{
    type: 'z-a',
    label: 'from z-a'
}
]

interface FilterProps {
    collections: collections.Collection[];
}

function Filter({ collections }: FilterProps) {


    const filterValues = useAppSelector((state) => state.filterSlice)



    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();


    

    function handleClearFilter() {
        replace(`${pathname}`); 
    }

    function handleFilterProducts(formData: FormData) {
        const formObject = Object.fromEntries(formData.entries());
        console.log(formObject)
        const params = new URLSearchParams(searchParams)

        Object.entries(formObject).forEach(([name, value]) => {
            
                params.set(name, value.toString());

            
        });
        replace(`${pathname}?${params.toString()}`)

    }



    
    
    return (
        <form
            className="flex md:flex-col items-center justify-between border-b-[1px] py-4 flex-wrap md:flex-nowrap gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleFilterProducts(formData); 
            }}
        >
            <div className="flex items-center w-full ring-2 ring-gray-200 ring-offset-2 hover:ring-black rounded-md px-2">
                <Search />
                <Input
                    
                    className="rounded-md xl:text-lg w-full border-none focus-visible:ring-0 h-full peer focus-visible:ring-transparent flex-1"
                    placeholder="Search..."
                    name="name"
                />
            </div>
    
            <div className="w-full flex-wrap flex items-center gap-6">
                <Select
                    name="category"
                    
                >
                    <SelectTrigger className="w-full flex-1 cursor-pointer xl:text-lg">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {collections.map((collection) => (
                            <SelectItem
                                className="capitalize cursor-pointer xl:text-lg"
                                key={collection.name}
                                value={collection.name!}
                            >
                                {collection.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
    
                <Select
                    name="sort"
                    
                >
                    <SelectTrigger className="w-full flex-1 cursor-pointer xl:text-lg">
                        <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                        {SORT.map((option) => (
                            <SelectItem
                                className="capitalize cursor-pointer xl:text-lg"
                                key={option.type}
                                value={option.type}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
    
            <div className="w-full flex justify-between gap-10">
                <div className="flex flex-col items-start">
                    <span>Min price</span>
                    <Input
                        
                        className="rounded-md xl:text-lg w-full h-full peer focus-visible:ring-transparent flex-1"
                        type="number"
                        placeholder="0"
                        name="min"
                    />
                </div>
    
                <div className="flex flex-col items-start">
                    <span>Max price</span>
                    <Input
                        
                        className="rounded-md xl:text-lg w-full h-full peer focus-visible:ring-transparent flex-1"
                        type="number"
                        placeholder="1000"
                        name="max"
                    />
                </div>
            </div>
    
            <div className="w-full flex-wrap flex items-center justify-between gap-6"> 
            <Button onClick={() => handleClearFilter()} className='w-full  bg-white text-black border-[1px] border-black hover:bg-black hover:text-white transition-colors font-medium'>CLEAR FILTER</Button>
            <Button className='w-full  bg-black font-medium hover:bg-black'>APPLY FILTER</Button>

            </div>
        </form>
    );
    
   
}

export default Filter;
