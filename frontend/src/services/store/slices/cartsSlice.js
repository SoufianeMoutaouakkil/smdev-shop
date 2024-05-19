import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
    clearApiCallData,
} from "../../shared/actionsManager";

const initialState = {};

const cartsApiActions = generateApiActions("carts");

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        clearApiCall: clearApiCallData,
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

export const { clearApiCall } = cartsSlice.actions;
export default cartsSlice.reducer;
