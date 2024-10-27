"use client"; // Mark this component as a Client Component

import * as React from 'react';
import TextField from '@mui/material/TextField';
import NavbarList from "@/components/navbar";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { CSSProperties } from 'react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const validateEmail = (value:string) => {
    setEmailError(!value.includes('@'));
    setEmail(value);
  };

  const validateMessage = (value:string) => {
    setMessageError(value.trim() === '');
    setMessage(value);
  };

  const handleSubmit = async () => {
    validateEmail(email);
    validateMessage(message);

    if (!emailError && !messageError) {
      try {
        const response = await fetch('http://localhost/project/send_mail.php', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, message }),
        });
        console.log(response)
        const result = await response.json();
        if (result.status === "success") {
          alert("Email sent successfully");
        } else {
          alert("Failed to send email: " + result.message);
        } 
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending email.");
      }
    }
  };

  const styleContact: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    marginTop: '200px',
  };

  return (
    <div className='contact_main' style={{
      backgroundColor: 'rgb(11, 11, 11)',
      width: "100vw",
      height: "100vh",
    }}>
      <div style={{ marginTop: '0px' }}>
        <NavbarList />
      </div>
      <div className='inputs_contact' style={styleContact}>
        <TextField
          id="email-field"
          label="Email"
          placeholder="Enter your email"
          fullWidth
          value={email}
          onBlur={() => validateEmail(email)}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Please enter a valid email." : ""}
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'gray' },
              '&.Mui-focused fieldset': { borderColor: 'gray' },
            },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white', fontSize: '16px' },
          }}
        />
        <TextField
          id="message-field"
          label="Message"
          placeholder="Enter your message"
          multiline
          fullWidth
          rows={4}
          value={message}
          onBlur={() => validateMessage(message)}
          onChange={(e) => setMessage(e.target.value)}
          error={messageError}
          helperText={messageError ? "Message cannot be empty." : ""}
          sx={{
            width: '500px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'gray' },
              '&.Mui-focused fieldset': { borderColor: 'gray' },
            },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-input': { color: 'white', fontSize: '16px' },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ fontSize: '20px', padding: '10px 100px' }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
