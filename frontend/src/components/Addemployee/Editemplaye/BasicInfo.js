import styled from '@emotion/styled';
import { Grid, FormGroup, FormLabel, TextField, Typography, Card, Button, Box } from '@mui/material'
import React, { useState } from 'react'
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));

const Input = styled("input")(({ theme }) => ({
  display: "none"
}));

const BasicInfo = (props) => {

  const { state, _handleChange, _handlePhotoUpload } = props

  return (
    <Box>
      <Typography color="secondary" variant="h6">Basic Info</Typography>
      <Grid container spacing={2}>
        <Grid item sm={6} md={10}>
          <Grid
            container spacing={3}>
            <Grid
              item sm={2} md={4}>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <StyledInputBase
                  required
                  type="text"
                  name="firstName"
                  value={state.firstName ? state.firstName : ""}
                  onChange={_handleChange}
                />
              </FormGroup>
            </Grid>
            <Grid
              item sm={2} md={4}>
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <StyledInputBase
                  required
                  type="text"
                  name="lastName"
                  value={state.lastName ? state.lastName : ""}
                  onChange={_handleChange}
                />
              </FormGroup>
            </Grid>
            <Grid
              item sm={4} md={4}>
              <FormGroup>
                <FormLabel>Nick Name</FormLabel>
                <StyledInputBase
                  type="text"
                  name="nickName"
                  value={state.nickName ? state.nickName : ""}
                  onChange={_handleChange}
                />
              </FormGroup>
            </Grid>
            <Grid
              item sm={2} md={4}>
              <FormGroup>
                <FormLabel>E-Mail</FormLabel>
                <StyledInputBase
                  required
                  type="email"
                  name="email"
                  value={state.email ? state.email : ""}
                  onChange={_handleChange}
                />
              </FormGroup>
            </Grid>

          </Grid>
        </Grid>
        <Grid item sm={4} md={2}>
          <div className='photo-img-wrapper'>
            <FormLabel>Upload Photo</FormLabel>
            <Card sx={{ borderRadius: 0, height: 140 }}>
              {
                state.photo ? (
                  null
                ) : (
                  <img className='profile-image' src={state?.photo} alt='employee avatar' />
                )
              }
            </Card>
            <label htmlFor="contained-button-file">
              <Input
                onChange={_handlePhotoUpload}
                accept="image/*"
                id="contained-button-file"
                name="image"
                type="file"
              />
              <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                Upload
              </Button>
            </label>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}
export default BasicInfo;