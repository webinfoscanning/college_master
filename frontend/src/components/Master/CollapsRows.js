import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button, TextField, Typography, TableHead, Checkbox, } from "@mui/material";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { ADD_HEADER, ARRAY_INCRIMENT_DICRIMENT, GET_HEADER, } from "../../redux/action/master/index"
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import { getuserId, toastCss } from "../logic/RecomendedFunctions";
import moment from "moment";
const institutionId = getuserId()?.institutionId
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "150px",
    },
    borderRadius: 0,
  },
}));
const CollapsRows = (props) => {
  const theme = useTheme()
  const [data, setdata] = React.useState([])
  const {
    arrayofincrementdecrement,
    ARRAY_INCRIMENT_DICRIMENT,
    ADD_HEADER,
    row,
    getHeaders
  } = props
  const _handleddecrement = async (i) => {
    let array = [...data]
    array.splice(i, 1);
    await ARRAY_INCRIMENT_DICRIMENT(array)
    await setdata(array)
  }
  const _handleChange = (e, i) => {
    const { name, value } = e.target
    const array = [...data]
    array[i][name] = value
    array[i]["rowrefid"] = row.id
    array[i]["institutionId"] = row.institutionId
    setdata(array)
  }
  const _handleSubmit = () => {
    const array = [...data]
    let isVlaid = true
    for (var i of array) {
      if (i.subHeader === "" || i.subDescrition === "") {
        isVlaid = false
        break
      }
    }
    if (isVlaid === false) {
      toast.error("Please fill all required fields ", toastCss())
    } else {
      let payload = { headerValue: JSON.stringify(array), institutionId: institutionId }
      ADD_HEADER(payload, row.id)
      ARRAY_INCRIMENT_DICRIMENT([])
    }
  }

  React.useMemo(() =>
    setdata([
      ...arrayofincrementdecrement]),
    [setdata,
      arrayofincrementdecrement]
  )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size={"small"}>
        <TableHead sx={{
          background: theme.palette.secondary.normal,
        }}>
          <TableCell align="left" />
          <TableCell align="left" />
          <TableCell align="left">
            <Typography variant="h7"
              color={"primary.contrastText"}>
              SubHeader Name
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="h7"
              color={"primary.contrastText"}>
              Description
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="h7"
              color={"primary.contrastText"}>
              Created By
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="h7"
              color={"primary.contrastText"}>
              Time
            </Typography>
          </TableCell>
          <TableCell align="left">
            <Typography variant="h7"
              color={"primary.contrastText"}>
              Date
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="h7"
              color={"primary.contrastText"}>
              Action
            </Typography>
          </TableCell>
        </TableHead>
        <TableBody>
          {data.map((item, i) => {
            return (
              <TableRow >
                <TableCell align="right">
                  <Checkbox
                    icon={<RemoveCircleIcon color="primary" />}
                    checked
                    checkedIcon={<RemoveCircleIcon color="primary" />}
                    onChange={() => { _handleddecrement(i) }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h7">{i + 1}</Typography>
                </TableCell >
                <TableCell align="left">
                  <StyledInputBase
                    type="text"
                    onChange={(e) => { _handleChange(e, i) }}
                    value={item?.subHeader}
                    name="subHeader"
                  />
                </TableCell >
                <TableCell align="left">
                  <StyledInputBase
                    type="text"
                    onChange={(e) => { _handleChange(e, i) }}
                    value={item?.subDescrition}
                    name="subDescrition"
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h7">
                    {item?.userName}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h7">
                    {moment(item?.createdDate).format("LT")}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h7">
                    {moment(item?.createdDate).format("DD/MM/YYYY")}
                  </Typography>
                </TableCell>
                <TableCell align="right" >
                 
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell colSpan={8}>
              <div className='flex-end'>
                <Button
                  color="secondary"
                  variant='contained' size='small'
                  onClick={() => { _handleSubmit() }}
                >
                  Save
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer >
  );
}
const mapStateprops = (state) => {
  return {
    arrayofincrementdecrement: state.master.arrayofincrementdecrement,
    getHeaders: state.master.getHeaders
  }
}
export default connect(mapStateprops, {
  ARRAY_INCRIMENT_DICRIMENT,
  ADD_HEADER, GET_HEADER
})(CollapsRows);