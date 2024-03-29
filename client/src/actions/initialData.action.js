import { categoryConstants, productsConstants } from "./constants";
import axios from "../api/axios";

export const getInitialData = () => {
    return async (dispatch) => {
        const res = await axios.post(`/initialData`);
        if (res.status === 200) {
            const { categories, products } = res.data;

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });

            dispatch({
                type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products },
            });
        }
        console.log(res);
    };
};
