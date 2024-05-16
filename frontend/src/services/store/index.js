import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import usersReducer from "./slices/usersSlice";
import authReducer from "./slices/authSlice";
import cartsReducer from "./slices/cartsSlice";
import productsReducer from "./slices/productsSlice";
import reviewsReducer from "./slices/reviewsSlice";

export default configureStore({
    reducer: combineReducers({
        auth: authReducer,
        users: usersReducer,
        carts: cartsReducer,
        products: productsReducer,
        reviews: reviewsReducer,
    }),
});
