import { authConstants } from './constants';
import axios from '../api/axios';

export const login = (user) => {
    // console.log(user);

    return async (dispatch) => {

        const res = await axios.post(`/admin/signIn`, {
            ...user
        })

        if (res.status === 200) {
            const {token, user} = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            console.log("DFGH");
            console.log(res.data);
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: res.data.error}
            })
        }
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'failed to login'}
            })
        }
    }
}

export const signOut = (req, res) => {
    return async dispatch => {
        dispatch({type: authConstants.LOGOUT_REQUEST});

        const res = await axios.post(`/admin/signOut`);

        if (res.status == 200) {
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {error: req.data.error}
            })
        }
    }
}