import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/interactions/Message";
import Loader from "../components/interactions/Loader";
import {
    update as usersUpdate,
    clearApiCall,
} from "../services/store/apis/usersApi";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [needUpdate, setNeedUpdate] = useState(false);
    const [needLogin, setNeedLogin] = useState(true);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.auth?.authData);
    const userUpdateState = useSelector((state) => state?.usersApi?.update);

    useEffect(() => {
        if (!user || user.username === "guest") {
            navigate("/login");
        } else {
            setFullname(user.fullname || "");
            setUsername(user.username || "");
            setNeedLogin(false);
        }
    }, [user, navigate]);

    useEffect(() => {
        console.log({ user });
        if (user) {
            setFullname(user.fullname || "");
            setUsername(user.username || "");
        }
    }, [user]);

    useEffect(() => {
        const cleanApiResponse = () => {
            setTimeout(() => {
                dispatch(clearApiCall({ apiAction: "update" }));
            }, 3000);
        };
        if (userUpdateState?.data) {
            let user = localStorage.getItem("user");
            user = JSON.parse(user);
            user = { ...user, fullname, username };
            localStorage.setItem("user", JSON.stringify(user));
            cleanApiResponse();
        }
    }, [userUpdateState, fullname, username, dispatch]);

    useEffect(() => {
        setNeedUpdate(
            fullname !== (user?.fullname || "") ||
                username !== (user?.username || "")
        );
    }, [fullname, username, user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Updating user profile");
        if (needUpdate && user?._id) {
            const data = { fullname, username };
            dispatch(usersUpdate({ data, id: user._id }));
        }
    };

    return (
        <>
            {needLogin && <Loader />}
            {!needLogin && (
                <Row>
                    <Col md={6}>
                        <h2>User Profile</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="my-2" controlId="fullname">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fullname}
                                    onChange={(e) =>
                                        setFullname(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="my-2" controlId="username">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!needUpdate}
                            >
                                Update
                            </Button>
                            <div className="my-2">
                                {userUpdateState?.isLoading && <Loader />}
                                {userUpdateState?.error && (
                                    <Message variant="danger">
                                        {userUpdateState.error}
                                    </Message>
                                )}
                                {userUpdateState?.data && (
                                    <Message variant="success">
                                        Profile updated successfully
                                    </Message>
                                )}
                            </div>
                        </Form>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ProfilePage;
