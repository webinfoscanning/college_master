import { useTheme } from '@emotion/react';
import {
  Box, Chip,
  Paper, Table, TableCell,
  TableContainer, TableHead,
  TableRow, Typography,
  TableSortLabel, TableBody,
  Button, TablePagination, Checkbox
} from '@mui/material'
import React, { useState } from 'react'
import SearchBar from '../../components/Master/SearchBar'
import { stableSort, getComparator } from '../logic/RecomendedFunctions';
import Delete from '../Alerts/DeleteConfirmation.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DELETE_EMOLPYEE } from "../../redux/action/employee"
import styled from '@emotion/styled';
const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  margin: "0 0.2em 0 0",
  color: theme.palette.common.lighter,
  fontWeight: 600,

}));

const Employeelist = (props) => {
  const { rows,
    _handlechangeSearch,
    search,
    _handleKeyPress
    , DELETE_EMOLPYEE } = props
  const theme = useTheme()
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [data, setdata] = React.useState([]);
  const [Id, setId] = useState("")

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
  const _handledelete = () => {
    DELETE_EMOLPYEE(Id)
  }
  const _handleConfirmation = (id) => {
    setId(id)
  }
  return (
    <Box>
      <br />
      <Paper sx={{ minHeight: 600 }}>
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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                {headLabel.map((item) => {
                  return (
                    <TableCell align={item?.alignRight} key={item.id}>
                      <TableSortLabel
                        active={orderBy === item.id}
                        direction={orderBy === item.id ? order : "asc"}
                        onClick={createSortHandler(item?.id)}
                      >
                        <Typography variant='h6' color='secondary'>{item?.label}</Typography>
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
                <TableCell align='left'>
                  <Typography variant='h6' color='secondary'>Upload Offer Letter</Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography variant='h6' color='secondary'>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.idx} sx={
                      {
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover

                        }
                      }} >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row.idx}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.firstName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.lastName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.email}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.location.subHeader}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.createdOn}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.employeeStatus.subHeader}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>no offer letter</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Button
                          color='secondary'
                          variant='contained'
                          size='small'
                        >Choose files</Button>
                      </TableCell>
                      <TableCell align='left'>
                        <div className='d-flex'>
                          <Delete
                            _onConfirm={() =>
                              _handleConfirmation(row.id)}
                            _handledelete={() => { _handledelete() }}
                          />
                          <StyledChip
                            variant="contained"
                            size='small'
                            color="warning"
                            label={<Link
                              style={{ textDecoration: 'none', color: "#fff" }}
                              to={`/dashboard/editemployee/${row.id}`}>
                              Edit
                            </Link>}
                          >
                          </StyledChip>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, 200]}
            component="div"
            count={props.rows?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={_handleChangePage}
            onRowsPerPageChange={_handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box >
  )
}

export default connect(null, { DELETE_EMOLPYEE })(Employeelist);

const headLabel = [
  { id: "idx", label: "Sl", alignRight: "left" },
  { id: "firstName", label: "First Name", alignRight: "left" },
  { id: "LastName", label: "Last Name", alignRight: "left" },
  { id: "email", label: "E-Mail", alignRight: "left" },
  { id: "location", label: "Location", alignRight: "left" },
  { id: "date", label: "Date", alignRight: "left" },
  { id: "status", label: "status", alignRight: "left" },
  { id: "offer", label: "Offer Letter", alignRight: "left" },
];