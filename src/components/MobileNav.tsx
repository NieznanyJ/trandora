'use client'
import { useState } from 'react'
import { X, Menu, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Cart from './Cart'

const NAVIGATION_LINKS = [
    { label: 'MEN', href: '/collection/Men' },
    { label: 'WOMEN', href: '/collection/Women' },
    { label: 'KIDS', href: '/collection/Kids' },
    { label: 'ABOUT', href: '/' },
    { label: 'CONTACT', href: '/' },
]

const CATEGORY_LINKS = ['New', 'Sale', 'Bestsellers', 'Dresses', 'Shoes', 'Bags', 'Accessories']

function MobileNav({ className }: { className?: string }) {
    const [navOpen, setNavOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const toggleDropdown = (label: string) => {
        setActiveDropdown(prev => prev === label ? null : label)
    }

    return (
        <div className={cn('bg-white h-[80px] sticky top-0 left-0 z-50 flex items-center justify-between px-2 border-b-[1px] border-black', className)}>
            <button
                onClick={() => setNavOpen(true)}
                className="z-40 p-2 bg-white rounded-full shadow-md cursor-pointer"
            >
                <Menu size={24} />
            </button>
            <Link href='/'><Image src='/logo.svg' alt='Trendora' width={160} height={160} /></Link>
            <div className='flex items-center gap-4'>
                <div className='relative'>
                    <Cart />
                    <span className='absolute bg-red-600 text-white rounded-full flex items-center justify-center -top-1 -right-1 size-4 text-xs'> 1</span>
                </div>
            </div>

            <nav className={`
                fixed top-0 left-0 h-screen bg-white z-50 
                transition-all duration-300 ease-in-out
                ${navOpen ? 'w-64' : 'w-0'}
                overflow-hidden
            `}>
                <button
                    onClick={() => setNavOpen(false)}
                    className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md cursor-pointer"
                >
                    <X size={24} />
                </button>
                <ul className="pt-24 px-4 flex flex-col gap-2">
                    {NAVIGATION_LINKS.map((link) => (
                        <li
                            className='nav-link transition-colors w-full text-start'
                            key={link.label}
                        >
                            {(link.label === 'MEN' || link.label === 'WOMEN' || link.label === 'KIDS') ? (
                                <div className='flex flex-col'>
                                    <div 
                                        className='flex items-center justify-between p-4 cursor-pointer hover:bg-black hover:text-white'
                                        onClick={() => toggleDropdown(link.label)}
                                    >
                                        <span>{link.label}</span>
                                        {activeDropdown === link.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                    <ul className={`bg-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === link.label ? 'max-h-screen' : 'max-h-0'}`}>
                                        {CATEGORY_LINKS.map((category) => (
                                            <li key={category} className="hover:bg-black text-sm transition-colors">
                                                <Link href={`${link.href}/${category}`} className="block p-4 text-black hover:text-white transition-colors uppercase">
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <Link href={link.href} className="block p-4 hover:bg-black hover:text-white">
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Overlay */}
            {navOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setNavOpen(false)}
                ></div>
            )}
        </div>
    )
}

export default MobileNav