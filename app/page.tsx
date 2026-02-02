import React from 'react';
import ExploreBtn from "@/components/ExploreBtn";
import Eventcard from "@/components/Eventcard";
import {events} from "@/lib/constants";

function Page() {
    return (
        <section>
            <h1 className={'text-center'}>The Hub for every dev <br/> Event You Cant&#39;t Miss</h1>
            <p className='text-center mt-5'>Hackathons , Meetups , and Conferences , All in One Place</p>
            <ExploreBtn/>

            <div className='mt-20 space-y-7'>
                <h3>Featured Events</h3>
                <ul className='events list-none'>
                    {events.map(event => (
                        <li key={event.title}>
                            <Eventcard title={event.title}
                                       image={event.image}
                                       slug={event.slug}
                                       date={event.date}
                                       time={event.time}
                                       location={event.location}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Page;