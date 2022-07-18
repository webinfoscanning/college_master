import React from 'react'
import AddHeader from '../../Master/AddHeader'
import {
  Typography,
} from "@mui/material";
import { useParams } from 'react-router-dom';
import FeeReportTable from './FeeReportTable';
import GoBack from '../../back/GoBack';

const ViewfeeReport = () => {
  const { id } = useParams()
  return (
    <div>
      <AddHeader
        StyledButton={
          <Typography variant='h5'>{id}</Typography>
        }
        ArrowBack={
          <GoBack />
        }
      />
      <FeeReportTable />
    </div>
  )
}
export default ViewfeeReport
