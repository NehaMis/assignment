import { LOGIN_SUCCESS_DATA, LOGOUT } from "../action/types.jsx";

const INITIAL_STATE = {
    login_status: false,
    user_id: "",
    user_name: "",
    email: "",
};

export default (arrOldState = INITIAL_STATE, arrAction) => {
    let arrNewState = {};

    switch (arrAction.type) {
        case LOGIN_SUCCESS_DATA:
            if (arrAction.payload) {
                arrNewState = {
                    ...arrOldState,
                    login_status: arrAction.payload.login_status || false,
                    user_id: arrAction.payload.user_id || "",
                    user_name: arrAction.payload.user_name || "",
                    email: arrAction.payload.email || "",
                };
            } else {
                arrNewState = {
                    ...arrOldState,
                };
            }
            break;
        case LOGOUT:
            arrNewState = INITIAL_STATE;
            break;
        default:
            arrNewState = arrOldState;
            break;
    } //end switch

    return arrNewState;
}; //end function
