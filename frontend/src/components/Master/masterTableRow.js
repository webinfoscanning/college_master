import { Chip, TableCell, TableRow, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import MasterTableRowCollapse from "./masterTableRowCollapse";
import styled from "@emotion/styled";
import Delete from "../Alerts/DeleteConfirmation.js/index";
import { useTheme } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditHeader from "./EditHeader";
import "./index.css"
import { connect } from "react-redux"
import { DELETE_MASTER } from "../../redux/action/master/index"


const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  margin: "0 0.2em 0 0",
  color: theme.palette.common.lighter,
}));

const MasterTableRow = (props) => {
  const theme = useTheme();
  const [Id, setId] = useState("")
  const {
    index,
    row,
    openCollapse,
    _handleCollapseOpen,
    _handleIncriment,
    DELETE_MASTER
  } = props;

  const _handledelete = () => {
    DELETE_MASTER(Id)
  }
  const _handleConfirmation = (id) => {
    setId(id)
  }
  return (
    <React.Fragment>
      <TableRow
        hover
        scope="row"
        component={
          "th"
        }
        sx={{
          "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover
          },
        }}
      >
        <TableCell align="left">
          <Checkbox
            onChange={() => { _handleCollapseOpen(row?.id) }}
            icon={<AddCircleIcon color="primary" />}
            checkedIcon={<RemoveCircleIcon color="primary" />}
            checked={openCollapse === row.id ? true : false}
          />
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.idx}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.name}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.description}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.userName}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.time}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7" color={"secondary"}>
            {row?.createdOn}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <div>
            <div className="add-values">
              <StyledChip
                onClick={_handleIncriment}
                variant="contained"
                color="secondary"
                label={<b>Add value</b>}
                size="small"
              />
            </div>
            <div className="edit-delete-master-table">
              <EditHeader row={row} />
              <Delete
                _onConfirm={() =>
                  _handleConfirmation(row.id)}
                _handledelete={() => { _handledelete() }}
              />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        {openCollapse !== null && (
          <MasterTableRowCollapse openCollapse={openCollapse} row={row} />
        )}
      </TableRow>
    </React.Fragment>
  );
};

export default connect(null, { DELETE_MASTER })(MasterTableRow)
