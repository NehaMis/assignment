import { connect } from "react-redux";
import Home from "../components/home";
import Cart from "../components/productCart";
import { addToCart } from "../Services/actions/actions";

const mapStateToProps = (state) => ({
    cardData: state,
    //addToCartHandler: (data) => dispatch(addToCart(data)),
});
const mapDispatchToProps = (dispatch) => ({
    addToCartHandler: (data) => dispatch(addToCart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home, Cart);
