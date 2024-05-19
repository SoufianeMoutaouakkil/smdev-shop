import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
    clearApiCallData,
} from "../../shared/actionsManager";

const initialState = {};

const reviewsApiActions = generateApiActions("reviews");

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        clearApiCall: clearApiCallData,
    },
    extraReducers: (builder) => {
        addReducerApiCases(builder, reviewsApiActions);
    },
});

export const {
    reviewsGetAll,
    reviewsGetById,
    reviewsCreate,
    reviewsUpdate,
    reviewsRemove,
    reviewsSearch,
} = generateExportedActions("reviews", reviewsApiActions);

export const { clearApiCall } = reviewsSlice.actions;
export default reviewsSlice.reducer;
