import axios from "axios"
import { toast } from "react-toastify"
import { getuserId, toastCss } from "../../../components/logic/RecomendedFunctions"
const userId = getuserId()?.institutionId
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export function ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT(value) {
  return async dispatch => {
    dispatch({
      type: "ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT",
      payload: value
    })
  }
}
export function GET_MAP_ALL_SUBJECT() {
  return async dispatch => {
    let url = `${baseUrl}/api/map/list?institutionId=${userId}`
    try {
      let res = await axios.get(url, {})
      if (res.data.status) {
        dispatch({
          type: "GET_MAP_ALL_SUBJECT",
          payload: res.data.data
        })

      }
    } catch (error) {
      toast.success(error.message, toastCss());
      return error;
    }
  }
}

export function GET_MASTER_MAP_SUBJECT() {
  return async dispatch => {
    let url = `${baseUrl}/api/master/list?institutionId=${userId}&page=addmapsub`
    try {
      let res = await axios.get(url, {})
      if (res.data.status) {
      }
    } catch (error) {
      toast.success(error.message, toastCss());
      return error;
    }
  }
}

export const ADD_MAP_SUBJECT = (payload) => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/add`
    try {
      let res = await axios.post(url, payload)

      if (res.status === 200) {
        dispatch({ type: 'ADD_MAP_SUBJECT', payload: res.data.message.data })
        toast.success(res.data.message.message, toastCss())
      }
      else {
        toast.error(res.data.message.message, toastCss())
      }
    }
    catch (error) {
      toast.error(error.message, toastCss())
      return error;
    }
  }
}

export const ADD_MAP_SUBJECT_HEADER = (payload, id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/addsubjectdetails/${id}`
    try {
      let res = await axios.put(url, payload)
      if (res.status === 200) {
        toast.success(res.data.message, toastCss());
        dispatch(GET_MAP_SUBJECT_HEADER(id))
      } else {
        toast.error(res.data.message.message, toastCss());
      }
    } catch (error) {
      toast.success(error.message, toastCss());
      return error;
    }
  }
}

export const GET_MAP_SUBJECT_HEADER = (id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/listsubvalue/${id}?institutionId=${userId}`
    try {
      let res = await axios.get(url)

      if (res.status === 200) {
        dispatch(ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT(res.data.data.subjectDetails || []))
      }
    } catch (error) {
      toast.success(error.message, toastCss());
      return error;
    }
  }
}

export const GET_SUBJECT_FACULTY_NOTMAPPED = () => {

  return async dispatch => {
    let url = `${baseUrl}/api/map/classlist?institutionId=${userId}`

    try {
      let res = await axios(url)

      if (res.status === 200) {
        dispatch({
          type: "GET_SUBJECT_FACULTY_NOTMAPPED",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      toast.error(error.message, toastCss())
    }
  }
}

export const GET_FACULTY_LIST = () => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/faclisttomapwithsub?institutionId=${userId}`
    try {
      let res = await axios.get(url)

      if (res.status === 200) {
        dispatch({
          type: "GET_FACULTY_LIST",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      toast.error(error.message, toastCss())
    }
  }
}

export const MAP_FACULTY_TO_SUBJECT = (payload) => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/mapfactosub`

    try {
      let res = await axios.post(url, payload)

      if (res.status === 200) {
        toast.success(res.data.message, toastCss());
        return true
      }
    }
    catch (error) {
      toast.error(error.message, toastCss())
    }
  }
}

export const GET_MAPPED_SUBJECT_FACULTIES = () => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/submappedwithfac?institutionId=${userId}`
    try {
      let res = await axios.get(url)
      if (res.status === 200) {
        dispatch({
          type: "GET_MAPPED_SUBJECT_FACULTIES",
          payload: res.data.data
        })
      }
    }
    catch (error) {
      toast.error(error.message, toastCss())
    }
  }
}

export function GET_ALL_SUBJECTS() {
  return async dispatch => {
    let url = `${baseUrl}/api/map/getallsubjects?institutionId=${userId}`
    try {
      let res = await axios.get(url, {})
      if (res.data.status) {
        dispatch({
          type: "GET_ALL_SUBJECTS",
          payload: res.data.data
        })

      }
    } catch (error) {
      toast.success(error.message, toastCss());
      return error;
    }
  }
}
export const DELETE_SUBJECT_FACULTY_NOTMAPPED = (id) => {
  return async dispatch => {
    try {
      let url = `${baseUrl}/api/map/remsubfromfac/${id}`
      let res = await axios.delete(url, {})
      if (res.status === 200) {
        dispatch(GET_MAP_ALL_SUBJECT())
        toast.success(res.data.message, toastCss());
      } else {
        toast.error(res.data.message.message, toastCss());
      }
    } catch (error) {
      toast.error(error.response?.data.error?.message, toastCss());
      return error;
    }
  }
}
export const EIDT_MAP_FACULTY_TO_SUBJECT = (payload,id) => {
  return async dispatch => {
    let url = `${baseUrl}/api/map/editsubtofac/${id}`
    try {
      let res = await axios.put(url, payload)
      if (res.status === 200) {
        toast.success(res.data.message, toastCss());
        dispatch(GET_MAP_ALL_SUBJECT())
        return true
      }
    }
    catch (error) {
      toast.error(error.message, toastCss())
    }
  }
}