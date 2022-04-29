import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import AvTimerIcon from '@mui/icons-material/AvTimer';

import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';

const dummyObject = {
  ingredients: [
    '1 1/2 cups warm water',
    '1 dry yeast',
    '3 cups bread flour',
    '2 tablespoons extra virgin olive oil',
    '2 teaspoons salt',
    '1 teaspoon sugar',
    'Tomato sauce',
    'Mozarella',
    'Ham',
    'Onion',
  ],
  direction: [
    'Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved.',
    'Add the flour, salt, sugar, and olive oil, and using the mixing paddle attachment, mix on low speed for a minute.',
    'Knead the pizza dough on low to medium speed using the dough hook about 7-10 minutes.',
    'For a quick rise, place the dough in a warm place (75°F to 85°F) for 1 1/2 hours',
    'Spoon on the tomato sauce, sprinkle with cheese, and place your desired toppings on the pizza',
  ],
};



const counter = [1, 2, 3, 4, 5]

interface ModalProps {
  titleString: string;
  imageString: string;
  rank: Number;
  skill: string;
  time: Number;

}
export const ModalText: React.FC<ModalProps> = (props: ModalProps = {titleString: "Foo", imageString: "Bar", rank: 23, skill: "qux", time: 420}) => {
  return (
    <div>
      <img alt="food" src={props.imageString}  style={ {marginLeft: 'auto', marginRight: 'auto', marginTop:'10px',  display: 'block', width:'40%', height:'40%'}} />
      <h1 className='title' style={{ textAlign: 'center', padding: '20px'}}>
        {' '}
        {props.titleString}
      </h1>
      <div style={{display: "flex", flexWrap: "nowrap" ,justifyContent: "space-evenly", margin: '20px' }}>
        <div>
        <Typography variant="body1" color="text.secondary" className="card_text_footer">
              Ranking:
            </Typography>
            {counter.map(x => {
              if (props.rank > (x - 0.25)) {
                return <StarIcon key={x} style={{ fill: '#476051' }}/>
              } else if (props.rank > (x - 0.75)) {
                return <StarHalfIcon key={x} style={{ fill: '#476051' }}/>
              } else {
                return <StarOutlineIcon key={x} style={{ fill: '#476051' }}/>
              }
            })}
          </div>
          <div >
          <SoupKitchenIcon style={{float:'left', fill: '#476051'}}/>
          <Typography variant="body1" color="text.secondary" className="card_text_footer">
              {props.skill}
            </Typography>
          </div>
          <div style={{display:'flex'}}>
          <AvTimerIcon style={{fill: '#476051'}} />
          <Typography variant="body1" color="text.secondary" className="card_text_footer">
              About {props.time} min
            </Typography>
          </div>
        </div>
      
      
      <Grid container spacing={2}>
        <Grid
          item
          style={{
            borderColor: '#476051',
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
          xs={6}
        >
          <div className='ingredients'>
            <h2 style={{ textAlign: 'center' }}>Ingredients:</h2>
            
            {dummyObject.ingredients.map(x => {

              return <Typography>{x}</Typography>
            })}
          </div>
        </Grid>
        <Grid
          item
          style={{
            borderColor: '#476051',
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
          xs={6}
        >
          <div className='direction'>
            <h2 style={{ textAlign: 'center' }}>Direction:</h2>
            
            <ol>
            {dummyObject.direction.map(x=> {
              return <li>{x}</li>
            })}
            </ol>
          </div>
        </Grid>
        <div>
        <Typography style={{margin:'10px' , fontWeight: 'bold'}}> Give the reciepe a vote:</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}> 
          {counter.map(x => {
                  return <StarOutlineIcon key={x} style={{fill: '#476051', margin:'10px'}}/>
                }
              )}
            <Button sx={{bgcolor: "white", color: "#FD8270", ':hover':{bgcolor: '#FD8270', color:"white", transition: '0.3s'}}}
      style={{
        border: '2px #FD8270 solid',
        
        margin: '10px',
      
      }}> Add vote</Button>
            </div>
        </div>
      </Grid>
    </div>
  );
};

//<div style={{display: "flex", flexWrap: "nowrap" ,justifyContent: "space-evenly", margin: '20px'}}>