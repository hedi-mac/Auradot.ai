"use client";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaSpinner, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Alert from "@/components/Alert";

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
    type: '',
    visible: false,
  });

  useEffect(() => {
    if (alertState.visible) {
      const timer = setTimeout(() => {
        setAlertState((prev) => ({ ...prev, visible: false }));
      }, 3000); // Hide alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [alertState.visible]);

  const info = [
    {
      icon: <FaLinkedinIn />,
      title: "LinkedIn",
      description: (
        <a
          className="text-accent hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/company/auradot-ai/"
        >
          /company/auradot-ai/
        </a>
      ),
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: <ObfuscatedEmail text="Click to copy email" />,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "Tunisia - Nabeul",
    },
  ];

  function ObfuscatedEmail({ text }: { text: string }) {
    const emailParts = ['contact', '@', 'auradot.ai'];

    const handleClick = () => {
      navigator.clipboard.writeText('contact@auradot.ai');
      setAlertState({
        message: "Email address copied to clipboard!",
        type: "success",
        visible: true,
      });
    };

    return (
      <div className="text-accent hover:text-white cursor-pointer" onClick={handleClick}>
        {text}
      </div>
    );
  }

  const sendMail = async () => {
    setFormState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch('http://localhost/php/send_mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formState.email, message: formState.message }),
      });

      const result = await response.json();
      setAlertState({
        message: result.status === "success" ? "Email sent successfully" : `Failed to send email: ${result.message || "verify email address"}`,
        type: result.status === "success" ? "success" : "error",
        visible: true,
      });
      if (result.status === "success") {
        setFormState({ email: '', message: '', emailError: false, messageError: false, isLoading: false });
      } else {
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setAlertState({
        message: "An error occurred while sending email.",
        type: "error",
        visible: true,
      });
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const validateEmail = (email: string) => {
    const isValid = email.includes('@');
    setFormState((prev) => ({ ...prev, email, emailError: !isValid }));
  };

  const validateMessage = (message: string) => {
    const isValid = message.trim() !== '';
    setFormState((prev) => ({ ...prev, message, messageError: !isValid }));
  };

  const handleSubmit = () => {
    if (!formState.emailError && !formState.messageError) {
      sendMail();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2, duration: 0.4, ease: "easeIn" } }}
      className="container mx-auto mt-[20px] xl:mt-[42px]"
    >
      <div className="flex flex-col xl:flex-row gap-[30px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Contact Form */}
        <div className="xl:w-[65%] order-2 xl:order-none">
          <Alert message={alertState.message} type={alertState.type} visible={alertState.visible} onClose={() => setAlertState((prev) => ({ ...prev, visible: false }))} />
          <div className="inputs-contact flex flex-col items-center justify-center gap-6 p-10 bg-[#27272c] rounded-xl">
            <h2 className="h3 text-accent mb-1">Let’s Connect!</h2>
            <p className="text-white/60">Have something to share? We’d love to hear from you! Drop us a message, and our team will be in touch with you shortly.</p>

            <TextField
              label="Email"
              placeholder="Enter your email"
              fullWidth
              value={formState.email}
              onBlur={() => validateEmail(formState.email)}
              onChange={(e) => validateEmail(e.target.value)}
              error={formState.emailError}
              helperText={formState.emailError ? "Please enter a valid email." : ""}
              sx={{
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
              label="Message"
              placeholder="Enter your message"
              multiline
              rows={4}
              fullWidth
              value={formState.message}
              onBlur={() => validateMessage(formState.message)}
              onChange={(e) => validateMessage(e.target.value)}
              error={formState.messageError}
              helperText={formState.messageError ? "Message cannot be empty." : ""}
              sx={{
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
              sx={{ fontSize: '20px', padding: '10px 100px', '&:disabled': { backgroundColor: '#1976d255', color: '#fff8' } }}
              disabled={formState.isLoading || formState.emailError || formState.messageError}
            >
              {formState.isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Sending...
                </>
              ) : "Send"}
            </Button>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex-1 flex items-center xl:justify-center order-1 xl:order-none">
          <ul className="flex flex-col gap-10">
            {info.map((item, index) => (
              <li key={index} className="flex items-center gap-6">
                <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center text-[28px]">
                  {item.icon}
                </div>
                <div>
                  <div>{item.title}</div>
                  <h3>{item.description}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
