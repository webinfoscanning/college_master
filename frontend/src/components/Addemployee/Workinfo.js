import styled from '@emotion/styled';
import { Grid, FormGroup, FormLabel, TextField, Typography, Select, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react'
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
  '& .MuiOutlinedInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    }
  }
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

const Workinfo = (props) => {
  const { state, _handleChange, getEmployeeMaster } = props
  return (
    <>
      <Typography color="secondary" variant="h6">Work</Typography>
      <Grid
        container spacing={3}>
        {getEmployeeMaster?.ConfigurationalMaster?.map((item, i) => (
          item.name === "Department/Medium" ? (
            <Grid
              item sm={2} md={3} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>
                <StyledSelectInput
                  type="select"
                  name="department"
                  onChange={_handleChange}
                >
                  {item?.headerValue !== null && item?.headerValue.map((i) => {
                    return (
                      <MenuItem
                        value={JSON.stringify(i)}
                        key={i?.subHeader}
                      >
                        {i.subHeader}
                      </MenuItem>
                    )
                  })}
                </StyledSelectInput>
              </FormGroup>
            </Grid>
          ) :
            item.name === "Location" ? (
              <Grid item sm={2} md={4} key={i}>
                <FormGroup>
                  <FormLabel>{item.name}</FormLabel>
                  <StyledSelectInput
                    required
                    type="select"
                    name="location"
                    onChange={_handleChange}
                  >
                    {item?.headerValue !== null && item?.headerValue.map((i) => {
                      return (
                        <MenuItem
                          value={JSON.stringify(i)}
                          key={i?.subHeader}
                        >
                          {i.subHeader}
                        </MenuItem>
                      )
                    })}
                  </StyledSelectInput>
                </FormGroup>
              </Grid>

            ) : null
        ))}

        {getEmployeeMaster?.GenericMaster?.map((item, i) => (

          item.name === "Reporting to" ? (
            <Grid item sm={2} md={4} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>

                <StyledSelectInput
                  type="select"
                  name="reportingTo"
                  onChange={_handleChange}
                >
                  {item?.headerValue !== null && item?.headerValue.map((i) => {
                    return (
                      <MenuItem
                        value={JSON.stringify(i)}
                        key={i?.subHeader}
                      >
                        {i.subHeader}
                      </MenuItem>
                    )
                  })}
                </StyledSelectInput>
              </FormGroup>
            </Grid>
          ) : null
        ))}
        <Grid
          item sm={2} md={4}>
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <StyledInputBase
              required
              type="text"
              name="title"
              value={state.title ? state.title : ""}
              onChange={_handleChange}
            />
          </FormGroup>
        </Grid>
        {getEmployeeMaster?.GenericMaster?.map((item, i) => (
          item.name === "Source of hire" ? (
            <Grid item sm={2} md={4} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>

                <StyledSelectInput
                  type="select"
                  name="sourceOfHire"
                  onChange={_handleChange}
                >
                  {item?.headerValue !== null && item?.headerValue.map((i) => {
                    return (
                      <MenuItem
                        value={JSON.stringify(i)}
                        key={i?.subHeader}
                      >
                        {i.subHeader}
                      </MenuItem>
                    )
                  })}
                </StyledSelectInput>
              </FormGroup>
            </Grid>

          ) : null
        ))}
        <Grid
          item sm={2} md={4}>
          <FormGroup>
            <FormLabel>Date of joining (dd/mm/yyyy)</FormLabel>
            <StyledInputBase
              required
              type="date"
              name="dateOfJoining"
              value={state.dateOfJoining ? state.dateOfJoining : ""}
              onChange={_handleChange}
            />
          </FormGroup>
        </Grid>
        <Grid
          item sm={2} md={3}>
          <FormGroup>
            <FormLabel>Seating Location</FormLabel>
            <StyledInputBase
              type="text"
              name="seatingLocation"
              value={state.seatingLocation ? state.seatingLocation : ""}
              onChange={_handleChange}
            />
          </FormGroup>
        </Grid>
        {getEmployeeMaster?.GenericMaster?.map((item, i) => (

          item.name === "Employee status" ? (
            <Grid item sm={2} md={3} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>
                <StyledSelectInput
                  required
                  type="select"
                  name="employeeStatus"
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
        <Grid
          item sm={2} md={3}>
          <FormGroup>
            <FormLabel>Work Phone</FormLabel>
            <StyledInputBase
              type="text"
              name="workPhone"
              value={state.workPhone ? state.workPhone : ""}
              onChange={_handleChange}
            />
          </FormGroup>
        </Grid>
        {getEmployeeMaster?.GenericMaster?.map((item, i) => (
          item.name === "Employee type" ? (
            <Grid item sm={2} md={3} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>

                <StyledSelectInput
                  required
                  type="select"
                  name="employeeType"
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
        <Grid
          item sm={2} md={3}>
          <FormGroup>
            <FormLabel>Extension</FormLabel>
            <StyledInputBase
              type="text"
              name="extension"
              value={state.extension ? state.extension : ""}
              onChange={_handleChange}
            />
          </FormGroup>
        </Grid>
        {getEmployeeMaster?.GenericMaster?.map((item, i) => (
          item.name === "Role" ? (
            <Grid item sm={2} md={3} key={i}>
              <FormGroup>
                <FormLabel>{item.name}</FormLabel>
                <StyledSelectInput
                  type="select"
                  name="role"
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
export default Workinfo;