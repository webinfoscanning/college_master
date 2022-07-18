import { Button, IconButton, Grid, Typography, Card } from '@mui/material';
import React, { useState, useRef } from 'react'
import AddHeader from "../../components/Master/AddHeader";
import SearchAuto from './SearchAuto';
import StudentDetailsCard from "./StudentDetailsCard"
import AddfeeTable from "./AddfeeTable"
import "../../style/style.css"
import { connect } from 'react-redux';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PrintAdmissionCard from './PrintAdmissionCard';
import GoBack from '../back/GoBack';
import { GET_SEARCH_STUDENT, GET_STUDENT_DETAILS, GET_MAPPED_FEE_STUDENT } from '../../redux/action/admisson';
import moment from 'moment';

const styleObject = {
  printHeader: {
    margin: "20px",
  },
  print: {
    marginLeft: "20px"
  }
}

const AdmissionHeader = (props) => {
  const [selectedValue, setSelectedValue] = useState(null)
  const [AddFeeType, setAddFeeType] = useState(false)
  const { GET_SEARCH_STUDENT, GET_STUDENT_DETAILS, GET_MAPPED_FEE_STUDENT, getMappedFeeStudent } = props
  const [studentDetails, setStudentDetails] = useState([])

  const _handleInputChange = (e, data) => {
    if (e.target.value.length > 3) {
      GET_SEARCH_STUDENT(e.target.value)
    }
  }
  const _handleChnage = async (e, value) => {
    let res = await GET_STUDENT_DETAILS(value?.id)
    setStudentDetails(res)
    GET_MAPPED_FEE_STUDENT(res[0].id)
  }
  const _handleAddFee = () => {
    setAddFeeType(!AddFeeType)
  }

  const inputRef = useRef(null);

  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      let pdf = new jsPDF();
      pdf.setProperties({
        title: "Report"
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.output('dataurlnewwindow');
    });
  };
  return (
    <>
      <AddHeader StyledButton={
        <SearchAuto handleInputChange={_handleInputChange} _handleChnage={_handleChnage} />
      }
        ArrowBack={
          <GoBack />
        } />
      {
        selectedValue !== null ?
          <>
            <PrintAdmissionCard selectedValue={selectedValue}
              // studentDetails={studentDetails}
              studentDetails={studentDetails ? studentDetails : null}
            />
          </>
          :
          <div>
            {studentDetails.length > 0 ? (
              <>
                {
                  studentDetails[0]?.feeMappedId === null ? (
                    <div className="m-1">
                      <StudentDetailsCard
                        details={studentDetails ? studentDetails : null}
                      />
                    </div>
                  ) :
                    studentDetails[0]?.feeMappedId !== null || studentDetails[0]?.feeMappedId !== "" ? (
                      <div className="m-1">
                        TEST print here
                        {
                          getMappedFeeStudent.map((student) => (
                            <div key={student.id} style={{ display: "inline-flex" }}>
                              <div style={{ width: "450px", height: "400px" }}>
                                <div><b>Class/Degree</b>: {student.classDegree?.subHeader}</div>
                                <div><b>Academic Year</b>: {student.acedemicYear.subHeader}</div>
                                <div><b>Gender</b>: {student.gender.subHeader}</div>
                                <div><b>Dob</b>: {moment(student.dob).format("DD-MM-YYYY")}</div>
                                <div><b>Email</b>: {student.email ? student.email : ""}</div>
                                <div><b>Aadhaar Card</b>: {student.aadhar}</div>
                                <div><b>Mother Name</b>: {student.mothername ? student.mothername : null}</div>
                                <div><b>Address</b>: {student.address}</div>
                                <div><b>City</b>: {student.city?.subHeader ? student.city?.subHeader : null}</div>
                                <div><b>Country</b>: {student.country?.subHeader ? student.country?.subHeader : null}</div>
                              </div>
                              <div style={{ width: "450px", height: "400px" }}>2</div>
                              <div style={{ width: "200px", height: "400px" }}>3</div>
                            </div>
                          ))
                        }
                      </div>
                    )
                      : null
                }
                {
                  studentDetails[0]?.feeMappedId === null || studentDetails[0]?.feeMappedId === "" ? (
                    <div className="flex-end mt-1 m-1">
                      <Button
                        color="warning"
                        variant="contained"
                        className="white-color"
                        onClick={_handleAddFee}
                      >Add Fee Type</Button>
                    </div>
                  ) : (
                    <div className="flex-end mt-1 m-1">
                      <Button
                        color="warning"
                        variant="contained"
                        className="white-color"
                        onClick={printDocument}
                      >Print</Button>
                    </div>
                  )
                }

                {
                  AddFeeType ? <div className="m-1">
                    <AddfeeTable studentDetails={studentDetails} setSelectedValue={setSelectedValue} />
                  </div> : null
                }</>
            ) : null

            }
          </div>
      }
      <div
        id="divToPrint2"
        ref={inputRef}
        style={{
          color: "#219f94"
        }}
      >
        <div style={styleObject.printHeader}>Student admission card</div>

        <div style={styleObject.print}><b>Id</b>Test</div>
        {
          getMappedFeeStudent.map((student) => (
            <div key={student.id} style={{ display: "inline-flex" }}>
              <div style={{ width: "450px", height: "400px" }}>
                <div><b>Class/Degree</b>: {student.classDegree?.subHeader}</div>
                <div><b>Academic Year</b>: {student.acedemicYear.subHeader}</div>
                <div><b>Gender</b>: {student.gender.subHeader}</div>
                <div><b>Dob</b>: {moment(student.dob).format("DD-MM-YYYY")}</div>
                <div><b>Email</b>: {student.email ? student.email : ""}</div>
                <div><b>Aadhaar Card</b>: {student.aadhar}</div>
                <div><b>Mother Name</b>: {student.mothername ? student.mothername : null}</div>
                <div><b>Address</b>: {student.address}</div>
                <div><b>City</b>: {student.city?.subHeader ? student.city?.subHeader : null}</div>
                <div><b>Country</b>: {student.country?.subHeader ? student.country?.subHeader : null}</div>
              </div>
              <div style={{ width: "450px", height: "400px" }}>2</div>
              <div style={{ width: "200px", height: "400px" }}>3</div>
            </div>
          ))
        }

      </div>
    </>
  )
}
const mapStateProps = (state) => {
  return {
    AdmissionPrintOpen: state.AdmissionReducer.AdmissionPrintOpen,
    trackMouseClickInAdmistion: state.AdmissionReducer.trackMouseClickInAdmistion,
    searchStudent: state.AdmissionReducer.searchStudent,
    getMappedFeeStudent: state.AdmissionReducer.getMappedFeeStudent
  }
}
export default connect(mapStateProps, { GET_SEARCH_STUDENT, GET_STUDENT_DETAILS, GET_MAPPED_FEE_STUDENT, GET_MAPPED_FEE_STUDENT })(AdmissionHeader)