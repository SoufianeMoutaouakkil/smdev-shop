export const addReducerApiCases = (builder, apiActions) => {
    for (const apiAction in apiActions) {
        builder.addCase(apiActions[apiAction].pending, (state) => {
            if (!state[apiAction]) state[apiAction] = {};
            state[apiAction].loading = true;
            state[apiAction].error = null;
        });

        builder.addCase(apiActions[apiAction].fulfilled, (state, action) => {
            if (!state[apiAction]) {
                state[apiAction] = {};
            }
            state[apiAction].loading = false;
            state[apiAction].data = action.payload.data;
        });

        builder.addCase(apiActions[apiAction].rejected, (state, action) => {
            if (!state[apiAction]) state[apiAction] = {};
            state[apiAction].loading = false;
            state[apiAction].error = action.error.message;
        });
    }
};
