import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  Paper, Table,
  TableBody, TableCell,
  TableContainer, TableHead,
  TableRow, Typography,
  Box,
  TextField,
  Card,
  Grid
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FEE_COLLECTION } from '../../../redux/action/feestructure'
import "../../../style/style.css"
import { getuserId } from '../../logic/RecomendedFunctions'
import "./index.css"

const StyledInputBase = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    background: theme.palette.common.lighter,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    borderRadius: 4,
  },
  '& .MuiOutlinedInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    }
  }
}))
  ; const FeecollectionFrom = (props) => {
    const { StudentDetails, FEE_COLLECTION ,setpaymentDetails} = props
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
      "idFeeStruMapWithStu": StudentDetails[0]?.admid,
      "stuId": StudentDetails[0]?.stuAppliFormRefId,
      "institutionId": getuserId()?.institutionId,
      "paymentDetails": [{
        userId: getuserId()?.id,
        createdDate: new Date()
      }]
    })
    const _handleChange = (e, i) => {
      const { name, value } = e.target
      let copydata = { ...data }
      copydata["paymentDetails"][i][name] = value
      setData(copydata)
    }
    const _handleSubmit = async () => {
      let array = []
      if (StudentDetails[0]?.paymentDetails?.length > 0) {
        for (var i of StudentDetails[0]?.paymentDetails) {
          array.push(i)
        }
      }
      array.push(data?.paymentDetails[0])
      let payload = await {
        idFeeStruMapWithStu: String(data.idFeeStruMapWithStu),
        stuId: String(data.stuId),
        institutionId: data.institutionId,
        enrolledIn: data.enrolledIn,
        paymentDetails: JSON.stringify(array)
      }
      let res = await FEE_COLLECTION(payload)
      await setpaymentDetails(res?.data)
      await setOpen(false)
    }
    return (
      <>
        <br />
        <Grid container>
          {open === false ? <Grid item sm={12} md={12} lg={12} className='flex-end'>
            <Button
              className='white-color m-1'
              color="warning"
              variant='contained'
              onClick={() => { setOpen(!open) }}
            >
              Collect Fee
            </Button>
          </Grid> : null}
          {open ? <Grid item sm={12} md={7} lg={7} className='flex-end'>
            <div className='flex-end'>
              <Button
                className='white-color m-1'
                color="warning"
                variant='contained'
                onClick={() => { setOpen(!open) }}

              >
                Collect Fee
              </Button>
            </div>
          </Grid> : null}
          <Grid item sm={12} md={7} lg={7} >
            {open ?
              <Box>
                <Paper>
                  <TableContainer>
                    <Table>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align='left'
                            >
                              <Typography variant="h7"
                                color={"secondary"}>
                                Description</Typography>
                            </TableCell>
                            <TableCell
                              align='left'
                            >
                              <Typography variant="h7"
                                color={"secondary"}>
                                Amount</Typography>
                            </TableCell>
                            <TableCell
                              align='left'
                            >
                              <Typography variant="h7"
                                color={"secondary"}>
                                Action</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data?.paymentDetails !== null && data?.paymentDetails?.map((item, i) => {
                            return (
                              <TableRow>
                                <TableCell
                                  align='left'
                                >
                                  <StyledInputBase
                                    name="subDescrition"
                                    type={"text"}
                                    onChange={(e) => { _handleChange(e, i) }}
                                  />
                                </TableCell>
                                <TableCell
                                  align='left'
                                >
                                  <StyledInputBase
                                    name="subAmount"
                                    type={"text"}
                                    onChange={(e) => { _handleChange(e, i) }}
                                  />
                                </TableCell>
                                <TableCell
                                  align='left'
                                >
                                  <Button color='warning'
                                    variant='contained'
                                    className='white-color m-1'
                                    onClick={_handleSubmit}
                                  >Submit</Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box> : null}
          </Grid>
        </Grid>
      </>
    )
  }
export default connect(null, { FEE_COLLECTION })(FeecollectionFrom)
