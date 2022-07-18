import axios from "axios"
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
import { getuserId } from "../../../components/logic/RecomendedFunctions";

const baseUrl = process.env.REACT_APP_PUBLIC_URL
const userId = getuserId()?.institutionId

export function ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EXPERINCE(value) {
  return async dispatch => {
    dispatch({
      type: "ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EXPERINCE",
      payload: value
    })
  }
}
export function ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EDUCATION(value) {
  return async dispatch => {
    dispatch({
      type: "ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EDUCATION",
      payload: value
    })
  }
}

export function ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_DEPENDENT(value) {
  return async dispatch => {
    dispatch({
      type: "ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_DEPENDENT",
      payload: value
    })
  }
}



export const ADD_EMPLOYEE = (payload) => {
  return async dispatch => {
    let url = `${baseUrl}/api/employee/add`
    try {
      let res = await axios.post(url, payload)

      if (res.status === 200) {
        dispatch({ type: 'ADD_EMPLOYEE', payload: res.data.data })
        toast.success(res.data.message, toastCss());
        return true
      } else {
        toast.error(res.data.message, toastCss());
        return true

      }
    } catch (error) {
      toast.success(error.message, toastCss());
      return false
    }
  }
}

export const GET_EMPLOYEELIST = () => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/employee/list?institutionId=${userId}`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_EMPLOYEELIST",
          payload: res.data.data.map((e, index) => ({ ...e, idx: index + 1 }))
        })
      }
    }
    catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const DELETE_EMOLPYEE = (id) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/employee/delete/${id}?institutionId=${userId}`
      let res = await axios.delete(url, {})
      if (res.status === 200) {
        dispatch(GET_EMPLOYEELIST())
        toast.success(res.data.message.message, toastCss());
      } else {
        toast.error(res.data.message.message, toastCss());
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const GET_EMPLOYEE = (id) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/employee/getdata/${id}?institutionId=${userId}`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_EMPLOYEE",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const EDIT_EMPLOYEE = (payload, id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/employee/update/${id}`
    try {
      let res = await axios.put(url, payload)
      if (res.status === 200) {
        dispatch(GET_EMPLOYEELIST())
        toast.success(res.data.message, toastCss());
        return true
      } else {
        toast.error(res.data.message, toastCss());
        return true

      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return false
    }
  }
}

export const UPLOAD_FILES = (payload, parms) => {
  return async dispatch => {
    let url = `${baseUrl}/api/employee/${parms}`
    try {

      let res = await axios.post(url, payload)

      if (res.status === 200) {
        toast.success(res.data.message, toastCss());
        return res.data.data
      } else {
        toast.error(res.data.message, toastCss());
        return true

      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return false
    }
  }
}