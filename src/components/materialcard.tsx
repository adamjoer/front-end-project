import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid, Rating} from "@mui/material";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function MaterialCard() {
    return (
        <Grid item xs={2.4}>
            <Card sx={{ maxWidth: 350}}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://spoonacular.com/recipeImages/362230-556x370.jpeg"
                    alt="burger image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                        Burger
                    </Typography>
                    <Rating name="read-only" defaultValue={2} readOnly/>
                    <Typography component="legend">Easy</Typography>
                    <Typography component="legend">30 min</Typography>

                </CardContent>
            </Card>
        </Grid>
    )
}