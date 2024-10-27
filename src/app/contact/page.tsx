import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NavbarList from "@/components/navbar";
import Button from '@mui/material/Button';

export default function Contact() {
  const styleContact = {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const, 
    gap: '30px',
    marginTop: '200px',
  }
  return (
    <div className='contact_main' 
        style={{
          backgroundColor: 'rgb(11, 11, 11)',
          width: "100vw",
          height: "100vh",
          }}>
      <div style={{ marginTop: '0px'}}>
        <NavbarList />
      </div>
      <div className='inputs_contact' style={styleContact} >
        <TextField
          id="outlined-multiline-static"
          label="Email"
          fullWidth
          rows={4}
          defaultValue="Under construction"
          sx={{
            width: '500px', // Set width
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'gray', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'gray', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
            },
            '& .MuiInputBase-input': {
              color: 'white', // Text color
              fontSize: '16px', // Text size
            },
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          fullWidth
          rows={4}
          defaultValue="Under construction"
          sx={{
            width: '500px', // Set width
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'gray', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'gray', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
            },
            '& .MuiInputBase-input': {
              color: 'white', // Text color
              fontSize: '16px', // Text size
            },
          }}
        />
        <Button 
          variant="contained"
          sx={{ fontSize: '20px', padding: '10px 100px' }}
          >Send
        </Button>
      </div>
    </div>
    
  );
}