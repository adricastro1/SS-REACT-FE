import 'rsuite/dist/rsuite-no-reset.min.css';
import './StylistReviews.css'
import { Button, Panel, List, Rate } from 'rsuite';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Airtable from 'airtable';


const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

function StylistReviews({ reviews }) {
    const { user, isAuthenticated } = useAuth0();
    const { id } = useParams();
    const [stylist, setStylist] = useState(null);

    const getStylist = async () => {
        try {
            const record = await base("stylists").find(id);
            setStylist(record);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStylist();
    }, [id]);



    return (
        <Panel>
            <h4 className='title reviews-title'>Client Reviews</h4>
            <List size="md">
                {reviews.map((review) => (
                    <List.Item key={review.id}>
                        <div className='reviews-flex'>
                            <p className='user-name'>{review.Name}</p>
                            <Rate readOnly value={review.Rating} size="sm" />
                        </div>
                        <p>{review.Comment}</p>
                        {isAuthenticated && review.Owner === user?.sub && stylist && (
                            <Link
                                review={review}
                                stylist={stylist}
                                key={stylist.id}
                                to={`/reviews/${review.id}/edit/${id}`}
                            >
                                <Button color="cyan" appearance="primary" className='edit-btn'>Edit</Button>
                            </Link>
                        )}
                    </List.Item>
                ))}
            </List>
        </Panel>
    )
}

export default StylistReviews