import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
    clearApiCallData,
} from "../../shared/actionsManager";

const getCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
    return cartItems;
};

const initialState = {
    cartItems: getCartItemsFromLocalStorage(),
};

const cartsApiActions = generateApiActions("carts");

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        clearApiCall: clearApiCallData,
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            );
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
    extraReducers: (builder) => {
        addReducerApiCases(builder, cartsApiActions);
    },
});

export const {
    cartsGetAll,
    cartsGetById,
    cartsCreate,
    cartsUpdate,
    cartsRemove,
    cartsSearch,
} = generateExportedActions("carts", cartsApiActions);

export const { clearApiCall, addToCart, removeFromCart } = cartsSlice.actions;
export default cartsSlice.reducer;
