import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { connect } from "react-redux";
import { useTheme } from "@emotion/react";
import { Box, Button } from '@mui/material';
import "../../style/style.css"
import BasicInfo from './BasicInfo';
import Dependent from './Dependent';
import Education from './Education';
import PersnolInfo from './PersonalInfo';
import Summary from './Summary';
import WorkExperience from './WorkExperinece';
import Workinfo from './Workinfo';
import "./../../style/style.css"
import { toast } from 'react-toastify';
import { toastCss } from "../../components/logic/RecomendedFunctions"
import { GET_MASTER, GET_EMPLOYEE_MASTER } from "../../redux/action/master"
import {
  ADD_EMPLOYEE, GET_EMPLOYEE,
  UPLOAD_FILES
} from "../../redux/action/employee"
import { getuserId } from "../logic/RecomendedFunctions";
import { useParams } from "react-router-dom";
const institutionId = getuserId()?.institutionId

const AddemployeForm = (props) => {
  // const { id } = useParams()
  // const empoleyid = id
  const {
    getMasterdata,
    GET_MASTER,
    GET_EMPLOYEE,
    getEmplyee,
    ADD_EMPLOYEE,
    GET_EMPLOYEE_MASTER,
    addemployeedata,
    getEmployeeMaster,
    UPLOAD_FILES
  } = props


  const [photo, setPhoto] = useState("")
  const [data, setdata] = useState([])
  const [empdata, setEmpdata] = useState([])
  const [state, setState] = useState({
    institutionId: institutionId,
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    department: "",
    location: "",
    title: "",
    reportingTo: "",
    sourceOfHire: "",
    dateOfJoining: "",
    seatingLocation: "",
    employeeStatus: "",
    workPhone: "",
    employeeType: "",
    extension: "",
    role: "",
    panNo: "",
    dob: "",
    personalAddress: "",
    residentialAddress: "",
    maritalStatus: "",
    jobDescription: "",
    summaryAddress: "",
    aboutMe: "",
    gender: "",
    workexperience: [],
    education: [],
    dependent: [],
    workingHours: "10:00 AM to 4:00 PM"
  })
  useEffect(() => {
    GET_MASTER()
    GET_EMPLOYEE_MASTER()
  }, [GET_MASTER, GET_EMPLOYEE_MASTER])

  useMemo(() => {
    setdata(getMasterdata)
    setEmpdata(getEmployeeMaster)
  }, [data, empdata, getMasterdata, getEmployeeMaster, addemployeedata,])

  const _handleChange = (e) => {
    const { name, value } = e.target

    setState({ ...state, [name]: value })
  }

  const _handlePhotoUpload = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("photo", files[0]);
    let res = await UPLOAD_FILES(formData, "fileupload")

    setPhoto(res.uploadPath)
    setState({ ...state, photo: res.uploadPath })
  }

  const _handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      institutionId: institutionId,
      ...state
    }
    payload.workexperience = JSON.stringify([...state.workexperience])
    payload.education = JSON.stringify([...state.education])
    payload.dependent = JSON.stringify([...state.dependent])
    await ADD_EMPLOYEE(payload)

  }
  const _handeleducationAddrow = () => {
    let data = [...state.education]
    let object = {
      "empRefId": "",
      "collageName": "",
      "diplomaDegree": "",
      "fieldOfStudy": "",
      "dateOfCompletion": "",
      "additionalNotes": "",
      "interested": "",
      "aggregate": "",
      "file": ""
    }
    data.push(object)
    setState({
      ...state, education: [...data]
    })
  }
  const _handelworkexperienceAddrow = () => {
    let data = [...state.workexperience]
    let object = {
      preCompName: "",
      jobTitle: "",
      fromDate: "",
      toDate: "",
      jobDescription: ""
    }

    data.push(object)
    setState({
      ...state, workexperience: [...data]
    })
  }
  const _handeldependentAddrow = () => {
    let data = [...state.dependent]
    let object = {
      "name": "",
      "relationship": "",
      "dob": ""
    }
    data.push(object)
    setState({
      ...state, dependent: [...data]
    })
  }
  const _handledecriment = (i, name) => {
    let data = [...state[name]]
    data.splice(i, 1);
    setState({
      ...state, [name]: [...data]
    })
  }
  const _handleChangeForaddRows = async (e, keyname, i) => {
    const { name, value } = e.target

    if (name === "file") {
      const files = e.target.files;

      var formData = new FormData();
      formData.append("photo", files[0]);
      let res = await UPLOAD_FILES(formData, "fileupload")

      let data = [...state[keyname]]
      data[i][name] = res.uploadPath
      setState({ ...state, [keyname]: data })
    }
    else {
      let data = [...state[keyname]]
      data[i][name] = value
      setState({ ...state, [keyname]: data })
    }

  }
  return (
    <Box sx={{ boxShadow: 2, padding: 1 }}>
      <form onSubmit={_handleSubmit}>
        <BasicInfo
          state={state}
          _handleChange={_handleChange}
          photo={photo}
          _handlePhotoUpload={_handlePhotoUpload}
        />
        <Workinfo state={state} _handleChange={_handleChange} getEmployeeMaster={getEmployeeMaster} />
        <PersnolInfo state={state} _handleChange={_handleChange} getEmployeeMaster={getEmployeeMaster} />
        <Summary state={state} _handleChange={_handleChange} getEmployeeMaster={getEmployeeMaster} />
        <WorkExperience state={state} _handleChange={_handleChangeForaddRows} Addrow={_handelworkexperienceAddrow} _handledecriment={_handledecriment} />
        <Education state={state} Addrow={_handeleducationAddrow} _handleChange={_handleChangeForaddRows} _handledecriment={_handledecriment}
        />
        <Dependent state={state} Addrow={_handeldependentAddrow}
          _handleChange={_handleChangeForaddRows} _handledecriment={_handledecriment} />
        <div className='flex-end m-1'>
          <div>
            <Button
              color='secondary'
              variant='contained'
              className='fullWidht'
              type="submit"
            >Submit</Button>
          </div>
        </div>
      </form>
    </Box >
  )
}
const mapStateprops = (state) => {
  return {
    getMasterdata: state.master.getMasterdata,
    getEmployeeMaster: state.master.getEmployeeMaster,
    getemployeelist: state.Employee.getemployeelist,
    getEmplyee: state.Employee.getEmplyee,
  }
}
export default connect(mapStateprops, {
  GET_MASTER, ADD_EMPLOYEE,
  GET_EMPLOYEE_MASTER,
  GET_EMPLOYEE,
  UPLOAD_FILES
})(AddemployeForm)