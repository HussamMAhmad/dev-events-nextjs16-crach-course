'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js';

function Navbar() {
    const handleNavClick = (linkName: string) => {
        // Capture navbar link click
        posthog.capture('navbar_link_clicked', {
            link_name: linkName,
        });
    };

    return (
        <header>
            <nav>
                <Link href='./' className='logo' onClick={() => handleNavClick('logo')}>
                    <Image src="/favicon.ico" alt="logo" width={24} height={24} />
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <Link href='./' onClick={() => handleNavClick('home')}>Home</Link>
                    <Link href='./' onClick={() => handleNavClick('events')}>Events</Link>
                    <Link href='./' onClick={() => handleNavClick('create_events')}>Create Events</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
