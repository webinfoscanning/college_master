import styled from '@emotion/styled';
import {
  Grid,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
  Card,
  Button,
  Input,
  Box,
  Select,
  MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));
const SelectInputBase = styled(Select)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
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

const Summary = (props) => {

  const { state, _handleChange, getEmployeeMaster } = props;
  const [gender, setgender] = useState("")

  useEffect(() => {
    setgender(state?.gender?.subHeader)
  }, [state])

  return (
    <>
      <br />
      <Typography color="secondary" variant="h6">Summary</Typography>
      <Grid
        container spacing={3}>
        <Grid
          item sm={2} md={4}>
          <FormGroup>
            <FormLabel>Job Description</FormLabel>
            <StyledInputBase
              type="text"
              name="jobDescription"
              value={state.jobDescription ? state.jobDescription : ""}
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
              name="summaryAddress"
              value={state.summaryAddress ? state.summaryAddress : ""}
              onChange={_handleChange}
              required
            />
          </FormGroup>
        </Grid>
        <Grid
          item sm={2} md={8}>
          <FormGroup>
            <FormLabel>About Me</FormLabel>
            <StyledInputBase
              type="text"
              name="aboutMe"
              value={state.aboutMe ? state.aboutMe : ""}
              onChange={_handleChange}
              required
            />
          </FormGroup>
        </Grid>
        {getEmployeeMaster?.GenericMaster?.map((item, i) => (
          item.name === "Gender" ? (
            <Grid item sm={2} md={4} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>
                <StyledSelectInput
                  type="select"
                  name="gender"
                  //value={state.gender.subHeader ? state.gender.subHeader : ""}
                  onChange={_handleChange}
                >
                  {item?.headerValue !== null && item?.headerValue.map((i) => {
                    return (
                      <MenuItem
                        value={JSON.stringify(i)}
                        key={i?.subHeader}
                      > {i.subHeader}
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
export default Summary;