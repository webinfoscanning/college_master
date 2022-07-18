import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Delete from "../Alerts/DeleteConfirmation.js";
import "./index.css"
import { Button, Typography } from "@mui/material";
import { connect } from "react-redux";
const NestedCollapstbale = ({ getHeaders }) => {
  const [data, setdata] = React.useState([])

  useMemo(() => {
    setdata(getHeaders);
  }, [getHeaders])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {data.map((row) => (
              <TableRow key={row.key}>
                <TableCell align="left" />
                <TableCell align="left" />
                <TableCell align="left">
                  <Typography> {row?.index}</Typography>
                </TableCell >
                <TableCell align="left">
                  <Typography>{row?.key}</Typography>
                </TableCell >
                <TableCell align="left">
                  <Typography>{row.value}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>
                    {row.rowindex}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>
                    {row.time}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <div className="edit-delete2">
                    <Button
                      variant='contained'
                      color="secondary"
                      size="small">
                      update
                    </Button>
                    <Delete />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
        </TableBody>
      </Table>
    </TableContainer >
  );
}
const mapStateprops = (state) => {
  return {
    getHeaders: state.master.getHeaders,
  }
}
export default connect(mapStateprops, null)(NestedCollapstbale)
