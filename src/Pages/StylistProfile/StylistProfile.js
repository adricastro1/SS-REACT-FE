import 'rsuite/dist/rsuite-no-reset.min.css';
import './StylistProfile.css'
import { Loader, FlexboxGrid, Panel, Divider, Message } from 'rsuite';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Airtable from 'airtable';
import AddReviewForm from "../../components/ReviewForm/AddReviewForm"
import StylistReviews from '../../components/StylistReviews/StylistReviews.js';


const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const StylistProfile = () => {
    const { isLoading } = useAuth0();
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

const getReviews = async () => {
  try {
    const response = await base("reviews").select({ view: "Grid view" }).all();
    const filteredReviews = response.filter((record) => {
      const stylistIds = record.get("Stylists") || [];
      return stylistIds.includes(id);
    });
    setReviews(filteredReviews.map((record) => ({ id: record.id, ...record.fields })));
  } catch (error) {
    console.error(error);
  }
};


    useEffect(() => {
        getReviews();
        getStylist();
    }, [id]);

    if (isLoading || !stylist) {
        return (
            <div>
                <Loader backdrop content="loading..." vertical />
            </div>
        );
    }

    return (
        <section>
            {stylist && (
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={11}>
                        <Panel shaded bordered className='Panel'>
                        <h2 className='Name'>{stylist.fields.Name}</h2>
                            <Divider />
                            <p>{stylist.fields.Bio}</p>
                        </Panel>
                    </FlexboxGrid.Item>


                    <FlexboxGrid.Item colspan={13} className='img-container'>
                    <Message>Ready to elevate your style? Reach out to us directly to set up a consultation with your preferred stylist. We're excited to help you create a personalized look that reflects your unique personality and meets your fashion goals. Contact us now to schedule your appointment and begin your style transformation.</Message>
                        <div className='img-wrapper'>
                            <img className='profile-img' src={`${stylist.fields.Image}`} alt="Profile-Banner" />
                        </div>
                    </FlexboxGrid.Item>

                </FlexboxGrid>
            )}

            <FlexboxGrid className='Reviews'>
                <FlexboxGrid.Item colspan={11}>
                    <StylistReviews reviews={reviews} stylistId={id} onSubmit={getReviews}/>
                </FlexboxGrid.Item>

                
                <FlexboxGrid.Item colspan={13}>
                    <AddReviewForm stylistId={id} />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </section>
    );
};

export default StylistProfile;
