import React, {useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button"
import CardActionArea from "@mui/material/CardActionArea"
import {Theme} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const counter = [1, 2, 3, 4, 5]

interface ModalProps {
  titleString: string;
  imageString: string;
  rank: Number;
  skill: string;
  time: Number;
  directionRes: string[];
  ingredientRes: string[];
  saveRecipeList: string[];
  id: string;
  removeOrAddIdToList: (id: string, listName: string | null) => void,
}

export default function ModalText(props: ModalProps) {

  const [isSaved, setSaved] = useState(props.saveRecipeList.includes(props.id.toString()))
  const [listName, setListName] = useState("");

  const handleAddToOrRemoveFromList = (event: React.FormEvent) => {
    event.preventDefault();

    props.removeOrAddIdToList(props.id.toString(), isSaved ? null : listName);
    setSaved(prevState => !prevState);
  }

  return (
    <div className='content_wrapper_1' style={{height: "100%", width: "100%", overflow: "hidden"}}>
      <div className='content_wrapper_2'
           style={{height: "100%", width: "100%", overflow: "auto", paddingRight: "20px"}}>

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
              </div>
            </div>

            <Grid container spacing={2} style={{paddingLeft: "20px"}}>
              <Grid
                item
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                }}
                xs={6}
              >
                <div className='ingredients' style={{padding: "16px"}}>
                  <h2 style={{textAlign: 'center'}}>Ingredients:</h2>

                  <ul>
                    {props.ingredientRes.map(x =>
                      <li key={x}>{x}</li>
                    )}
                  </ul>
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  borderColor: (theme) => theme.palette.primary.main,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                }}
                xs={6}
              >
                <div className='direction' style={{padding: "16px"}}>
                  <h2 style={{textAlign: 'center'}}>Direction:</h2>

                  <ol>
                    {props.directionRes.map(x =>
                      <li key={x}>{x}</li>
                    )}
                  </ol>
                </div>
              </Grid>
              <Grid item xs={6} sx={{pr: 2}}>
                <Typography style={{margin: '10px', fontWeight: 'bold', textAlign: 'center'}}>
                  Give the recipe a vote:
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  {counter.map(x =>
                    <StarOutlineIcon key={x} sx={{fill: (theme: Theme) => theme.palette.primary.main, margin: '10px'}}/>
                  )}
                </div>
              </Grid>
              <Grid item xs={6} sx={{pr: 2}}>
                <Typography style={{margin: '10px', fontWeight: 'bold', textAlign: 'center'}}>
                  Save the recipe in a list:
                </Typography>
                <Box component="form" onSubmit={handleAddToOrRemoveFromList} display="flex" flexDirection="column"
                     alignItems="center">
                  {
                    isSaved ?
                      <Button type="submit" variant="contained">Remove from list</Button>
                      :
                      <TextField type="text" required label="List name"
                                 onChange={(event) => setListName(event.target.value)} variant="outlined" fullWidth
                                 InputProps={{
                                   endAdornment: <Button type="submit" variant="outlined" sx={{
                                     backgroundColor: "white",
                                     color: (theme) => theme.palette.secondary.main,
                                     ':hover': {
                                       backgroundColor: (theme) => theme.palette.secondary.main,
                                       color: "white",
                                       transition: '0.5s'
                                     }
                                   }}>Save</Button>
                                 }}/>
                  }
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
