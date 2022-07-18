import axios from "axios"
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
import { getuserId } from "../../../components/logic/RecomendedFunctions";
const userId = getuserId()?.institutionId
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export const ADD_ASSEST = (payload) => {
    return async dispatch => {
        let url = `${baseUrl}/api/asset/add`
        try {
            let res = await axios.post(url, payload)
            if (res.status === 200) {
                toast.success(res.data.message, toastCss());
            } else {
                toast.error(res.data.message, toastCss());

            }
        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return false
        }
    }
}
export const GET_ASSEST = () => {
    return async dispatch => {
        let url = `${baseUrl}/api/asset/list?institutionId=${getuserId()?.institutionId}`
        try {
            let res = await axios.get(url, {})
            if (res.status === 200) {
                dispatch({
                    type: 'GET_ASSEST', payload: res.data.data.map((e, index) => ({ ...e, idx: index + 1 }))
                })
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
export const GET_ASSET_MASTER = () => {
    return dispatch => {
        let url = `${baseUrl}/api/master/list?institutionId=${getuserId()?.institutionId}&page=addasset`
        axios.get(url, {})
            .then((response) => {
                dispatch({
                    type: "GET_ASSET_MASTER",
                    payload: response?.data?.data?.ConfigurationalMaster || []
                })
            }, (error) => {
                console.log(error);
            });
    }
}
export const DELETE_ASSET = (id) => {
    return async dispatch => {
        try {
            let url = `${baseUrl}/api/asset/delete/${id}?institutionId=${userId}`
            let res = await axios.delete(url, {})
            if (res.status === 200) {
                dispatch(GET_ASSEST())
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
export const UPLOAD_FILES = (payload, parms) => {
    return async dispatch => {
        let url = `${baseUrl}/api/asset/${parms}`
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