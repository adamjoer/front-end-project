import {Button} from '@mui/material';
import React from 'react';

export default function SaveButton() {
  return (
    <Button variant="outlined" color="secondary" fullWidth sx={{
      border: "2px solid",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)"
    }}>Save</Button>
  );
}
