
import axios from "axios"
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export function REGISTER(payload) {
    return async dispatch => {
        let url = `${baseUrl}/api/user/signup`
        try {
            let res = await axios.post(url, payload)
            if (res.status === 200) {
                window.location.href = '/login'
            }
        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return error;
        }
    }
};