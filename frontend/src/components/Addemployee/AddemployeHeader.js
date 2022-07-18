import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import AddHeader from "./../Master/AddHeader"
import AddemployeForm from './AddemployeForm';
import GoBack from '../back/GoBack';
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  marginRight: "0",
  marginLeft: "0",
  display: "flex",
  alignItems: 'center'
}));
const AddemployeHeader = () => {
  return (
    <>
      <AddHeader
        StyledButton={
          <StyledButton
            color="secondary"
            variant="contained"
          >
            Add Employee +
          </StyledButton>
        }
        ArrowBack={
          <GoBack />}
      />
      <AddemployeForm />

    </>
  )
}

export default AddemployeHeader