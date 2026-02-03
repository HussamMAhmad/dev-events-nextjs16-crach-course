'use client';

import React, { useEffect, useRef } from 'react';
import ExploreBtn from "@/components/ExploreBtn";
import Eventcard from "@/components/Eventcard";
import {events} from "@/lib/constants";
import posthog from 'posthog-js';

function Page() {
    const featuredEventsRef = useRef<HTMLDivElement>(null);
    const hasTrackedFeaturedViewed = useRef(false);
    const trackedScrollDepths = useRef<Set<number>>(new Set());

    useEffect(() => {
        // Track featured events section visibility
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTrackedFeaturedViewed.current) {
                        hasTrackedFeaturedViewed.current = true;
                        posthog.capture('featured_events_viewed', {
                            events_count: events.length,
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (featuredEventsRef.current) {
            observer.observe(featuredEventsRef.current);
        }

        // Track scroll depth milestones
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            const milestones = [25, 50, 75, 100];
            milestones.forEach((milestone) => {
                if (scrollPercent >= milestone && !trackedScrollDepths.current.has(milestone)) {
                    trackedScrollDepths.current.add(milestone);
                    posthog.capture('page_scroll_depth', {
                        depth_percent: milestone,
                        page: 'home',
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section>
            <h1 className={'text-center'}>The Hub for every dev <br/> Event You Cant&#39;t Miss</h1>
            <p className='text-center mt-5'>Hackathons , Meetups , and Conferences , All in One Place</p>
            <ExploreBtn/>

            <div ref={featuredEventsRef} id="events" className='mt-20 space-y-7'>
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