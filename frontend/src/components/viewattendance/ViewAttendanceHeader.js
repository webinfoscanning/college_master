import React from 'react'
import AddHeader from "../Master/AddHeader"
import GoBack from "../back/GoBack"
import { Typography } from '@mui/material'
import ViewAttendanceform from './ViewAttendanceform'
import Viweattandancelist from './Viweattandancelist'
const ViewAttendanceHeader = () => {
  return (
    <div>
      <AddHeader
        StyledButton={
          <Typography color={"secondary"} variant="h6" >View Attendance</Typography>
        }
        ArrowBack={<GoBack />}
      />
      <br />
      <ViewAttendanceform />
      <br />
      <Viweattandancelist />
    </div>
  )
}

export default ViewAttendanceHeader;