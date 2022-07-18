import { Table, TableContainer, TableRow, TableBody, TableCell, Checkbox, Typography, TableHead } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { GET_ALL_SUBJECTS } from '../../redux/action/mapsubject';

const EditMapFaculty = (props) => {
  const { GET_ALL_SUBJECTS, getallSubjects, data ,seteditdata,setrow} = props
  const [selectedrow, setselectedrow] = useState({ subHeader: data?.subjectCode })
  useEffect(() => {
    GET_ALL_SUBJECTS()
  }, [GET_ALL_SUBJECTS])

  const _handleChange = (item) => {
    setselectedrow(item?.classId)
    seteditdata(item?.classId)
    setrow(data)
  }
  return (
    <div>
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='h7'>
                    Subject Code
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h7'>
                    Description
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h7'>
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h7'>
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                getallSubjects?.map((item, i) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography variant='h7'>
                          {item?.classId?.subHeader}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h7'>
                          {item?.classId?.subDescrition}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h7'>
                          {moment(item?.classId?.createdDate).format("DD/MM/YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Checkbox checked={selectedrow?.subHeader === item?.classId?.subHeader} onChange={() => { _handleChange(item) }} />
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </div>
  )
}
const mapStateProps = (state) => {
  return {
    getallSubjects: state.Mapsubject.getallSubjects
  }
}
export default connect(mapStateProps, { GET_ALL_SUBJECTS })(EditMapFaculty);
