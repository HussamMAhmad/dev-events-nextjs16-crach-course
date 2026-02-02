export type EventItem = {
    image: string,
    title: string,
    slug: string,
    location: string,
    date: string,
    time: string,
};

export const events: EventItem[] = [
    {
        image: "/event1.jpg",
        title: "React Summit US 2025",
        slug: "react-summit-us-2025",
        location: "San Francisco , CA , USA",
        date: "2025-11-07",
        time: "09:00 AM"
    },
    {
        image: "/event2.jpg",
        title: "React Summit US",
        slug: "react-summit-us",
        location: "San Francisco , CA , USA",
        date: "2025-11-07",
        time: "09:00 AM"
    },
    {
        image: "/event3.jpg",
        title: "React Summit 2025",
        slug: "react-summit-2025",
        location: "San Francisco , CA , USA",
        date: "2025-11-07",
        time: "09:00 AM"
    },
    {
        image: "/event4.jpg",
        title: "React US 2025",
        slug: "react-us-2025",
        location: "San Francisco , CA , USA",
        date: "2025-11-07",
        time: "09:00 AM"
    },
]