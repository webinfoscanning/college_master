import "./index.css";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import MasterTableHeader from "./masterTablerHeader";
import MasterTableRow from "./masterTableRow";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import {
  ARRAY_INCRIMENT_DICRIMENT,
  GET_MASTER, GET_HEADER
} from "../../redux/action/master/index"
import { getuserId, stableSort, getComparator } from "../logic/RecomendedFunctions";
import { Typography } from "@mui/material";

const uerid = getuserId()?.id
const headLabel = [
  { id: "idx", label: "Sl", alignRight: true },
  { id: "name", label: "HeaderName", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "CreatedBy", label: "Created by", alignRight: false },
  { id: "time", label: "Time", alignRight: false },
  { id: "CreatedOn", label: "Date", alignRight: false },
];

const MasterTable = (props) => {

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCollapse, setOpenCollapse] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("")

  const {
    ARRAY_INCRIMENT_DICRIMENT,
    arrayofincrementdecrement,
    getMasterdata,
    GET_MASTER,
    GET_HEADER
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
  const _handleCollapseOpen = (id) => {
    if (id === openCollapse) {
      setOpenCollapse(null);
    } else {
      GET_HEADER(id)
      setOpenCollapse(id);
      ARRAY_INCRIMENT_DICRIMENT([])
    }
  }
  const _handleIncriment = async () => {
    let object = {
      subHeader: "",
      subDescrition: "",
      userId: uerid,
      createdDate: new Date(),
      rowrefid: ""
    }
    await ARRAY_INCRIMENT_DICRIMENT([...arrayofincrementdecrement, object
    ])

  }
  useEffect(() => {
    GET_MASTER()
  }, [GET_MASTER])

  useMemo(() => {
    setdata(getMasterdata);
  }, [getMasterdata])

  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)

  }

  const _handleKeyPress = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();
    if (SearchValue.length !== "") {
      let filterdata = getMasterdata.filter(
        (item) =>
          item.id.toString().includes(SearchValue) ||
          item.createdOn.toLowerCase().includes(SearchValue) ||
          item.description.toLowerCase().includes(SearchValue) ||
          item.institutionId.toLowerCase().includes(SearchValue) ||
          item.name.toLowerCase().includes(SearchValue)
      );
      setdata(filterdata);
    }
    else {
      setdata(getMasterdata);
    }
  }
  return (
    <Box>
      <Typography color={"secondary"} variant="h5"> Header List</Typography>
      <Paper sx={{ width: "100%", minHeight: "500px", mb: 2 }}>
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
        <TableContainer>
          <Table
            size={"small"}
            color="primary"
            sx={{ minWidth: 750 }}
          >
            <MasterTableHeader
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
                    <React.Fragment key={row?.id}>
                      <MasterTableRow
                        row={row}
                        _handleCollapseOpen={_handleCollapseOpen}
                        openCollapse={openCollapse}
                        _handleIncriment={_handleIncriment}
                        index={i}
                      />
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, 200]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={_handleChangePage}
          onRowsPerPageChange={_handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
const mapStateprops = (state) => {
  return {
    arrayofincrementdecrement: state.master.arrayofincrementdecrement,
    getMasterdata: state.master.getMasterdata
  }
}
export default connect(mapStateprops, { ARRAY_INCRIMENT_DICRIMENT, GET_MASTER, GET_HEADER })(MasterTable)
