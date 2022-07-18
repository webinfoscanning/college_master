import React, { useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Button, Select, Grid, FormGroup, FormLabel, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { GET_MAP_ALL_SUBJECT, ADD_MAP_SUBJECT } from '../../redux/action/mapsubject';
import { GET_MASTER, GET_MAPSUBJECT_MASTER } from "../../redux/action/master";
import { getuserId } from '../logic/RecomendedFunctions';

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "1em"
}));
const StyledInputBase = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    background: theme.palette.common.lighter,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    borderRadius: 4,
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
    borderRadius: 4,
  },
}));

const MapSubjectform = (props) => {

  const [state, setState] = useState([])
  const [data, setdata] = useState([])
  const [mapsubject, setMapsubject] = useState([])

  const {
    getMasterdata,
    GET_MAP_ALL_SUBJECT,
    GET_MASTER,
    ADD_MAP_SUBJECT,
    GET_MAPSUBJECT_MASTER,
    getMapSubjectMaster
  } = props

  useEffect(() => {

    GET_MAP_ALL_SUBJECT()
  }, [GET_MAP_ALL_SUBJECT])

  useEffect(() => {
    GET_MASTER()
    GET_MAPSUBJECT_MASTER()
  }, [GET_MASTER, GET_MAPSUBJECT_MASTER])

  useMemo(() => {
    setdata(getMasterdata)
    setMapsubject(getMapSubjectMaster)
  }, [data, mapsubject, getMasterdata, getMapSubjectMaster])

  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const _handleSubmit = (e) => {
    e.preventDefault()

    let payload = {
      "institutionId": getuserId()?.institutionId, ...state
    }

    ADD_MAP_SUBJECT(payload)
    setState([])
  }
  return (
    <Box
      boxShadow={3}
      sx={{
        m: 1,
        backgroundColor: "secondary.light",
      }}
    >
      <form>
        <StyledDiv>
          <Grid container spacing={2}>
            {getMapSubjectMaster?.ConfigurationalMaster?.map((item, i) => (

              item.name === "Class/Degree" ? (
                <Grid item sm={2} md={4} key={i}>
                  <FormGroup>
                    <FormLabel>{item.name}</FormLabel>
                    <StyledSelectInput
                      type="select"
                      name="classId"
                      onChange={_handleChange}
                    >
                      {item?.headerValue !== null && item?.headerValue.map((i) => {
                        return (
                          <MenuItem value={JSON.stringify(i)}  key={i?.id}>{i.subHeader}</MenuItem>
                        )
                      })}
                    </StyledSelectInput>
                  </FormGroup>
                </Grid>
              ) :
                (
                  <></>
                )
            ))}
            {getMasterdata?.map((item, i) => (
              item.name === "Department/Medium" ? (
                <Grid item sm={2} md={4} key={i}>
                  <FormGroup>
                    <FormLabel>{item.name}</FormLabel>
                    <StyledSelectInput
                      type="select"
                      name="department"
                      onChange={_handleChange}
                    >
                      {item?.headerValue !== null && item?.headerValue.map((i) => {
                        return (
                          <MenuItem value={JSON.stringify(i)} key={i?.id} >{i.subHeader}</MenuItem>
                        )
                      })}
                    </StyledSelectInput>
                  </FormGroup>
                </Grid>
              ) :
                (
                  <></>
                )
            ))}

            {getMasterdata?.map((item, i) => (

              item.name === "Academic year" ? (
                <Grid item sm={2} md={4} key={i}>
                  <FormGroup>
                    <FormLabel>{item.name}</FormLabel>
                    <StyledSelectInput
                      type="select"
                      name="academicYear"
                      onChange={_handleChange}
                    >
                      {item?.headerValue !== null && item?.headerValue.map((i) => {
                        return (
                          <MenuItem value={JSON.stringify(i)} key={i?.id} >{i.subHeader}</MenuItem>
                        )
                      })}
                    </StyledSelectInput>
                  </FormGroup>
                </Grid>
              ) :
                (
                  <></>
                )
            ))}
            {getMasterdata?.map((item, i) => (

              item.name === "Section" ? (
                <Grid item sm={2} md={4} key={i}>
                  <FormGroup>
                    <FormLabel>{item.name}</FormLabel>
                    <StyledSelectInput
                      type="select"
                      name="section"
                      onChange={_handleChange}
                    >
                      {item?.headerValue !== null && item?.headerValue.map((i) => {
                        return (
                          <MenuItem value={JSON.stringify(i)} key={i?.id} >{i.subHeader}</MenuItem>
                        )
                      })}
                    </StyledSelectInput>
                  </FormGroup>
                </Grid>
              ) :
                (
                  <></>
                )
            ))}
            {getMasterdata?.map((item, i) => (

              item.name === "Board university" ? (
                <Grid item sm={2} md={4} key={i}>
                  <FormGroup>
                    <FormLabel>{item.name}</FormLabel>
                    <StyledSelectInput
                      type="select"
                      name="board"
                      onChange={_handleChange}
                    >
                      {item?.headerValue !== null && item?.headerValue.map((i) => {
                        return (
                          <MenuItem value={JSON.stringify(i)} key={i?.id} >{i.subHeader}</MenuItem>
                        )
                      })}
                    </StyledSelectInput>
                  </FormGroup>
                </Grid>
              ) :
                (
                  <></>
                )
            ))}
            <Grid item sm={2} md={2} lg={2}>
              <div className='m-1 p-1'>
                <Button
                  color={"secondary"}
                  size="small"
                  variant="contained"
                  type="submit"
                  className='fullWidht'
                  onClick={_handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </StyledDiv>
      </form>
    </Box >

  )
}
const mapStateprops = (state) => {

  return {
    getMasterdata: state.master.getMasterdata,
    getMapSubjectMaster: state.master.getMapSubjectMaster
  }
}
export default connect(mapStateprops, { GET_MAP_ALL_SUBJECT, GET_MASTER, ADD_MAP_SUBJECT, GET_MAPSUBJECT_MASTER })(MapSubjectform)