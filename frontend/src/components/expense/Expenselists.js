import React, { useState, useEffect, useMemo } from 'react'
import { useTheme } from '@emotion/react';
import {
  Box,
  Paper, Table, TableCell,
  TableContainer, TableHead,
  TableRow, Typography, TableSortLabel, TableBody, Button, TablePagination, Checkbox
} from '@mui/material'
import { connect } from 'react-redux';
import { stableSort, getComparator } from '../logic/RecomendedFunctions';
import SearchBar from '../Master/SearchBar';
import TableHeader from '../Table/TableHeader';
import Delete from "./../../components/Alerts/DeleteConfirmation.js"
import EditModal from "./../../components/EditModal/index.js"
import { GET_EXPENSE, DELETE_EXPENSE } from "../../redux/action/Expense/index"

const Expenselists = (props) => {

  const theme = useTheme()
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [data, setdata] = React.useState([]);
  const [id, setid] = useState("")
  const [search, setSearch] = useState("")

  const { GET_EXPENSE, getExpenselist, DELETE_EXPENSE } = props

  useEffect(() => {
    GET_EXPENSE()
  }, [])

  useMemo(() => {
    setdata(getExpenselist)
  }, [getExpenselist])

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

  const _handleConfirmation = (id) => {
    setid(id)
  }
  const _handledelete = () => {
    DELETE_EXPENSE(id)
  }

  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)

  }

  const _handleKeyPress = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();

    if (SearchValue.length !== "") {
      let filterdata = getExpenselist.filter(
        (item) =>
          item.id.toString().includes(SearchValue) ||
          item.expType.subHeader.toLowerCase().includes(SearchValue) ||
          item.expAmount.toString().includes(SearchValue) ||
          item.expTowordsAccount.toLowerCase().includes(SearchValue) ||
          item.venderName.toLowerCase().includes(SearchValue)
      );
      setdata(filterdata);
    }
    else {
      setdata(getExpenselist);
    }
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
            <TableHeader
              headLabel={headLabel}
              createSortHandler={createSortHandler}
              orderBy={orderBy}
              action={true}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id}
                      sx={
                        {
                          "&:nth-of-type(odd)": {
                            backgroundColor: theme.palette.action.hover

                          }
                        }}
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row.idx}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row.expType?.subHeader}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.expAmount}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.expTowordsAccount}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h7'>{row?.venderName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <div className='d-flex'>
                          <Delete _onConfirm={() =>
                            _handleConfirmation(row.id)}
                            _handledelete={() => { _handledelete() }} />
                          <EditModal />
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

const mapStateProps = (state) => {
  return {
    getExpenselist: state.Expense.getExpenselist
  }
}

export default connect(mapStateProps, { GET_EXPENSE, DELETE_EXPENSE })(Expenselists)

const headLabel = [
  { id: "idx", label: "sl", alignRight: "left" },
  { id: "ExpenseType", label: "Expense Type", alignRight: "left" },
  { id: "ExpenseAmount", label: "Expense Amount", alignRight: "left" },
  { id: "expneseto", label: "Expense Towards Account", alignRight: "left" },
  { id: "venderName", label: "Vender Name", alignRight: "left" },
];
