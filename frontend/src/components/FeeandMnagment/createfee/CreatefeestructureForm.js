import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Button, IconButton, Box,
  TextField,
  FormGroup,
  MenuItem,
  Select,
  Grid, InputLabel, FormLabel,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { connect } from "react-redux";
import { GET_MASTER, GET_FEESTRUCTURE_MASTER } from "../../../redux/action/master";
import GoBack from "../../back/GoBack";
import AddHeader from "../../Master/AddHeader";
import { ADD_FEE_STRUCTURE } from "../../../redux/action/feestructure";
import "./index.css"
import { getuserId } from "../../logic/RecomendedFunctions";
const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "1em"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  marginRight: "0",
  marginLeft: "0",
  display: "flex",
  alignItems: 'center'
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
const CreatefeestructureForm = (props) => {
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState([])
  const [feedata, setFeedata] = useState([])
  const [state, setState] = useState([])
  const theme = useTheme();
  const { getMasterdata,
    GET_MASTER,
    ADD_FEE_STRUCTURE,
    GET_FEESTRUCTURE_MASTER,
    getFeeStructureMaster } = props
  const _handleopenform = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GET_MASTER()
    GET_FEESTRUCTURE_MASTER()
  }, [GET_MASTER, GET_FEESTRUCTURE_MASTER])

  useMemo(() => {
    setdata(getMasterdata)
    setFeedata(getFeeStructureMaster)
  }, [data, feedata, getMasterdata])

  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const _handleSubmit = async (e) => {
    e.preventDefault()
    let paylod = {
      "institutionId": getuserId()?.institutionId, ...state
    }
    let res = await ADD_FEE_STRUCTURE(paylod)
    if (res) {
      setState({
        "description": "",
        "fee": "",
        "classDegree": "",
        "feeType": "",
        "academicYear": "",
        "boardUniversity": ""

      })
      setOpen(false)
    }
  }

  return (
    <Fragment>
      <AddHeader
        StyledButton={
          <StyledButton
            color="secondary"
            variant="contained"
            theme={theme}
            onClick={_handleopenform}
          >
            Create fee structure {"  "}<AddIcon />
          </StyledButton>
        }
        ArrowBack={
          <GoBack />
        }
      />
      {open ?
        <Box
          boxShadow={3}
          sx={{
            m: 2,
            backgroundColor: "secondary.medum",
          }}
        >
          <form onSubmit={_handleSubmit}>
            <StyledDiv>
              <Grid container spacing={3}>
                {getFeeStructureMaster?.ConfigurationalMaster?.map((item, i) => (
                  item.name === "Class/Degree" ? (
                    <Grid item sm={2} md={3} key={i}>
                      <FormGroup>
                        <FormLabel>{item.name}</FormLabel>
                        <StyledSelectInput
                          type="select"
                          name="classDegree"
                          onChange={_handleChange}
                          required
                        >
                          {item?.headerValue !== null && item?.headerValue.map((i) => {
                            return (
                              <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                            )
                          })}
                        </StyledSelectInput>
                      </FormGroup>
                    </Grid>

                  ) :
                    item.name === "Department/Medium" ? (
                      <Grid item sm={2} md={3} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name}</FormLabel>
                          <StyledSelectInput
                            type="select"
                            name="department"
                            onChange={_handleChange}
                            required
                          >
                            {item?.headerValue !== null && item?.headerValue.map((i) => {
                              return (
                                <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                              )
                            })}
                          </StyledSelectInput>
                        </FormGroup>
                      </Grid>

                    )
                      :
                      item.name === "Academic year" ? (
                        <Grid item sm={2} md={3} key={i}>
                          <FormGroup>
                            <FormLabel>{item.name}</FormLabel>
                            <StyledSelectInput
                              type="select"
                              name="academicYear"
                              onChange={_handleChange}
                              required
                            >
                              {item?.headerValue !== null && item?.headerValue.map((i) => {
                                return (
                                  <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                                )
                              })}
                            </StyledSelectInput>
                          </FormGroup>
                        </Grid>

                      )
                        :
                        item.name === "Board university" ? (
                          <Grid item sm={2} md={3} key={i}>
                            <FormGroup>
                              <FormLabel>{item.name}</FormLabel>
                              <StyledSelectInput
                                type="select"
                                name="boardUniversity"
                                onChange={_handleChange}
                                required
                              >
                                {item?.headerValue !== null && item?.headerValue.map((i) => {
                                  return (
                                    <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                                  )
                                })}
                              </StyledSelectInput>
                            </FormGroup>
                          </Grid>

                        ) :
                          item.name === "Fee type" ? (
                            <Grid item sm={2} md={3} key={i}>
                              <FormGroup>
                                <FormLabel>{item.name}</FormLabel>
                                <StyledSelectInput
                                  type="select"
                                  name="feeType"
                                  onChange={_handleChange}
                                  required
                                >
                                  {item?.headerValue !== null && item?.headerValue.map((i) => {
                                    return (
                                      <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                                    )
                                  })}
                                </StyledSelectInput>
                              </FormGroup>
                            </Grid>
                          )
                            : (
                              <></>
                            )
                ))}

                <Grid item sm={2} md={3}>
                  <FormGroup>
                    <FormLabel>Fee</FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="fee"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={6}>
                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="description"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={12} md={12}>
                  <div className="submit-form">
                    <Button color={"secondary"}
                      type="submit"
                      variant="contained" size="medum"
                    >Submit</Button>
                  </div>
                </Grid>
              </Grid>
            </StyledDiv>
          </form>
        </Box> : null
      }
    </Fragment >
  );
};
const mapStateprops = (state) => {
  return {
    getMasterdata: state.master.getMasterdata,
    getFeeStructureMaster: state.master.getFeeStructureMaster
  }
}
export default connect(mapStateprops, { GET_MASTER, ADD_FEE_STRUCTURE, GET_FEESTRUCTURE_MASTER })(CreatefeestructureForm)
