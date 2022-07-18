import axios from "axios"
import { toast } from "react-toastify"
import { getuserId, toastCss } from "../../../components/logic/RecomendedFunctions"
const baseUrl = process.env.REACT_APP_PUBLIC_URL
const userId = getuserId()?.institutionId

export function ADD_STUDENT(payload) {

    return async dispatch => {

        try {

            let url = `${baseUrl}/api/student/add`
            let res = await axios.post(url, payload)

            if (res.status === 200) {
                toast.success(res.data.message, toastCss())

                dispatch({
                    type: "ADD_STUDENT",
                    payload: res.data.data
                })
                return res.data.data
            }
            else {
                toast.error(res.data.message, toastCss())
            }

        }
        catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());

            return error;
        }
    }
};

export function ADD_PERENTS_DETAILS(payload, studentId) {
    return async dispatch => {
        let url = `${baseUrl}/api/student/parentdetails?stuId=${studentId}&institutionId=${userId}`
        try {
            let res = await axios.post(url, payload)
            if (res.status === 200) {
                toast.success(res.data.message, toastCss())
                return true
            }
            else {
                toast.error(res.data.message, toastCss())
            }

        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return false;
        }
    }
};

export function STUDENT_ID(studentId) {
    return async dispatch => {
        dispatch({
            type: "STUDENT_ID",
            payload: studentId
        })
    }
}
export const UPLOAD_FILES = (payload, parms) => {
    return async dispatch => {
        let url = `${baseUrl}/api/student/${parms}`
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