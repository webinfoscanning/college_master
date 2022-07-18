import { useTheme } from '@emotion/react';
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  Box,
  TableBody,
  TableRow,
  Typography,
  TablePagination,
  Collapse,
  Button
} from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import TableHeader from './TableHeader';
import ParentsDetails from './ParentsDetails';
import './index.css'
import FeeDeatils from './FeeDeatils';
import SearchBar from '../../Master/SearchBar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const FeeReportTable = () => {
  const theme = useTheme()
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [data, setdata] = React.useState([]);
  const [Id, setId] = React.useState(null);

  const createSortHandler = (property) => (event) => {
    _handleRequestSort(event, property);
  };
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const _handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const _handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const _handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const _handleCollaps = (id) => {
    if (Id === id) {
      setId(null)
    } else {
      setId(id)
    }
  };
  useEffect(() => {
    setdata(fakedata)
  }, [])
  const _handlesearch = (e) => {
    const { value } = e.target;
    const SearchValue = value.toLowerCase();
    if (SearchValue !== "") {
      let filterdata = fakedata.filter(
        (name) =>
          name.name.toLowerCase().includes(SearchValue) ||
          name.description.toLowerCase().includes(SearchValue) ||
          name.CreatedOn.toLowerCase().includes(SearchValue) ||
          name.time.toLowerCase().includes(SearchValue) ||
          name.date.toLowerCase().includes(SearchValue)
      );
      setdata(filterdata);
    } else {
      setdata(fakedata);
    }
  };
  return (
    <>
      <Box >
        <Paper sx={{ minHeight: 400 }}>
          <SearchBar _handlesearch={_handlesearch} />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={_handleChangePage}
            onRowsPerPageChange={_handleChangeRowsPerPage}
          />
          <TableContainer>
            <Table size={"small"}>
              <TableHeader
                createSortHandler={createSortHandler}
                headLabel={headLabel}
                order={order}
                orderBy={orderBy}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <Fragment>
                        <TableRow key={i} scope="row" sx={{
                          backgroundColor: theme.palette.secondary.light,
                        }}>
                          <TableCell />
                          <TableCell align='left'>
                            <Typography>
                              {row.sl}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography>{row.studentid}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography>{row.rollno}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography>{row.name}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <div className='parents-action'>
                              <ParentsDetails />
                              <ParentsDetails />
                            </div>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography>{row.class}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography>{row.feeamount}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography>
                              <Button
                                variant='contained'
                                size='small'
                                color='secondary'
                                onClick={() => { _handleCollaps(row.sl) }}
                                sx={{
                                  borderRadius: "6px",
                                  height: "2em"
                                }}
                              >
                                {row.feepaid}
                              </Button>
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ p: 0 }} colSpan={12}>
                            <Collapse in={row.sl === Id} >
                              <FeeDeatils />
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={_handleChangePage}
            onRowsPerPageChange={_handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  )
}
export default FeeReportTable;
const headLabel = [
  { id: "sl", label: "Sl", alignRight: "left" },
  { id: "studentid", label: "Student id", alignRight: "left" },
  { id: "rollno", label: "Roll No", alignRight: "left" },
  { id: "Name", label: "Name", alignRight: "left" },
  { id: "parents", label: "Parents", alignRight: "left" },
  { id: "class", label: "Class /Degree", alignRight: "left" },
  { id: "feeamount", label: "Fee Amount", alignRight: "left" },
  { id: "feepaid", label: "Fee paid", alignRight: "left" },
];
const fakedata = [
  {
    sl: 1,
    class: "PUC",
    parents: "guruprasad",
    feeamount: 10000,
    feepaid: 500,
    rollno: 1,
    name: "Home Ing",
    des: "0503 Spohn Pass",
    Createdby: "Charmane",
    time: "9:17 AM",
    studentid: 100,
    date: "5/5/2022",
  },
  {
    sl: 2,
    class: "PUC",
    parents: "guruprasad",
    feeamount: 10000,
    feepaid: 500,
    rollno: 2,
    name: "Bamity",
    des: "65315 Johnson Alley",
    Createdby: "Sibeal",
    time: "2:51 PM",
    studentid: 100,
    date: "10/9/2021",
  },
  {
    sl: 3,
    class: "PUC",
    parents: "guruprasad",
    feeamount: 10000,
    feepaid: 500,
    rollno: 3,
    name: "Ronstring",
    des: "83 Summerview Avenue",
    Createdby: "Stella",
    time: "2:28 AM",
    studentid: 100,
    date: "11/28/2021",
  },
  {
    sl: 4,
    class: "PUC",
    parents: "guruprasad",
    feeamount: 10000,
    feepaid: 500,
    rollno: 4,
    name: "Wrapsafe",
    des: "85705 Arkansas Parkway",
    Createdby: "Farrand",
    time: "6:03 AM",
    studentid: 100,
    date: "9/19/2021",
  },
  {
    sl: 5,
    class: "PUC",
    parents: "guruprasad",
    feeamount: 10000,
    feepaid: 500,
    rollno: 5,
    name: "Subin",
    des: "21481 Bay Pass",
    Createdby: "Fifi",
    time: "4:10 AM",
    studentid: 100,
    date: "12/6/2021",
  },
  {
    sl: 6,
    class: "PUC",
    parents: "guruprasad",
    feeamount: 10000,
    feepaid: 500,
    rollno: 6,
    name: "Fix San",
    des: "74 Hoffman Junction",
    Createdby: "Lela",
    time: "10:15 AM",
    studentid: 100,
    date: "3/23/2022",
  },
];
