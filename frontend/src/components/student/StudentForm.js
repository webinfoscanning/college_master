import styled from '@emotion/styled';
import {
  Button,
  FormGroup, Box,
  TextField, Select, MenuItem,
  FormLabel,
  Grid, Card, Modal, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import validator from 'validator';
import AddHeader from "../Master/AddHeader"
import FatherForm from './FatherForm';
import MotherForm from './MotherForm';
import { GET_MASTER, GET_STUDENT_MASTER, } from "../../redux/action/master/index"
import { connect, useDispatch } from 'react-redux';
import AddFatherDetails from './AddFatherDetails';
import AddMotherdetails from './AddMotherdetails';
import "./index.css"
import "../../style/style.css"
import { ADD_STUDENT, STUDENT_ID, UPLOAD_FILES } from '../../redux/action/student';
import GoBack from '../back/GoBack';
import AddIcon from '@mui/icons-material/Add';
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

const Input = styled('input')({
  display: 'none',
});
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
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  marginRight: "0",
  marginLeft: "0",
  display: "flex",
  alignItems: 'center'
}));
const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "1em"
}));

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

const Studentform = (props) => {

  const { GET_MASTER, GET_STUDENT_MASTER, getStudentMaster, STUDENT_ID, UPLOAD_FILES } = props
  const [photo, setPhoto] = useState("")
  const [birth, setBirth] = useState("")
  const [caste, setCaste] = useState("")
  const [aadharImage, setAadharImage] = useState("")
  const [addperentName, setaddperentName] = useState("")
  const [state, setState] = useState({
    classDegree: null,
    department: null,
    acedemicYear: null,
    boardUniversity: null,
    firstname: "",
    lastname: "",
    date: null,
    dob: null,
    email: "",
    gender: null,
    aadhar: null,
    placeOfBirth: "",
    bloodGroup: "",
    address: "",
    religion: null,
    city: null,
    state: null,
    country: null,
    aadharUpload: ""
  })
  const [dial, setDial] = useState(null);
  const [parentButton, setParentButton] = useState(true)
  const [showFatherForm, setShowFatherForm] = useState(false)
  const [showMotherForm, setShowMotherForm] = useState(false)
  const [fatherButtonColor, setFatherButtonColor] = useState("")
  const [motherButtonColor, setMotherButtonColor] = useState("")
  const [viewsrc, setViewsrc] = useState("")
  const [open, setOpen] = useState(false);
  const { ADD_STUDENT } = props

  const _handleView = (url) => {
    setOpen(true)
    setViewsrc(url)
  }
  const handleClose = () => setOpen(false);

  const _handleaddperentNameForparentsdetails = (perent) => {
    setaddperentName(perent)
    if (perent === "Father") {
      setShowFatherForm(true)
      setShowMotherForm(false)
      setMotherButtonColor("gray")
      setFatherButtonColor("")
    }
    else if (perent === "Mother") {
      setShowMotherForm(true)
      setShowFatherForm(false)
      setMotherButtonColor("")
      setFatherButtonColor("gray")
    }
  }
  const _handlePhotoUpload = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("image", files[0]);
    let res = await UPLOAD_FILES(formData, "fileupload")

    setPhoto(res.uploadPath)
    setState({ ...state, image: res.uploadPath })
  }
  const _handlebirthCerfificate = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("birthCertificate", files[0]);
    let res = await UPLOAD_FILES(formData, "birthcerti")

    setState({ ...state, birthCertificate: res.uploadPath })
    setBirth(res.uploadPath)

  }
  const _handlecastCerfificate = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("castCerfificate", files[0]);
    let res = await UPLOAD_FILES(formData, "castcerti")
    setState({ ...state, castCerfificate: res.uploadPath })
    setCaste(res.uploadPath)
  }
  const _handleAadharcard = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("aadharupload", files[0]);
    let res = await UPLOAD_FILES(formData, "aadharcard")
    setState({ ...state, aadharUpload: res.uploadPath })
    setAadharImage(res.uploadPath)
  }
  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const _handleChange2 = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const _handleSubmit = async (e) => {
    e.preventDefault()

    let paylod = {
      "institutionId": getuserId()?.institutionId,
      ...state,
    }

    if (paylod.classDegree === null) {
      toast.error("Select class", toastCss());
    }
    else if (paylod.department === null) {
      toast.error("Select department", toastCss());
    }
    else if (paylod.acedemicYear === null) {
      toast.error("Select acedemic year", toastCss());
    }
    else if (paylod.boardUniversity === null) {
      toast.error("Select board university", toastCss());
    }
    else if (paylod.firstname === null) {
      toast.error("Enter first name", toastCss());
    }
    else if (paylod.lastname === null) {
      toast.error("Enter last name", toastCss());
    }
    else if (paylod.boardUniversity === null) {
      toast.error("Select board university", toastCss());
    }
    else if (paylod.firstname === "") {
      toast.error("Enter first name", toastCss());
    }
    else if (paylod.lastname === "") {
      toast.error("Enter last name", toastCss());
    }
    else if (paylod.date === null) {
      toast.error("Enter enroll date", toastCss());
    }
    else if (paylod.dob === null) {
      toast.error("Enter dob", toastCss());
    }
    else if (paylod.aadhar === null) {
      toast.error("Enter aadhar number", toastCss());
    }
    else if (paylod.placeOfBirth === "") {
      toast.error("Enter place of birth", toastCss());
    }
    else if (paylod.bloodGroup === "") {
      toast.error("Enter blood group", toastCss());
    }
    else if (paylod.address === "") {
      toast.error("Enter address", toastCss());
    }
    else if (paylod.religion === null) {
      toast.error("Enter religion", toastCss());
    }
    else if (paylod.city === null) {
      toast.error("Enter city", toastCss());
    }
    else if (paylod.state === null) {
      toast.error("Enter state", toastCss());
    }
    else if (paylod.country === null) {
      toast.error("Enter country", toastCss());
    }
    else if (dial === null || dial.length !== 12) {
      toast.error("Enter valid phone number with country code", toastCss());
    }
    else if (!validator.isNumeric(paylod.aadhar) || paylod.aadhar === null) {
      toast.error("Enter valid aadhar number", toastCss());
    }
    else if (!validator.isEmail(paylod.email) || paylod.email === "") {
      toast.error("Enter valid email", toastCss());
    }
    else if (paylod.aadharUpload === "") {
      toast.error("Upload aadhar card", toastCss());
    }
    else {
      paylod.phone = dial.slice(2)
      const studentResult = await ADD_STUDENT(paylod)
      STUDENT_ID(studentResult?.id)
      if (studentResult?.id) {
        setParentButton(false)
      }
    }

  }

  useEffect(() => {
    GET_MASTER()
    GET_STUDENT_MASTER()
  }, [])
  return (
    <>
      <AddHeader
        StyledButton={
          <StyledButton
            color="secondary"
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add Student Application
          </StyledButton>
        }
        ArrowBack={
          <GoBack />
        }
      />
      <Box
        boxShadow={3}
        sx={{
          m: 2,
          backgroundColor: "secondary.lighter",
          p: "1em"
        }}>
        <form
          onSubmit={_handleSubmit}
        >
          <Box
            boxShadow={3}
            sx={{
              mb: 2,
              backgroundColor: "secondary.medum",
            }}
          >
            <StyledDiv>
              <Grid container spacing={2}>
                {getStudentMaster?.ConfigurationalMaster?.map((item, i) => (
                  item.name === "Class/Degree" ? (
                    <Grid item sm={2} md={3} key={i}>
                      <FormGroup>
                        <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                        <StyledSelectInput
                          type="select"
                          name="classDegree"
                          onChange={_handleChange2}
                        >
                          {item?.headerValue !== null && item?.headerValue.map((i) => {
                            return (
                              <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                            )
                          })}
                        </StyledSelectInput>
                      </FormGroup>
                    </Grid>
                  ) : (null)
                ))}
                {getStudentMaster?.ConfigurationalMaster?.map((item, i) => (
                  item.name === "Department/Medium" ? (
                    <Grid item sm={2} md={3} key={i}>
                      <FormGroup>
                        <FormLabel>Department/Medium <span style={{ color: "red" }}>*</span></FormLabel>
                        <StyledSelectInput
                          type="select"
                          name="department"
                          onChange={_handleChange2}
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
                    : (null)
                ))}
                {getStudentMaster?.ConfigurationalMaster?.map((item, i) => (
                  item.name === "Academic year" ? (
                    <Grid item sm={2} md={3} key={i}>
                      <FormGroup>
                        <FormLabel>{item.name}<span style={{ color: "red" }}>*</span></FormLabel>
                        <StyledSelectInput
                          type="select"
                          name="acedemicYear"
                          onChange={_handleChange2}
                        >
                          {item?.headerValue !== null && item?.headerValue.map((i) => {
                            return (
                              <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                            )
                          })}
                        </StyledSelectInput>
                      </FormGroup>
                    </Grid>
                  ) : (null)
                ))}

                {getStudentMaster?.ConfigurationalMaster?.map((item, i) => (
                  item.name === "Board university" ? (
                    <Grid item sm={2} md={3} key={i}>
                      <FormGroup>
                        <FormLabel>Board/University<span style={{ color: "red" }}>*</span></FormLabel>
                        <StyledSelectInput
                          type="select"
                          name="boardUniversity"
                          onChange={_handleChange2}
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
                    : (null)
                ))}
              </Grid>
            </StyledDiv>
          </Box>
          <Grid container spacing={2}>
            <Grid item sm={6} md={10}>
              <Grid
                container spacing={3}>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>First Name <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="firstname"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Last Name <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="lastname"
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Enroll Date (dd/mm/yy) <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="date"
                      name="date" />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Dob (dd/mm/yy) <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="date"
                      name="dob" />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Email <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="email" />
                  </FormGroup>
                </Grid>
                {
                  getStudentMaster?.GenericMaster?.map((item, i) => (

                    item.name === "Gender" ? (
                      <Grid item sm={2} md={4} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                          <StyledSelectInput
                            type="select"
                            name="gender"
                            onChange={_handleChange2}
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
                <Grid item sm={2} md={6}>
                  <FormGroup>
                    <FormLabel>Place of birth <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="placeOfBirth"

                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={6}>
                  <FormGroup>
                    <FormLabel>Blood group <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="bloodGroup"

                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Mobile <span style={{ color: "red" }}>*</span></FormLabel>
                    <PhoneInput
                      country={"in"}
                      style={{width: "100px"}}
                      value={dial}
                      onChange={(dial) => setDial(dial)}
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={4}>
                  <FormGroup>
                    <FormLabel>Aadhaar Number <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="number"
                      name="aadhar"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                      }}
                    />
                  </FormGroup>
                </Grid>
                {
                  getStudentMaster?.GenericMaster?.map((item, i) => (

                    item.name === "Religion" ? (
                      <Grid item sm={2} md={4} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                          <StyledSelectInput
                            type="select"
                            name="religion"
                            onChange={_handleChange2}
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
                      (
                        null
                      )
                  ))
                }
                <Grid item sm={4} md={12}>
                  <FormGroup>
                    <FormLabel>Address <span style={{ color: "red" }}>*</span></FormLabel>
                    <StyledInputBase
                      onChange={_handleChange}
                      required
                      type="text"
                      name="address" />
                  </FormGroup>
                </Grid>
                {
                  getStudentMaster?.GenericMaster?.map((item, i) => (
                    item.name === "City" ? (
                      <Grid item sm={2} md={4} key={i}>
                        <FormGroup>
                          <FormLabel>{item.name} <span style={{ color: "red" }}>*</span></FormLabel>
                          <StyledSelectInput
                            type="select"
                            name="city"
                            onChange={_handleChange2}
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
                            type="select"
                            name="state"
                            onChange={_handleChange2}
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
                            type="select"
                            name="country"
                            onChange={_handleChange2}
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
                {
                  photo !== "" ? (
                    <Card sx={{ borderRadius: 0, }}
                      onClick={() => _handleView(photo)}
                    >
                      <div>
                        <img src={photo} alt='birth certificate' style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                      </div>
                    </Card>
                  ) : <Card sx={{ borderRadius: 0, height: 160, marginTop: "15px" }} >

                  </Card>
                }

                <label htmlFor="contained-button-file">
                  <Input
                    onChange={_handlePhotoUpload}
                    accept="image/*"
                    id="contained-button-file"
                    name="image"
                    type="file"
                  />
                  <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                    Upload
                  </Button>
                </label>
              </div>
            </Grid>
            <Grid item sm={4} md={3}>
              <label
              >
                <Input
                  onChange={_handlebirthCerfificate}
                  accept="image/*"
                  name="birthCertificate"
                  type="file" />
                <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                  Upload birth certificate
                </Button>
              </label>
              {
                birth !== "" ? (

                  <Card sx={{ borderRadius: 0,  marginTop: "15px", cursor: "pointer" }} onClick={() => _handleView(birth)}>
                    <img src={birth} alt='birth certificate' style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </Card>

                ) : null
              }

            </Grid>
            <Grid item sm={4} md={3}>
              <label
              >
                <Input
                  onChange={_handlecastCerfificate}
                  accept="image/*"
                  name="castCerfificate"
                  type="file" />
                <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                  Upload caste certificate
                </Button>
              </label>
              {
                caste !== "" ? (
                  <Card sx={{ borderRadius: 0,  marginTop: "15px", cursor: "pointer" }} onClick={() => _handleView(caste)}>
                    <img src={caste} alt='caste certificate' style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </Card>
                ) : null
              }
            </Grid>
            <Grid item sm={4} md={3}>
              <label
              >
                <Input
                  onChange={_handleAadharcard}
                  accept="image/*"
                  name="aadharUpload"
                  type="file" />
                <Button sx={{ marginTop: 1, width: '100%' }} variant="contained" color='secondary' component="span">
                  Upload aadhar card <span style={{ color: "red", paddingLeft: "5px" }}> *</span>
                </Button>
              </label>
              {
                aadharImage !== "" ? (
                  <Card sx={{ borderRadius: 0,  marginTop: "15px", cursor: "pointer" }} onClick={() => _handleView(aadharImage)}>
                    <img src={aadharImage} alt='aadhar certificate' style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </Card>
                ) : null
              }
            </Grid>
          </Grid>
          <div className='submit-form'>
            <Button
              color={"secondary"}
              variant="contained"
              type="submit"
              className="white-color"
              onClick={_handleSubmit}
            >Submit</Button>
          </div>
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
      <Box className='parent-details'>
        <AddFatherDetails
          _handleaddperentNameForparentsdetails={_handleaddperentNameForparentsdetails}
          buttonShow={parentButton}
          btncolor={fatherButtonColor}
        />
        <AddMotherdetails
          _handleaddperentNameForparentsdetails={_handleaddperentNameForparentsdetails}
          buttonShow={parentButton}
          btncolor={motherButtonColor}
        />
      </Box>

      {
        showFatherForm === true ? (
          <FatherForm
            perent={addperentName}
          />
        ) : null
      }
      {
        showMotherForm === true ? (
          <MotherForm
            perent={addperentName}
          />
        ) : null
      }
    </>
  )
}

const mapStateProps = (state) => {
  return {
    getMasterdata: state.master.getMasterdata,
    getStudentMaster: state.master.getStudentMaster
  }
}

export default connect(mapStateProps, { GET_MASTER, ADD_STUDENT, UPLOAD_FILES, GET_STUDENT_MASTER, STUDENT_ID })(Studentform)
