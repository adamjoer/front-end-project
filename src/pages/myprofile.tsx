import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const dummyPerson = {
  name: 'Petter Hansen',
  username: 'PetterH',
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
                  height: 400,
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
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        className='card_text_footer'
                        style={{
                          padding: '20px',
                          textAlign: 'left',
                          display: 'inline',
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
                          padding: '20px',
                          textAlign: 'right',
                          display: 'inline',
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
                      <Button
                        style={{
                          backgroundColor: '#FD8270',
                          padding: '5px 10px',
                          margin: '10px',
                          color: 'white',
                          width: '200px',
                        }}
                      >
                        Change username
                      </Button>
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
                      <Button
                        style={{
                          backgroundColor: '#FD8270',
                          padding: '5px 10px',
                          margin: '10px',
                          color: 'white',
                          width: '200px',
                        }}
                      >
                        Change password
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'space-evenly',
                  }}
                ></div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

/** 
<div style={{ display: 'flex', padding: '10px' }}>
                  {testRecipe.map((x) => {
                    return (
                      <Card style={{ width: '20%', margin: '10px' }}>
                        <CardMedia
                          component='img'
                          height='100'
                          image={x.imageString}
                          alt='green iguana'
                        />
                        <div> {x.name}</div>

                        <div>Your rate: {x.rank}</div>
                      </Card>
                    );
                  })}
                </div>

                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='stretch'
                  padding={1}
                >
                  {testRecipe.map((x) => {
                    return (
                      <CardActionArea>
                        <Card style={{ margin: '10px' }}>
                          <CardMedia
                            component='img'
                            height='100'
                            image={x.imageString}
                            alt='green iguana'
                          />
                          <div> {x.name}</div>

                          <div>Your rate: {x.rank}</div>
                        </Card>
                      </CardActionArea>
                    );
                  })}
                </Box>
                */
