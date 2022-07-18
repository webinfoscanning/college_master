import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow, TextField, Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {
  ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT,
  ADD_MAP_SUBJECT_HEADER,
  GET_MAP_SUBJECT_HEADER
} from '../../redux/action/mapsubject';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./../../style/style.css"
import { toast } from 'react-toastify';
import { getuserId, toastCss } from '../logic/RecomendedFunctions';
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));
const CollapsInput = (props) => {
  const {
    arrayofincrementdecrementMapsubject,
    ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT,
    ADD_MAP_SUBJECT_HEADER,
    row
  } = props
  const theme = useTheme()
  const [data, setdata] = React.useState([])
  const _handleDecrement = async (i) => {
    let copyofArray = [...data]
    copyofArray.splice(i, 1);
    await setdata(copyofArray)
    await ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT(copyofArray)
  }
  const _handleChange = async (e, i) => {
    const { name, value } = e.target
    const array = [...data]
    array[i][name] = value
    array[i]["rowrefid"] = row.id
    array[i]["institutionId"] = row.institutionId
    await setdata(array)
    await ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT(array)
  }
  const _handleSubmit = () => {
    const array = [...data]
    let isVlaid = true
    for (var i of array) {
      if (i.subHeader === "" || i.subDescrition === "") {
        isVlaid = false
        break
      }
    }
    if (isVlaid === false) {
      toast.error("Please fill all required fields ", toastCss())
    }
    else {
      let payload = { subjectDetails: JSON.stringify(array), institutionId: getuserId()?.institutionId }
      ADD_MAP_SUBJECT_HEADER(payload, row.id)
      ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT([])
    }
  }
  React.useMemo(() =>
    setdata([...arrayofincrementdecrementMapsubject]),
    [setdata, arrayofincrementdecrementMapsubject]
  )
  return (
    <div>
      <TableContainer>
        <Table size='small'>
          <TableHead sx={{ background: theme.palette.secondary.normal }}>
            <TableRow>
              <TableCell>
              </TableCell>
              <TableCell>
                <Typography
                  className="white-color"
                  variant='h6'>Subject Code</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  className="white-color"
                  variant='h6'> Subject Name</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  className="white-color"
                  variant='h6'>Description</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography
                  className="white-color"
                  variant='h6'>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <Checkbox
                      icon={<RemoveCircleIcon color="primary" />}
                      checkedIcon={<AddCircleIcon color="primary" />}
                      onChange={() => { _handleDecrement(i) }} />
                  </TableCell>
                  <TableCell>
                    <StyledInputBase
                      type="text"
                      onChange={(e) => { _handleChange(e, i) }}
                      value={item?.subHeader}
                      name="subHeader"
                    />
                  </TableCell>
                  <TableCell>
                    <StyledInputBase
                      type="text"
                      onChange={(e) => { _handleChange(e, i) }}
                      value={item?.subName}
                      name="subName"
                    />
                  </TableCell>
                  <TableCell>
                    <StyledInputBase
                      type="text"
                      onChange={(e) => { _handleChange(e, i) }}
                      value={item?.subDescrition}
                      name="subDescrition"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell colSpan={5}>
                <div className='flex-end'>
                  <Button
                    color="secondary"
                    variant='contained' size='small'
                    onClick={() => { _handleSubmit() }}
                  >
                    Save
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </TableContainer>
    </div>
  )
}
const mapStateprops = (state) => {
  return {
    arrayofincrementdecrementMapsubject: state.Mapsubject.arrayofincrementdecrementMapsubject,
    getMapSubjectHeaders: state.Mapsubject.getMapSubjectHeaders
  }
}
export default connect(mapStateprops, {
  ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT,
  GET_MAP_SUBJECT_HEADER,
  ADD_MAP_SUBJECT_HEADER
})(CollapsInput)