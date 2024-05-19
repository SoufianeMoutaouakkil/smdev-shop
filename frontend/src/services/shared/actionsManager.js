import { createAsyncThunk } from "@reduxjs/toolkit";
import getRessouceFetcher from "./getRessouceFetcher";
import { getDefaultApiActions } from "./apiManager";

const defaultApiActions = getDefaultApiActions();

export const generateDefaultApiActions = (ressource) => {
    const ressourceFetcher = getRessouceFetcher(ressource);
    const getAll = createAsyncThunk(`${ressource}/getAll`, async () => {
        return await ressourceFetcher.getAll();
    });

    const getById = createAsyncThunk(`${ressource}/getById`, async (id) => {
        return await ressourceFetcher.getById(id);
    });

    const create = createAsyncThunk(`${ressource}/create`, async (data) => {
        return await ressourceFetcher.create(data);
    });

    const update = createAsyncThunk(`${ressource}/update`, async (data) => {
        return await ressourceFetcher.update(data);
    });

    const remove = createAsyncThunk(`${ressource}/remove`, async (id) => {
        return await ressourceFetcher.remove(id);
    });

    const search = createAsyncThunk(`${ressource}/search`, async (query) => {
        return await ressourceFetcher.search(query);
    });

    const call = createAsyncThunk(`${ressource}/call`, async (opts) => {
        return await ressourceFetcher.call(opts);
    });

    return {
        getAll,
        getById,
        create,
        update,
        remove,
        search,
        call,
    };
};

export const generateApiActions = (ressource, actions = null) => {
    actions = actions || defaultApiActions;
    const ressourceActions = generateDefaultApiActions(ressource);
    const allowedApiActions = actions.reduce((acc, action) => {
        if (ressourceActions[action]) {
            acc[action] = ressourceActions[action];
        }
        return acc;
    }, {});
    return allowedApiActions;
};

export const generateExportedActions = (ressourceName, ressourceActions) => {
    const ressourceActionsKeys = Object.keys(ressourceActions);
    const exportedActions = ressourceActionsKeys.reduce((acc, action) => {
        const actionPascaleCase = `${action.charAt(0).toUpperCase()}${action.slice(1)}`;
        const key = `${ressourceName}${actionPascaleCase}`;
        acc[key] = ressourceActions[action];
        return acc;
    }, {});
    return exportedActions;
};

export const clearApiCallData = (state, action) => {
    const { item = "all", apiAction } = action.payload;
    if (item === "all") {
        state[apiAction] = {
            data: null,
            error: null,
            isLoading: false,
        };
    } else if (item === "error" || item === "data") {
        state[apiAction][item] = null;
        return;
    } else if (item === "isLoading") {
        state[apiAction][item] = false;
        return;
    }
};
