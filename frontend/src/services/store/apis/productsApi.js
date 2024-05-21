import { getApiSlice } from "../../shared/actionsManager";

const { apiSlice, apiActions } = getApiSlice("products", {});

export const { getAll, getById, create, update, remove, search } = apiActions;

export const { clearApiCall } = apiSlice.actions;
export default apiSlice.reducer;
