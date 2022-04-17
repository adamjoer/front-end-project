import { Button } from '@mui/material';
import React from 'react';

export default function SaveButton() {
  return (
    <Button
      sx={{bgcolor: "white", color: "#FD8270", ':hover':{bgcolor: '#FD8270', color:"white", transition: '0.5s'}}}
      style={{
        border: '2px #FD8270 solid',
        padding: '5px 10px',
        margin: '10px',
        
        width: '200px',
      
      }}
    >
      Save
    </Button>
  );
}
