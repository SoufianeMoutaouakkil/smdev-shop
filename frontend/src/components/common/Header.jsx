import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
const Header = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.carts);
    const { authData } = useSelector((state) => state.auth);
    const [isGuest, setIsGuest] = useState(true);
    const [nbCartItems, setNbCartItems] = useState(0);
    useEffect(() => {
        if (authData?.user && authData?.user?.username !== "guest") {
            setIsGuest(false);
        } else {
            setIsGuest(true);
        }
    }, [authData]);

    useEffect(() => {
        setNbCartItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
    }, [cartItems]);
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Smdev Shop</Navbar.Brand>
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
