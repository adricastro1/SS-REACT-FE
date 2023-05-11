import 'rsuite/dist/rsuite-no-reset.min.css';
import './Home.css'
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { Placeholder, Row, Col, Loader } from 'rsuite';
import Airtable from 'airtable';
import Card from '../../components/Stylist/Stylist'

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID)

function Home() {
    const [stylists, setStylists] = useState([]);


    useEffect(() => {
        base("stylists")
            .select({ view: "Grid view" })
            .eachPage((records, fetchNextPage) => {
                setStylists(stylists => [...stylists, ...records]);
                fetchNextPage();
            });

    }, []);



    const { isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div>
                <Placeholder.Paragraph rows={8} />
                <Loader backdrop content="loading..." vertical />
            </div>
        );
    }

    return (
        <section className='Home'>
          <h1>Welcome</h1>
          <Row>
            {stylists.map((stylist) => (
              <Col md={6} sm={12} key={stylist.id}>
                <Card stylist={stylist} />
              </Col>
            ))}
          </Row>
        </section>
      );
}

export default Home;