import { Chip, TableCell, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import moment from 'moment';

const StyledDiv = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "1em"
}));
const StyledInputBase = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: "1em",
        background: theme.palette.common.lighter,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "100%",
        },
        borderRadius: 4,
    },
}));

const Timeslots = () => {

    const [timeslots, setTimeslots] = useState(3)

    const startOfDay = moment('08:00:00', 'hh:mm a')

    const hours = Array(11).fill(null).map((_, i) => startOfDay.add(i ? 60 : 0, 'minutes').format('hh:mm a'))

    return (

        <div>

            {
                hours.map((item, i) => {
                    return (
                        <>
                            <div align="center">

                                {/* <Button
                                    variant='outlined'
                                    key="one"
                                    sx={{ width: "100px", height: "30px", marginTop: "50px" }}
                                    disabled
                                >
                                    {item}
                                </Button> */}
                                {/* <Button key="one" sx={{ width: "100px", height: "30px", visibility: "hidden" }}></Button>
                                <Button key="one" sx={{ width: "100px", height: "30px", visibility: "hidden" }}></Button> */}
                                <ButtonGroup
                                    orientation="vertical"
                                    aria-label="vertical outlined button group"
                                    color='secondary'
                                    sx={{ marginTop: "50px" }}
                                >
                                    <StyledInputBase key="one" value={item} disabled></StyledInputBase>
                                    <StyledInputBase key="one" sx={{ visibility: "hidden" }}></StyledInputBase>
                                    <StyledInputBase key="one" sx={{ visibility: "hidden" }}></StyledInputBase>

                                </ButtonGroup>
                            </div>


                        </>
                    )
                })
            }

        </div>

    )
}

export default Timeslots;