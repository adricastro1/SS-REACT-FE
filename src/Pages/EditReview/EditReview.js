import 'rsuite/dist/rsuite-no-reset.min.css';
import './EditReview.css'
import { Form, Button, Input, Rate, FlexboxGrid, Panel } from 'rsuite';
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Airtable from "airtable";

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

    const handleDelete = async () => {
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
            <Panel shaded className='Panel EditReview'>
                <Form onSubmit={handleSubmit} className='Form-Edit'>
                    <h3 className='title'>Edit Review</h3>
                    <FlexboxGrid className='add-form'>
                        <FlexboxGrid.Item colspan={10} className='add-name'>
                            <Form.Group controlId="name">
                                <Form.ControlLabel>Name:</Form.ControlLabel>
                                <Input type="text" value={name} onChange={(value) => setName(value)} />
                            </Form.Group>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item colspan={8}>
                            <Form.Group controlId="rating">
                                <Form.ControlLabel>Rating:</Form.ControlLabel>
                                <Rate value={rating} onChange={(value) => setRating(value)} />
                            </Form.Group>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <Form.Group controlId="comment">
                        <Form.ControlLabel>Comment:</Form.ControlLabel>
                        <Input as="textarea" rows={3} value={comment} onChange={(value) => setComment(value)} />
                    </Form.Group>
                    <section className='review-btns'>
                        <div>
                            <Button appearance="primary" type="submit">Save</Button>
                            <Button color="red" appearance="primary" className='btn-right' onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                        <Link
                            to={`/stylists/${stylistId}`}>
                            <Button color="yellow" appearance="primary" className='btn-right'>Cancel</Button>
                        </Link>
                    </section>
                </Form>
            </Panel>
        )
    );
};

export default EditReviewForm;