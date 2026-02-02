import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
    return (
        <header>
            <nav>
                <Link href='./' className='logo'>
                    <Image src="/favicon.ico" alt="logo" width={24} height={24} />
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <Link href='./'>Home</Link>
                    <Link href='./'>Events</Link>
                    <Link href='./'>Create Events</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
