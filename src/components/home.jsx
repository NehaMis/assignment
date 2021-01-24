import React, { Component } from "react";
import { Navbar, Nav, Form, Button, Dropdown, Row, Container, Col } from "react-bootstrap";
import default_book from "../assets/default_book.png";

import { setCartProducts, setProducts } from "../redux_store/action/index";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class home extends Component {
    state = {
        cart: [
            {
                bookID: 1,
                title: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
                authors: "J.K. Rowling-Mary GrandPré",
                average_rating: 4.56,
                isbn: 439785960,
                language_code: "eng",
                ratings_count: 1944099,
                price: 230,
            },
        ],
        books: [
            {
                authors: "J.K. Rowling-Mary GrandPré",
                average_rating: 4.56,
                bookID: 1,
                isbn: 439785960,
                language_code: "eng",
                price: 230,
                ratings_count: 1944099,
                title: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
            },
        ],
        arrSortType: ["Title Ascending", "Title Descending", "Price Low to High", "Price High to Low", "Rating High"],
        orderBy: "Title Ascending",
        search_text: "",
    };

    async componentDidMount() {
        const dataFromProps = this.props;
        console.log("home", dataFromProps);
        const res = await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json", {
            method: "GET",
        });
        const data = await res.json();
        this.props.setProducts(data);
        this.arrAllBooks = data;
        this.sortBy("Title Ascending");
        // this.setState({ books: this.arrAllBooks.slice(0, 28) });
    }

    renderRating(rating) {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span class="fa fa-star checked"></span>);
        }

        return stars;
    }

    sortBy(sortBy) {
        switch (sortBy) {
            case "Title Ascending":
                this.arrAllBooks = this.arrAllBooks.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));
                break;
            case "Title Descending":
                this.arrAllBooks = this.arrAllBooks.sort((a, b) => (a.title < b.title ? 1 : b.title < a.title ? -1 : 0));
                break;
            case "Price Low to High":
                this.arrAllBooks = this.arrAllBooks.sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0));
                break;
            case "Price High to Low":
                this.arrAllBooks = this.arrAllBooks.sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
                break;
            default:
                this.arrAllBooks = this.arrAllBooks.sort((a, b) => (a.average_rating < b.average_rating ? 1 : b.average_rating < a.average_rating ? -1 : 0));
        }

        this.setState({ books: this.arrAllBooks.slice(0, 28) });
    }

    handleSearch(strText) {
        let arrSearched = this.arrAllBooks.filter((data) => {
            console.log(data.title.toString().toLowerCase().includes(strText));
            return data.title.toString().toLowerCase().includes(strText);
        });

        this.setState({ books: arrSearched });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        if (e.target.value.length > 0) {
            setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 1000);
        } else {
            this.setState({ books: this.arrAllBooks.slice(0, 28) });
        }
    }

    handleSortDropdown(eventKey) {
        this.setState({ orderBy: eventKey });

        this.sortBy(eventKey);
    }

    addToCart(bookDetails, isBuyNow = false) {
        let arrSelectedProducts = this.props.arrSelectedProducts;
        if (!arrSelectedProducts.includes(bookDetails.bookID)) {
            arrSelectedProducts.push(bookDetails.bookID);
        } else {
            var index = arrSelectedProducts.indexOf(bookDetails.bookID);
            if (index > -1) {
                arrSelectedProducts.splice(index, 1);
            }
        }

        this.props.setCartProducts(arrSelectedProducts);
        this.setState({});

        if (isBuyNow) {
            setTimeout(() => {
                this.props.history.push("/cart/");
            }, 500);
        }
    }

    render() {
        return (
            <div className="text-center">
                <Container className="col-lg-10 text-center">
                    <Row className="my-2 d-line-flex text-center py-2">
                        <Col>
                            <Form.Control
                                type="text"
                                name="search_text"
                                value={this.state.search_text}
                                placeholder="Search By Title"
                                className="light-placeholder border-grey mid-height-input"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </Col>
                        <Col>
                            <Dropdown onSelect={(eventKey) => this.handleSortDropdown(eventKey)} className="text-left w-100" id="sortByDropdown">
                                <Dropdown.Toggle className="w-100 text-left low-height-input border-none bg-color-white label-text" id="dropdown-basic">
                                    {this.state.orderBy}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {this.state.arrSortType.map((sortBy) => {
                                        return <Dropdown.Item eventKey={sortBy}>{sortBy}</Dropdown.Item>;
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row className="d-inline-flex p-0 m-0" style={{ height: "100vh", display: "block", textAlign: "left" }}>
                        {this.state.books.map((book) => {
                            return (
                                <Container className="product_container col-lg-3 col-md-3 col-sm-6">
                                    <Container className="book_img_container w-100 text-center my-5">
                                        <img alt="" className="book_img" src={book.img_url || default_book} />
                                    </Container>
                                    <p className="text-center px-2">{book.title.substring(0, 50) + "..."}</p>
                                    <Container className="text-left">
                                        <p>Author: {book.authors.substring(0, 10) + "..."}</p>
                                        <p>Price: Rs {book.price.toFixed(2)}</p>
                                    </Container>
                                    <Container className="book_img_container w-100 text-left">Rating: {this.renderRating(book.average_rating)}</Container>
                                    <Container className="text-center my-2">
                                        <Button className="button_add" onClick={() => this.addToCart(book)}>
                                            {this.props.arrSelectedProducts.includes(book.bookID) ? "Added to cart" : "Add to cart"}
                                        </Button>
                                        <Button className="ml-2 button_buy" onClick={() => this.addToCart(book, true)}>
                                            Buy Now
                                        </Button>
                                    </Container>
                                </Container>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    let arrSelectedProducts = reduxStore.cartProducts.products;

    return { arrSelectedProducts };
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(home));
