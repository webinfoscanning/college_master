import {
  Box, Paper,
  Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import SearchBar from '../Master/SearchBar';
import TableHeader from '../Table/TableHeader'
import Delete from "../../components/Alerts/DeleteConfirmation.js"
import Edit from "../../components/EditModal/index"
import { getComparator, getuserId, stableSort } from '../logic/RecomendedFunctions';
import {
  DELETE_SUBJECT_FACULTY_NOTMAPPED,
  EIDT_MAP_FACULTY_TO_SUBJECT,
  GET_MAPPED_SUBJECT_FACULTIES
} from "../../redux/action/mapsubject"
import { useTheme } from '@emotion/react';
import EditMapFaculty from './EditMapFaculty';

const MapsubjetfacultyList = (props) => {
  const theme = useTheme()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")
  const [Item, setItem] = useState("")
  const [row, setrow] = useState(null)
  const [editdata, seteditdata] = useState({})
  const {
    getMappedSubjectFaculties,
    GET_MAPPED_SUBJECT_FACULTIES,
    DELETE_SUBJECT_FACULTY_NOTMAPPED,
    EIDT_MAP_FACULTY_TO_SUBJECT
  } = props

  const _handledelete = () => {
    let data = {
      "institutionId": getuserId()?.institutionId,
      "subToRemoveFromFaculty": Item?.subjectCode
    }
    DELETE_SUBJECT_FACULTY_NOTMAPPED(Item?.facAutoId, data)
  }
  const _handleConfirmation = (item) => {
    setItem(item)
  }
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

  useEffect(() => {
    GET_MAPPED_SUBJECT_FACULTIES()
  }, [GET_MAPPED_SUBJECT_FACULTIES])

  useMemo(() => {
    setData(getMappedSubjectFaculties)

  }, [setData, getMappedSubjectFaculties])

  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)

  }

  const _handleKeyPress = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();

    if (SearchValue.length !== "") {
      let filterdata = getMappedSubjectFaculties.filter(
        (item) =>

          item.classDegree.toLowerCase().includes(SearchValue) ||
          item.subjectCode.toLowerCase().includes(SearchValue) ||
          item.subjectName.toLowerCase().includes(SearchValue) ||
          item.academicYear.toLowerCase().includes(SearchValue) ||
          item.section.toLowerCase().includes(SearchValue) ||
          item.facultyId.toLowerCase().includes(SearchValue) ||
          item.facultyName.toLowerCase().includes(SearchValue)

      );
      setData(filterdata);
    }
    else {
      setData(getMappedSubjectFaculties);
    }
  }
  const _handlesaveForEdit = () => {
    let payload = {
      "institutionId": getuserId()?.institutionId,
      "subToRemoveFromFaculty": row?.subjectCode,
      subToAddInFaculty: JSON.stringify(editdata)
    }
    EIDT_MAP_FACULTY_TO_SUBJECT(payload, row?.facAutoId)
  }
  return (
    <Box>
      <Paper sx={{ minHeight: 400 }}>
        <TableContainer>
          <div className="searchbar">
            <SearchBar
              _handlechangeSearch={_handlechangeSearch}
              search={search}
              _handleKeyPress={_handleKeyPress}

            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100, 200]}
              component="div"
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={_handleChangePage}
              onRowsPerPageChange={_handleChangeRowsPerPage}
            />
          </div>
          <Table>
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
                .map((item,) => {
                  return (
                    <TableRow key={item?.id} sx={
                      {
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover

                        }
                      }} >
                      <TableCell align='left'>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.classDegree}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.subjectCode}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.subjectName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.academicYear}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.section}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        {item?.subjectMapped?.length === 0 ? (
                          null
                        ) : (
                          item?.subjectMapped.map((sub, i) => (
                            <Typography variant='h7' key={i} sx={{ paddingRight: "5px" }}>
                              {sub}
                            </Typography>
                          ))

                        )}

                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.facultyId}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{item?.facultyName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <div className='d-flex'>
                          <Edit
                            _onConfirm={() => {
                              _handlesaveForEdit()
                            }}
                            eidtform={<EditMapFaculty
                              data={item} seteditdata={seteditdata}
                              setrow={setrow}
                            />} />
                          <Delete
                            _onConfirm={() =>
                              _handleConfirmation(item)}
                            _handledelete={() => { _handledelete() }}
                          />
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
            onRowsPerPageChange={_handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  )
}

const mapStateProps = (state) => {
  return {
    getMappedSubjectFaculties: state.Mapsubject.getMappedSubjectFaculties
  }
}

export default connect(mapStateProps, {
  GET_MAPPED_SUBJECT_FACULTIES,
  EIDT_MAP_FACULTY_TO_SUBJECT,
  DELETE_SUBJECT_FACULTY_NOTMAPPED
})(MapsubjetfacultyList);

const headLabel = [
  { id: "class", label: "Class/Degree", alignRight: "left" },
  { id: "subjectCode", label: "Subject Code", alignRight: "left" },
  { id: "subjectName", label: "Subject Name", alignRight: "left" },
  { id: "AcadmicYear", label: "Acadmic Year", alignRight: "left" },
  { id: "section", label: "Section", alignRight: "left" },
  { id: "SubjectAlreadyMapped", label: "Subject Already Mapped", alignRight: "left" },
  { id: "FacultyId", label: "Faculty ID", alignRight: "left" },
  { id: "FacultyName", label: "Faculty Name", alignRight: "left" }
];
