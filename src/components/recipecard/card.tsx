import './card.css';
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Modal, Box, Button} from '@mui/material';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { ModalText } from '../../pages/recipes/ModalText';

interface NavbarProps {
  imageString: string;
  titleString: string;
  rank: Number;
  skill: string;
  time: Number;
  selectFunc: any;
}

const counter = [1, 2, 3, 4, 5]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "scroll"

 
};

const ActionAreaCard: React.FC<NavbarProps> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleOpen = (): void => setOpenModal(true)
  const handleClose = (): void => setOpenModal(false)

  const handleClose_test = ():void => {
    console.log('testing')
    setOpenModal(false);
  };

  return (
    <Card 
    sx={{':hover':{bgcolor:"#DCE3DF", transition: '0.5s'}}}
    onClick={() => {
      props.selectFunc();
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.imageString}
          alt="green iguana"
          
        />
        <CardContent className='cardcontentwrap'>
          <Typography gutterBottom variant="h5">
            {props.titleString}
          </Typography>
          <div style={{display: "flex", flexWrap: "nowrap", justifyContent: "space-evenly"}}>
            {counter.map(x => {
              if (props.rank > (x - 0.25)) {
                return <StarIcon key={x}/>
              } else if (props.rank > (x - 0.75)) {
                return <StarHalfIcon key={x}/>
              } else {
                return <StarOutlineIcon key={x}/>
              }
            })}
          </div>
          <div style={{display: "flex"}}>
            <SoupKitchenIcon/>
            <Typography variant="body1" color="text.secondary" className="card_text_footer">
              {props.skill}
            </Typography>
          </div>
          <div style={{display: "flex"}}>
            <AvTimerIcon/>
            <Typography variant="body1" color="text.secondary" className="card_text_footer">
              {getStringFromTime(props.time)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function getStringFromTime(timeInMin: Number) {
  if (timeInMin <= 8) {
    return "Around 5 min"
  } else if (timeInMin <= 12) {
    return "Around 10 min"
  } else if (timeInMin <= 18) {
    return "Around 15 min"
  } else if (timeInMin <= 25) {
    return "Around 20 min"
  } else if (timeInMin <= 37) {
    return "Around 30 min"
  } else if (timeInMin <= 50) {
    return "Around 45 min"
  } else if (timeInMin <= 70) {
    return "Around 1 hour"
  } else if (timeInMin <= 100) {
    return "Around 1 hour and 30 min"
  } else if (timeInMin <= 135) {
    return "Around 2 hours"
  } else {
    return "3 hours or more"
  }


}

export default ActionAreaCard;


