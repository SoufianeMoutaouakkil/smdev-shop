import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
    generateApiActions,
    generateExportedActions,
} from "../../shared/actionsManager";

const initialState = {};

const usersApiActions = generateApiActions("users");

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
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

export default usersSlice.reducer;
