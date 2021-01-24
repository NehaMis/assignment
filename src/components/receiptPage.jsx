import React, { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { setCartProducts, setProducts } from "../redux_store/action/index";
import { connect } from "react-redux";
import default_book_img from "../assets/default_book.png";
class recieptPage extends Component {
    state = {
        arrCartProducts: [],
        totalAmt: 0,
    };

    componentDidMount() {}
    render() {
        return (
            <Container className="bg-white py-4" style={{ minHeight: "100vh" }}>
                <h3 className="mb-5">Thanks for your order!</h3>
            </Container>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    let arrSelectedProducts = reduxStore.cartProducts.products;
    let arrAllProducts = reduxStore.allProducts.products;
    return { arrSelectedProducts, arrAllProducts };
}; //end function

export default withRouter(connect(null, null)(recieptPage));
