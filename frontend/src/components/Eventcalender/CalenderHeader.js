import styled from '@emotion/styled'
import { TableBody, Table, TableRow, Typography, TableCell, TableHead, TableContainer } from '@mui/material'
import React, { useMemo, useState } from 'react'
import TimetableBody from './TimetableBody'
const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const GetColoumns = (item) => {
    return (
        <Typography color={"secondary"} variant="h6">{item}</Typography>
    )
}
const CalenderHeader = () => {
    const [day, setdays] = useState()

    useMemo(() => {
        setdays(columns)
    }, [setdays, columns])
    return (
        <>
            <table className='fullWidht'>
                <tr>
                    <td width="100" align="center" height="50" >
                        <Typography color={"secondary"} variant="h6">Time</Typography>
                    </td>
                    {columns.map((item, i) => {
                        return (
                            <td key={i} width="100" align="center" height="50" >
                                <b>{GetColoumns(item)}</b>
                            </td>
                        )
                    })
                    }
                </tr>
                <TimetableBody />
            </table>
        </>
    )
}

export default CalenderHeader