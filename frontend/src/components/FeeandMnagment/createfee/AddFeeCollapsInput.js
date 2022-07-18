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
    ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS,
    data,
    ADD_FEE_VALUE } = props
  const _handleIncrement = (i) => {
    let array = [...arrayOfincremnetdecremnetViewDetails]
    array.splice(i, 1);
    ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS(array)
  }
  const _handleChange = (e, i, row) => {
    const { name, value } = e.target
    const array = [...arrayOfincremnetdecremnetViewDetails]
    array[i][name] = value
    ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS(array)
  }
  const _handleSubmit = () => {
    const array = [...arrayOfincremnetdecremnetViewDetails]
    let isVlaid = true
    let isamountok = true
    for (var i of array) {
      if (i.subHeader === "" || i.subDescrition === "" || i.subAmount === '') {
        isVlaid = false
        break
      }
    }
    for (var i of array) {
      if (i.subHeader === "" || i.subDescrition === "" || i.subAmount > data?.fee) {
        isamountok = false
        break
      }
    }
    if (isVlaid) {
      let payload = {
        feeValue: JSON.stringify(
          array
        ),
        institutionId: getuserId()?.institutionId
      }
      if (isamountok) {
        ADD_FEE_VALUE(payload, data.id)
      }else{
        toast.error("Amount should be less or equal to total amount", toastCss())
      }
    } else {
      toast.error("Please fill all required fields ", toastCss())
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{
          background: theme.palette.secondary.normal,
        }}>
          <TableRow>
            <TableCell align="left" />
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
            <TableCell align="right">
              <Typography variant="h7"
                color={"primary.contrastText"}>
                Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayOfincremnetdecremnetViewDetails.length > 0 && arrayOfincremnetdecremnetViewDetails?.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="left">
                  <Checkbox icon={<RemoveCircleIcon color="primary" />}
                    checkedIcon={<AddCircleIcon color="primary" />}
                    onChange={() => { _handleIncrement(i) }}
                  />
                </TableCell>
                <TableCell align="left">
                  <StyledInputBase
                    onChange={(e) => { _handleChange(e, i, item) }}
                    name='subHeader'
                    value={item?.subHeader}
                    type="text" />
                </TableCell >
                <TableCell align="left">
                  <StyledInputBase
                    onChange={(e) => { _handleChange(e, i, item) }}
                    name='subDescrition'
                    value={item?.subDescrition}
                    type="text" />
                </TableCell>
                <TableCell align="left">
                  <StyledInputBase
                    onChange={(e) => { _handleChange(e, i, item) }}
                    name='subAmount'
                    value={item?.subAmount}
                    type="number" />
                </TableCell >
                <TableCell align="left" >
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
                  onClick={() => { _handleSubmit(data) }}
                >
                  Save
                </Button>
              </div>
            </TableCell>
          </TableRow>
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
  ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS,
  ADD_FEE_VALUE
})(AddFeeCollapsInput);