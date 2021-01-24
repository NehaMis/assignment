import React, { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { setCartProducts, setProducts } from "../redux_store/action/index";
import { connect } from "react-redux";
import default_book_img from "../assets/default_book.png";
import trashIcon from "../assets/trash.svg";
class productCart extends Component {
    state = {
        arrCartProducts: [],
    };

    componentDidMount() {
        this.getProductDetails();
    }

    getProductDetails() {
        let arrCartProducts = [];
        this.props.arrSelectedProducts.map((book) => {
            let arrProducts = this.getProducts(book);
            if (arrProducts && arrProducts.length > 0) {
                arrCartProducts.push(arrProducts[0]);
            }
        });
        this.setState({ arrCartProducts });
    }

    getProducts(bookId) {
        return this.props.arrAllProducts.filter((data) => {
            return data.bookID === bookId;
        });
    }

    handleBuy() {
        this.props.setCartProducts([]);
        setTimeout(() => {
            this.props.history.push("/receiptPage");
        }, 500);
    }

    removeProduct(bookDetails) {
        let arrSelectedProducts = this.props.arrSelectedProducts;
        let { arrCartProducts } = this.state;

        var index = arrSelectedProducts.indexOf(bookDetails.bookID);
        if (index > -1) {
            arrSelectedProducts.splice(index, 1);
        }

        index = arrCartProducts.indexOf(bookDetails);
        if (index > -1) {
            arrCartProducts.splice(index, 1);
        }

        this.props.setCartProducts(arrSelectedProducts);
        this.setState({ arrCartProducts });
    }

    render() {
        let intTotal = 0;
        return (
            <Container className="bg-white py-4" style={{ minHeight: "100vh" }}>
                <h3 className="mb-5">Cart checkout</h3>

                <Container className="px-5">
                    {this.state.arrCartProducts.map((book) => {
                        intTotal += book.price;
                        return (
                            <Container className="text-left mb-2 p-0">
                                <Row className="w-100 p-0">
                                    <div className="text-center" style={{ width: "16%", margin: "auto 0" }}>
                                        <img style={{ maxWidth: "5rem", height: "5rem" }} src={default_book_img} />
                                    </div>
                                    <div style={{ width: "80%", paddingLeft: "1rem" }}>
                                        <p>{book.title}</p>
                                        <p>{book.author}</p>
                                        <p>Rs. {book.price.toFixed(2)}</p>
                                        <div></div>
                                    </div>
                                    <div style={{ width: "4%", textAlign: "right" }}>
                                        <img src={trashIcon} style={{ cursor: "pointer" }} onClick={() => this.removeProduct(book)} />
                                    </div>
                                </Row>
                                <Container className="px-4" style={{ height: "1px", width: "100%", backgroundColor: "#ccc" }}></Container>
                            </Container>
                        );
                    })}
                    <Container className="text-right">
                        <p>Total Amount: Rs.{intTotal.toFixed(2)}</p>
                        {this.state.arrCartProducts.length > 0 ? <Button onClick={() => this.handleBuy()}>Buy Now</Button> : null}
                    </Container>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    let arrSelectedProducts = reduxStore.cartProducts.products;
    let arrAllProducts = reduxStore.allProducts.products;
    return { arrSelectedProducts, arrAllProducts };
}; //end function

const mapDispatchToProps = (dispatch) => {
    return {
        setCartProducts: (arrProducts) => {
            dispatch(setCartProducts(arrProducts));
        },
        setProducts: (arrProducts) => {
            dispatch(setProducts(arrProducts));
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(productCart));
