import { Chip, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import moment from 'moment';
import Dayslots from './Dayslots';
import Timeslots from './Timeslots';


const TimetableBody = () => {



    return (
        <TableRow>

            <TableCell>
                <Timeslots />
            </TableCell>
            <TableCell >
                <Dayslots />
            </TableCell>
            <TableCell>
                <Dayslots />
            </TableCell>
            <TableCell>
                <Dayslots />
            </TableCell>
            <TableCell>
                <Dayslots />
            </TableCell>
            <TableCell>
                <Dayslots />
            </TableCell>
            <TableCell>
                <Dayslots />
            </TableCell>
        </TableRow>
    )
}

export default TimetableBody