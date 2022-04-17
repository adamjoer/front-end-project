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


import SaveButton from '../components/SaveButton';

const dummyPerson = {
  name: 'Petter Hansen',
  username: 'PetterH',
  email: 'Petter.Hansen@gmail.com',
};

export default function Myprofile() {

  return (
    <div>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent='center' spacing={'2'}>
            <Grid item>
              <Paper
                sx={{
                  height: 650,
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
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography style={{ textAlign: 'center', width: "100%" }}>
                          Edit your profile
                        </Typography>
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
                        <div style={{ whiteSpace: 'nowrap' }}>
                          <TextField
                            type='username'
                            id='outlined-password-input'
                            label='New username'
                            style={{ display: 'inline-block' }}
                            sx={{':hover':{bgcolor:"#E0E0E0", transition: '0.5s'}}}
                          />

                          <SaveButton />
                        </div>
                        <Typography
                          variant='body1'
                          color='text.secondary'
                          className='card_text_footer'
                          style={{ padding: '10px' }}
                        >
                          Change your email:{' '}
                        </Typography>
                        <div style={{ whiteSpace: 'nowrap' }}>
                          <TextField
                            type='username'
                            id='outlined-password-input'
                            label='New email'
                            style={{ display: 'inline-block' }}
                            sx={{':hover':{bgcolor:"#E0E0E0", transition: '0.5s'}}}
                          />

                          <SaveButton />
                        </div>
                        <Typography
                          variant='body1'
                          color='text.secondary'
                          className='card_text_footer'
                          style={{ padding: '10px' }}
                        >
                          Change your password:{' '}
                        </Typography>
                        <div style={{ whiteSpace: 'nowrap' }}>
                          <TextField
                            type='password'
                            id='outlined-password-input'
                            label='New password'
                            style={{ display: 'inline-block'}}
                            sx={{':hover':{bgcolor:"#E0E0E0", transition: '0.5s'}}}
                          />

                          <SaveButton />
                        </div>
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
