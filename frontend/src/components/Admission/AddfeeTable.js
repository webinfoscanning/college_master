import {
  Paper, Table,
  TableContainer,
  Box, TableBody, TableRow,
  TableCell, Typography,
  Checkbox,
  Button,
  Select,
  MenuItem
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import { useTheme } from '@emotion/react';
import {
  GET_FEE_STRUCTURE_ADMISSION,
  MAP_STUDENT_APPLICATION_FOR_ADDMISION,
} from '../../redux/action/admisson';
import { connect } from 'react-redux';
import { getuserId } from '../logic/RecomendedFunctions';
import styled from '@emotion/styled';
const StyledSelectInput = styled(Select)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    background: theme.palette.common.lighter,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100px",
    },
    borderRadius: 0,
  },
}));
const AddfeeTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selectedRow, setselectedRow] = React.useState(null)
  const [data, setdata] = useState(null)
  const theme = useTheme()
  const {
    setSelectedValue,
    MAP_STUDENT_APPLICATION_FOR_ADDMISION,
    studentDetails,
    getFeeStructureAddmission, GET_FEE_STRUCTURE_ADMISSION
  } = props
  const createSortHandler = (property) => (event) => {
    _handleRequestSort(event, property);
  };
  const _handleSelectItemChange = (row) => {
    if (selectedRow?.feeStruRefId === String(row?.id)) {
      setselectedRow(null)
    } else {
      let data = {
        institutionId: getuserId()?.institutionId,
        stuAppliFormRefId: String(studentDetails[0]?.id),
        feeStruRefId: String(row?.id)
      }
      setselectedRow(data)
    }
  }
  const _handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const _handleOpenSubmit = async () => {
    let payload = { ...selectedRow }
    payload.stuSection = data
    let res = await MAP_STUDENT_APPLICATION_FOR_ADDMISION(payload)
    await setSelectedValue(res)
  }

  useEffect(() => {
    GET_FEE_STRUCTURE_ADMISSION(studentDetails[0]?.id)
  }, [GET_FEE_STRUCTURE_ADMISSION])
  return (
    <>
      <Box>
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHeader createSortHandler={createSortHandler}
                headLabel={headLabel}
                order={order}
                orderBy={orderBy}
                action={true}
              />
              <TableBody sx={{ background: theme.palette.secondary.light }}>
                {getFeeStructureAddmission?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align='left' />
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.id}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.feeType?.subHeader}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.fee}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.academicYear?.subHeader}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <StyledSelectInput
                          onChange={(e) => { setdata(e.target.value) }}>
                          {
                            item?.sectionjson !== null && item?.sectionjson?.map((i) => {
                              return (
                                <MenuItem value={JSON.stringify(i)} >{i?.subHeader}</MenuItem>
                              )
                            })
                          }
                        </StyledSelectInput>
                      </TableCell>
                      <TableCell align='left'>
                        <Checkbox
                          checked={selectedRow?.feeStruRefId === String(item?.id) ? true : false}
                          onChange={() => { _handleSelectItemChange(item) }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {
            selectedRow ? <div className='flex-end m-1'>
              <Button
                color="warning"
                variant="contained"
                className="white-color"
                onClick={_handleOpenSubmit}
              >
                Submit
              </Button>
            </div> : null
          }
          <br />
        </Paper>
      </Box>
    </>
  )
}
const mapStateProps = (state) => {
  return {
    getFeeStructureAddmission: state.AdmissionReducer.getFeeStructureAddmission,
    getMasterdata: state.master.getMasterdata
  }
}
export default connect(mapStateProps, {
  GET_FEE_STRUCTURE_ADMISSION,
  MAP_STUDENT_APPLICATION_FOR_ADDMISION
})(AddfeeTable);

const headLabel = [
  { id: "feeid", label: "Fee Id", alignRight: "left" },
  { id: "feeType", label: "Fee Type", alignRight: "left" },
  { id: "totalamount", label: "Amount Total", alignRight: "left" },
  { id: "acadmicyear", label: "Academic Year", alignRight: "left" },
  { id: "section", label: "Section", alignRight: "left" },

];