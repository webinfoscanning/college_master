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
import { connect } from "react-redux";

const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: "primary",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: "1em",
        borderRadius: (theme.shape.borderRadius),
    },
}));

const Markattendanceform = (props) => {
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
        let payload = { ...state, institutionId: "test123436" }

        ADD_MASTER(payload)
        setState({
            name: "",
            description: ""
        })

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
                        <Grid item sm={6} md={3} lg={3} >
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
                        <Grid item sm={6} md={3} lg={3}>
                            <FormGroup>
                                <FormLabel>Department</FormLabel>
                                <StyledInputBase
                                    value={state.description}
                                    onChange={_handleChange}
                                    type="text"
                                    name="description"
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item sm={6} md={3} lg={3}>
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
                        <Grid item sm={6} md={3} lg={3}>
                            <FormGroup>
                                <FormLabel>Acadmemic Year</FormLabel>
                                <StyledInputBase
                                    value={state.description}
                                    onChange={_handleChange}
                                    type="text"
                                    name="description"
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item sm={6} md={3} lg={3}>
                            <FormGroup>
                                <FormLabel> Date (dd/mm/yyyy)</FormLabel>
                                <StyledInputBase
                                    value={state.description}
                                    onChange={_handleChange}
                                    type="text"
                                    name="description"
                                    required
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item sm={6} md={4} lg={4}>
                            <FormGroup>
                                <FormLabel>Time</FormLabel>
                                <div className="d-flex">
                                    <StyledInputBase
                                        value={state.description}
                                        onChange={_handleChange}
                                        type="time"
                                        name="time"
                                        required
                                    />
                                    <StyledInputBase
                                        value={"AM"}
                                        onChange={_handleChange}
                                        type="text"
                                        name="text"
                                        className="ml-1"
                                        required
                                    />
                                </div>
                            </FormGroup>
                        </Grid>
                        <Grid item sm={5} md={5} lg={5} >
                            <div className="m-1 d-flex felx-end">
                                <Button
                                    size="small"
                                    color="secondary"
                                    className="m-1 fullWidht"
                                    variant="contained">Submit</Button>
                                <Button
                                    color="secondary"
                                    className="m-1 fullWidht"
                                    size="small"
                                    variant="contained">Cancel</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    );
};

export default connect(null, {})(Markattendanceform);
