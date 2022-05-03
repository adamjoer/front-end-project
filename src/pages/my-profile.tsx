import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveButton from '../components/save-button';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {FormEvent, useEffect, useState} from "react";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {getAuth} from "firebase/auth";

export default function MyProfile() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const db = getDatabase();
  const auth = getAuth();

  const userInfoRef = ref(db, 'users/' + (auth.currentUser ? auth.currentUser.uid : "") + "/info");

  const editInfo = (path: string, value: string) => {
    const firstNameRef = ref(db, `users/${auth.currentUser && auth.currentUser.uid}/info/${path}`);
    set(firstNameRef, value);
  }

  useEffect(() => {
      onValue(userInfoRef, (snapshot) => {
        const data = snapshot.val();
        setFirstName(data.firstname);
        setLastName(data.lastname);
      });
    },
    [null]
  );

  return (
    <Box component="div" display="flex" flexDirection="column" alignItems="center" sx={{m: 2}}>

      <Card sx={{maxWidth: "500px"}}>
        <CardContent sx={{width: "auto"}}>
          <Avatar
            sx={{width: 64, height: 64, margin: "auto", backgroundColor: (theme) => theme.palette.secondary.main}}>
            {`${firstName.length && firstName[0].toUpperCase()}${lastName.length && lastName[0].toUpperCase()}`}
          </Avatar>

          <Grid container spacing={1} sx={{mt: 1}}>
            <Grid item xs={4}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all", fontWeight: "bold"}}>
                First name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all"}}>
                {firstName}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all", fontWeight: "bold"}}>
                Last name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all"}}>
                {lastName}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant='body1' color='text.secondary'
                          sx={{wordBreak: "break-all", fontWeight: "bold"}}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all"}}>
                {auth.currentUser ? auth.currentUser.email : ""}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography style={{textAlign: 'center', width: "100%"}}>
              Edit your profile
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='body1' color='text.secondary' sx={{p: 1}}>
                  Change your first name:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box component="form" onSubmit={(event: FormEvent<HTMLDivElement>) => {
                  event.preventDefault();
                  editInfo("firstname", newFirstName)
                }}>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <TextField type="text" required label="New first name" fullWidth
                                 onChange={(event) => setNewFirstName(event.target.value)}
                                 sx={{':hover': {backgroundColor: "#E0E0E0", transition: '0.5s'}}}/>
                    </Grid>
                    <Grid item xs={4}>
                      <SaveButton/>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body1' color='text.secondary' sx={{p: 1}}>
                  Change your last name:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box component="form" onSubmit={(event: FormEvent<HTMLDivElement>) => {
                  event.preventDefault();
                  editInfo("lastname", newLastName);
                }}>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <TextField type="text" required label="New last name" fullWidth
                                 onChange={(event) => setNewLastName(event.target.value)}
                                 sx={{':hover': {backgroundColor: "#E0E0E0", transition: '0.5s'}}}/>
                    </Grid>
                    <Grid item xs={4}>
                      <SaveButton/>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body1' color='text.secondary' sx={{p: 1}}>
                  Change your password:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box component="form">
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <TextField type="password" required label="Old password" fullWidth
                                 sx={{':hover': {backgroundColor: "#E0E0E0", transition: '0.5s'}}}/>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField type="password" required label="New password" fullWidth
                                 sx={{':hover': {backgroundColor: "#E0E0E0", transition: '0.5s'}}}/>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField type="password" required label="Confirm new password" fullWidth
                                 sx={{':hover': {backgroundColor: "#E0E0E0", transition: '0.5s'}}}/>
                    </Grid>
                    <Grid item xs={4}>
                      <SaveButton/>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  );
}
