"use client";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaSpinner } from "react-icons/fa";
import Alert from "@/components/Alert";  
import Header from '@/components/header';
import { FaLinkedinIn, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
 


 
 


export default function Contact() {


  const info = [
    {
        icon: <FaLinkedinIn/>,
        title: "LinkedIn",
        description: (<a className="text-accent hover:text-white" target="_blank"  href="https://www.linkedin.com/company/auradot-ai/">/company/auradot-ai/</a>)
    },
    {
        icon: <FaEnvelope/>,
        title: "Email",
        description: ObfuscatedEmail("Click to copy email"),
  
    },
    {
        icon: <FaMapMarkerAlt/>,
        title: "Address",
        description: "Tunisia - Nabeul"
    }
  ]

  function ObfuscatedEmail(  text :string ) {  
 
    const emailParts = ['contact', '@', 'auradot.ai'];
  
    const obfuscatedEmail = emailParts.map((part) => (
      <span key={part}>
        {part.split('').map((char) => (
          <span key={char}>{char.charCodeAt(0)}</span>
        ))}
      </span>
    ));
  
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
      setFormState((prev) => ({ ...prev, isLoading: false, email: "", message: "" }));
    } else {
      setAlertState({
        message: result.message === undefined ? "Failed to send email: verify email address" : "Failed to send email: " + result.message,
        type: "error",
        visible: true,
      });
      setFormState((prev) => ({ ...prev, isLoading: false }));
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
 
                 
    <motion.div 
    initial={{ opacity:0 }} 
    animate={{ 
        opacity:1, 
        transition: { delay: 2, duration: 0.4, ease: "easeIn" }
    }}   className='container mx-auto mt-[20px] xl:mt-[42px]'>
        <div className="flex flex-col xl:flex-row gap-[30px] " style={{ fontFamily: 'Roboto, sans-serif' }}>
          {/* Form */}
          <div className="xl:h-[54%] xl:w-[65%] order-2 xl:order-none" >
            {/* Use Alert component here */}
            <Alert 
              message={alertState.message}
              type={alertState.type}
              visible={alertState.visible}
              onClose={closeAlert}
            />
            <div className='inputs-contact flex flex-col h-[464px] mb-5 items-center justify-center gap-7  flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl'>
              <div className=''>
              <h2 className="h3 text-accent mb-1">Let’s Connect! </h2>
                                <p className="text-white/60">
                                Have something to share? We’d love to hear from you! Drop us a message, and our team will be in touch with you shortly.
                                </p>
              </div>
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
                sx={{ fontSize: '20px', padding: '10px 100px', '&:disabled': {backgroundColor: '#1976d255', color:'#fff8'}}}
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
            {/* Info */}
            <div className="flex-1 flex items-center xl:justify-center order-1 xl:order-none mb-8 xl:mb-0">
                            <ul className="flex flex-col gap-10">
                                {info.map((item, index) => {
                                    return (
                                        <li key={index} className="flex items-center gap-6">
                                            <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                                                <div className="text-[28px]">{item.icon}</div>
                                            </div>
                                            <div>
                                                <div>{item.title}</div>
                                                <h3>{item.description}</h3>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
            </div>
        </div>
 
      </motion.div>
 
  );
}
