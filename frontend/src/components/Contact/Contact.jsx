import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been submitted!');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-section">
      <form onSubmit={handleFormSubmit} className="faq-form">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <label htmlFor="message">Your Question:</label>
        <textarea 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;




