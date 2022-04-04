import { Button } from '@mui/material';
import React from 'react';

export default function SaveButton() {
  return (
    <Button
      style={{
        backgroundColor: 'white',
        border: '2px #FD8270 solid',
        padding: '5px 10px',
        margin: '10px',
        color: '#FD8270',
        width: '200px',
      
      }}
    >
      Save
    </Button>
  );
}
