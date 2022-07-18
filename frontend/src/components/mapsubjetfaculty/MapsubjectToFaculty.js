import React, { useState, useEffect, useMemo } from 'react'
import {
  TableContainer,
  Table,
  Paper,
  Box,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
  Typography,
  Button
} from '@mui/material'
import TableHeader from "../timetableList/TableHeader"
import { getComparator, stableSort } from '../logic/RecomendedFunctions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { GET_SUBJECT_FACULTY_NOTMAPPED } from "../../redux/action/mapsubject"

const MapsubjectToFaculty = (props) => {

  const { GET_SUBJECT_FACULTY_NOTMAPPED, getSubfacultyNotmapped } = props

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState({
    class: "",
    deparment: "",
    subjectcode: "",
    subjectname: "",
    academicyear: "",
    section: ""

  })

  useEffect(() => {
    GET_SUBJECT_FACULTY_NOTMAPPED()

  }, [GET_SUBJECT_FACULTY_NOTMAPPED])

  useMemo(() => {
    setdata(getSubfacultyNotmapped)

  }, [])

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

  const _handlechangeSearch = (e) => {
    const { name, value } = e.target;

    setSearch({ ...search, [e.target.name]: e.target.value })
  }

  const _handleKeyPress = (e) => {

    e.preventDefault()

    let mapsearch = e.target.name
    let SearchValue
    if (mapsearch === "class") {
      SearchValue = search.class
    }
    else if (mapsearch === "department") {
      SearchValue = search.department
    }
    else if (mapsearch === "subjectcode") {
      SearchValue = search.subjectcode
    }
    else if (mapsearch === "subjectname") {
      SearchValue = search.subjectname
    }
    else if (mapsearch === "academicyear") {
      SearchValue = search.academicyear
    }
    else if (mapsearch === "section") {
      SearchValue = search.section
    }

    if (SearchValue.length !== null) {
      if (mapsearch === "class") {

        let filterdata = getSubfacultyNotmapped.filter(
          (item) =>
            item.classJson.subHeader.toLowerCase().includes(SearchValue.toLowerCase())

        );

        setdata(filterdata);
      }
      else if (mapsearch === "department") {

        let filterdata = getSubfacultyNotmapped.filter(
          (item) =>
            item.departmentJson.subHeader.toLowerCase().includes(SearchValue.toLowerCase())

        );

        setdata(filterdata);
      }
      else if (mapsearch === "subjectcode") {

        let filterdata = getSubfacultyNotmapped.filter(
          (item) =>
            item.subjectCode.toLowerCase().includes(SearchValue.toLowerCase())

        );

        setdata(filterdata);
      }
      else if (mapsearch === "subjectname") {

        let filterdata = getSubfacultyNotmapped.filter(
          (item) =>
            item.subjectName.toLowerCase().includes(SearchValue.toLowerCase())

        );

        setdata(filterdata);
      }
      else if (mapsearch === "academicyear") {

        let filterdata = getSubfacultyNotmapped.filter(
          (item) =>
            item.academicYearJson?.subHeader.includes(SearchValue)

        );

        setdata(filterdata);
      }
      else if (mapsearch === "section") {

        let filterdata = getSubfacultyNotmapped.filter(
          (item) =>
            item.sectionJson?.subHeader.toLowerCase().includes(SearchValue.toLowerCase())

        );

        setdata(filterdata);
      }
    }
    else {
      setdata(getSubfacultyNotmapped);
    }
  }

  return (
    <div>
      <br />
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHeader
                createSortHandler={createSortHandler}
                headLabel={headLabel}
                order={order}
                orderBy={orderBy}
                action={true}
                search={search}
                _handleKeyPress={_handleKeyPress}
                _handlechangeSearch={_handlechangeSearch}

              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row?.id}>
                        <TableCell align='left'>

                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.classJson?.subHeader}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.departmentJson?.subHeader}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.subjectJson?.subHeader}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.subjectJson?.subName}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.academicYearJson?.subHeader}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <Typography
                            variant='h7'>
                            {row.sectionJson?.subHeader ? row.sectionJson?.subHeader : null}
                          </Typography>
                        </TableCell>
                        <TableCell align='left'>
                          <div>
                            <Link
                              to={{
                                pathname: "/dashboard/selectmapsubjctefaculaty",
                                state: { row }
                              }}
                            >
                              <Button
                                size='small'
                                className='mr-1 fullWidth'
                                color="secondary"
                                variant='contained'
                                sx={{ width: "100%", p: "0.1em", borderRadius: "2px" }}
                              >Assign Faculty</Button></Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100, 200]}
              component="div"
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={_handleChangePage}
              onRowsPerPageChange={_handleChangeRowsPerPage} />
          </TableContainer>
        </Paper>
      </Box>
    </div >
  )
}

const mapStateprops = (state) => {
  return {
    getSubfacultyNotmapped: state.Mapsubject.getSubfacultyNotmapped
  }
}
export default connect(mapStateprops, {
  GET_SUBJECT_FACULTY_NOTMAPPED
})(MapsubjectToFaculty)

const headLabel = [
  { id: "class", label: "Class/Degree", alignRight: "left" },
  { id: "department", label: "Departments", alignRight: "left" },
  { id: "subjectcode", label: "Subject code", alignRight: "left" },
  { id: "subjectname", label: "Subject name", alignRight: "left" },
  { id: "academicyear", label: "Academic year", alignRight: "left" },
  { id: "section", label: "Section", alignRight: "left" }
];