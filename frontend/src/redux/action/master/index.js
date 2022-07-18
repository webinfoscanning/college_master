import axios from "axios"
import moment from "moment";
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
import { getuserId } from "../../../components/logic/RecomendedFunctions";

const baseUrl = process.env.REACT_APP_PUBLIC_URL
const userId = getuserId()?.institutionId

export function ARRAY_INCRIMENT_DICRIMENT(value) {
  return async dispatch => {
    dispatch({
      type: "ARRAY_INCRIMENT_DICRIMENT",
      payload: value
    })
  }
}

export const ADD_MASTER = (payload) => {
  return async dispatch => {
    let url = `${baseUrl}/api/master/add`
    try {
      let res = await axios.post(url, payload)
      if (res.status === 200) {
        dispatch(GET_MASTER())
        toast.success(res.data.message, toastCss());
      } else {
        toast.error(res.data.message, toastCss());
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;

    }
  }
}

export const GET_MASTER = () => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=all`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_MASTER",
          payload: res.data.data.map((e, index) => ({
            ...e, idx: index + 1,
            createdOn: moment(e.createdOn).format("DD/MM/YYYY")
            , time: moment(e.createdOn).format("LT")
          }))
        })
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}

export const DELETE_MASTER = (id) => {

  return async dispatch => {
    try {
      let url = `${baseUrl}/api/master/delete/${id}?institutionId=${userId}`
      let res = await axios.delete(url, {})
      if (res.status === 200) {
        toast.success(res.data.message.message, toastCss());
        dispatch(GET_MASTER())

      } else {

        toast.error(res.data.message.message, toastCss());
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      toast.error(error.message, toastCss());
      return error;
    }
  }
}

export const EDIT_MASTER = (payload, id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/master/update/${id}`
    try {
      let res = await axios.put(url, payload)
      if (res.status === 200) {
        toast.success(res.data.message, toastCss());
        dispatch(GET_MASTER())
      } else {
        toast.error(res.data.message, toastCss());
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}

export const ADD_HEADER = (payload, id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/master/addsubvalue/${id}`
    try {
      let res = await axios.put(url, payload)

      if (res.status === 200) {
        toast.success(res.data.message.message, toastCss());
        dispatch({
          "type": "GET_HEADER",
          payload: res.data.message.data === null ? [] : JSON.parse(res.data.message.data)
        })

      } else {
        toast.error(res.data.message.message, toastCss());
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}

export const GET_HEADER = (id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/master/listsubvalue/${id}?institutionId=${userId}`
    try {
      let res = await axios.get(url,)
      if (res.status === 200) {
        dispatch(ARRAY_INCRIMENT_DICRIMENT(res.data.data.headerValue))
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const GET_HEADER_MODIFY = (data) => {
  return async dispatch => {
    dispatch({
      "type": "GET_HEADER",
      payload: data
    })
  }
}

export const GET_STUDENT_MASTER = () => {
  return async dispatch => {

    try {

      let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=addstudent`
      let res = await axios.get(url, {})
      if (res.status === 200) {

        dispatch({
          type: "GET_STUDENT_MASTER",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      return error;
    }
  }
}

export const GET_FEESTRUCTURE_MASTER = () => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=addfeestruc`
      let res = await axios.get(url, {})
      if (res.status === 200) {

        dispatch({
          type: "GET_FEESTRUCTURE_MASTER",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      return error;
    }
  }
}

export const GET_MAPSUBJECT_MASTER = () => {
  return async dispatch => {

    try {

      let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=addmapsub`
      let res = await axios.get(url, {})
      if (res.status === 200) {

        dispatch({
          type: "GET_MAPSUBJECT_MASTER",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      return error;
    }
  }
}

export const GET_EMPLOYEE_MASTER = () => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=addemployee`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_EMPLOYEE_MASTER",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      return error;
    }
  }
}
export const GET_EXPENSE_MASTER = () => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=addexp`
      let res = await axios.get(url, {})
      if (res.status === 200) {
        dispatch({
          type: "GET_EXPENSE_MASTER",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      return error;
    }
  }
}