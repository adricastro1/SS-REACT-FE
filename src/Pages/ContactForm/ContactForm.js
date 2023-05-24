import './ContactForm.css'
import { Panel } from 'rsuite';
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';

function Mail() {
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

  const form = useRef();
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
      .then((result) => {
        console.log(result.text);
        form.current.reset();
        setIsSuccess(true);
      }, (error) => {
        console.log(error.text);
      });
  };


  return (
    <Panel shaded className='Panel Contact-Form'>
      <div>
        <h2>Contact Us</h2>
        <h5 className='contact-message'>Have questions or need more information? Contact us today! For consultation bookings, please include your preferred stylist's name (if any) and the date of your event if applicable. We're here to assist you with all your personal styling needs.</h5>
        {isSuccess &&
          <p className='sent'>Email sent successfully!</p>
        }
        <form ref={form} onSubmit={sendEmail}>
          <div className='form-top'>
            <div>
              <label>Name:</label>
              <input type="text" name="user_name" required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="user_email" required />
            </div>
          </div>
          <label>Message:</label>
          <textarea name="message" rows='4' required></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>
    </Panel>
  );
}

export default Mail;