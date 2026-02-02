'use client';
import React from 'react'
import {FaArrowDown} from "react-icons/fa6";

function ExploreBtn() {
    return (
        <a  href="#events"
            id="explore-btn"
            onClick={() => {
            console.log("clicked")
        }}
             className="flex-center cursor-pointer mt-7 gap-2 mx-auto p-5">
            <h2 className="flex-center">Explore Events</h2>
            <FaArrowDown size={'18px'}/>
        </a>
    )
}

export default ExploreBtn
