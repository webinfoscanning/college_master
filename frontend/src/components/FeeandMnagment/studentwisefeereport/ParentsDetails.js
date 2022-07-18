import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import profile from "../../../assets/images/demo-profile.jpeg"
import { Grid, Card, Typography, IconButton, } from '@mui/material';
import "./index.css"
import "../../../../src/style/style.css"
import CloseIcon from '@mui/icons-material/Close';

const ParentsDetails = (props) => {
  const [open, setOpen] = React.useState(false);

  const _handleClickOpen = () => {
    setOpen(true);
  };
  const _handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant='contained'
        size='small'
        color='secondary'
        className='parents-evnet fullWidht br-2'
        onClick={_handleClickOpen}
      >
        {"Guruprasad"}
      </Button>
      <Dialog
        open={open}
      >
        <DialogTitle>
          <div className='space-between'>
            <span> Father Details</span>
            <IconButton className='p-0'
              onClick={_handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item sm={2} md={8} lg={8}>
                <Card className='card-style'>
                  <div className='display-grid'>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Father Name</b>:Guruprasad
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Dob</b>:15/05/1989
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Email</b>:Gruparasad@gmail.com
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Reiligon</b>:Hindu
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Aaadhar Number</b>:919855626677
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Father Eductaion</b>:M-A
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Occuopation</b>:Teacher
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Income</b>:35,0000
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>Address</b>:#/12/3/lorem ipusm  is simply dummy text insutry
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>City</b>:
                    </Typography>
                    <Typography
                      variant="h7"
                      className='text-style'>
                      <b>State</b>:919855626677
                    </Typography>
                  </div>
                </Card>
              </Grid>
              <Grid item sm={2} md={4} lg={4}>
                <Card className='profile-card' sx={{ borderRadius: 0, height: 180 }}>
                  <div>
                    <img className='object-fit' src={profile} alt="parents"/>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ParentsDetails;