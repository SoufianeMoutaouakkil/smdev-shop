import { getApiCaller } from "./getBackCaller";

export const getRessouceFetcher = (resource) => {
    const apiCaller = getApiCaller(resource);

    const getById = async ({ id, opts = {} }) => {
        return await apiCaller({ id, method: "GET", ...opts });
    };
    const getAll = async ({ opts = {} }) => {
        return await apiCaller({ method: "GET", ...opts });
    };
    const create = async ({ data, opts = {}, cb }) => {
        data = { data };
        const res = await apiCaller({ method: "POST", data, ...opts });
        if (cb && typeof cb === "function") {
            cb(res);
        }
        return res;
    };
    const update = async ({ id, data, opts = {}, cb }) => {
        data = { data };
        const res = await apiCaller({
            id,
            method: "PUT",
            data,
            ...opts,
        });
        if (cb && typeof cb === "function") {
            cb(res);
        }
        return res;
    };
    const remove = async ({ id, opts = {}, cb }) => {
        const res = await apiCaller({ id, method: "DELETE", ...opts });
        if (cb && typeof cb === "function") {
            cb(res);
        }
        return res;
    };
    const search = async ({ query, opts = {} }) => {
        query = !query ? { field: "_id", operator: "exists" } : query;
        
        if (typeof query === "object") {
            query = JSON.stringify(query);
            query = "query=" + encodeURIComponent(query);
        }
        opts.query = query;

        return await apiCaller({ method: "GET", ...opts });
    };
    const call = async (opts) => {
        return await apiCaller(opts);
    };

    return {
        getById,
        getAll,
        create,
        update,
        remove,
        search,
        call,
    };
};

export default getRessouceFetcher;
