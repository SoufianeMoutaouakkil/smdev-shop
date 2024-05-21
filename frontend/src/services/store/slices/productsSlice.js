import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        test: (state, action) => {
            console.log("test");
        },
    },
});

export const { test } = cartsSlice.actions;
export default cartsSlice.reducer;
