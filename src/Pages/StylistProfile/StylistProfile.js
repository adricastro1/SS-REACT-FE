import 'rsuite/dist/rsuite-no-reset.min.css';
import './StylistProfile.css'
import { Loader, FlexboxGrid, Panel, Divider, Message, Carousel } from 'rsuite';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Airtable from 'airtable';
import AddReviewForm from "../../components/ReviewForm/AddReviewForm"
import StylistReviews from '../../components/StylistReviews/StylistReviews.js';
// import ImageCarousel from '../../components/Carousel/ImageCarousel'


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
                            <h1 className='Name'>{stylist.fields.Name}</h1>
                            <p>{stylist.fields.Contact}</p>
                            <Divider />
                            <p>{stylist.fields.Bio}</p>
                        </Panel>
                    </FlexboxGrid.Item>


                    <FlexboxGrid.Item colspan={13} className='img-container'>
                        <section>
                            <Message className='profile-message'>Contact us now to set up a consultation with your preferred stylist and elevate your style. Create a personalized look that reflects your unique personality and fashion goals. Schedule your appointment for a style transformation.</Message>
                            <div className='img-wrapper'>
                                <img className='profile-img' src={`${stylist.fields.Image}`} alt="Profile-Banner" />
                            </div>
                        </section>
                    </FlexboxGrid.Item>

                </FlexboxGrid>
            )}

            <FlexboxGrid >
                <FlexboxGrid.Item colspan={10}>
                    <Carousel autoplay className="custom-slider">
                        <img src={`${stylist.fields.img1}`} alt="Banner"  />
                        <img src={`${stylist.fields.img2}`}  />
                        <img src={`${stylist.fields.img3}`}  />
                        <img src={`${stylist.fields.img4}`}  />
                        <img src={`${stylist.fields.img5}`}  />
                             </Carousel>
                </FlexboxGrid.Item>


                <FlexboxGrid.Item colspan={13}>
                    <AddReviewForm stylistId={id} />
                    <StylistReviews reviews={reviews} id={id} onSubmit={getReviews} className='Reviews' />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </section>
    );
};

export default StylistProfile;
