import axios from "axios"
import { toast } from "react-toastify"
import { getuserId, toastCss } from "../../../components/logic/RecomendedFunctions"
const baseUrl = process.env.REACT_APP_PUBLIC_URL
const userId = getuserId()?.institutionId
const id = getuserId()?.id

export function ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS(value) {
    return async dispatch => {
        dispatch({
            type: "ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS",
            payload: value
        })
    }
}
export function GET_FEE_STRUCHER_LIST() {
    return async dispatch => {
        let url = `${baseUrl}/api/fee/list?institutionId=${userId}`
        try {
            let res = await axios.get(url, {})
            if (res.data.status) {
                dispatch({ type: 'GET_FEE_STRUCHER_LIST', payload: res.data?.data.map((e, index) => ({ ...e, idx: index + 1 })) })

            }
        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return error;
        }
    }
}
export function ADD_FEE_VALUE(payload, rowrefid) {
    return async dispatch => {
        let url = `${baseUrl}/api/fee/addsubvalue/${rowrefid}`
        try {
            let res = await axios.put(url, payload)
            if (res.data.message) {
                toast.success(res.data?.message.message, toastCss());
                dispatch(GET_FEE_VALUE(rowrefid))
            }
        } catch (error) {
            toast.success(error.message, toastCss());
            return error;
        }
    }
}
export function GET_FEE_VALUE(rowrefid) {
    return async dispatch => {
        let url = `${baseUrl}/api/fee/getdata/${rowrefid}?institutionId=${userId}`
        try {
            let res = await axios.get(url, {})
            if (res.data.status) {
                dispatch(ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS(res.data.data[0]?.feeValue || []))
            }
        } catch (error) {
            toast.success(error.message, toastCss());
            return error;
        }
    }
}
export function ADD_FEE_STRUCTURE(payload) {
    return async dispatch => {
        let url = `${baseUrl}/api/fee/add`
        try {
            let res = await axios.post(url, payload)
            if (res.status === 200) {
                toast.success(res.data.message.message, toastCss());
                dispatch(GET_FEE_STRUCHER_LIST())
                return true

            }
            else {
                toast.error(res.data.message, toastCss())
            }
        }
        catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return false

        }
    }
}

export const EDIT_FEE_STRUCTURE = (payload, id) => {
    return async dispatch => {
        try {
            let url = `${baseUrl}/api/fee/update/${id}`
            let res = await axios.put(url, payload)
            if (res.status === 200) {
                toast.success(res.data.message, toastCss());
                dispatch(GET_FEE_STRUCHER_LIST())
            }
            else {
                toast.error(res.data.message, toastCss());
            }
        }
        catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return error;
        }
    }
}

export const DELETE_FEE = (id) => {
    return async dispatch => {
        let url = `${baseUrl}/api/fee/delete/${id}?institutionId=${userId}`
        try {
            let res = await axios.delete(url)

            if (res.status === 200) {
                toast.success(res.data.message, toastCss())
                dispatch(GET_FEE_STRUCHER_LIST())

            }
            else {
                toast.error(res.data.message, toastCss())
            }
        }
        catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            ;
            return error;
        }
    }
}
export function GET_STUDENT_FEE_COLLECTION_BY_ADDMISSONID(id) {
    return async dispatch => {
        let url = `${baseUrl}/api/student/studetfeecollbyadmissid/${id}`
        try {
            let res = await axios.get(url, {})
            if (res.data.status) {
                dispatch({
                    type: 'GET_STUDENT_FEE_COLLECTION_BY_ADDMISSONID',
                    payload: res.data?.data
                })
                return res.data?.data

            }
        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return error;
        }
    }
}

export const FEE_COLLECTION = (payload) => {
    return async dispatch => {
        try {
            let url = `${baseUrl}/api/student/collectfee`
            let res = await axios.post(url, payload)
            if (res.status === 200) {
                toast.success(res.data?.message, toastCss());
                return res.data.data
            }
            return res.data.data
        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return error;
        }
    }
}