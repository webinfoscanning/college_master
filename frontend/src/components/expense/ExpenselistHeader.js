import { Button, Typography, Box, Grid, FormGroup, FormLabel, TextField } from '@mui/material'
import React from 'react'
import GoBack from '../back/GoBack'
import AddHeader from '../Master/AddHeader'
import styled from "@emotion/styled";
const StyledInputBase = styled(TextField)(({ theme }) => ({
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
      {/* <AddHeader
        StyledButton={
          <Typography
            color="secondary"
            variant="h6"
            className='m-1'
          >Expense List</Typography>
        }
        ArrowBack={<GoBack />}
      />
      <br /> */}
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
                <FormLabel>Header Name</FormLabel>
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
            <Grid item sm={2} md={2} lg={2}>
              <div className='m-1'>
                <Button
                  color={"secondary"}
                  size="small"
                  variant="contained"
                  type="submit"
                  className='m-1 fullWidht'
                >
                  Submit
                </Button>

              </div>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <div className='m-1'>
                <Button
                  color={"secondary"}
                  size="small"
                  variant="contained"
                  type="submit"
                  className='m-1 fullWidht'
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  )
}

export default ExpenselistHeader
