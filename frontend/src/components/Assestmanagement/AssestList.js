import { Paper, Table, TableContainer, Box, TablePagination, TableBody, TableRow, TableCell, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { getComparator, stableSort } from '../logic/RecomendedFunctions';
import SearchBar from '../Master/SearchBar';
import TableHeader from "../Table/TableHeader"
import Delete from '../Alerts/DeleteConfirmation.js';
import Edit from "../EditModal/index"
import { useTheme } from '@emotion/react';
import { connect } from 'react-redux';
import {
  GET_ASSEST,
  DELETE_ASSET
} from "../../redux/action/Assets/index"
import moment from 'moment';

const AssestList = (props) => {
  const theme = useTheme()
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [data, setdata] = React.useState([]);
  const { GET_ASSEST, getAssest, DELETE_ASSET } = props
  const [id, setid] = useState("")
  const [search, setSearch] = useState("")

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
    GET_ASSEST()
  }, [GET_ASSEST])

  const _handledelete = () => {
    DELETE_ASSET(id)
  }
  const _handleConfirmation = (id) => {
    setid(id)
  }
  useMemo(() => {
    setdata(getAssest)
  }, [getAssest, setdata])

  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)

  }

  const _handleKeyPress = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();

    if (SearchValue.length !== "") {
      let filterdata = getAssest.filter(
        (item) =>

          item.category.subName.toLowerCase().includes(SearchValue) ||
          item.product.productName.toLowerCase().includes(SearchValue) ||
          item.agreement.agreementName.toLowerCase().includes(SearchValue) ||
          moment(item.createdOn).format("DD/MM/YYYY").includes(SearchValue) ||
          moment(item.product.amcDate).format("DD/MM/YYYY").includes(SearchValue)

      );
      setdata(filterdata);
    }
    else {
      setdata(getAssest);
    }
  }

  return (
    <Box>
      <br />
      <Typography
        color="secondary" variant='h6'>
        Asset List
      </Typography>      <Paper>
        <div className='space-between'>
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
        <TableContainer>
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
                .map((row, i) => {
                  return (
                    <TableRow key={i} sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: theme.palette.action.hover
                      }
                    }} >

                      <TableCell></TableCell>
                      <TableCell align='left'>
                        <Typography color="secondary" variant='h7'>
                          {row.idx}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color="secondary" variant='h7'>
                          {row.category.subName}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color="secondary" variant='h7'>
                          {row.product.productName}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color="secondary" variant='h7'>
                          {row.agreement.agreementName}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color="secondary" variant='h7'>
                          {moment(row.createdOn).format("DD/MM/YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color="secondary" variant='h7'>
                          {moment(row.product.amcDate).format("DD/MM/YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <div className='d-flex'>
                          <Delete _onConfirm={() =>
                            _handleConfirmation(row.id)}
                            _handledelete={() => { _handledelete() }} />
                          <Edit />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
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
const mapStateprops = (state) => {
  return {
    getAssest: state.Assest.getAssest
  }
}
export default connect(mapStateprops, { GET_ASSEST, DELETE_ASSET })(AssestList) 
const headLabel = [
  { id: "idx", label: "Sl", alignRight: "left" },
  { id: "Assetcatagroy", label: "Asset Catagroy", alignRight: "left" },
  { id: "AssetName", label: "Asset Name", alignRight: "left" },
  { id: "Type", label: "Type of Asset", alignRight: "left" },
  { id: "date", label: "Date", alignRight: "left" },
  { id: "AMCDate", label: "AMC Date", alignRight: "left" },
];
