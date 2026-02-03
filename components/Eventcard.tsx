'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoLocationOutline , IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import posthog from 'posthog-js';

interface Props {
    title: string,
    image: string,
    slug: string,
    location: string,
    date: string,
    time: string,
}

function Eventcard({image, title, slug, location, time, date }: Props) {
    const handleClick = () => {
        // Capture event card click
        posthog.capture('event_card_clicked', {
            event_title: title,
            event_slug: slug,
            event_location: location,
            event_date: date,
            event_time: time,
        });
    };

    return (
        <Link href={`/events/${slug}`} id='event-card' onClick={handleClick}>
            <Image src={image} alt={title} width={410} height={300} className="poster"/>
            <div className="flex flex-row gap-2">
                <IoLocationOutline/>
                <p>{location}</p>
            </div>
            <p className='title'>{title}</p>
            <div className='datetime'>
                <div className="flex flex-row gap-2 items-center">
                    <MdOutlineDateRange/>
                    <p>{date}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <IoTimeOutline/>
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default Eventcard

