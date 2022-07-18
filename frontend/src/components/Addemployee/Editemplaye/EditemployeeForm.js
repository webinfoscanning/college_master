import React, {
    useEffect,
    useMemo,
    useState,
} from "react";
import { connect } from "react-redux";
import { Box, Button } from '@mui/material';
import BasicInfo from './BasicInfo';
import Dependent from './Dependent';
import Education from './Education';
import PersnolInfo from './PersonalInfo';
import Summary from './Summary';
import WorkExperience from './WorkExperinece';
import Workinfo from './Workinfo';
import { ADD_EMPLOYEE, GET_EMPLOYEE, EDIT_EMPLOYEE, UPLOAD_FILES } from "../../../redux/action/employee"
import { getuserId, toastCss } from "../../logic/RecomendedFunctions";
import { useParams } from "react-router-dom";
import { GET_EMPLOYEE_MASTER, GET_MASTER } from "../../../redux/action/master";
import moment from "moment";
const institutionId = getuserId()?.institutionId

const EditemployeeForm = (props) => {
    const { id } = useParams()
    const empoleyid = id
    const {
        getMasterdata,
        GET_MASTER,
        GET_EMPLOYEE,
        getEmplyee,
        GET_EMPLOYEE_MASTER,
        addemployeedata,
        getEmployeeMaster,
        UPLOAD_FILES,
        EDIT_EMPLOYEE
    } = props
    const [photo, setPhoto] = useState("")
    const [data, setdata] = useState([])
    const [empdata, setEmpdata] = useState([])
    const [state, setState] = useState({ dateOFExit: "" })

    useEffect(() => {
        GET_MASTER()
        GET_EMPLOYEE_MASTER()
        GET_EMPLOYEE(empoleyid)
    }, [GET_MASTER, GET_EMPLOYEE, GET_EMPLOYEE_MASTER, empoleyid])

    useMemo(() => {
        setdata(getMasterdata)
        setEmpdata(getEmployeeMaster)
        setState({ ...state, ...getEmplyee[0], dateOfJoining:moment(getEmplyee?.dateOfJoining).format("YYYY-MM-DD") })
    }, [data, empdata, getMasterdata, getEmployeeMaster, addemployeedata,])

    const _handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const _handleChangeSelect = (e,) => {
        const { name, value } = e.target
        const data = JSON.parse(value)
        setState({ ...state, [name]: data })
    }
    const _handlePhotoUpload = async (e) => {
        const files = e.target.files;
        var formData = new FormData();
        formData.append("photo", files[0]);
        let res = await UPLOAD_FILES(formData, "fileupload?photo")
        setPhoto(res.uploadPath)
        setState({ ...state, photo: res.uploadPath })
    }

    const _handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            institutionId: institutionId,
            ...state
        }
        payload.workexperience = JSON.stringify(state.workexperience)
        payload.education = JSON.stringify(state.education)
        payload.dependent = JSON.stringify(state.dependent)
        delete payload.id
        delete payload.employeeId
        delete payload.dateOfExit
        delete payload.editedBy
        delete payload.lastEditedOn
        delete payload.createdBy
        delete payload.isDeleted
        delete payload.createdOn
        payload.department = JSON.stringify(state.department)
        payload.location = JSON.stringify(state.location)
        payload.reportingTo = JSON.stringify(state.reportingTo)
        payload.sourceOfHire = JSON.stringify(state.sourceOfHire)
        payload.employeeStatus = JSON.stringify(state.employeeStatus)
        payload.employeeType = JSON.stringify(state.employeeType)
        payload.maritalStatus = JSON.stringify(state.maritalStatus)
        payload.role = JSON.stringify(state.role)
        payload.gender = JSON.stringify(state.gender)
        EDIT_EMPLOYEE(payload, id)
    }
    const _handeleducationAddrow = () => {
        let data = [...state.education]
        let object = {
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
            "preCompName": "",
            "jobTitle": "",
            "fromDate": "",
            "toDate": "",
            "jobDescription": ""
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
        if (name === "image") {
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
            {state !== null ? <>
                <form onSubmit={_handleSubmit}>
                    <BasicInfo
                        state={state}
                        _handleChange={_handleChange}
                        photo={photo}
                        _handlePhotoUpload={_handlePhotoUpload}
                    />
                    <Workinfo state={state} _handleChange={_handleChange} getEmployeeMaster={getEmployeeMaster} _handleChangeSelect={_handleChangeSelect} />
                    <PersnolInfo state={state} _handleChange={_handleChange} getEmployeeMaster={getEmployeeMaster} _handleChangeSelect={_handleChangeSelect} />
                    <Summary state={state} _handleChange={_handleChange} getEmployeeMaster={getEmployeeMaster} _handleChangeSelect={_handleChangeSelect} />
                    <WorkExperience state={state} _handleChange={_handleChangeForaddRows}
                        Addrow={_handelworkexperienceAddrow} _handledecriment={_handledecriment} />
                    <Education state={state} Addrow={_handeleducationAddrow} _handleChange={_handleChangeForaddRows}
                        _handledecriment={_handledecriment}
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
                            >{empoleyid === ":id" ? "Submit" : "Update"}</Button>
                        </div>
                    </div>
                </form></> : null
            }
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
    UPLOAD_FILES,
    EDIT_EMPLOYEE
})(EditemployeeForm)