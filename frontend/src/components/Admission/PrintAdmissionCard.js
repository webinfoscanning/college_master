import styled from '@emotion/styled'
import { Box, Button, Card, Dialog, DialogContent, Modal, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import "./../../style/style.css"
import defalutimage from "../../assets/images/default.jpg"
import Pdf_Doc from './Pdf_Doc'
import { connect } from "react-redux"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { GET_MAPPED_FEE_STUDENT } from '../../redux/action/admisson';
import StudentDetailsCard from './StudentDetailsCard'
import { lightGreen } from '@mui/material/colors'
const StyledCard = styled(Card)(({ theme }) => ({
  height: "200px",
  width: "50%",
  background: theme.palette.primary.main
}));
const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  color: theme.palette.warning.main
}));

const styleObject = {
  printHeader: {
    margin: "20px",
  },
  print: {
    marginLeft: "20px"
  }
}

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

const PrintAdmissionCard = (props) => {
  const [viewsrc, setViewsrc] = useState("")
  const [open, setOpen] = useState(false);
  const {
    selectedValue,
    studentDetails,
    getMappedFeeStudent,
    GET_MAPPED_FEE_STUDENT
  } = props

  useEffect(() => {
    GET_MAPPED_FEE_STUDENT(studentDetails[0]?.id)
  }, [GET_MAPPED_FEE_STUDENT])

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

  const _handleView = (url) => {
    setOpen(true)
    setViewsrc(url)
  }
  const handleClose = () => setOpen(false);
  return (
    <div>
      <br />
      <StyledCard>
        <div className='space-between'>
          <div className='m-1'>
            <Typography color="secondary.contrastText">
              <b>Addmission ID : </b>{selectedValue?.id}</Typography>
            <StyledButton
              color='inherit'

              onClick={printDocument}
            >Print Addmission Card</StyledButton>
            {
              getMappedFeeStudent?.map((student) => (
                <div
                  id="divToPrint"
                  ref={inputRef}
                  style={{
                    color: "#219f94"
                  }}
                >
                  <div style={styleObject.printHeader}>Student admission card</div>
                  {
                    student?.image === "" ? (
                      null
                    ) : (
                      <div style={styleObject.print}>
                        <img className='object-fit' src={student?.image} alt="Student image" />
                      </div>
                    )
                  }

                  <div style={styleObject.print}><b>Id</b>: {student?.id}</div>
                  <div style={styleObject.print}><b>First name</b>: {student?.firstname}</div>
                  <div style={styleObject.print}><b>Last name</b>: {student?.lastname}</div>
                  <div style={styleObject.print}><b>Father name</b>: {student?.fathername}</div>
                  <div style={styleObject.print}><b>Mother name</b>: {student?.mothername}</div>
                  <div style={styleObject.print}><b>Dob</b>: {student?.dob}</div>
                  <div style={styleObject.print}><b>Email</b>: {student?.email}</div>
                  <div style={styleObject.print}><b>Phone</b>: {student?.phone}</div>
                  <div style={styleObject.print}><b>Gender</b>: {student?.gender.subHeader}</div>
                  <div style={styleObject.print}><b>Aadhar no.</b>: {student?.aadhar}</div>
                  <div style={styleObject.print}><b>Blood group</b>: {student?.bloodGroup}</div>
                  <div style={styleObject.print}><b>Address</b>: {student?.address}</div>
                  <div style={styleObject.print}><b>Class degree</b>: {student?.classDegree.subHeader}</div>
                  <div style={styleObject.print}><b>Department</b>: {student?.department.subHeader}</div>
                  <div style={styleObject.print}><b>Academic year</b>: {student?.acedemicYear.subHeader}</div>
                  <div style={styleObject.print}><b>Board university</b>: {student?.boardUniversity.subHeader}</div>
                  <div style={styleObject.print}><b>Fee</b>: {student?.fee}</div>
                  <div style={styleObject.print}><b>Fee type</b>: {student?.feeType?.subHeader}</div>
                  <div style={styleObject.print}><b>State</b>: {student?.state.subHeader}</div>
                </div>
              ))
            }
          </div>
          <div className='m-1'>
            <Card
              className='profile-card'
              onClick={() => _handleView(studentDetails[0]?.image !== null ? studentDetails[0]?.image : defalutimage)}
              sx={{ pointer: "cursor" }}
            >
              <img className='object-fit' src={studentDetails[0]?.image !== null ? studentDetails[0]?.image : defalutimage} alt={studentDetails[0]?.image} />
            </Card>
          </div>
        </div>
      </StyledCard>

      <Dialog open={open}
        onClose={() => setOpen(false)}
      >

        <DialogContent>

          {/* <Pdf_Doc
            studentDetails={studentDetails ? studentDetails : null}

          /> */}
        </DialogContent>

      </Dialog>
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
    </div>
  )
}

const mapStateProps = (state) => {
  return {
    getMappedFeeStudent: state.AdmissionReducer.getMappedFeeStudent
  }
}

export default connect(mapStateProps, {
  GET_MAPPED_FEE_STUDENT
})(PrintAdmissionCard);