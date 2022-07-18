import { useTheme } from '@emotion/react'
import {
  Table,
  TableBody,
  TableContainer,
  Typography,
  Button,
  Card
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import SearchBar from "../Master/SearchBar"
import Last30Days from './Last30Days'
import Last7days from './Last7days'
import TableHeader from './TableHeader'
import Toadylist from './Todaylist'

const Viweattandancelist = () => {
  const [is7daysor30, setis7daysor30] = useState("today")
  const [variant, setvariant] = useState("outlined")

  const handleClick = (e) => {
    const { name } = e.target
    setis7daysor30(name)
    setvariant("contained")
  }
  return (
    <div>
      <div className='space-between'>
        <div>
          <Button
            color='secondary'
            variant={is7daysor30 === "7days" ? "contained" : "outlined"}
            onClick={handleClick}
            name="7days"
            className='m-1'>
            Last 7 days
          </Button>
          <Button
            color='secondary'
            variant={is7daysor30 === "30days" ? "contained" : "outlined"}
            onClick={handleClick}
            name="30days"
            className='m-1'>
            One Month
          </Button>
        </div>
        <div className='flex-end'>
          <SearchBar />
        </div>
      </div>
      <TableContainer>
        {is7daysor30 === "today" ? <><Table
          size="small"
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0px 10px",
            borderBottom: "red"
          }}>
          <TableHeader
            headLabel={headLabeltoday}
          />
          <TableBody >
            {rows.map((item, i) => {
              return (
                <Fragment key={i}>
                  <Toadylist />
                </Fragment>
              )
            })}
          </TableBody>
        </Table></> : is7daysor30 === "7days" ?
          <><Table
            size="small"
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0px 10px",
              borderBottom: "red"
            }}>
            <TableHeader
              headLabel={headLabel7days}
            />
            <TableBody >
              {rows.map((item, i) => {
                return (
                  <Fragment key={i}>
                    <Last7days />
                  </Fragment>
                )
              })}
            </TableBody>
          </Table></> : <><Table
            size="small"
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0px 10px",
              borderBottom: "red"
            }}>
            <TableHeader
              headLabel={headLabel30days}
            />
            <TableBody >
              {rows.map((item, i) => {
                return (
                  <Fragment key={i}>
                    <Last30Days />
                  </Fragment>
                )
              })}
            </TableBody>
          </Table></>}
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
    </div >
  )
}
export default Viweattandancelist;
const headLabel7days = [
  { id: "RoolNo", label: "Rool No", alignRight: "left" },
  { id: "studentid", label: "Student Id", alignRight: "left" },
  { id: "name", label: "Name", alignRight: "left" },
  { id: "01", label: "01", alignRight: "left" },
  { id: "", label: "02", alignRight: "left" },
  { id: "", label: "03", alignRight: "left" },
  { id: "", label: "04", alignRight: "left" },
  { id: "", label: "05", alignRight: "left" },
  { id: "", label: "06", alignRight: "left" },
  { id: "", label: "07", alignRight: "left" },
];
const headLabeltoday = [
  { id: "RoolNo", label: "Rool No", alignRight: "left" },
  { id: "studentid", label: "Student Id", alignRight: "left" },
  { id: "name", label: "Name", alignRight: "left" },
  { id: "Toady", label: "Toady", alignRight: "left" },
];
const headLabel30days = [
  { id: "RoolNo", label: "Rool No", alignRight: "left" },
  { id: "studentid", label: "Student Id", alignRight: "left" },
  { id: "name", label: "Name", alignRight: "left" },
  { id: "01", label: "01", alignRight: "left" },
  { id: "", label: "02", alignRight: "left" },
  { id: "", label: "03", alignRight: "left" },
  { id: "", label: "04", alignRight: "left" },
  { id: "", label: "05", alignRight: "left" },
  { id: "", label: "06", alignRight: "left" },
  { id: "", label: "07", alignRight: "left" },
  { id: "", label: "08", alignRight: "left" },
  { id: "", label: "09", alignRight: "left" },
  { id: "", label: "10", alignRight: "left" },
  { id: "", label: "11", alignRight: "left" },
  { id: "", label: "12", alignRight: "left" },
  { id: "", label: "13", alignRight: "left" },
  { id: "", label: "14", alignRight: "left" },
  { id: "", label: "15", alignRight: "left" },
  { id: "", label: "16", alignRight: "left" },
  { id: "", label: "17", alignRight: "left" },
  { id: "", label: "18", alignRight: "left" },
  { id: "", label: "19", alignRight: "left" },
  { id: "", label: "20", alignRight: "left" },
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