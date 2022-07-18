import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, FormGroup, FormLabel, IconButton, TextField } from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from '@mui/icons-material/Close';
import "./index.css";
import { connect } from "react-redux";
import { EDIT_MASTER } from "../../redux/action/master/index"
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
const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius:4,
  margin: "0 0.2em 0 0",
  color: theme.palette.common.lighter,
}));

const EditHeader = (props) => {
  const [open, setOpen] = React.useState(false);
  const { EDIT_MASTER } = props
  const [state, setState] = React.useState({
    ...props.row
  })
  const _handleClickOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };
  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state, [name]: value
    })
  }
  const _handleSubmit = () => {
    const payload = {
      name: state.name, description: state.description,
      institutionId: state.institutionId
    }
    EDIT_MASTER(payload, state.id)
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
            {"Edit Header"}
            <IconButton
              onClick={_handleClose}
              sx={{
                p: 0
              }}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form>
            <FormGroup>
              <FormLabel>
                Header Name
              </FormLabel>
              <StyledInputBase
                type="text"
                id="name"
                onChange={_handleChange}
                defaultValue={state.name}
                name="name"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                Description
              </FormLabel>
              <StyledInputBase
                type="text"
                id="description"
                multiline
                maxRows={4}
                onChange={_handleChange}
                defaultValue={state.description}
                name="description"
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
          <StyledChip
            color="secondary"
            onClick={_handleSubmit}
            label={<b>Save</b>} />
        </DialogActions>
      </Dialog>
    </div >
  );
};
export default connect(null, { EDIT_MASTER })(EditHeader)
