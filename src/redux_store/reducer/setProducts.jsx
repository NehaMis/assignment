import { SET_PRODUCTS } from "../action/types.jsx";

const INITIAL_STATE = {
    products: [],
};

export default (arrOldState = INITIAL_STATE, arrAction) => {
    let arrNewState = {};
    switch (arrAction.type) {
        case SET_PRODUCTS:
            arrNewState = {
                ...arrOldState,
                products: arrAction.payload || [],
            };
            return arrNewState;

        default:
            return arrOldState;
    }
};
