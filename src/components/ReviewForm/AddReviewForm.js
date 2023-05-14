import 'rsuite/dist/rsuite-no-reset.min.css';
import './AddReviewForm.css';
import { Form, Button, Input, Rate, FlexboxGrid } from 'rsuite';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

const AddReviewForm = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { id } = useParams();

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      await base('reviews').create(
        {
          Name: name,
          Rating: rating,
          Comment: comment,
          Stylists: [id],
          Owner: user.sub,
        },
        { typecast: true }
      );

      setRating('');
      setComment('');

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <Form onSubmit={handleSubmit} className='Form-Add'>
          <h3 className='title'>Add a Review</h3>
          <FlexboxGrid className='add-form'>
            <FlexboxGrid.Item colspan={13} className='add-name'>
              <Form.Group controlId="name">
                <Form.ControlLabel>Name:</Form.ControlLabel>
                <Input type="text" value={name} onChange={(value) => setName(value)} />
              </Form.Group>
            </FlexboxGrid.Item>
            
            <FlexboxGrid.Item colspan={9}>
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

          <Button appearance="primary" type="submit">Submit</Button>
        </Form>
      ) : (
        <h3>Please log in to leave a review.</h3>
      )}
    </>
  );
};

export default AddReviewForm;
