import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Button, IconButton, Box,
  TextField,
  FormGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import React, {
  Fragment,
  useState,
} from "react";
import AddIcon from '@mui/icons-material/Add';
import AddHeader from "./AddHeader";
import "./index.css";
import { ADD_MASTER } from "../../redux/action/master";
import { connect } from "react-redux";
import GoBack from "../back/GoBack";
import { fontSize } from "@mui/system";
import { getuserId } from "../logic/RecomendedFunctions";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "1em"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  marginRight: "0",
  marginLeft: "0",
  display: "flex",
  alignItems: 'center',
  fontSize: "1em"
}));
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));

const AddHeaderForm = (props) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    description: ""
  })
  const { ADD_MASTER } = props
  const theme = useTheme();
  const _handleopenform = () => {
    setOpen(!open);
  };
  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const _handleSubmit = (e) => {
    e.preventDefault()
    let payload = { ...state, institutionId: getuserId()?.institutionId }

    ADD_MASTER(payload)
    setState({
      name: "",
      description: ""
    })

  }

  return (
    <Fragment>
      <AddHeader
        StyledButton={
          <StyledButton
            color="secondary"
            variant="contained"
            endIcon={<AddIcon />}
            onClick={_handleopenform}
          >
            Add Header
          </StyledButton>
        }
        ArrowBack={
          <GoBack />
        }
      />
      {open ? (
        <Box
          boxShadow={3}
          sx={{
            m: 1,
            backgroundColor: "secondary.light",
          }}
        >
          <form>
            <StyledDiv>
              <Grid container spacing={2}>
                <Grid item sm={6} md={5} lg={5} >
                  <FormGroup>
                    <FormLabel>Header Name</FormLabel>
                    <StyledInputBase
                      value={state.name}
                      onChange={_handleChange}
                      type="text"
                      name="name"
                      required
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={6} md={5} lg={5}>
                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <StyledInputBase
                      value={state.description}
                      onChange={_handleChange}
                      type="text"
                      name="description"
                      required
                    />
                  </FormGroup>
                </Grid>
                <Grid item sm={2} md={2} lg={2}>
                  <div className="m-1">
                    <Button
                      color={"secondary"}
                      size="small"
                      variant="contained"
                      onClick={_handleSubmit}
                      // disabled
                      type="submit"
                      className="m-1"
                    >
                      Add
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </StyledDiv>
          </form>
        </Box>
      ) : null}
      <br />
    </Fragment>
  );
};

export default connect(null, { ADD_MASTER })(AddHeaderForm);
