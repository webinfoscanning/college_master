import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
    Grid, FormGroup,
    FormLabel,
    TextField, Typography, Button,
    Box, Select, MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import "./../../style/style.css"
import { GET_EXPENSE_MASTER } from "../../redux/action/master"
import { ADD_EXPENSE } from "../../redux/action/Expense"
import { connect } from 'react-redux';
import { getuserId } from '../logic/RecomendedFunctions';

const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: "primary",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: "1em",
        borderRadius: (theme.shape.borderRadius),
    },
}));
const SelectInputBase = styled(Select)(({ theme }) => ({
    color: "primary",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: "1em",
        borderRadius: (theme.shape.borderRadius),
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

const ExpenseForm = (props) => {
    const theme = useTheme()
    const { GET_EXPENSE_MASTER, getExpenseMaster, ADD_EXPENSE } = props

    const [state, setState] = useState([])

    useEffect(() => {
        GET_EXPENSE_MASTER()
    }, [])

    const _handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const _handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            "institutionId": getuserId()?.institutionId,
            ...state
        }
        ADD_EXPENSE(payload)
        setState([])
    }


    return (
        <Box sx={{ boxShadow: 2, padding: 1, background: theme.palette.common.lighter }}>
            <form>
                <Typography color="secondary" variant="h6">Expense Information</Typography>
                <Grid
                    container spacing={3}>
                    {
                        getExpenseMaster?.ConfigurationalMaster?.map((item, i) => (
                            item.name === "Expense Type" ? (
                                <Grid
                                    item sm={2} md={3} key={i}>
                                    <FormGroup>
                                        <FormLabel>{item.name}</FormLabel>
                                        <StyledSelectInput
                                            type="select"
                                            name="expType"
                                            onChange={_handleChange}
                                        >
                                            {item?.headerValue !== null && item?.headerValue.map((i) => {
                                                return (
                                                    <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                                                )
                                            })}
                                        </StyledSelectInput>
                                    </FormGroup>
                                </Grid>
                            ) : null
                        ))
                    }
                    <Grid
                        item sm={2} md={4}>
                        <FormGroup>
                            <FormLabel>Expense Amount</FormLabel>
                            <StyledInputBase
                                type="text"
                                name="expAmount"
                                onChange={_handleChange}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid
                        item sm={2} md={4}>
                        <FormGroup>
                            <FormLabel>Expense Towards Account</FormLabel>
                            <StyledInputBase
                                type="text"
                                name="expTowordsAccount"
                                onChange={_handleChange}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid
                        item sm={2} md={4}>
                        <FormGroup>
                            <FormLabel>Date (dd/mm/yyyt)</FormLabel>
                            <StyledInputBase
                                type="date"
                                name="expDate"
                                onChange={_handleChange}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid
                        item sm={4} md={4}>
                        <FormGroup>
                            <FormLabel>Reference Number</FormLabel>
                            <StyledInputBase
                                type="text"
                                name="refNumber"
                                onChange={_handleChange}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid
                        item sm={4} md={4}>
                        <FormGroup>
                            <FormLabel>Payment By</FormLabel>
                            <StyledInputBase
                                type="text"
                                name="paymentBy"
                                onChange={_handleChange}
                            />
                        </FormGroup>
                    </Grid>
                    {
                        getExpenseMaster?.ConfigurationalMaster?.map((item, i) => (
                            item.name === "Payment Mode" ? (
                                <Grid
                                    item sm={2} md={3} key={i}>
                                    <FormGroup>
                                        <FormLabel>{item.name}</FormLabel>
                                        <StyledSelectInput
                                            type="select"
                                            name="paymentMode"
                                            onChange={_handleChange}
                                        >
                                            {item?.headerValue !== null && item?.headerValue.map((i) => {
                                                return (
                                                    <MenuItem value={JSON.stringify(i)} >{i.subHeader}</MenuItem>
                                                )
                                            })}
                                        </StyledSelectInput>
                                    </FormGroup>
                                </Grid>
                            ) : null
                        ))
                    }

                    <Grid
                        item sm={2} md={4}>
                        <FormGroup>
                            <FormLabel>Vender Name</FormLabel>
                            <StyledInputBase
                                type="text"
                                name="venderName"
                                onChange={_handleChange}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <div className='flex-end'>
                    <Button
                        variant='contained'
                        color='secondary'
                        className='m-1'
                        onClick={_handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant='contained' color='secondary'
                        className='m-1'>Cancel</Button>
                </div>
            </form>
        </Box>
    )
}

const mapStateProps = (state) => {
    return {
        getExpenseMaster: state.master.getExpenseMaster
    }
}

export default connect(mapStateProps, { GET_EXPENSE_MASTER, ADD_EXPENSE })(ExpenseForm)