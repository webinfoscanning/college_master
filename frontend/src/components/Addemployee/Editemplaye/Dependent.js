import {
  TableBody, Table,
  TableContainer, TableHead,
  TableRow, Typography, Paper,
  Box,
  TableCell,
  Button,
  Checkbox,
  TextField
} from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from '@emotion/styled';
const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "primary",
  width: "100%",
  borderRadius: "20px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
  },
}));

const Dependent = (props) => {
  const {
    _handledecriment, Addrow, state, _handleChange
  } = props

  return (
    <>
      <br />
      <div className='space-between m-1'>
        <Typography color="secondary" variant="h6">Dependent</Typography>
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
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Relationship
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"secondary"} variant="h6">
                      Date of Birth
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
                {state?.dependent?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.name ? item.name : ""}
                          name="name"
                          type="text"
                          onChange={(e) => { _handleChange(e, "dependent", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.relationship ? item.relationship : ""}
                          name="relationship"
                          type="text"
                          onChange={(e) => { _handleChange(e, "dependent", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledTextField
                          required
                          value={item.dob ? item.dob : ""}
                          name="dob"
                          type="date"
                          onChange={(e) => { _handleChange(e, "dependent", i) }}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox icon={<RemoveCircleIcon color="primary" />}
                          checkedIcon={<RemoveCircleIcon />} onChange={() => {
                            _handledecriment(i, "dependent")
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
export default connect(null, {})(Dependent)