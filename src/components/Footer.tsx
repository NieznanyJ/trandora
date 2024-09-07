import { Button } from "./ui/button";
import Image from 'next/image'
import Link from 'next/link'

const NAVIGATION_LINKS = [
    { label: 'HOME', href: '/' },
    { label: 'MEN', href: '/products/men' },
    { label: 'WOMEN', href: '/products/women' },
    { label: 'KIDS', href: '/products/kids' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
]

const CATEGORY_LINKS = [
    {
        label: 'ALL PRODUCTS',
        href: '/products'
    },
    {
        label: 'NEW',
        href: '/products/new'
    },
    {
        label: 'SALE',
        href: '/products/sale'
    },
    {
        label: 'DRESSES',
        href: '/products/dresses'
    },
    {
        label: 'SHOES',
        href: '/products/shoes'
    },
    {
        label: 'BAGS',
        href: '/products/bags'
    },
    {
        label: 'ACCESSORIES',
        href: '/products/accessories'
    },
]


function Footer() {
    return (
        <footer className="bg-black pt-20">
            <div className="w-[90%] flex flex-col md:flex-row md:items-start  items-center gap-10 max-w-[1440px] mx-auto">
                <div className="flex flex-col items-center md:items-start md:text-start  text-center gap-6 flex-1">
                    <p className="font-heading text-white text-2xl ">GET CREATIVE WITH CLOTHES.
                        STYLISH INSPIRATION FOR EVERY OCCASION.</p>
                    <Button className="bg-black border-2 border-white text-white hover:bg-white hover:text-black transition-colors">CONTACT US</Button>
                </div>

                <div className='w-full flex flex-col md:flex-row md:items-start  items-center  gap-10 justify-between flex-1'>
                <div className="w-full  items-center text-center md:text-start md:items-start flex flex-col gap-2 text-sm text-white flex-1">
                    {NAVIGATION_LINKS.map((link) => (
                        <Link className="w-full" href={link.href} key={link.label}>{link.label}</Link>
                    ))}
                </div>
                <div className="w-full  items-center text-center md:text-start md:items-start flex flex-col gap-2 text-sm text-white flex-1">


                    {CATEGORY_LINKS.map((link) => (
                        <Link href={link.href} key={link.label}>{link.label}</Link>
                    ))}




                </div>

                </div>
                <div className="flex flex-col w-full text-center md:text-start  gap-6 text-white text-sm flex-1">
                    <p>support@trendora.com</p>
                    <div className="flex flex-col gap-2 text-sm text-white">
                        <p>1234 Commerce Avenue, Suite 567</p>
                        <p>Mercantile Business Park</p>
                        <p>Metropolis, NY 10108</p>
                        <p>United States</p>
                    </div>
                    <div className="flex items-center gap-4 w-full text-center justify-center md:justify-start">
                        <Image className="fill-white" src='/x.svg' alt="x" width={25} height={25} />
                        <Image className="fill-white" src='/facebook.svg' alt="facebook" width={25} height={25} />
                        <Image className="fill-white" src='/instagram.svg' alt="instagram" width={25} height={25} />
                    </div>
                </div>
            </div>

            <div className="w-full text-center md:text-start  border-t-[1px] border-white mt-10 flex items-center justify-start py-6">
                <span className='w-[90%] max-w-[1440px] mx-auto  text-white  text-sm'>@copyright </span>
            </div>
        </footer>
    );
}

export default Footer






