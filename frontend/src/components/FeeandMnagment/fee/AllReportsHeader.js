import React from 'react'
import AddHeader from '../../Master/AddHeader'
import styled from "@emotion/styled";
import {
  Button, IconButton, Box, Typography,
} from "@mui/material";
import AllReportsTable from "./AllReportsTable"
import GoBack from '../../back/GoBack';

const AllReportsHeader = () => {
  return (
    <div>
      <AddHeader
        StyledButton={
          <Typography variant='h5'>All Reports</Typography>
        }
        ArrowBack={
          <GoBack />
        }
      />
      <AllReportsTable />
    </div>
  )
}
export default AllReportsHeader
