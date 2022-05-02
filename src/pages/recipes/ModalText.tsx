import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {Button, CardActionArea, Theme} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

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
  directionRes: string[];
  ingredientRes: any[];
  saveRecipeList: string[];
  id: string;
  removeOrAddIdToList: (id:string, type:any) => void,
}

export default function ModalText(props: ModalProps) {
  const isSaved = props.saveRecipeList.includes(props.id.toString());
  console.log(isSaved)

  
  return (
    <div className='content_wrapper_1' style={{height: "100%", width: "100%", overflow: "hidden"}}>
      <div className='content_wrapper_2' style={{height: "100%", width: "100%", overflow: "auto", paddingRight: "20px"}}>

        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={props.imageString}
              alt={props.titleString}
            />
          </CardActionArea>

          <CardContent className='cardcontentwrap'>
              <Typography gutterBottom variant="h5" style={{textAlign: "center"}}>
                {props.titleString}
              </Typography>

            <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-evenly", margin: '20px'}}>
              <div>
                <Typography variant="body1" color="text.secondary" className="card_text_footer">
                  Ranking:
                </Typography>
                {counter.map(x => {
                  if (props.rank > (x - 0.25)) {
                    return <StarIcon key={x} sx={{fill: (theme: Theme) => theme.palette.primary.main}}/>
                  } else if (props.rank > (x - 0.75)) {
                    return <StarHalfIcon key={x} sx={{fill: (theme: Theme) => theme.palette.primary.main}}/>
                  } else {
                    return <StarOutlineIcon key={x} sx={{fill: (theme: Theme) => theme.palette.primary.main}}/>
                  }
                })}
              </div>
              <div>
                <SoupKitchenIcon sx={{float: 'left', fill: (theme: Theme) => theme.palette.primary.main}}/>
                <Typography variant="body1" color="text.secondary" className="card_text_footer">
                  {props.skill}
                </Typography>
              </div>
              <div style={{display: 'flex'}}>
                <AvTimerIcon sx={{fill: (theme: Theme) => theme.palette.primary.main}}/>
                <Typography variant="body1" color="text.secondary" className="card_text_footer">
                  About {props.time} min
                </Typography>
              </div>x
              <Button 
                variant={isSaved ? "contained" : "outlined"} 
                style={{height: "40px", width: "100px"}}
                onClick={() => {props.removeOrAddIdToList(props.id.toString(), isSaved ? null : "aftenstest")}}
              >
                {isSaved ? "Remove" : "Save"}
              </Button>
               

            </div>

            <Grid container spacing={2} style={{width: "calc(100%)", paddingLeft: "20px"}}>
              <Grid
                item
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  padding: '16px',
                }}
                xs={6}
              >
                <div className='ingredients'>
                  <h2 style={{textAlign: 'center'}}>Ingredients:</h2>

                  {props.ingredientRes.map(x => {
                    return <Typography key={x}>{x}</Typography>
                  })}
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  padding: '16px',
                }}
                xs={6}
              >
                <div className='direction'>
                  <h2 style={{textAlign: 'center'}}>Direction:</h2>

                  <ol>
                    {props.directionRes.map(x => {
                      return <li key={x}>{x}</li>
                    })}
                  </ol>
                </div>
              </Grid>
              <div style={{width: "100%", textAlign: "center"}}>
                <Typography style={{margin: '10px', fontWeight: 'bold'}}> Give the reciepe a vote:</Typography>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: "0px 250px"}}>
                  {counter.map(x => {
                      return <StarOutlineIcon key={x} sx={{fill: (theme: Theme) => theme.palette.primary.main, margin: '10px'}}/>
                    }
                  )}
                </div>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
