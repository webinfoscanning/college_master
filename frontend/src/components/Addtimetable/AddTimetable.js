import { Button, Typography, Box, Grid, FormGroup, FormLabel, TextField, Select } from '@mui/material'
import React from 'react'
import AddTimtableheader from "./AddTimtableheader"
import styled from "@emotion/styled";
import Timetableform from './Timetableform';
import Timetableevent from "./Timetableevent"

const StyledInputBase = styled(Select)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));

const ExpenselistHeader = () => {
  return (
    <div>
      <AddTimtableheader />
      <br />
      <Box
        boxShadow={3}
        className="p-1"
        sx={{
          m: 1,
          backgroundColor: "secondary.light",
        }}
      >
        <form>
          <Grid container spacing={2}>
            <Grid item sm={6} md={3} lg={3} >
              <FormGroup>
                <FormLabel>Class /Degree</FormLabel>
                <StyledInputBase
                  type="text"
                  name="name"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={3} lg={3}>
              <FormGroup>
                <FormLabel>Department</FormLabel>
                <StyledInputBase
                  type="text"
                  name="description"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={3} lg={3}>
              <FormGroup>
                <FormLabel>Section</FormLabel>
                <StyledInputBase
                  type="text"
                  name="description"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={3} lg={3}>
              <FormGroup>
                <FormLabel>Academic Year</FormLabel>
                <StyledInputBase
                  type="text"
                  name="description"
                  required
                />
              </FormGroup>
            </Grid>
          </Grid>
        </form>
      </Box>
      <br />
      <Timetableform />
      <br />
      <Timetableevent/>
    </div>
  )
}

export default ExpenselistHeader
