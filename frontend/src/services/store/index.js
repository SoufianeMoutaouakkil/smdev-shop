import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import usersApiReducer from "./apis/usersApi";
import authReducer from "./apis/authApi";
import cartsApiReducer from "./apis/cartsApi";
import productsApiReducer from "./apis/productsApi";
import reviewsApiReducer from "./apis/reviewsApi";
import cartsReducer from "./slices/cartsSlice";
import productsReducer from "./slices/productsSlice";
import reviewsReducer from "./slices/reviewsSlice";

export default configureStore({
    reducer: combineReducers({
        auth: authReducer,
        usersApi: usersApiReducer,
        carts: cartsReducer,
        products: productsReducer,
        reviews: reviewsReducer,
        cartsApi: cartsApiReducer,
        productsApi: productsApiReducer,
        reviewsApi: reviewsApiReducer,
    }),
});
