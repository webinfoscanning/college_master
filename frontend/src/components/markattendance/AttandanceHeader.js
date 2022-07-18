import React from 'react'
import AddHeader from "../Master/AddHeader"
import GoBack from "../back/GoBack"
import { Typography } from '@mui/material'
import Markattendanceform from './Markattendanceform'
import MarkattandceList from "./MarkattandceList"
const AttandanceHeader = () => {
    return (
        <div>
            <AddHeader
                StyledButton={
                    <Typography color={"secondary"} variant="h6" >Mark Attendance</Typography>
                }
                ArrowBack={<GoBack />}
            />
            <br />
            <Markattendanceform />
            <MarkattandceList/>
        </div>
    )
}

export default AttandanceHeader;