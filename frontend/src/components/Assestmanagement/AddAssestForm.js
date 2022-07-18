import styled from '@emotion/styled';
import {
  FormLabel, Grid, FormGroup,
  TextField,
  Box, FormControl,
  RadioGroup,
  Button,
  Checkbox,
  Select,
  MenuItem
} from '@mui/material'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import React, { useEffect, useMemo, useState } from 'react'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import DocumentForm from "./DocumentForm"
import Agrement from './Agrement';
import { connect } from 'react-redux';
import { ADD_ASSEST, UPLOAD_FILES, GET_ASSET_MASTER } from '../../redux/action/Assets';
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
    width: "200px",
    height: "20px",
  },
}));
const AddAssestForm = (props) => {
  const { ADD_ASSEST,
    UPLOAD_FILES,
    GET_ASSET_MASTER,
    getAssetMaster } = props
  const [data, setdata] = useState([])
  const [openForm, setForm] = useState({
    Product: true,
    Document: false,
    Agrement: false
  })
  const [category, setcategory] = useState({})
  const [state, setState] = useState({

  })
  const _handleChange = (e) => {
    const { name, } = e.target
    setForm(prevState => ({ ...prevState, [name]: !prevState[name] }));
  }
  const _handleOnchnage = (e, keyname) => {
    const { name, value } = e.target
    setState({
      ...state, [keyname]: { ...state[keyname], [name]: value }
    })
  }
  const handleCategroy = (e) => {
    const { name, value } = e.target
    setcategory(value)
  }
  const _handleUploadpurchaseBill = async (e, keyname) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("productPurchaseBill", files[0]);
    let res = await UPLOAD_FILES(formData, "prodpurbill")
    setState({
      ...state, "product": { ...state["product"], ["purchaseBill"]: res.uploadPath }
    })
  }
  const _handleuploadProductDocument = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("productDoc", files[0]);
    let res = await UPLOAD_FILES(formData, "proddoc")
    setState({
      ...state, "product": { ...state["product"], ["uploadProductDocument"]: res.uploadPath }
    })
  }
  const _handleuploadProductImg = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("productImage", files[0]);
    let res = await UPLOAD_FILES(formData, "prodimage")
    setState({
      ...state, "product": { ...state["product"], ["uploadProductImage"]: res.uploadPath }
    })
  }
  const _handleuploadDocument = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("uploadDoc", files[0]);
    let res = await UPLOAD_FILES(formData, "docfile")
    setState({
      ...state, "document": { ...state["document"], ["uploadDocument"]: res.uploadPath }
    })
  }
  const _handleuploadAgreemnetDocument = async (e) => {
    const files = e.target.files;
    var formData = new FormData();
    formData.append("agreeUploadDoc", files[0]);
    let res = await UPLOAD_FILES(formData, "agreedocfile")
    setState({
      ...state, "agreement": { ...state["agreement"], ["uploadDocument"]: res.uploadPath }
    })
  }
  const _handleSubmit = (e) => {
    e.preventDefault()
    let payload = {
      product: JSON.stringify(state.product),
      document: JSON.stringify(state.document),
      agreement: JSON.stringify(state.agreement),
      category: category,
      institutionId: getuserId()?.institutionId
    }
    ADD_ASSEST(payload)
  }
  useEffect(() => {
    GET_ASSET_MASTER()
  }, [GET_ASSET_MASTER])
  useMemo(() => {
    setdata(getAssetMaster)
  }, [setdata])
  return (
    <div>
      <br />
      <Grid container spacing={1}>
        {
          data?.map((item) => {
            return (
              <Grid item sm={3} md={3}>
                <FormLabel className='m-1'>{item?.name}</FormLabel>
                <SelectInputBase
                  type={"select"}
                  name={item?.name}
                  onChange={handleCategroy} >
                  {
                    item?.headerValue.map((i) => {
                      return (
                        <MenuItem value={JSON.stringify(i)}>{i.subName}</MenuItem>
                      )
                    })
                  }
                </SelectInputBase>
              </Grid>
            )
          })
        }
      </Grid>
      <br />
      <Box
        boxShadow={3}
        sx={{
          m: 1,
          backgroundColor: "secondary.light",
          p: 1
        }}
      >
        <form onSubmit={_handleSubmit}>
          <FormControl>
            <FormGroup>
              <FormControlLabel

                control={<Checkbox color="secondary"
                  defaultChecked
                  icon={<RadioButtonUncheckedOutlinedIcon />}
                  checkedIcon={<RadioButtonCheckedOutlinedIcon />}
                />}
                label="Product" />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormControlLabel
              name="Document"
              onChange={_handleChange}
              control={<Checkbox color="secondary"
                icon={<RadioButtonUncheckedOutlinedIcon />}
                checkedIcon={<RadioButtonCheckedOutlinedIcon />}
              />} label="Document" />
          </FormControl>
          <FormControl>
            <FormControlLabel
              name="Agrement"
              onChange={_handleChange}
              control={<Checkbox color="secondary"
                icon={<RadioButtonUncheckedOutlinedIcon />}
                checkedIcon={<RadioButtonCheckedOutlinedIcon />}
              />} label="Agrement" />
          </FormControl>
          <Grid container spacing={4}>
            <Grid item sm={6} md={4} lg={4} >
              <FormGroup>
                <FormLabel>Product Name</FormLabel>
                <StyledInputBase
                  type="text"
                  name="productName"
                  onChange={(e) => { _handleOnchnage(e, "product") }}
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <FormGroup>
                <FormLabel>Product Start</FormLabel>
                <StyledInputBase
                  type="text"
                  name="productStart"
                  onChange={(e) => { _handleOnchnage(e, "product") }}
                  required
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <FormGroup>
                <FormLabel>Purchase Bill</FormLabel>
                <StyledInputBase
                  name="purchaseBill"
                  onChange={(e) => { _handleUploadpurchaseBill(e) }}
                  required
                  accept="image/*" id="contained-button-file" multiple type="file" />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <FormGroup>
                <FormLabel>Product Description</FormLabel>
                <StyledInputBase
                  type="text"
                  name="productDescription"
                  multiline
                  onChange={(e) => { _handleOnchnage(e, "product") }}
                  required
                  minRows={2}
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <div>
                <FormGroup>
                  <FormLabel>AMC Date</FormLabel>
                  <FormControl>
                    <div className='d-flex'>
                      <RadioGroup row className='fullWidht'>
                        <FormControlLabel value="Yes"
                          onChange={(e) => { _handleOnchnage(e, "product") }}
                          required
                          name="AMC"
                          control={<Radio color='secondary' />} label="Yes" />
                        <FormControlLabel
                          onChange={(e) => { _handleOnchnage(e, "product") }}
                          required
                          value="No"
                          name="AMC"
                          control={<Radio color='secondary' />} label="No" />
                      </RadioGroup>
                      <StyledInputBase
                        name="amcDate"
                        type="date"
                        onChange={(e) => { _handleOnchnage(e, "product") }}
                        required
                        className='fullWidht'
                      />
                    </div>
                  </FormControl>
                </FormGroup>
                <Grid container>
                  <Grid item sm={12} md={12} lg={12}>
                    <FormGroup>
                      <FormLabel> Upload Product image</FormLabel>
                      <StyledInputBase
                        onChange={(e) => { _handleuploadProductImg(e) }}
                        required
                        name="uploadProductImage"
                        accept="image/*" id="contained-button-file" multiple type="file" />
                    </FormGroup>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <FormGroup>
                <FormLabel>Notify Before Expiry</FormLabel>
                <StyledInputBase
                  type="text"
                  name="description"
                  onChange={(e) => { _handleOnchnage(e, "product") }}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Document</FormLabel>
                <StyledInputBase
                  onChange={(e) => { _handleuploadProductDocument(e) }}
                  required
                  name="uploadProductDocument"
                  accept="image/*" id="contained-button-file" multiple type="file" />s
              </FormGroup>
            </Grid>
          </Grid>
          {
            openForm.Document ? <DocumentForm
              _handleOnchnage={_handleOnchnage}
              _handleuploadDocument={_handleuploadDocument}
            /> : null
          }
          {
            openForm.Agrement ? <Agrement
              _handleOnchnage={_handleOnchnage}
              _handleuploadDocument={_handleuploadAgreemnetDocument} /> : null
          }
          <div className='flex-end'>
            <div>
              <Button
                className='fullWidht'
                color="secondary"
                variant='contained'
                type='submit'
              >Submit</Button>
            </div>
          </div>
        </form>

      </Box>
    </div >
  )
}
const mapStateprops = (state) => {
  return {
    getAssetMaster: state.Assest.getAssetMaster
  }
}
export default connect(mapStateprops, {
  ADD_ASSEST,
  UPLOAD_FILES,
  GET_ASSET_MASTER
})(AddAssestForm)
