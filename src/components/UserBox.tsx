'use client'

import { User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useWixClient } from '@/hooks/useWixClient'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'

function UserBox() {
    const [userBoxOpen, setUserBoxOpen] = useState(false)
    const userBoxRef = useRef<HTMLDivElement>(null) // Create a ref for the UserBox

    const wixClient = useWixClient()
    const isLoggedIn = wixClient.auth.loggedIn()

    const router = useRouter()
    const pathname = usePathname();

    async function logout() {
        Cookies.remove("refreshToken")
        const { logoutUrl } = await wixClient.auth.logout(window.location.href)
        router.push(logoutUrl)
    }

    function login() {
        if (isLoggedIn) {
            return
        }
        router.push('/login');
    }

    function handleOpenUserBox() {
        setUserBoxOpen(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userBoxRef.current && !userBoxRef.current.contains(event.target as Node)) {
                setUserBoxOpen(false) // Close the UserBox if clicked outside
            }
        }

        if (userBoxOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [userBoxOpen])

    return (
        <div className='flex items-center relative cursor-pointer' onClick={!isLoggedIn ? login : handleOpenUserBox} ref={userBoxRef}>
            <User size={25} />
            {userBoxOpen && isLoggedIn &&
                <div className='flex flex-col items-start gap-2 text-center  rounded-md shadow-lg absolute top-10 -right-2  min-w-[200px] z-50 bg-white right-0'>
                    <Link className='text-start rounded-t-md  w-full p-2 hover:bg-gray-200 transition-colors' href='/profile'>Profile page</Link>
                    <button onClick={logout} className='text-start rounded-b-md w-full p-2 bg-transparent border-none outline-none hover:bg-gray-200 transition-colors'>Logout</button>
                </div>}
        </div>
    )
}

export default UserBox
