import { CART_PRODUCTS } from "../action/types.jsx";

const INITIAL_STATE = {
    products: [],
};

export default (arrOldState = INITIAL_STATE, arrAction) => {
    let arrNewState = {};
    switch (arrAction.type) {
        case CART_PRODUCTS:
            arrNewState = {
                products: arrAction.payload || [],
            };
            return arrNewState;

        default:
            return arrOldState;
    }
};
