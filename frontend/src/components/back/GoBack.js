import { IconButton } from '@mui/material'
import { IoMdArrowBack } from "react-icons/io";
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./../../style/style.css"
const GoBack = () => {
    const history = useHistory()
    return (
        <IconButton
            sx={{
                "&: hover": {
                    background: "none",
                }
            }}
            className="shadow-none"
            onClick={() => {
                history.goBack()
            }}
        >
            <IoMdArrowBack />
            <small>Back</small>
        </IconButton >
    )
}

export default GoBack