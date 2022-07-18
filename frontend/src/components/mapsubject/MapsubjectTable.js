import {
  Box, Paper,
  Table,
  TableBody,
  TablePagination,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
  Button,
  Collapse,
  Checkbox
} from '@mui/material'
import { ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT, GET_MAP_ALL_SUBJECT, GET_MAP_SUBJECT_HEADER } from '../../redux/action/mapsubject'
import React, { useState, Fragment, useEffect, useMemo } from 'react'
import { stableSort, getComparator } from '../logic/RecomendedFunctions'
import TableHeader from "../Table/TableHeader"
import CollapsInput from './CollapsInput'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchBar from '../Master/SearchBar'
import { useTheme } from '@emotion/react'
import "../../style/style.css"
import { connect } from 'react-redux'

const MapsubjectTable = (props) => {
  const {
    ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT,
    GET_MAP_ALL_SUBJECT,
    arrayofincrementdecrementMapsubject,
    getMapAllSubjcet,
    GET_MAP_SUBJECT_HEADER,
  } = props
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [data, setdata] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(false)
  const theme = useTheme()

  const createSortHandler = (property) => (event) => {
    _handleRequestSort(event, property);
  };
  const _handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const _handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const _handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const _handleCollapseOpen = (id) => {
    if (id === openCollapse) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse(id)
      GET_MAP_SUBJECT_HEADER(id)
    }
  }
  const _handleClick = async () => {
    let data = [...arrayofincrementdecrementMapsubject]
    let object = {
      "subHeader": "",
      "subName": "",
      "subDescrition": "",
      createdOn: new Date()
    }
    await data.push(object)
    await ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT(data)
  }

  useEffect(() => {
    GET_MAP_ALL_SUBJECT()
  }, [GET_MAP_ALL_SUBJECT])

  useMemo(() => {
    setdata(getMapAllSubjcet)
  }, [getMapAllSubjcet])

  return (
    <Box>
      <br />
      <Paper sx={{ minHeight: 400, }}>
        <TableContainer>
          <Table size='small'>
            <TableHeader
              createSortHandler={createSortHandler}
              headLabel={headLabel}
              order={order}
              orderBy={orderBy}
              action={true}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      scope="row"
                      component={
                        "th"
                      }
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover
                        },
                      }}
                    >
                      <TableCell align="left">
                        <Checkbox
                          onChange={() => { _handleCollapseOpen(row.id) }}
                          icon={<AddCircleIcon color="primary" />}
                          checkedIcon={<RemoveCircleIcon color="primary" />}
                          checked={openCollapse === row.id ? true : false}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h7" color={"secondary"}>
                          {row.classId?.subHeader}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h7" color={"secondary"}>
                          {row.department?.subHeader}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h7" color={"secondary"}>
                          {row.academicYear?.subHeader}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={_handleClick}
                        >
                          Add Subject</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={row.id === openCollapse}>
                          <CollapsInput row={row} />
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              }
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
            component="div"
            count={data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={_handleChangePage}
            onRowsPerPageChange={_handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  )
}
const mapStateprops = (state) => {
  return {
    arrayofincrementdecrementMapsubject: state.Mapsubject.arrayofincrementdecrementMapsubject,
    getMapAllSubjcet: state.Mapsubject.getMapAllSubjcet,
    getMapSubjectHeaders: state.Mapsubject.getMapSubjectHeaders
  }
}
export default connect(mapStateprops, {
  ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT,
  GET_MAP_ALL_SUBJECT,
  GET_MAP_SUBJECT_HEADER
})(MapsubjectTable)
const headLabel = [
  { id: "class", label: "Class/Degree", alignRight: false },
  { id: "department", label: "Department", alignRight: false },
  { id: "academicyear", label: "Academic year", alignRight: false },
];
