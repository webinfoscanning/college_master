import { useTheme } from '@emotion/react'
import {
  Paper,
  Table, TableCell,
  TableContainer, TableHead,
  TableRow, Box, Typography, TableBody
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./../../../style/style.css"


const PaymentCollection = (props) => {
  const { StudentDetails } = props
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5'>Fees Structure</Typography>
      <Box>
        <Paper>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    Description
                  </TableCell>
                  <TableCell align='left'>
                    Fee
                  </TableCell>
                  <TableCell align='left'>
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{
                backgroundColor: theme.palette.secondary.light,
              }}>
                {
                  StudentDetails[0].feeValue !== null && StudentDetails[0].feeValue?.map((item) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell align='left'>
                            <Typography variant='h8'>
                              {item?.subDescrition}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography variant='h8'>
                              {item?.subHeader}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography variant='h8'>
                              {item?.subAmount}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  })
                }
                <TableRow>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant='h8'>
                      <b>Total</b></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h8'>
                      <b>{StudentDetails[0]?.fee}</b>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>

  )
}

export default PaymentCollection