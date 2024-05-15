import axios from "axios";
import getEnvVars from "./envvarsManager";

const BACK_URL = getEnvVars("BACK_URL");
const getToken = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = "";
    } else if (token.startsWith('"') && token.endsWith('"')) {
        return token.slice(1, -1);
    }

    return token;
};
const getBackCaller = (module, ressource = "", version = "") => {
    return async (opts = {}) => {
        let reqUrl = `${BACK_URL}/${module}`;
        reqUrl += version ? `/${version}` : "";
        reqUrl += ressource ? `/${ressource}` : "";
        if (opts.action) reqUrl += `/${opts.action}`;
        if (opts.id) reqUrl += `/${opts.id}`;
        if (opts.query)
            reqUrl += `?${new URLSearchParams(opts.query).toString()}`;
        try {
            const response = await axios(reqUrl, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "content-type": "application/json",
                    ...opts.headers,
                },
                withCredentials: false,
                ...opts,
            });
            console.log(
                `${module} -> ${opts.method} -> ${reqUrl} -> response.data`,
                response.data
            );
            // save token in local storage
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        } catch (err) {
            const code = err.response?.data?.code;
            if (code === "TOKEN_EXPIRED") {
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("token");
                document.location.href = "/auth/login";
            } else {
                const error = err.response ? err.response.data : err;
                throw error;
            }
        }
    };
};

export const getAuthCaller = () => {
    return getBackCaller("auth");
};

export const getApiCaller = (resource) => {
    return getBackCaller("api", resource);
};
