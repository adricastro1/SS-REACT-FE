import React, { useState } from "react";
import Airtable from "airtable";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
    process.env.REACT_APP_AIRTABLE_BASE_ID
);

const ReviewForm = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const { id } = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            await base("reviews").update(
                {
                    Name: user.given_name,
                    Rating: rating,
                    Comment: comment,
                    Stylists: [id],
                },
                { typecast: true }
            );

            setRating("");
            setComment("");

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }


    return (
        isAuthenticated && (
        <form onSubmit={handleSubmit}>
            <h2>user: {user.name}</h2>
            <h3>Add a Review</h3>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
        )
    );
};

export default ReviewForm;
