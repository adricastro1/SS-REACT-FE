import React, { useState } from "react";
import Airtable from "airtable";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

const EditReviewForm = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

console.log(id)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await base("Reviews").update([
        {
          id: id,
          fields: {
            Name: user.given_name,
            Rating: rating,
            Comment: comment,
          },
        },
      ], { typecast: true });

      setRating("");
      setComment("");
      navigate('/')

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await base("Reviews").destroy(id);
      window.location.reload();
      navigate('/')
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
        <h3>Edit Review</h3>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=""
          ></textarea>
        </div>
        <button type="submit">Submit</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    )
  );
};

export default EditReviewForm;
