"use client";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import NavbarList from "@/components/navbar";
import Button from '@mui/material/Button';
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Alert from "@/components/Alert"; // Import the Alert component

export default function Contact() {
  const [formState, setFormState] = useState({
    email: '',
    message: '',
    emailError: false,
    messageError: false,
    isLoading: false,
  });

  const [alertState, setAlertState] = useState({
    message: '',
    type: '', // 'success' or 'error'
    visible: false,
  });

  const sendMail = async (formState: { email: string; message: string }) => {
    const response = await fetch('http://localhost/php/send_mail.php', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formState.email, message: formState.message }),
    });

    const result = await response.json();
    if (result.status === "success") {
      setAlertState({
        message: "Email sent successfully",
        type: "success",
        visible: true,
      });
    } else {
      setAlertState({
        message: result.message === undefined ? "Failed to send email: verify email address" : "Failed to send email: " + result.message,
        type: "error",
        visible: true,
      });
    }
  };

  const validateEmail = (value:string) => {
    const isValid = value.includes('@');
    setFormState((prev) => ({
      ...prev,
      emailError: !isValid,
      email: value,
    }));
    return isValid;
  };

  const validateMessage = (value:string) => {
    const isValid = value.trim() !== '';
    setFormState((prev) => ({
      ...prev,
      messageError: !isValid,
      message: value,
    }));
    return isValid;
  };

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(formState.email);
    const isMessageValid = validateMessage(formState.message);

    if (!isEmailValid || !isMessageValid) {
      return;
    }

    setFormState((prev) => ({ ...prev, isLoading: true }));

    setTimeout(async () => {
      try {
        await sendMail(formState);
        setFormState((prev) => ({ ...prev, isLoading: false, email: "", message: "" }));
      } catch (error) {
        console.error("Error:", error);
        setAlertState({
          message: "An error occurred while sending email.",
          type: "error",
          visible: true,
        });
        setFormState((prev) => ({ ...prev, isLoading: false }));
      } finally {
        setTimeout(() => {
          setAlertState((prev) => ({ ...prev, visible: false }));
        }, 3000);
      }
    }, 2000); // Simulate loading time
  };

  const closeAlert = () => {
    setAlertState({ ...alertState, visible: false });
  };

  return (
    <div className='contact-main bg-black overflow-hidden' >
      <NavbarList />
      {/* Use Alert component here */}
      <Alert 
        message={alertState.message}
        type={alertState.type}
        visible={alertState.visible}
        onClose={closeAlert}
      />
      <div className='inputs-contact flex flex-col items-center justify-center gap-7 mt-52'>
        <TextField
          id="email-field"
          label="Email"
          placeholder="Enter your email"
          fullWidth
          value={formState.email}
          onBlur={() => validateEmail(formState.email)}
          onChange={(e) => validateEmail(e.target.value)}
          error={formState.emailError}
          helperText={formState.emailError ? "Please enter a valid email." : ""}
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
          value={formState.message}
          onBlur={() => validateMessage(formState.message)}
          onChange={(e) => validateMessage(e.target.value)}
          error={formState.messageError}
          helperText={formState.messageError ? "Message cannot be empty." : ""}
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
          disabled={formState.emailError || formState.messageError}
        >
          {formState.isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Sending...
            </>
          ) : "Send"}
        </Button>
      </div>
    </div>
  );
}
