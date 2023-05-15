import './ContactForm.css'
import { Form, Button, Input, FlexboxGrid, Panel } from 'rsuite';
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export default function Mail() {
    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();

        const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

        try {
            const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID);
            form.current.reset();
        } catch (error) {
            console.log('Error sending email:', error);
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameInput = e.target.elements['user_name'];
        const emailInput = e.target.elements['user_email'];
        const messageInput = e.target.elements['message'];

        if (!nameInput.value.trim()) {
            alert('Please enter your name.');
            return;
        }

        if (!emailInput.value.trim()) {
            alert('Please enter your email address.');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!messageInput.value.trim()) {
            alert('Please enter a message.');
            return;
        }

        sendEmail(e);
    };

    return (
        <Panel shaded className='Panel'>
            <Form ref={form} onSubmit={handleSubmit} className='contact-form'>
            <h2>Contact Us</h2>
                <h5 className='contact-message'>Have questions or need more information? Contact us today! For consultation bookings, please include your preferred stylist's name (if any) and the date of your event if applicable. We're here to assist you with all your personal styling needs.</h5>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={9}>
                        <Form.ControlLabel>Name:</Form.ControlLabel>
                        <Input type="text" name="user_name" required />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={14} className='email'>
                        <Form.ControlLabel>Email:</Form.ControlLabel>
                        <Input type="email" name="user_email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Form.ControlLabel>Message:</Form.ControlLabel>
                <Input as="textarea" rows={3} name="message" required></Input>
                <Button 
                appearance="primary" 
                type="submit" 
                value="Send"
                className='contact-btn'
                >Send</Button>
            </Form>
        </Panel>
    );
}
