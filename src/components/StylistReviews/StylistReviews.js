import 'rsuite/dist/rsuite-no-reset.min.css';
import './StylistReviews.css'
import { Button, Panel, List } from 'rsuite';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";



function StylistReviews({ reviews }) {
    const { user, isAuthenticated } = useAuth0();
    const { id } = useParams();
    const [stylist] = useState(null);

    return (
        <Panel header="Reviews">
            <List size="md">
                {reviews.map((review) => (
                    <List.Item key={review.id}>
                        <div className='reviews-flex'>
                            <p>{review.Name}</p>
                            <p>Rating: {review.Rating}</p>
                        </div>
                        <p>Comment: {review.Comment}</p>
                        {isAuthenticated && review.Owner === user?.sub && (
                            <Link
                                review={review}
                                stylist={stylist}
                                key={stylist.id}
                                to={`/reviews/${review.id}/edit/${id}`}><Button>Edit</Button></Link>
                        )}
                    </List.Item>
                ))}
            </List>
        </Panel>
    )
}

export default StylistReviews