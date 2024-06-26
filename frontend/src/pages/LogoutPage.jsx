import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/store/apis/authApi";
import { clearCart } from "../services/store/slices/cartsSlice";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Logging out");
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
    }, [dispatch, navigate]);

    return (
        <div>
            <h1>Logout Page</h1>
        </div>
    );
};

export default LogoutPage;
