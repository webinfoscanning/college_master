import { Button, } from '@mui/material';
import React, { useState } from 'react'
import AddHeader from '../Master/AddHeader'
import AddIcon from '@mui/icons-material/Add';
import MapSubjectform from './MapSubjectform';
import GoBack from '../back/GoBack';


const MapAddHeader = () => {
  const [open, setOpen] = useState(false)
  const _handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <AddHeader StyledButton={
        <Button
          color="secondary"
          variant="contained"
          onClick={_handleClick}
        >
          MAP Subjects
          <AddIcon />
        </Button>
      }
        ArrowBack={
          <GoBack />
        } />
      {
        open === true ? (
          <MapSubjectform />
        ) : null
      }
    </div>
  )
}

export default MapAddHeader