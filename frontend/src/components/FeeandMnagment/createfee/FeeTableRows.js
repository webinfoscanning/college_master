import React, { useEffect, useState } from "react"
import {
  TableRow,
  TableCell,
  Typography,
  Checkbox,
  Collapse,
  Chip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditFee from "./EditFee";
import AddFeeCollapsInput from "./AddFeeCollapsInput";
import Delete from "../../Alerts/DeleteConfirmation.js"
import styled from "@emotion/styled";
import "./index.css"
import { useTheme } from "@emotion/react";
import { connect } from "react-redux";
import { DELETE_FEE } from "../../../redux/action/feestructure"
import ViewDetails from "./ViewDetails";

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  margin: "0 0.2em 0 0",
  color: theme.palette.common.lighter,
}));

const FeeTableRows = (props) => {
  const [Id, setId] = useState("")

  const theme = useTheme()
  const {
    row,
    _handleIncrement,
    _handleOpenCollaps,
    selectedRow,
    _handelviewdetails,
    DELETE_FEE,
    openViwedetails
  } = props

  const _handledelete = () => {
    DELETE_FEE(Id)
  }
  const _handleConfirmation = (id) => {
    setId(id)
  }
  return (
    <>
      <TableRow
        hover
        scope="row"
        component={
          "th"
        }
        color="primary"
        sx={{
          "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover
          },
        }}
      >
        <TableCell align="left">
          <Checkbox
            onChange={() => { _handleOpenCollaps(row.id) }}
            icon={<AddCircleIcon color="primary" />}
            checkedIcon={<RemoveCircleIcon color="primary" />}
          />
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.idx}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.description}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.feeType.subHeader}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.fee}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.academicYear?.subHeader}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <div className="add-value">
            <StyledChip
              color="warning"
              variant="contained"
              size="small"
              label={<b>Add Fee</b>}
              onClick={() => { _handleIncrement(row) }}
            />
            <EditFee
              row={row ? row : null}
            />
            <Delete
              _onConfirm={() =>
                _handleConfirmation(row.id)}
              _handledelete={() => { _handledelete() }}
            />
          </div>
          <div className="action">
            <div className="edit-delete">
              <StyledChip
                color="secondary"
                variant="contained"
                size="small"
                label={<b>View Details</b>}
                onClick={()=>{_handelviewdetails(row?.id)}}
              />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={12}>
          {
            selectedRow === row.id && openViwedetails ? <Collapse in={selectedRow === row.id && openViwedetails}>
              <ViewDetails />
            </Collapse> : <Collapse in={selectedRow === row.id}>
              <AddFeeCollapsInput data={row} />
            </Collapse>
          }
        </TableCell>
      </TableRow>
    </>
  )
}
export default connect(null, { DELETE_FEE })(FeeTableRows)
