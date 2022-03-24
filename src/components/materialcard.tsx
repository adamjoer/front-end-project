import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Rating} from "@mui/material";
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import AvTimerIcon from '@mui/icons-material/AvTimer';


interface RecipeProps {
    imageUrl: string;
    recipeName: string;
    rank: number;
    skill: string;
    time: number;
}

const MaterialCard: React.FC<RecipeProps> = (props) => {
    return (
        <Card sx={{ maxWidth: 350}}>
            <CardMedia
                component="img"
                height="140"
                image={props.imageUrl}
                alt="burger image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                    {props.recipeName}
                </Typography>
                <Rating name="half-rating" value={props.rank} precision={0.5} readOnly/>
                <div style={{display: "flex"}}>
                    <SoupKitchenIcon/>
                    <Typography variant="body1" color="text.secondary">{props.skill}</Typography>
                </div>
                <div style={{display: "flex"}}>
                    <AvTimerIcon/>
                    <Typography variant="body1" color="text.secondary">Around {props.time} min</Typography>
                </div>

            </CardContent>
        </Card>
    )
}


export default MaterialCard;