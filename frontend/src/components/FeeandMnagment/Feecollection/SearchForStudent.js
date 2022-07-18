import React, { useState } from 'react'
import { Box, FormGroup, Grid, TextField, Button } from '@mui/material'
import styled from '@emotion/styled';
import "../../../style/style.css"
import { connect } from 'react-redux';
import { GET_STUDENT_FEE_COLLECTION_BY_ADDMISSONID } from '../../../redux/action/feestructure';

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    borderRadius: 0,
  },
  '& .MuiOutlinedInput-input': {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    }
  }
}));
const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "1em"
}));

const SearchForStudent = (props) => {
  const { GET_STUDENT_FEE_COLLECTION_BY_ADDMISSONID, setData , setpaymentDetails} = props
  const [search, setsearchvalue] = useState()

  const _handleSearch = async (e) => {
    e.preventDefault();
    let res = await GET_STUDENT_FEE_COLLECTION_BY_ADDMISSONID(search)
    setData(res)
    setpaymentDetails(res[0]?.paymentDetails)
  }
  const _handleChange = (e) => {
    if (e.target.value === "") {
      setData([])
    }
    setsearchvalue(e.target.value)

  }
  return (
    <Box
      boxShadow={3}
      component="form"
      sx={{
        m: 1,
        backgroundColor: "secondary.light",
        height: "100px"
      }}

    >
      <form
        id={"search"}
      >
        <StyledDiv>
          <Grid container spacing={1}>
            <Grid item sm={2} md={2} lg={2} >
              <Button
                color={"secondary"}
                variant="contained"
                className='fullWidht'
              >
                Addmission ID
              </Button>
            </Grid>
            <Grid item sm={6} md={3} lg={3} >
              <FormGroup>
                <StyledInputBase
                  type="number"
                  name="name"
                  onChange={_handleChange}
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <Button
                color={"secondary"}
                variant="contained"
                type="submit"
                className='fullWidht'
                onClick={_handleSearch}

              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </StyledDiv>
      </form>

    </Box >
  )
}

export default connect(null, { GET_STUDENT_FEE_COLLECTION_BY_ADDMISSONID })(SearchForStudent)