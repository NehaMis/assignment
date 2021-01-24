import { LOGIN_SUCCESS_DATA, CART_PRODUCTS, SET_PRODUCTS } from "./types.jsx";

export const setUserLoginData = function (arrLoginSuccessData) {
    const ACTION = {
        type: LOGIN_SUCCESS_DATA,
        payload: arrLoginSuccessData,
    };

    return ACTION;
};

export const setCartProducts = function (arrProducts) {
    const ACTION = {
        type: CART_PRODUCTS,
        payload: arrProducts,
    };

    return ACTION;
};

export const setProducts = function (arrProducts) {
    const ACTION = {
        type: SET_PRODUCTS,
        payload: arrProducts,
    };

    return ACTION;
};
