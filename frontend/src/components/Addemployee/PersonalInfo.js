import styled from '@emotion/styled';
import { Grid, FormGroup, FormLabel, TextField, Typography, Card, Button, Input, Box, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));
const SelectInputBase = styled(Select)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    background: theme.palette.common.lighter,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    borderRadius: 0,
  },
}));
const StyledSelectInput = styled(Select)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    background: theme.palette.common.lighter,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    borderRadius: 0,
  },
}));

const PersnolInfo = (props) => {
  const { state, _handleChange, getEmployeeMaster } = props;
  return (
    <>
      <br />
      <Typography color="secondary" variant="h6">Personal</Typography>
      <Grid
        container spacing={3}>
        <Grid
          item sm={2} md={4}>
          <FormGroup>
            <FormLabel>PAN Number</FormLabel>
            <StyledInputBase
              required
              type="text"
              name="panNo"
              value={state.panNo ? state.panNo : ""}
              onChange={_handleChange}
            />
          </FormGroup>
        </Grid>
        <Grid
          item sm={2} md={4}>
          <FormGroup>
            <FormLabel>Date of Birth (dd/mm/yyyy)</FormLabel>
            <StyledInputBase
              type="date"
              name="dob"
              value={state.dob}
              onChange={_handleChange}
              required
            />
          </FormGroup>
        </Grid>
        <Grid
          item sm={2} md={12}>
          <FormGroup>
            <FormLabel>Address</FormLabel>
            <StyledInputBase
              type="text"
              name="personalAddress"
              value={state.personalAddress ? state.personalAddress : ""}
              onChange={_handleChange}
              required
            />
          </FormGroup>
        </Grid>
        <Grid
          item sm={2} md={8}>
          <FormGroup>
            <FormLabel>Residential Address</FormLabel>
            <StyledInputBase
              type="text"
              name="residentialAddress"
              value={state.residentialAddress ? state.residentialAddress : ""}
              onChange={_handleChange}
              required
            />
          </FormGroup>
        </Grid>
        {getEmployeeMaster?.GenericMaster?.map((item, i) => (
          item.name === "Marital status" ? (
            <Grid item sm={2} md={4} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>
                <StyledSelectInput
                  type="select"
                  name="maritalStatus"
                  onChange={_handleChange}
                >
                  {item?.headerValue !== null && item?.headerValue.map((i) => {
                    return (
                      <MenuItem
                        value={JSON.stringify(i)}
                        key={i?.subHeader}                      >
                        {i.subHeader}
                      </MenuItem>
                    )
                  })}
                </StyledSelectInput>
              </FormGroup>
            </Grid>

          ) : null
        ))}
      </Grid>
    </>
  )
}
export default PersnolInfo;