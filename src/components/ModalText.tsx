import React from 'react';
import pizza from '../../public/pizza.jpg';
import styles from './modal.module.css';
import Grid from '@mui/material/Grid';



export const ModalText = () => {
  return (
    <div>
        <h1 className="title" style={{textAlign:"center"}}> Title</h1>
        <h2 style={{textAlign:"center"}}> Image </h2>
      <Grid container spacing={2}>
        
        <Grid item style={{borderColor:"#476051", borderStyle:"solid", borderWidth:"1px"}} xs={6}>
            <div className="ingredients" >
          <h2 style={{textAlign:"center"}}>Ingredients:</h2>
          <h4> List with ingredients</h4>
          </div>
        </Grid>
        <Grid item style={{borderColor:"#476051", borderStyle:"solid", borderWidth:"1px"}}  xs={6}>
            <div className="direction">
          <h2 style={{textAlign:"center"}}>Direction:</h2>
          <h4> Step by step</h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
