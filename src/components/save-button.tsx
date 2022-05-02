import {Button} from '@mui/material';
import React from 'react';

export default function SaveButton() {
  return (
    <Button variant="outlined" color="secondary" fullWidth sx={{
      border: "2px solid",
      ':hover':{backgroundColor: '#FD8270', color:"white", border: "2px solid #FD8270", transition: '0.5s'},
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)"
    }}>Save</Button>
  );
}
