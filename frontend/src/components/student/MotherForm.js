import styled from '@emotion/styled';
import {
  Box,
  Grid,
  FormGroup,
  TextField,
  Button,
  FormLabel,
  Card,
  Select,
  MenuItem,
  Modal
} from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import validator from 'validator';
import { ADD_PERENTS_DETAILS, STUDENT_ID, UPLOAD_FILES } from '../../redux/action/student';
import { GET_STUDENT_MASTER } from "../../redux/action/master/index"
import { toast } from "react-toastify"
import { getuserId, toastCss } from '../logic/RecomendedFunctions';

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

const Input = styled('input')({
  display: 'none',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "550px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  alignItems: 'center'
};

const MotherForm = (props) => {

  const { perent } = props
  const [photo, setPhoto] = useState("")
  const [aadharImage, setAadharImage] = useState("")
  const [panImage, setPanImage] = useState("")
  const [state, setState] = useState({
    name: "",
    dob: null,
    photo: "",
    mobile: null,
    email: "",
    religion: null,
    aadhar: null,
    education: "",
    occupation: "",
    address: "",
    income: "",
    city: null,
    state: null,
    country: null,
    aadharUpload: "",
    panCard: ""
  })
  const [dial, setDial] = useState(null);
  const [viewsrc, setViewsrc] = useState("")
  const [open, setOpen] = useState(false);
  const {
    ADD_PERENTS_DETAILS,
    getStudentMaster,
    UPLOAD_FILES,
    GET_STUDENT_MASTER,
    getstudentid } = props

  useEffect(() => {
    GET_STUDENT_MASTER()
  }, [GET_STUDENT_MASTER])

  const _handleView = (url) => {
    setOpen(true)
    setViewsrc(url)
  }
  const handleClose = () => setOpen(false);

  const _uploadPic = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("photo", files[0]);
    let res = await UPLOAD_FILES(formData, "stuparentimage?stuparentimage")
    setState({ ...state, photo: res.uploadPath })
    setPhoto(res.uploadPath)
  }

  const _uploadParentAadhar = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("aadharupload", files[0]);
    let res = await UPLOAD_FILES(formData, "stuparentaadhar?stuparentaadhar")
    setState({ ...state, aadharUpload: res.uploadPath })
    setAadharImage(res.uploadPath)
  }
  const _uploadParentPan = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("pancard", files[0]);
    let res = await UPLOAD_FILES(formData, "stuparentpan")
    setState({ ...state, panCard: res.uploadPath })
    setPanImage(res.uploadPath)
  }

  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const _handleSubmit = async (e) => {
    e.preventDefault()

    if (perent === "Father") {
      state.parentType = "FATHER"
    }
    else {
      state.parentType = "MOTHER"
    }

    state.stuId = String(getstudentid)
    state.institutionId = getuserId()?.institutionId

    if (state.name === "") {
      toast.error("Enter parent name", toastCss());
    }
    else if (state.dob === null) {
      toast.error("Enter dob", toastCss());
    }
    else if (dial === null || dial.length !== 12) {
      toast.error("Enter valid phone number with country code", toastCss());
    }
    else if (!validator.isEmail(state.email) || state.email === "") {
      toast.error("Enter valid email", toastCss());
    }
    else if (state.religion === null) {
      toast.error("Enter religion", toastCss());
    }
    else if (state.aadhar === null || (state.aadhar).length !== 12) {
      toast.error("Enter valid aadhar number", toastCss());
    }
    else if (state.occupation === "") {
      toast.error("Enter occupation", toastCss());
    }
    else if (state.income === "") {
      toast.error("Enter income", toastCss());
    }
    else if (state.address === "") {
      toast.error("Enter address", toastCss());
    }
    else if (state.city === null) {
      toast.error("Enter city", toastCss());
    }
    else if (state.state === null) {
      toast.error("Enter state", toastCss());
    }
    else if (state.country === null) {
      toast.error("Enter country", toastCss());
    }
    // else if (state.photo === "") {
    //   toast.error("Upload parent photo", toastCss());
    // }
    else if (state.aadharUpload === "") {
      toast.error("Upload aadhar card", toastCss());
    }

    else {

      state.mobile = dial.slice(2)

      let result = await ADD_PERENTS_DETAILS(state, getstudentid)
      // setState({
      //     name: "",
      //     dob: null,
      //     photo: "",
      //     mobile: null,
      //     email: "",
      //     religion: null,
      //     aadhar: null,
      //     education: "",
      //     occupation: "",
      //     address: "",
      //     income: "",
      //     city: null,
      //     state: null,
      //     country: "",
      //     aadharUpload: "",
      //     panCard: ""
      // })
      // setPhoto("")
      // setAadharImage("")
      // setPanImage("")
      // setDial(null)
    }
  }
  useMemo(() => {
    setState({
      name: "",
      dob: null,
      photo: "",
      mobile: null,
      email: "",
      religion: null,
      aadhar: null,
      education: "",
      occupation: "",
      address: "",
      income: "",
      city: null,
      state: null,
      country: "",
      aadharUpload: "",
      panCard: ""
    })
    setPhoto("")
    setAadharImage("")
    setPanImage("")
    setDial(null)
  }, [perent, setState, setPhoto])

  return (
    <>
      <Box
        boxShadow={3}
        sx={{
          m: 2,
          backgroundColor: "secondary.lighter",
          p: "1em"
        }}
      >
        <form onSubmit={_handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={6} md={10}>
              <Grid container spacing={3}>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>{perent} Name <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="name"
                      type="text"
                      value={state?.name}
                    />
                  </FormGroup>
                </Grid>

                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Dob (dd/mm/yy) <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="dob"
                      type="date"
                      value={state?.dob}
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Mobile <span style={{ color: "red" }}>*</span></FormLabel>
                    <PhoneInput
                      required
                      country={"in"}
                      value={dial}
                      onChange={(dial) => setDial(dial)}
                      style={{ width: "100px" }}
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Email <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="email"
                      value={state?.email}
                      type="email" />
                  </FormGroup>
                </Grid>

                {
                  getStudentMaster?.GenericMaster?.map((item, i) => (

                    item.name === "Religion" ? (
                      <Grid item sm={2} md={4} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                          <StyledSelectInput
                            required
                            type="select"
                            name="religion"
                            onChange={_handleChange}
                          // value={state?.religion?.subHeader}
                          >
                            {item?.headerValue !== null && item?.headerValue.map((i) => {
                              return (
                                <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                              )
                            })}
                          </StyledSelectInput>
                        </FormGroup>
                      </Grid>
                    ) : null
                  ))
                }
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Aadhaar Number <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="aadhar"
                      value={state.aadhar}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                      }}
                      type="number"
                    />

                  </FormGroup>
                </Grid>
                <Grid
                  item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>{perent} Education</FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="education"
                      type="text"
                      value={state?.education}
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Occupation <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="occupation"
                      value={state?.occupation}
                      type="text"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Income <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="income"
                      value={state?.income}
                      type="number" />
                  </FormGroup>
                </Grid>
                <Grid item sm={4} md={12}>
                  <FormGroup>
                    <FormLabel>Address <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      required
                      onChange={_handleChange}
                      name="address"
                      type="text"
                      value={state?.address}
                    />
                  </FormGroup>
                </Grid>

                {getStudentMaster?.GenericMaster?.map((item, i) => (

                  item.name === "City" ? (
                    <Grid item sm={2} md={4} key={i}>
                      <FormGroup>
                        <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                        <StyledSelectInput
                          required
                          type="select"
                          name="city"
                          onChange={_handleChange}
                        // value={state?.city?.subHeader}
                        >
                          {item?.headerValue !== null && item?.headerValue.map((i) => {
                            return (
                              <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                            )
                          })}
                        </StyledSelectInput>
                      </FormGroup>
                    </Grid>
                  ) : null
                ))
                }
                {
                  getStudentMaster?.GenericMaster?.map((item, i) => (
                    item.name === "State" ? (
                      <Grid item sm={2} md={4} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                          <StyledSelectInput
                            required
                            type="select"
                            name="state"
                            onChange={_handleChange}
                          >
                            {item?.headerValue !== null && item?.headerValue.map((i) => {
                              return (
                                <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                              )
                            })}
                          </StyledSelectInput>
                        </FormGroup>
                      </Grid>

                    ) : null
                  ))
                }
                {
                  getStudentMaster?.GenericMaster?.map((item, i) => (

                    item.name === "Country" ? (
                      <Grid item sm={2} md={4} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                          <StyledSelectInput
                            required
                            type="select"
                            name="country"
                            onChange={_handleChange}
                          // value={state?.country?.subHeader}

                          >
                            {item?.headerValue !== null && item?.headerValue.map((i) => {
                              return (
                                <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                              )
                            })}
                          </StyledSelectInput>
                        </FormGroup>
                      </Grid>
                    ) : null
                  ))
                }
              </Grid>
            </Grid>
            <Grid item sm={4} md={2}>
              <div className='photo-img-wrapper'>
                <FormLabel>Upload Photo</FormLabel>
                <Card sx={{ borderRadius: 0, height: 160, cursor: "pointer" }} onClick={() => _handleView(photo)}>
                  {photo !== "" && <img src={photo ? photo : ""} style={{ objectFit: "contain", width: "100%", height: "100%" }} />}
                </Card>
                <label>
                  <Input
                    onChange={_uploadPic}
                    id="student-perent-name"
                    accept="image/*"
                    name="stuparentimage"
                    type="file"
                  // required
                  />
                  <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                    Upload
                  </Button>
                </label>
              </div>
            </Grid>
            <Grid item sm={4} md={4}>
              <div className='photo-img-wrapper'>
                <label>
                  <Input
                    accept="image/*"
                    type="file"
                    name="aadharupload"
                    onChange={_uploadParentAadhar}
                  // required
                  />
                  <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                    Upload aadhar card <span style={{ color: "red", paddingLeft: "5px" }}> *</span>
                  </Button>
                </label>
                <br />
                {
                  aadharImage !== "" ? (
                    <Card sx={{ borderRadius: 0,marginTop: "15px", cursor: "pointer" }} onClick={() => _handleView(aadharImage)}>
                      <img src={aadharImage} alt='aadhar certificate' style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                    </Card>
                  ) : null
                }
              </div>
            </Grid>
            <Grid item sm={4} md={4}>
              <div className='photo-img-wrapper'>
                <label>
                  <Input
                    accept="image/*"
                    type="file"
                    name="pancard"
                    onChange={_uploadParentPan}
                  // required
                  />
                  <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                    Upload pan card
                  </Button>
                </label>
                {
                  panImage !== "" ? (
                    <Card sx={{ borderRadius: 0,  marginTop: "15px", cursor: "pointer" }} onClick={() => _handleView(aadharImage)}>
                      <img src={panImage} alt='aadhar certificate' style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                    </Card>
                  ) : null
                }
              </div>
            </Grid>
          </Grid>
          <div className='submit-form'>
            <Button
              color={"secondary"}
              variant="contained"
              type='submit'
            >
              Submit</Button></div>
        </form>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        size=""
      >
        <Box sx={style}>
          <img src={viewsrc} alt="View file" style={{ objectFit: "contain", width: "500px", height: "500px" }} />
        </Box>
      </Modal>
    </>
  )
}


const mapStateProps = (state) => {
  return {
    getStudentMaster: state.master.getStudentMaster,
    getstudentid: state.Student.studentid
  }
}

export default connect(mapStateProps, { GET_STUDENT_MASTER, UPLOAD_FILES, ADD_PERENTS_DETAILS, STUDENT_ID })(MotherForm)
