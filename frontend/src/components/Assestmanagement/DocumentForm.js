import styled from '@emotion/styled';
import {
  FormLabel, Grid, FormGroup,
  TextField,
  Box,
  Button
} from '@mui/material'
import React from 'react'

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));
const DocumentForm = (props) => {
  const { _handleOnchnage, _handleuploadDocument } = props
  return (
    <div>
      <br />
      <Box >
        <Grid container spacing={4}>
          <Grid item sm={6} md={4} lg={4} >
            <FormGroup>
              <FormLabel>Document Name</FormLabel>
              <StyledInputBase
                type="text"
                name="documentName"
                onChange={(e) => { _handleOnchnage(e, "document") }}
              />
            </FormGroup>
          </Grid>
          <Grid item sm={6} md={4} lg={4}>
            <FormGroup>
              <FormLabel>Upload Document</FormLabel>
              <StyledInputBase
                name="uploadDocument"
                onChange={(e) => { _handleuploadDocument(e) }}
                accept="image/*" id="contained-button-file" multiple type="file" />
            </FormGroup>
          </Grid>
          <Grid item sm={6} md={4} lg={4}>
            <FormGroup>
              <FormLabel>Renewal</FormLabel>
              <StyledInputBase
                type="text"
                name="renewal"
                onChange={(e) => { _handleOnchnage(e, "document") }}
              />
            </FormGroup>
          </Grid>
          <Grid item sm={4} md={8} lg={8}>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <StyledInputBase
                type="text"
                name="description"
                multiline
                maxRows={3}
                onChange={(e) => { _handleOnchnage(e, "document") }}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default DocumentForm
