import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAll as getAllCarts } from "../../services/store/apis/cartsApi";
import { updateCart } from "../../services/store/slices/cartsSlice";
const Header = () => {
    const { cartItems } = useSelector((state) => state.carts);
    const { authData } = useSelector((state) => state.auth);
    const fetchedCartItems = useSelector((state) => state.cartsApi?.getAll);
    const [isGuest, setIsGuest] = useState(true);
    const [nbCartItems, setNbCartItems] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        if (authData?.user && authData?.user?.username !== "guest") {
            setIsGuest(false);
            dispatch(getAllCarts());
        } else {
            setIsGuest(true);
        }
    }, [authData, dispatch]);

    useEffect(() => {
        if (fetchedCartItems?.data) {
            dispatch(updateCart(fetchedCartItems.data));
        }
    }, [fetchedCartItems, dispatch]);

    useEffect(() => {
        setNbCartItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }, [cartItems]);
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img
                                src="/slogo.png"
                                alt="logo"
                                style={{ cursor: "pointer", width: "150px" }}
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link className="position-relative me-3">
                                    <i className="fas fa-shopping-cart"></i>{" "}
                                    Cart
                                    {nbCartItems > 0 && (
                                        // Add a badge with the number of items at the top right of the cart icon
                                        <span className="badge rounded-pill bg-danger position-absolute start-100 translate-middle">
                                            {nbCartItems}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {isGuest && (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {!isGuest && (
                                <>
                                    <LinkContainer to="/profile">
                                        <Nav.Link>
                                            <i className="fas fa-user"></i>{" "}
                                            Profile
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/logout">
                                        <Nav.Link>
                                            <i className="fas fa-sign-out-alt"></i>{" "}
                                            Logout
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
