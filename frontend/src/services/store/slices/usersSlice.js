import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
    clearApiCallData,
} from "../../shared/actionsManager";

const initialState = {};

const usersApiActions = generateApiActions("users");

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearApiCall: clearApiCallData,
    },
    extraReducers: (builder) => {
        addReducerApiCases(builder, usersApiActions);
    },
});

export const {
    usersGetAll,
    usersGetById,
    usersCreate,
    usersUpdate,
    usersRemove,
    usersSearch,
} = generateExportedActions("users", usersApiActions);

export const { clearApiCall } = usersSlice.actions;
export default usersSlice.reducer;
