import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
} from "../../shared/actionsManager";

const initialState = {};

const reviewsApiActions = generateApiActions("reviews");

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
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

export default reviewsSlice.reducer;
