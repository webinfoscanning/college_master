import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import AddHeader from '../../Master/AddHeader';
import SearchForStudent from './SearchForStudent';
import FeecollectionFrom from './FeecollectionFrom';
import StudentDetailsCard from './StudentDetailsCard';
import PaymentCollection from './PaymentCollection';
import PamentDetails from './PamentDetails';
import GoBack from '../../back/GoBack';

const FeecollectionHeader = () => {
  const [data, setData] = useState([])
  const [paymentDetails, setpaymentDetails] = useState({})
  return (
    <>
      <AddHeader
        StyledButton={
          <Typography variant='h5'>Fee Collection</Typography>}
        ArrowBack={
          <GoBack />
        }

      />
      <SearchForStudent setData={setData} setpaymentDetails={setpaymentDetails} />
      {
        data.length > 0 &&
        <>
          <FeecollectionFrom StudentDetails={data} />
          <br />
          <Grid container spacing={2}>
            <Grid item sm={12} md={7} lg={7}>
              <StudentDetailsCard StudentDetails={data} />
            </Grid>
            <Grid item sm={12} md={5} lg={5}>
              <PaymentCollection StudentDetails={data} />
            </Grid>
            <Grid item sm={12} md={7} lg={7}>
              <PamentDetails paymentDetails={paymentDetails} />
            </Grid>
          </Grid></>
      }
    </>
  )
}

export default FeecollectionHeader