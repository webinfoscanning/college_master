import React from 'react'
import AddHeader from "../Master/AddHeader"
import Goback from "../../components/back/GoBack"
import SearchBar from "../Master/SearchBar"
import { Typography } from '@mui/material'
const Header = () => {
    return (
        <div>
            <Typography
                variant='h6'
                color="secondary"
            >Select Faculty to Subject</Typography>
            {/* <SearchBar /> */}
        </div>
    )
}
const SelectFacultyTosubjectHeader = () => {
    return (
        <div>
            <AddHeader
                StyledButton={<Header />}
                ArrowBack={<Goback />}
            />
        </div>
    )
}

export default SelectFacultyTosubjectHeader