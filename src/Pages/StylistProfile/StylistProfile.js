import Airtable from 'airtable';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const StylistProfile = () => {
  const { id } = useParams();
  const [stylist, setStylist] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getStylist = async () => {
    try {
      const record = await base("stylists").find(id);
      setStylist(record);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    base("reviews")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setReviews((prevReviews) => [...prevReviews, ...records]);
        fetchNextPage();
      });

    getStylist();
  }, [id]);

  if (!stylist || reviews.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>{stylist.fields.Name}</h1>
      <p>{stylist.fields.Bio}</p>
      <p>{stylist.fields.Contact}</p>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>Review ID: {review.id}</p>
          <p>User: {review.fields.Name}</p>
          <p>Rating: {review.fields.Rating}</p>
          <p>Comment: {review.fields.Comment}</p>
        </div>
      ))}
    </section>
  );
};

export default StylistProfile;
