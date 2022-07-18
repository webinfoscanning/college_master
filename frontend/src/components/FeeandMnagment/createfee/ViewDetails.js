import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Button,
  TextField,
  Typography,
  Checkbox,
  TableHead
} from "@mui/material";
import { ADD_FEE_VALUE, ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS } from "../../../redux/action/feestructure/index"
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import { getuserId, toastCss } from "../../logic/RecomendedFunctions";

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
const AddFeeCollapsInput = (props) => {
  const theme = useTheme()
  const {
    arrayOfincremnetdecremnetViewDetails,
  } = props

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{
          background: theme.palette.secondary.normal,
        }}>
          <TableRow>
            <TableCell align="left">
              <Typography variant="h7"
                color={"primary.contrastText"}>
                Fee For</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h7"
                color={"primary.contrastText"}>
                Description</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h7"
                color={"primary.contrastText"}>
                Amount</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayOfincremnetdecremnetViewDetails.length > 0 && arrayOfincremnetdecremnetViewDetails?.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="left">
                  <StyledInputBase
                    name='subHeader'
                    value={item?.subHeader}
                    type="text"
                    disabled
                  />
                </TableCell >
                <TableCell align="left">
                  <StyledInputBase
                    name='subDescrition'
                    value={item?.subDescrition}
                    type="text"
                    disabled
                  />
                </TableCell>
                <TableCell align="left">
                  <StyledInputBase
                    name='subAmount'
                    value={item?.subAmount}
                    type="number"
                    disabled
                  />
                </TableCell >
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const mapStateprops = (state) => {
  return {
    arrayOfincremnetdecremnetViewDetails: state.feestructure.arrayOfincremnetdecremnetViewDetails
  }
}
export default connect(mapStateprops, {
})(AddFeeCollapsInput);