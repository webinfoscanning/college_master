import styled from '@emotion/styled'
import { Card, Grid, Typography, Modal, Box, } from '@mui/material'
import React, { useState } from 'react'
import "./index.css"
import "../../../style/style.css"
import moment from 'moment'
import defalutimage from "../../../assets/images/default.jpg"
import { connect } from 'react-redux'
const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white
}))
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

function StudentDetailsCard(props) {
  const { StudentDetails } = props
  const [viewsrc, setViewsrc] = useState("")
  const [open, setOpen] = useState(false);

  const _handleView = (url) => {
    setOpen(true)
    setViewsrc(url)
  }
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography variant='h5'>Student Details</Typography>
      <StyledCard className='student-card p-1' >
        <div key={StudentDetails[0]?.id}>
          <StyledCard>
            <Grid container spacing={1}>
              <Grid item sm={5} md={5}>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Class/Degree</b>: {StudentDetails[0]?.classDegree?.subHeader}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Academic Year</b>: {StudentDetails[0]?.acedemicYear.subHeader}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Gender</b>: {StudentDetails[0]?.gender.subHeader}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Dob</b>: {moment(StudentDetails[0]?.dob).format("DD-MM-YYYY")}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Email</b>: {StudentDetails[0]?.email ? StudentDetails[0]?.email : ""}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Aadhaar Card</b>: {StudentDetails[0]?.aadhar}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Mother Name</b>: {StudentDetails[0]?.mothername ? StudentDetails[0]?.mothername : null}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Address</b>: {StudentDetails[0]?.address}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>City</b>: {StudentDetails[0]?.city?.subHeader ? StudentDetails[0]?.city?.subHeader : null}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Country</b>: {StudentDetails[0]?.country?.subHeader ? StudentDetails[0]?.country?.subHeader : null}
                  </Typography>
                </div>
              </Grid>
              <Grid item sm={5} md={5}>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Department</b>: {StudentDetails[0]?.department?.subHeader ? StudentDetails[0]?.department?.subHeader : null}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Student Name</b>: {StudentDetails[0]?.firstname ? StudentDetails[0]?.firstname : null}
                    &nbsp;&nbsp;{StudentDetails[0]?.lastname ? StudentDetails[0]?.lastname : null}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Addmission ID</b>: {StudentDetails[0]?.admid}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Student ID</b>: {StudentDetails[0]?.stuAppliFormRefId}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Mobile</b>: {StudentDetails[0]?.phone ? StudentDetails[0]?.phone : null}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Religion</b>: {StudentDetails[0]?.religion?.subHeader ? StudentDetails[0]?.religion?.subHeader : null}
                  </Typography>
                </div>
                <div className="m-1">
                  <Typography
                    variant="h7"
                  >
                    <b>Father Name</b>: {StudentDetails[0]?.fathername ? StudentDetails[0]?.fathername : null}
                  </Typography>
                </div>
              </Grid>
              <Grid item sm={2} md={2} className='flex-end'>
                <Card sx={{ borderRadius: 0, height: "100px" }} >
                  <div className='profile-card' onClick={()=>{_handleView(StudentDetails[0]?.image )}}>
                    <img className='object-fit' src={StudentDetails[0]?.image || defalutimage} alt="parents" />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </StyledCard>
        </div>
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
      </StyledCard></>
  )
}
const mapStateprops = (state) => {
  return {
  }
}
export default connect(mapStateprops, null)(StudentDetailsCard)