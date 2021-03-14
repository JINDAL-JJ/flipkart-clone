import { userConstants } from '../actions/constants';

const initialState = {
    error: null, 
    message: '',
    laoding: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state= {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                laoding: false,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state={
                ...state,
                loading: false,
                error: action.payload.error     
            }
            break;
    }
    return state;
}