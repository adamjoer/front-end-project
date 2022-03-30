import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { makeStyles } from '@mui/styles';
import SaveButton from '../components/SaveButton'

const useStyles = makeStyles({
  content: {
    justifyContent: "center"
  }
});

const dummyPerson = {
  name: 'Petter Hansen',
  username: 'PetterH',
  email: 'Petter.Hansen@gmail.com',
};

export default function Myprofile() {
  const classes = useStyles();
  return (
    <div>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent='center' spacing={'2'}>
            <Grid item>
              <Paper
                sx={{
                  height: 800,
                  width: 600,
                  backgroundColor: '#E0E0E0',
                  margin: '15px',
                  padding: '20px',
                }}
              >
                <Grid
                  container
                  spacing={2}
                  direction={'column'}
                  alignItems={'center'}
                  style={{ padding: '10px' }}
                >
                  <Card
                    style={{
                      width: '75%',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CardContent>
                      <Avatar
                        alt='Remy Sharp'
                        sx={{ width: 64, height: 64, bgcolor: '#FD8270' }}
                        style={{ margin: 'auto' }}
                      >
                        {' '}
                        PH{' '}
                      </Avatar>

                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{
                          padding: '10px',
                          textAlign: 'left',

                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        Name: {dummyPerson.name}{' '}
                      </Typography>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{
                          padding: '10px',
                          textAlign: 'left',

                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        Username: {dummyPerson.username}
                      </Typography>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{
                          padding: '10px',
                          textAlign: 'left',

                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        Email: {dummyPerson.email}
                      </Typography>
                      
                    </CardContent>
                    <Accordion>
                      <AccordionSummary
                      classes={{ content: classes.content }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        
                      >
                        <Typography style={{textAlign: 'center'}}>Edit your profile</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{ padding: '10px' }}
                      >
                        Change your username:{' '}
                      </Typography>
                      <div>
                        <TextField
                          type='username'
                          id='outlined-password-input'
                          label='New username'
                        />
                      </div>
                      <SaveButton/>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{ padding: '10px' }}
                      >
                        Change your email:{' '}
                      </Typography>
                      <div>
                        <TextField
                          type='username'
                          id='outlined-password-input'
                          label='New email'
                        />
                      </div>
                      <SaveButton/>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{ padding: '10px' }}
                      >
                        Change your password:{' '}
                      </Typography>
                      <div>
                        <TextField
                          type='password'
                          id='outlined-password-input'
                          label='New password'
                        />
                      </div>
                      <SaveButton/>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

