import { Typography } from '@mui/material'
import React from 'react'
import AddHeader from "./../Master/AddHeader"
import GoBack from "./../back/GoBack"
const AddTimtableheader = () => {
  return (
    <div>
      <AddHeader
        StyledButton={<Typography
          color="secondary"
          variant='h6'
        >Add Timetable</Typography>}
        ArrowBack={<GoBack />}
      />
    </div>
  )
}

export default AddTimtableheader