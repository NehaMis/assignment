import { combineReducers } from "redux";
import loginReducer from "./loginReducer.jsx";
import cartProducts from "./cartProducts";
import allProducts from "./setProducts";

export default combineReducers({
    loginReducer,
    cartProducts,
    allProducts,
});
