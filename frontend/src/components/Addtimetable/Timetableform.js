import {
  Button,
  Typography, Box,
  Grid, FormGroup,
  FormLabel, TextField,
  Select, Card,
} from '@mui/material'
import React from 'react'
import AddTimtableheader from "./AddTimtableheader"
import styled from "@emotion/styled";
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));
const SelecInputBase = styled(Select)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
    width: "200px"
  },
}));
const Input = styled("input")(({ theme }) => ({
  display: "none"
}));

const Timetableform = () => {
  return (
    <Box sx={{ boxShadow: 2, m: 1, p: 1 }}>
      <Grid container spacing={2}>
        <Grid item sm={6} md={3} lg={3} >
          <FormGroup>
            <FormLabel>Subject</FormLabel>
            <StyledInputBase
              type="text"
              name="name"
              required
            />
          </FormGroup>
        </Grid>
        <Grid item sm={6} md={3} lg={3}>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <StyledInputBase
              type="text"
              name="description"
              required
            />
          </FormGroup>
        </Grid>
        <Grid item sm={6} md={3} lg={3}>
          <FormGroup>
            <FormLabel>Evnet</FormLabel>
            <StyledInputBase
              type="text"
              name="description"
              required
            />
          </FormGroup>
        </Grid>
        <Grid item sm={6} md={3} lg={3}>
          <FormGroup>
            <FormLabel>Location</FormLabel>
            <StyledInputBase
              type="text"
              name="description"
              required
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={6} md={10}>
          <Grid
            container spacing={3}>
            <Grid item sm={2} md={4}>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <StyledInputBase
                  // onChange={_handleChange}
                  required
                  type="text"
                  name="firstname"
                />
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={4}>
              <FormGroup>
                <FormLabel>Notes</FormLabel>
                <StyledInputBase
                  // onChange={_handleChange}
                  required
                  type="text"
                  name="lastname"
                />
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={4}>
              <FormGroup>
                <FormLabel>Color</FormLabel>
                <StyledInputBase
                  // onChange={_handleChange}
                  required
                  type="color"
                  name="date" />
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={6}>
              <FormGroup>
                <FormLabel>Duration</FormLabel>
                <div className='d-flex'>
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                </div>
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={6}>
              <FormGroup>
                <FormLabel>Reminder</FormLabel>
                <div className='d-flex'>
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                </div>
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={6}>
              <FormGroup>
                <div className='d-flex'>
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                </div>
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={6}>
              <FormGroup>
                <div className='d-flex'>
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                  <SelecInputBase
                    className='mr-1'
                    required
                    type="text"
                    name="date" />
                </div>
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} md={2}>
          <div className='photo-img-wrapper'>
            <FormLabel>Upload Photo</FormLabel>
            <Card sx={{ borderRadius: 0, height: 160 }}>
              {/* {photo?.base64 !== null && <img className='object-fit' src={photo?.base64} alt='student avatar' />} */}
            </Card>
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                Upload
              </Button>
            </label>
          </div>
        </Grid>
      </Grid>
      <div className='flex-end'>
        <div>
          <Button className='m-1' variant="contained" color='secondary' >
            Remove
          </Button>
          <Button className='m-1' variant="contained" color='secondary' >
            Set
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default Timetableform
