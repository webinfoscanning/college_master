import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import { Chip, FormGroup, FormLabel, TextField, Select, MenuItem, IconButton, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import "./index.css";
import { } from "../../../redux/action/master"
import { EDIT_FEE_STRUCTURE } from "../../../redux/action/feestructure"
import { getuserId } from "../../logic/RecomendedFunctions";

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
    borderRadius: 0,
  },
}));
const StyledSelectInput = styled(Select)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    background: theme.palette.common.lighter,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    borderRadius: 0,
  },
}));
const EditFee = (props) => {
  const { getMasterdata, EDIT_FEE_STRUCTURE } = props
  const [open, setOpen] = React.useState(false);
  const [fee, setFee] = React.useState(props.row?.fee)
  const [state, setState] = React.useState({ ...props.row })

  const _handleClickOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };
  const StyledChip = styled(Chip)(({ theme }) => ({
    borderRadius: 4,
    margin: "0 0.2em 0 0",
    color: theme.palette.common.lighter,
  }));

  const _handleChange = (e) => {
    const { name, value } = e.target
    const data = JSON.parse(value)
    setState({ ...state, [name]: data })
  }

  const _handleSubmit = (e) => {
    let payload = {
      institutionId: getuserId()?.institutionId,
      description:state?.description,
      fee: state?.fee,
      classDegree: JSON.stringify(state?.classDegree),
      department: JSON.stringify(state?.department),
      feeType: JSON.stringify(state?.feeType),
      academicYear: JSON.stringify(state?.academicYear),
      boardUniversity: JSON.stringify(state?.boardUniversity)
    }
    let id = props.row?.id
    EDIT_FEE_STRUCTURE(payload, id)
    setOpen(false);
  }

  return (
    <div>
      <StyledChip
        variant="filled"
        onClick={_handleClickOpen}
        label={<b>Edit</b>}
        size="small"
        color="warning"
      />
      <Dialog
        open={open}
      >
        <DialogTitle id="edit-dialog-title">
          <div className="close-icon">
            {"Edit Fee"}
            <IconButton
              sx={{ p: 0 }}
              onClick={_handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form>
            <FormGroup>
              <FormLabel>Class/Degree</FormLabel>
              <StyledSelectInput
                type="select"
                name="classDegree"
                onChange={_handleChange}
                value={JSON.stringify(state?.classDegree)}
              >
                {getMasterdata?.map((item, i) => (
                  item.headerPrefix ==="config_class" ? (
                    item?.headerValue !== null && item?.headerValue.map((i) => {
                      return (
                        <MenuItem value={JSON.stringify(i)} >{i?.subHeader}</MenuItem>
                      )
                    })

                  ) : null
                ))}
              </StyledSelectInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>Department</FormLabel>
              <StyledSelectInput
                type="select"
                name="department"
                onChange={_handleChange}
                value={JSON.stringify(state?.department)}
              >
                {getMasterdata?.map((item, i) => (
                  item.headerPrefix === "config_depart" ? (
                    item?.headerValue !== null && item?.headerValue.map((i) => {
                      return (
                        <MenuItem value={JSON.stringify(i)} >{i?.subHeader}</MenuItem>
                      )
                    })

                  ) : null
                ))}
              </StyledSelectInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>Fee</FormLabel>
              <StyledInputBase type="text" name="fee"
                value={state?.fee}
                onChange={(e) => { setState({ ...state, [e.target.name]: e.target.value }) }}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Fee Type</FormLabel>
              <StyledSelectInput
                type="select"
                name="feeType"
                onChange={_handleChange}
                value={JSON.stringify(state?.feeType)}
              >
                {getMasterdata?.map((item, i) => (
                  item.name === "Fee type" ? (
                    item?.headerValue !== null && item?.headerValue.map((i) => {
                      return (
                        <MenuItem value={JSON.stringify(i)} >{i?.subHeader}</MenuItem>
                      )
                    })

                  ) : null
                ))}
              </StyledSelectInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>Academic Year</FormLabel>
              <StyledSelectInput
                type="select"
                name="academicYear"
                onChange={_handleChange}
                value={JSON.stringify(state?.academicYear)}

              >
                {getMasterdata?.map((item, i) => (
                  item.name === "Academic year" ? (
                    item?.headerValue !== null && item?.headerValue.map((i) => {
                      return (
                        <MenuItem value={JSON.stringify(i)} >{i?.subHeader}</MenuItem>
                      )
                    })

                  ) : null
                ))}
              </StyledSelectInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>Board University</FormLabel>
              <StyledSelectInput
                type="select"
                name="boardUniversity"
                onChange={_handleChange}
                value={JSON.stringify(state?.boardUniversity)}

              >
                {getMasterdata?.map((item, i) => (
                  item.name === "Board university" ? (
                    item?.headerValue !== null && item?.headerValue.map((i) => {
                      return (
                        <MenuItem value={JSON.stringify(i)} >{i?.subHeader}</MenuItem>
                      )
                    })

                  ) : null
                ))}
              </StyledSelectInput>
            </FormGroup>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <StyledInputBase
                required
                type="text"
                name="description"
                multiline
                rows={2}
                value={state?.description}
                onChange={(e) => { setState({ ...state, [e.target.name]: e.target.value }) }}
              />
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <StyledChip
            color="warning"
            onClick={_handleClose}
            label={<b>Cancel</b>}
          />
          <StyledChip color="secondary" onClick={_handleSubmit} label={<b>Save</b>} />
        </DialogActions>
      </Dialog>
    </div >
  );
};


const mapStateprops = (state) => {
  return {
    getMasterdata: state?.master.getMasterdata
  }
}

export default connect(mapStateprops, { EDIT_FEE_STRUCTURE })(EditFee)
