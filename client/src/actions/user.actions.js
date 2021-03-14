import { userConstants } from './constants';
import axios from '../api/axios';

export const signUp = (user) => {
    // console.log(user);

    return async (dispatch) => {

        dispatch({ type: userConstants.USER_REGISTER_REQUEST});
        const res = await axios.post(`/admin/signUp`, {
            ...user
        })

        if (res.status === 200) {
            const {message} = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        } else {
            console.log("DFGH");
            console.log(res.data);
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: { error: res.data.error}
            })
        }
    }
}