import React, { useState } from 'react'
import EditemployeeForm from '../components/Addemployee/Editemplaye/EditemployeeForm'

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import AddHeader from "../components/Master/AddHeader"
import GoBack from '../components/back/GoBack';
const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 4,
    marginRight: "0",
    marginLeft: "0",
    display: "flex",
    alignItems: 'center'
}));

const EditemployePage = () => {

    return (
        <>
            <AddHeader
                StyledButton={
                    <StyledButton
                        color="secondary"
                        variant="contained"
                    >
                        Edit Employee
                    </StyledButton>
                }
                ArrowBack={
                    <GoBack />}
            />
            <EditemployeeForm />
        </>
    )
}

export default EditemployePage