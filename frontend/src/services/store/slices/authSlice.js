import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthCaller } from "../../shared/getBackCaller";

const authApi = getAuthCaller("auth");

const getAUthData = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let authData = {};
    if (user) {
        authData.user = JSON.parse(user);
    }
    if (token) {
        authData.token = token;
    }
    return authData;
};

export const login = createAsyncThunk("auth/login", async (data) => {
    return await authApi({ action: "login", method: "POST", data });
});

export const register = createAsyncThunk("auth/register", async (data) => {
    return await authApi({ action: "register", method: "POST", data });
});

const initialState = {
    authData: getAUthData(),
};

const authSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("authData");
            localStorage.removeItem("token");
            state.authData = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (!state.authData) state.authData = {};
            state.authData.user = action.payload?.user;
            state.authData.token = action.payload?.token;
            localStorage.setItem("user", JSON.stringify(action.payload?.user));
            localStorage.setItem(
                "token",
                JSON.stringify(action.payload?.token)
            );
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.authData = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(register.rejected, async (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
