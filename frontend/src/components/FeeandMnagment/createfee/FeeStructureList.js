import "./index.css";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchBar from "../../Master/SearchBar";
import TableHeader from "../../Table/TableHeader";
import FeeTableRows from "./FeeTableRows";
import {
  ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS,
  GET_FEE_STRUCHER_LIST,
  GET_FEE_VALUE,
} from "../../../redux/action/feestructure/index"
import {
  Paper,
  TableContainer,
  TablePagination,
  Table,
  Box,
  TableBody,
  Typography,
} from "@mui/material";
import { getuserId } from "../../logic/RecomendedFunctions";
const userId = getuserId()?.id
const headLabel = [
  { id: "idx", label: "Fee Id", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "subHeader", label: "Fee Type", alignRight: false },
  { id: "fee", label: "Amount Total", alignRight: false },
  { id: "academicYear", label: "Academimic Year", alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const FeeStructureList = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("des");
  const [orderBy, setOrderBy] = useState("id");
  const [data, setdata] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null)
  const [search, setSearch] = useState("")
  const [openViwedetails, setopenViwedetails] = useState(false)
  const {
    arrayOfincremnetdecremnetViewDetails,
    ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS,
    getstructure,
    GET_FEE_STRUCHER_LIST,
    GET_FEE_VALUE
  } = props
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
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
  }
  const _handlesearch = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();
    if (SearchValue !== "") {
      let filterdata = data.filter(
        (name) =>
          name.description.toLowerCase().includes(SearchValue) ||
          String(name.fee).includes(SearchValue) ||
          name.feeType.subHeader.toLowerCase().includes(SearchValue) ||
          name.academicYear?.subHeader.toLowerCase().includes(SearchValue)
      );
      setdata(filterdata);
    } else {
      setdata(getstructure);
    }
  };
  const _handleIncrement = (row) => {
    let object = {
      subHeader: "",
      subDescrition: "",
      subAmount: "",
      userId: userId,
      createdDate: new Date(),
      rowrefid: row.id
    }
    ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS([...arrayOfincremnetdecremnetViewDetails, object])
  }
  const _handleOpenCollaps = (id) => {
    if (selectedRow === id) {
      setSelectedRow(null)
      ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS([])
      setopenViwedetails(false)
    } else {
      setSelectedRow(id)
      GET_FEE_VALUE(id)
      setopenViwedetails(false)
    }
  }
  const _handelviewdetails = (id) => {
    if (selectedRow?.id === id) {
      setSelectedRow(null)
      ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS([])
      setopenViwedetails(false)
    } else {
      setSelectedRow(id)
      GET_FEE_VALUE(id)
      setopenViwedetails(true)
    }
  }
  useEffect(() => {
    GET_FEE_STRUCHER_LIST()
  }, [GET_FEE_STRUCHER_LIST])

  React.useMemo(() => {
    setdata(getstructure);
  }, [getstructure]);
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4">Fee Structure List</Typography>
      <Paper sx={{ width: "100%", minHeight: "500px", mb: 2 }}>
        <div className="searchbar">
          <SearchBar
            _handleKeyPress={_handlesearch}
            _handlechangeSearch={_handlechangeSearch}
            search={search}
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
          <Table
            size={"small"}
            color="primary"
            sx={{ minWidth: 750 }}
          >
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
                .map((row) => {
                  return (
                    <Fragment key={row.id}>
                      
                      <FeeTableRows
                        row={row}
                        _handleIncrement={_handleIncrement}
                        selectedRow={selectedRow}
                        _handleOpenCollaps={_handleOpenCollaps}
                        _handelviewdetails={_handelviewdetails}
                        openViwedetails={openViwedetails}
                      />
                    </Fragment>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, 200]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={_handleChangePage}
          onRowsPerPageChange={_handleChangeRowsPerPage}
        />
      </Paper>
    </Box >
  );
}
const mapStateprops = (state) => {
  return {
    arrayOfincremnetdecremnetViewDetails: state.feestructure.arrayOfincremnetdecremnetViewDetails,
    getstructure: state.feestructure.getstructure
  }
}
export default connect(mapStateprops,
  {
    ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS,
    GET_FEE_STRUCHER_LIST,
    GET_FEE_VALUE
  })(FeeStructureList)

