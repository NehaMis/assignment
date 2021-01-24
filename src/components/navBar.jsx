import React, { Component } from "react";
import { Navbar, Nav, Form, Button, Dropdown, Row, Container, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import bag from "../assets/icons8-shopping-bag-100.png";
import user from "../assets/icons8-user-100 (3).png";
import { connect } from "react-redux";

class navbar extends Component {
    state = {};

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">BookShelf</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/about_us">About us</Nav.Link>
                </Nav>
                <Form inline>
                    <div className="position-relative" onClick={() => this.props.history.push("/cart")}>
                        <img style={{ height: "20px", cursor: "pointer" }} src={bag} alt="" />
                        <div className="" style={{ color: "white", fontSize: "10px", marginTop: "2px" }}>
                            Cart
                        </div>
                        {this.props.arrSelectedProducts.length > 0 ? <div className="cartCount">{this.props.arrSelectedProducts.length}</div> : null}
                    </div>
                    <div className="ml-4" style={{ marginLeft: "15px" }}>
                        <img
                            style={{
                                height: "20px",
                                cursor: "pointer",
                            }}
                            src={user}
                            alt=""
                        />
                        <div className="" style={{ color: "white", fontSize: "10px", marginTop: "2px" }}>
                            Profile
                        </div>
                    </div>
                </Form>
            </Navbar>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    let arrSelectedProducts = reduxStore.cartProducts.products;
    let arrAllProducts = reduxStore.allProducts.products;
    return { arrSelectedProducts, arrAllProducts };
}; //end function

export default withRouter(connect(mapStateToProps, null)(navbar));
