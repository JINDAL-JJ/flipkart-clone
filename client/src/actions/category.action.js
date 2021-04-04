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

export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post("/category/create", form);
        if (res.status === 201) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: { category: res.data.category },
            });
        } else {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error,
            });
        }
    };
};

export const updateCategories = (form) => {
    return async (dispatch) => {
        const res = await axios.post("/category/update", form);
        if (res.status === 201) {
            return true;
            console.log(res);
        } else {
            console.log(res);
        }
    };
};

export const deleteCategories = (ids) => {
    return async (dispatch) => {
        const res = await axios.post("/category/delete", {
            payload: {
                ids,
            },
        });

        if (res.status == 200) {
            return true;
        } else {
            return false;
        }
        console.log(res);
    };
};
