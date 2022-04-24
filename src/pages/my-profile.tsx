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

const dummyPerson = {
  name: 'Petter Hansen',
  username: 'PetterH',
  email: 'Petter.Hansen@gmail.com',
};

export default function MyProfile() {

  return (
    <Box component="div" display="flex" flexDirection="column" alignItems="center" sx={{m: 2}}>

      <Card sx={{maxWidth: "500px"}}>
        <CardContent sx={{width: "auto"}}>
          <Avatar alt='Remy Sharp' sx={{width: 64, height: 64, margin: "auto", backgroundColor: '#FD8270'}}>
            PH
          </Avatar>

          <Grid container spacing={1} sx={{mt: 1}}>
            <Grid item xs={12} sm={3}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all", fontWeight: "bold"}}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all"}}>
                {dummyPerson.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all", fontWeight: "bold"}}>
                Username:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all"}}>
                {dummyPerson.username}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all", fontWeight: "bold"}}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant='body1' color='text.secondary' sx={{wordBreak: "break-all"}}>
                {dummyPerson.email}
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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='body1' color='text.secondary' sx={{p: 1}}>
                  Change your first name:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField type="text" label="New first name" fullWidth/>
              </Grid>
              <Grid item xs={4}>
                <SaveButton/>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body1' color='text.secondary' sx={{p: 1}}>
                  Change your last name:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField type="text" label="New last name" fullWidth/>
              </Grid>
              <Grid item xs={4}>
                <SaveButton/>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body1' color='text.secondary' sx={{p: 1}}>
                  Change your password:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField type="password" label="Old password" fullWidth/>
              </Grid>
              <Grid item xs={8}>
                <TextField type="password" label="New password" fullWidth/>
              </Grid>
              <Grid item xs={4}>
                <SaveButton/>
              </Grid>
              <Grid item xs={8}>
                <TextField type="password" label="Confirm new password" fullWidth/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  );
}
