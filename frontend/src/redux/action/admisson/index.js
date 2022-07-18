import axios from "axios"
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
import { getuserId } from "../../../components/logic/RecomendedFunctions";
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export function ADD_OPEN_PRINT_ADDMISION_CARD(value) {
  return async dispatch => {
    dispatch({
      type: "ADD_OPEN_PRINT_ADDMISION_CARD",
      payload: value
    })
  }
}

export const GET_SEARCH_STUDENT = (value) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/student/search?institutionId=${getuserId().institutionId}&searchfield=${value}`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_SEARCH_STUDENT",
          payload: res.data.data || []
        })
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const GET_FEE_STRUCTURE_ADMISSION = (id) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/student/getfeesturforstu/${id}`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_FEE_STRUCTURE_ADMISSION",
          payload: res.data.data || []
        })
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const GET_STUDENT_DETAILS = (id) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/student/getstualldetail/${id}`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_STUDENT_DETAILS",
          payload: res.data.data || []
        })

      }
      return res.data.data
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const MAP_STUDENT_APPLICATION_FOR_ADDMISION = (payload) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/student/mapfee`
      let res = await axios.post(url, payload)
      if (res.status === 200) {
        toast.success(res.data?.message, toastCss());
        return res.data.data
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}

export const GET_MAPPED_FEE_STUDENT = (id) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/student/getstudetamapwithfee/${id}`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_MAPPED_FEE_STUDENT",
          payload: res.data.data || []
        })
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
