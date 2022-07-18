import styled from "@emotion/styled";
import {
  Button,
  Box,
  TextField,
  FormGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import React, {
  Fragment,
  useState,
} from "react";
import { connect } from "react-redux";

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));

const AddHeaderForm = (props) => {
  const [state, setState] = useState({
    name: "",
    description: ""
  })
  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <Fragment>
      <Box
        boxShadow={3}
        sx={{
          m: 1,
          backgroundColor: "secondary.light",
          p: 1
        }}
      >
        <form>
          <Grid container spacing={2}>
            <Grid item sm={6} md={2} lg={2} >
              <FormGroup>
                <FormLabel>Class/Degree</FormLabel>
                <StyledInputBase
                  value={state.name}
                  onChange={_handleChange}
                  type="text"
                  name="name"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={2} lg={2}>
              <FormGroup>
                <FormLabel>Subject Code</FormLabel>
                <StyledInputBase
                  value={state.description}
                  onChange={_handleChange}
                  type="text"
                  name="description"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={2} lg={2}>
              <FormGroup>
                <FormLabel>Subject Name</FormLabel>
                <StyledInputBase
                  value={state.description}
                  onChange={_handleChange}
                  type="text"
                  name="description"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={2} lg={2}>
              <FormGroup>
                <FormLabel>Acadmic Year</FormLabel>
                <StyledInputBase
                  value={state.description}
                  onChange={_handleChange}
                  type="text"
                  name="description"
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={2} lg={2}>
              <FormGroup>
                <FormLabel>Section</FormLabel>
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
                  type="submit"
                  className="m-1  fullWidht"
                >
                  submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  );
};

export default connect(null, null)(AddHeaderForm);
