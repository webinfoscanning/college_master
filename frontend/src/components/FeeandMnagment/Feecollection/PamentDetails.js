import { useTheme } from '@emotion/react'
import {
  Paper,
  Table, TableCell,
  TableContainer, TableHead,
  TableRow, Box, Typography, TableBody, Button, TablePagination
} from '@mui/material'
import moment from 'moment'
import React from 'react'
import "./../../../style/style.css"

const PamentDetails = (props) => {
  const { paymentDetails } = props
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5'> Payment Details</Typography>
      <Box >
        <Paper>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='h8'>
                      Sl
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='h8'>
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='h8'>
                      Payment Amount
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='h8'>
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='h8'>
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{
                backgroundColor: theme.palette.secondary.light,
              }}>
                {paymentDetails?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align='left'>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h8'>
                          {i + 1}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h8'>
                          {moment(item?.createdDate).format("DD/MM/YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h8'>
                          {item?.subAmount}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h8'>
                          {item?.subDescrition}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          color="warning"
                          variant='contained'
                          className='white-color'
                        >
                          Print Receipt</Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>

  )
}
export default PamentDetails;