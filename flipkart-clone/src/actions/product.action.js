import axios from "../api/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        const res = await axios.get(`/product/${slug}`);

        if (res.status === 200) {
            console.log(res.data);
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG,
                payload: res.data,
            });
        }
    };
};
