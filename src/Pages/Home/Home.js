import 'rsuite/dist/rsuite-no-reset.min.css';
import './Home.css'
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { Row, Col, Loader, Message } from 'rsuite';
import Airtable from 'airtable';
import Card from '../../components/Stylist/Stylist'

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID)

function Home() {
    const [stylists, setStylists] = useState([]);
    const { isLoading } = useAuth0();

    useEffect(() => {
        base("stylists")
            .select({ view: "Grid view" })
            .eachPage((records, fetchNextPage) => {
                setStylists(stylists => [...stylists, ...records]);
                fetchNextPage();
            });

    }, []);

    if (isLoading) {
        return (
            <div className='Card'>
                <Loader backdrop content="loading..." vertical />
            </div>
        );
    }

    return (
        <section className='Home'>
            <img src={process.env.PUBLIC_URL + '/imgs/banner-1.png'} alt="Banner" className='banner' />
            <Message className='Message'>
                Seeking styling assistance for an upcoming event? Want to upgrade your wardrobe? Book a session with a stylist and start transforming your look! Our experts will ensure you shine at any occasion while helping you discover your unique style. Pick a stylist below to get started!</Message>
            <Row className='Row'>
                {stylists.map((stylist) => (
                    <Col className='Home-card' md={12} key={stylist.id}>
                        <Card stylist={stylist} />
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default Home;