import Airtable from 'airtable';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID)


const StylistProfile = (props) => {
    const { id } = useParams()
    // console.log("here is this stylist's:", id)
    const [stylist, setStylist] = useState(null);
    const [reviews, setReviews] = useState([])



    const getStylist = async () => {
        try {
            const record = await base("stylists").find(id);
            setStylist(record);
            // const reviewRecords = await base("reviews").retrieve(stylist.fields.Reviews);
            // setReviews(reviewRecords)
        
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getStylist()
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
            {/* {reviews.map((review, index) => (
                <div key={index}>
                    <h3>{review.fields.Name}</h3>
                    <p>{review.fields.Comment}</p>
                    <p>{review.fields.Rating}</p>
                </div>
            ))} */}

        </section>
    )
}

export default StylistProfile