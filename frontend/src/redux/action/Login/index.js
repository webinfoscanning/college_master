
import axios from "axios"
import { toast } from 'react-toastify';
import { toastCss } from "../../../components/logic/RecomendedFunctions"
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export function LOGIN(payload) {
    return async dispatch => {
        let url = `${baseUrl}/api/user/login`
        try {
            let res = await axios.post(url, payload)
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userinfo", JSON.stringify(res.data.user))
                dispatch({ type: 'LOGIN', payload: { user: res.data.user, token: res.data.token } })
                return true
            } else {
                toast.error(res.data.message, toastCss());
                return false
            }
        } catch (error) {
            toast.error(error.response?.data.error?.message, toastCss());
            return error;
        }
    }
};
