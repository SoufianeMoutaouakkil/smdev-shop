import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
    clearApiCallData,
} from "../../shared/actionsManager";

const initialState = {};

const productsApiActions = generateApiActions("products");

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearApiCall: clearApiCallData,
    },
    extraReducers: (builder) => {
        addReducerApiCases(builder, productsApiActions);
    },
});

export const {
    productsGetAll,
    productsGetById,
    productsCreate,
    productsUpdate,
    productsRemove,
    productsSearch,
} = generateExportedActions("products", productsApiActions);

export const { clearApiCall } = productsSlice.actions;
export default productsSlice.reducer;
