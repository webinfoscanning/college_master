import axios from "axios"
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
import { getuserId } from "../../../components/logic/RecomendedFunctions";
const userId = getuserId()?.institutionId
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export const ADD_EXPENSE = (payload) => {
    return async dispatch => {
        let url = `${baseUrl}/api/expense/add`
        try {
            let res = await axios.post(url, payload)
            if (res.status === 200) {
                dispatch({ type: 'ADD_EXPENSE', payload: res.data.data })
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

export const GET_EXPENSE = () => {
    return async dispatch => {

        let url = `${baseUrl}/api/expense/list?institutionId=${getuserId()?.institutionId}`
        try {
            let res = await axios.get(url, {})
            if (res.status === 200) {
                dispatch({ type: 'GET_EXPENSE', payload: res.data.data.map((e, index) => ({ ...e, idx: index + 1 })) })
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

export const DELETE_EXPENSE = (id) => {
    return async dispatch => {
        try {

            let url = `${baseUrl}/api/expense/delete/${id}?institutionId=${userId}`
            let res = await axios.delete(url, {})
            if (res.status === 200) {
                dispatch(GET_EXPENSE())
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