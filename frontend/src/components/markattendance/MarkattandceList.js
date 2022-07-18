import { useTheme } from '@emotion/react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  Typography,
  Button,
  Card
} from '@mui/material'
import React, { Fragment } from 'react'
import SearchBar from "../Master/SearchBar"
import TableHeader from '../Table/TableHeader'

const MarkattandceList = () => {
  const theme = useTheme()
  return (
    <div>
      <div className='flex-end'>
        <SearchBar />
      </div>
      <TableContainer>
        <Table
          size="small"
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0px 10px",
            borderBottom: "red"
          }}>
          <TableHeader
            headLabel={headLabel}
            order={""}
            orderBy={""}
            createSortHandler={() => { }}
          />
          <TableBody >
            {rows.map((item, i) => {
              return (
                <Fragment key={i}>
                  <TableRow
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                    }}
                    colSpan={12}
                    hover
                    scope="row"
                    component={
                      "th"
                    }>
                    <TableCell />
                    <TableCell align='left'>
                      <Checkbox checked color='secondary' />
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='h7'>
                        {item?.roolno}
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='h7'>
                        {item?.studentid}
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='h7'>
                        {item?.name}
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Checkbox checked color='secondary' />
                    </TableCell>
                    <TableCell align='left'>
                      <Checkbox checked color='secondary' />
                    </TableCell>
                    <TableCell align='left'>
                      <Checkbox checked color='secondary' />
                    </TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
        <div>
          <Button color='secondary' variant='contained'>
            Submit
          </Button>
          <div className='flex-end'>
            <Typography variant='h5'> Number of</Typography>
            <Card sx={{ height: "2em", width: "4em" }}>
              <div className='item-center'>
                <Typography variant='h5'>10</Typography>
              </div>
            </Card>
          </div>
        </div>
      </TableContainer>
    </div>
  )
}
export default MarkattandceList
const headLabel = [
  { id: "todayAttendance", label: "Today Attendance", alignRight: "left" },
  { id: "roolno", label: "Rool No", alignRight: "left" },
  { id: "studentid", label: "Student Id", alignRight: "left" },
  { id: "name", label: "Name", alignRight: "left" },
  { id: "Yestarday", label: "Yestarday", alignRight: "left" },
  { id: "Day Before Yestarday", label: "Day Before Yestarday", alignRight: "left" },
  { id: "2 Days Before ", label: "Day Before ", alignRight: "left" },
];
const rows = [{
  roolno: "1",
  studentid: "111",
  name: "shireen",

},
{
  roolno: "1",
  studentid: "111",
  name: "shireen",
},
{
  roolno: "1",
  studentid: "111",
  name: "shireen",
}]