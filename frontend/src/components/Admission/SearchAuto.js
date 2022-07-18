import { Autocomplete, Box, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled';
import { connect } from 'react-redux';
const StyledInputBase = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "primary",
  fieldset: {
    border: "none",
    borderRadius: "20%",
  },
  "& .MuiInputBase": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
  },
  [theme.breakpoints.up("md")]: {
    width: "40ch",
  },
}));
const InputWrapper = styled('div')(({ theme }) => ({
  width: '420px',
  zIndex: 100,
}));

const SearchAuto = ({ handleInputChange, searchStudent, _handleChnage }) => {



  return (
    <InputWrapper>
      <StyledAutocomplete
        sx={{ boxShadow: 4 }}
        id="auto-com"
        options={searchStudent}
        renderInput={params => (
          <StyledInputBase {...params} label="Search student" />
        )}
        getOptionLabel={option => `${option?.firstname} ${option?.lastname} ${option?.phone}`}
        style={{ boxShadow: 3 }}
        onChange={(e, newvalue) => {
          _handleChnage(e, newvalue)
        }}
        onInputChange={handleInputChange}
      />
    </InputWrapper>
  )
}

const mapStateProps = (state) => {
  return {
    searchStudent: state.AdmissionReducer.searchStudent
  }
}
export default connect(mapStateProps, null)(SearchAuto)