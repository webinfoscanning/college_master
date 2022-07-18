import { Typography, Input } from '@mui/material'
import React, { useState } from 'react'
import GoBack from '../back/GoBack'
import AddHeader from '../Master/AddHeader'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import MapsubjetfacultyList from './MapsubjetfacultyList';
import MapsubjectToFaculty from "./MapsubjectToFaculty"

const Header = ({ setopenHeaderOrTable, openHeaderOrTable }) => {
  const _handleChange = (e) => {
    const { name, value } = e.target
    setopenHeaderOrTable(value)

  }
  return (
    <div>
      <div>
        <FormControl>
          <FormLabel id="map faculty">
            <Typography
              variant='h6'
              color={"secondary"}
            >MAP Faculty To Subjects
            </Typography>
          </FormLabel>
          <RadioGroup
            row
            name="radio-buttons-group"
            value={openHeaderOrTable}
          >
            <FormControlLabel
              value="Subject-Faculty Not Mapped"
              onChange={_handleChange}
              control={<Radio />}
              label={<Typography>Subject-Faculty Not Mapped</Typography>} />
            <FormControlLabel
              value="Subject-Faculty Mapped"
              control={<Radio />}
              onChange={_handleChange}
              label={<Typography>Subject-Faculty Mapped</Typography>} />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  )
}
const MapsubjetfacultyHeader = () => {
  const [openHeaderOrTable, setopenHeaderOrTable] = useState("Subject-Faculty Mapped")
  return (
    <div>
      <AddHeader StyledButton={
        <Header setopenHeaderOrTable={setopenHeaderOrTable} openHeaderOrTable={openHeaderOrTable} />}
        ArrowBack={
          < GoBack />
        } />
      <br />
      {openHeaderOrTable === "Subject-Faculty Mapped" ? <>
        <MapsubjetfacultyList />
      </> : <>
        <MapsubjectToFaculty />
      </>}
    </div>
  )
}
export default MapsubjetfacultyHeader