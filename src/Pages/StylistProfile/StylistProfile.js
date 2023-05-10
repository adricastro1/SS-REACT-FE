import Airtable from 'airtable';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm"

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const StylistProfile = () => {
  const { id } = useParams();
  const [stylist, setStylist] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchStylist = async () => {
    try {
      const record = await base("stylists").find(id);
      setStylist(record);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await base("reviews").select({ view: "Grid view" }).all();
      const filteredReviews = response.filter(record => {
        const stylistIds = record.get("Stylists") || [];
        return stylistIds.includes(id);
      });
      setReviews(filteredReviews.map(record => record.fields));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchStylist();
  }, [id]);

  if (!stylist) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>{stylist.fields.Name}</h1>
      <p>{stylist.fields.Bio}</p>
      <p>{stylist.fields.Contact}</p>
      <h2>Reviews</h2>
      <ReviewForm stylistId={id} /> 
      {reviews.map((review) => (
        <div key={review.id}>
          <p>Review ID: {review.id}</p>
          <p>User: {review.Name}</p>
          <p>Rating: {review.Rating}</p>
          <p>Comment: {review.Comment}</p>
        </div>
      ))}
    </section>
  );
};

export default StylistProfile;
