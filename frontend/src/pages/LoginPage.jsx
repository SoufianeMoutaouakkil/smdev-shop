import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/interactions/Loader";
import FormContainer from "../components/forms/FormContainer";
import Message from "../components/interactions/Message";
import { login, clearError } from "../services/store/apis/authApi";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authData, isLoading, error }  = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (authData?.user && authData?.user?.username !== "guest") {
            navigate(redirect);
        }
    }, [authData, navigate, redirect]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError());
            }, 3000);
        }
    }, [error, dispatch]);

    return (
        <FormContainer>
            <h1>Login</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type="submit" variant="primary">
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
            <Row className="py-3">
                {error && (
                    <Message variant="danger">{error}</Message>
                )}
            </Row>
        </FormContainer>
    );
};

export default LoginPage;
