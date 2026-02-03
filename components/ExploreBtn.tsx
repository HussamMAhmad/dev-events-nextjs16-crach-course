'use client';
import React from 'react'
import {FaArrowDown} from "react-icons/fa6";
import posthog from 'posthog-js';

function ExploreBtn() {
    const handleClick = () => {
        console.log("clicked")
        // Capture explore events button click
        posthog.capture('explore_events_clicked', {
            button_location: 'hero_section',
        });
    };

    return (
        <a  href="#events"
            id="explore-btn"
            onClick={handleClick}
             className="flex-center cursor-pointer mt-7 gap-2 mx-auto p-5">
            <h2 className="flex-center">Explore Events</h2>
            <FaArrowDown size={'18px'}/>
        </a>
    )
}

export default ExploreBtn
