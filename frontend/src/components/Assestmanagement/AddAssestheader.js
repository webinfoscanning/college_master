import { Button } from '@mui/material'
import React, { useState } from 'react'
import GoBack from '../back/GoBack'
import AddHeader from "../Master/AddHeader"
import AddAssestForm from './AddAssestForm'
import AssestList from './AssestList'
import AddIcon from '@mui/icons-material/Add';

const AddAssestheader = () => {
  const [open, setOpen] = useState(false)
  const _handleOpen = () => {
    setOpen(!open)
  }
  return (
    <div>
      <AddHeader
        StyledButton={<Button
          size='small'
          color='secondary'
          variant='contained'
          onClick={_handleOpen}
          endIcon={<AddIcon/>}
        >Add Asset  </Button>
        }
        ArrowBack={<GoBack />}
      />
      {open ? <AddAssestForm /> : <AssestList />}
    </div>
  )
}

export default AddAssestheader