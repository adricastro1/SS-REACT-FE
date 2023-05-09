import './Home.css'
import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import Stylist from '../Stylist/Stylist';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID)

function Home() {
    const [stylists, setStylists] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        base("stylists")
            .select({ view: "Grid view" })
            .eachPage((records, fetchNextPage) => {
                setStylists(stylists => [...stylists, ...records]);
                fetchNextPage();
            });
        base("reviews")
            .select({ view: "Grid view" })
            .eachPage((records, fetchNextPage) => {
                setReviews(reviews => [...reviews, ...records]);
                fetchNextPage();
            });
    }, []);

    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="Home">
            <h1>HELLO</h1>
            {stylists.map((stylist) => (
                <Stylist stylist={stylist} 
                // reviews={reviews.filter(review => review.fields.Stylist[0] === stylist.id)}
                 />
            ))}
        </section>
    );
}

export default Home;