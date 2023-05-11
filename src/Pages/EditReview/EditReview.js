import Airtable from "airtable";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
    process.env.REACT_APP_AIRTABLE_BASE_ID
);

const EditReviewForm = () => {
    const { id, stylistId } = useParams();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await base("Reviews").update([
                {
                    id: id,
                    fields: {
                        Name: name,
                        Rating: rating,
                        Comment: comment,
                        Owner: user.sub
                    },
                },
            ], { typecast: true });

            setRating("");
            setComment("");
            navigate(`/stylists/${stylistId}`)

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await base("Reviews").destroy(id);
            navigate(`/stylists/${stylistId}`);
        } catch (error) {
            console.error(error);
            navigate(`/stylists/${stylistId}`);
        }
    };

    const fetchReviewData = async () => {
      try {
        const record = await base("Reviews").find(id);
        setName(record.fields.Name);
        setRating(record.fields.Rating);
        setComment(record.fields.Comment);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
        fetchReviewData();
      }, [id]);


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <form onSubmit={handleSubmit}>
                <h3>Edit Review</h3>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="string"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <button onClick={handleDelete}>Delete</button>
            </form>
        )
    );
};

export default EditReviewForm;
