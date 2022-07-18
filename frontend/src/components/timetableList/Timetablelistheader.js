import { Typography } from '@mui/material'
import React from 'react'
import AddHeader from '../Master/AddHeader'
import GoBack from "../back/GoBack"
const Timetablelistheader = () => {
    return (
        <div>
            <AddHeader StyledButton={<Typography
                color="secondary"
                variant="h6"
            >Class/Degree Timetable
            </Typography>}
                ArrowBack={<GoBack />}
            />
        </div>
    )
}

export default Timetablelistheader