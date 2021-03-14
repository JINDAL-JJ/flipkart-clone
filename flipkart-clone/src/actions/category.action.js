import axios from "../api/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getCategory`);
        // console.log(res);

        if (res.status == 200) {
            const categoriesList = res.data.categoryList;

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoriesList },
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};
