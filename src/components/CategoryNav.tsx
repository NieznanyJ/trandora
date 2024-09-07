'use client'
import Link from "next/link"

import { useState } from "react"
import { collections } from "@wix/stores"
import { ChevronDown, ChevronUp } from "lucide-react"

const COLLECTION_PAGES = ['men', 'women', 'kids']

function CategoryNav({collections} : {collections: collections.Collection[]}) {
  const [navOpen, setNavOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const toggleDropdown = (label: string) => {
        setActiveDropdown(prev => prev === label ? null : label)
    }
  return (
    <div className="w-full  ">
        <ul className=" flex flex-col gap-2">
        <li
                            className='nav-link transition-colors w-full text-start text-lg capitalize'
                            
                        ><div 
                        className='flex items-center justify-between p-4 cursor-pointer hover:bg-black hover:text-white'
                        
                    >
                        <span>All</span>
                        
                    </div></li>
                    {COLLECTION_PAGES.map((link) => (
                        <li
                            className='nav-link transition-colors w-full text-start text-lg capitalize'
                            key={link}
                        >
                            
                                <div className='flex flex-col'>
                                    <div 
                                        className='flex items-center justify-between p-4 cursor-pointer hover:bg-black hover:text-white'
                                        onClick={() => toggleDropdown(link)}
                                    >
                                        <span>{link}</span>
                                        {activeDropdown === link ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                    <ul className={`bg-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === link ? 'max-h-screen' : 'max-h-0'}`}>
                                        {collections.map((category) => (
                                            <li key={category._id} className="hover:bg-black text-sm transition-colors">
                                                <Link href={`/products/${link}/${category.name}`} className="block p-4 text-black hover:text-white transition-colors uppercase">
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                           
                        </li>
                    ))}
                </ul>
      </div>
  )
}

export default CategoryNav