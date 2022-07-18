import { Button } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
const AddMotherdetails = (props) => {
    const { _handleaddperentNameForparentsdetails, buttonShow, btncolor } = props
    return (
        <>
            <Button
                onClick={() => { _handleaddperentNameForparentsdetails("Mother") }}
                color={btncolor === "gray" ? 'inherit' : 'secondary'}
                variant='contained'
                sx={{ m: 1 }}
                disabled={buttonShow}
                endIcon={<AddIcon />}
            >
                Add mother details
            </Button>
        </>
    )
}

export default AddMotherdetails