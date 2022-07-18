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
  Input,
} from '@mui/material';
import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EDUCATION } from '../../../redux/action/employee';

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "primary",
  width: "100%",
  borderRadius: "20px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
  },
}));

const Education = (props) => {
  const {
    _handledecriment, state, Addrow, _handleChange } = props

  return (
    <>
      <br />
      <div className='space-between m-1'>
        <Typography color="secondary" variant="h6">Education</Typography>
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
                      College Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Diploma/Degree
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Field of study
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Date of completion
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Additional Notes
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Interest
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Aggregate
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Upload
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
                {state?.education?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.collageName ? item.collageName : ""}
                          onChange={(e) => { _handleChange(e, "education", i) }}
                          name="collageName"
                          type="text" />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.diplomaDegree ? item.diplomaDegree : ""}
                          name="diplomaDegree"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                          type="text" />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.fieldOfStudy ? item.fieldOfStudy : ""}
                          name="fieldOfStudy"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                          type="text" />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          type="date"
                          value={item.dateOfCompletion ? item.dateOfCompletion : ""}
                          name="dateOfCompletion"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.additionalNotes ? item.additionalNotes : ""}
                          name="additionalNotes"
                          type="text"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.interested ? item.interested : ""}
                          name="interested"
                          type="text"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.aggregate ? item.aggregate : ""}
                          name="aggregate"
                          type="text"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          name="file"
                          type="file"
                          onChange={(e) => { _handleChange(e, "education", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox icon={<RemoveCircleIcon color="primary" />}
                          checkedIcon={<RemoveCircleIcon />} onChange={() => {
                            _handledecriment(i, "education")
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
export default connect(null, {})(Education)