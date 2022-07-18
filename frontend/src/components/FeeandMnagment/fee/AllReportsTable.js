import { useTheme } from '@emotion/react';
import {
  IconButton,
  Paper, Table,
  TableBody, TableCell,
  TableContainer, TablePagination,
  TableRow, Typography
  , Checkbox,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useMemo } from 'react'
import TableHeader from './TableHeader';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchBar from "../../Master/SearchBar"

import "./index.css"
import { Link } from 'react-router-dom';
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const AllReportsTable = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [data, setdata] = React.useState([]);
  const theme = useTheme()
  const _handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const _handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    _handleRequestSort(event, property);
  };

  const _handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    setdata(Row)
  }, [])
  const _handlesearch = (e) => {
    const { value } = e.target;
    const SearchValue = value.toLowerCase();
    if (SearchValue !== "") {
      let filterdata = data.filter(
        (name) =>
          name.reportName.toLowerCase().includes(SearchValue) ||
          name.des.toLowerCase().includes(SearchValue) ||
          name.lastRundate.toLowerCase().includes(SearchValue)

      );
      setdata(filterdata);
    } else {
      setdata(Row);
    }
  };
  return (
    <Box>
      <Paper sx={{ width: "100%", minHeight: "400px", borderRadius: "8px" }}>
        <SearchBar _handlesearch={_handlesearch} />
        <TableContainer>
          <Table
            size={"small"}
            >
            <TableHeader
              createSortHandler={createSortHandler}
              headLabel={headLabel}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id}
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                      }}
                    >
                      <TableCell align='right' >
                        <IconButton>
                          <StarBorderIcon />
                        </IconButton>
                        <Checkbox />
                      </TableCell>
                      <TableCell align='left'>
                        <Link to={`/dashboard/studentfee/${row.reportName}`}>
                          <Typography
                            color="primary"
                          >
                            {row?.reportName}
                          </Typography></Link>
                      </TableCell>
                      <TableCell
                        align='center'>
                        <Typography
                        >
                          {row?.des}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        color="primary"
                      >
                        <Typography
                        >
                          {row.lastRundate}
                        </Typography>
                      </TableCell>
                    </TableRow>
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
    </Box >
  )
}
export default AllReportsTable;
const headLabel = [
  { id: "reportName", label: "Report Name", alignRight: "left" },
  { id: "des", label: "Description", alignRight: "center" },
  { id: "lastRundate", label: "Last Run Date", alignRight: "center" },
]
const Row = [{
  "reportName": "Nicoli",
  "des": "Reattachment of Right Upper Extremity, Open Approach",
  "lastRundate": "12/01/2022"
}, {
  "reportName": "Alberto",
  "des": "Replacement of Hepatic Artery with Autol Sub, Open Approach",
  "lastRundate": "18/03/2022"
}, {
  "reportName": "Barbe",
  "des": "Reattachment of Left Hip Muscle, Open Approach",
  "lastRundate": "05/02/2022"
}, {
  "reportName": "Marlo",
  "des": "Bypass L Face Vein to Up Vein with Nonaut Sub, Open Approach",
  "lastRundate": "27/07/2021"
}, {
  "reportName": "Fidela",
  "des": "Dilate Face Art, Bifurc, w 4+ Intralum Dev, Open",
  "lastRundate": "02/01/2022"
}, {
  "reportName": "Donaugh",
  "des": "Supplement R Low Arm & Wrist Muscle w Autol Sub, Perc Endo",
  "lastRundate": "05/03/2022"
}, {
  "reportName": "Arthur",
  "des": "Bypass R Hand Vein to Up Vein w Autol Sub, Perc Endo",
  "lastRundate": "21/08/2021"
}, {
  "reportName": "Aleece",
  "des": "Reposition Left Temporomandibular Joint, Open Approach",
  "lastRundate": "14/01/2022"
}, {
  "reportName": "Frances",
  "des": "Drain of L Com Iliac Art with Drain Dev, Perc Endo Approach",
  "lastRundate": "03/08/2021"
}, {
  "reportName": "Carol-jean",
  "des": "Introduce Liquid Brachy in Cran Cav/Brain, Open",
  "lastRundate": "12/04/2022"
}]
