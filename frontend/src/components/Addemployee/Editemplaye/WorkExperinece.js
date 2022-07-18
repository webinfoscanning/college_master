import styled from '@emotion/styled';
import {
  TableBody, Table,
  TableContainer, TableHead,
  TableRow, Typography, Paper,
  Box,
  TableCell,
  Button,
  TextField,
  Checkbox,
} from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getuserId } from '../../logic/RecomendedFunctions';
const institutionId = getuserId()?.institutionId

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "primary",
  width: "100%",
  borderRadius: "20px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
  },
}));
const WorkExperience = (props) => {
  const {
    Addrow, state, _handledecriment, _handleChange
  } = props
  return (
    <>
      <br />
      <div className='space-between m-1'>
        <Typography color="secondary" variant="h6">Work Experience</Typography>
        <div className='flex-end'>
          <Button color="secondary" variant='contained' size='small' onClick={Addrow}>Add Row</Button>
        </div>
      </div>
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Previous Company Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Job Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      From Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      To Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Job Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Remove
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state?.workexperience?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.preCompName ? item.preCompName : ""}
                          onChange={(e) => { _handleChange(e, "workexperience", i) }}
                          name="preCompName" type="text"
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.jobTitle ? item.jobTitle : ""}
                          onChange={(e) => { _handleChange(e, "workexperience", i) }}
                          name="jobTitle" type="text"

                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.fromDate ? item.fromDate : ""}
                          onChange={(e) => { _handleChange(e, "workexperience", i) }}
                          name="fromDate" type="date" />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.toDate ? item.toDate : ""}
                          onChange={(e) => { _handleChange(e, "workexperience", i) }}
                          name="toDate" type="date" />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.jobDescription ? item.jobDescription : ""}
                          onChange={(e) => { _handleChange(e, "workexperience", i) }}
                          name="jobDescription" type="text" />
                      </TableCell>
                      <TableCell>
                        <Checkbox icon={<RemoveCircleIcon color="primary" />}
                          checkedIcon={<RemoveCircleIcon />} onChange={() => {
                            _handledecriment(i, "workexperience")
                          }} />
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
export default connect(null, {})(WorkExperience)