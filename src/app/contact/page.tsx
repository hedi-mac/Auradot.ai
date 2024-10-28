"use client";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import NavbarList from "@/components/navbar";
import Button from '@mui/material/Button';
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

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
        message: "Failed to send email: " + result.message,
        type: "error",
        visible: true,
      });
    }
 
  };

  const validateEmail = (value: string) => {
    const isValid = value.includes('@');
    setFormState((prev) => ({
      ...prev,
      emailError: !isValid,
      email: value,
    }));
    return isValid;
  };

  const validateMessage = (value: string) => {
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

    // Start loading
    setFormState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    // Set a timeout to simulate loading
    setTimeout(async () => {
      try {
        await sendMail(formState);
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
          email: "",
          message: ""
        }));
      } catch (error) {
        console.error("Error:", error);

        setAlertState({
          message: "An error occurred while sending email.",
          type: "error",
          visible: true,
        });
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      } finally {
        setTimeout(() => {
          setAlertState((prev) => ({ ...prev, visible: false }));
        }, 3000);
      }
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  // Function to close the alert manually
  const closeAlert = () => {
    setAlertState({ ...alertState, visible: false });
  };

  return (
    <div className='contact_main' style={{ backgroundColor: 'rgb(11, 11, 11)' }}>
      <NavbarList />
      {/* Alert Notification */}
      {alertState.visible && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-md text-white ${
            alertState.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex justify-between">
            <span>{alertState.message}</span>
            <button onClick={closeAlert} className="ml-4 text-xl">✖</button>
          </div>
        </div>
      )}
      <div className='inputs_contact flex flex-col items-center justify-center gap-7 mt-52'>
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
          disabled={formState.emailError || formState.messageError }
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
