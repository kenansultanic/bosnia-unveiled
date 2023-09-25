import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { destinationsApi } from "./destinationsApi";

const store = configureStore({
    reducer: {
        [destinationsApi.reducerPath]: destinationsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(destinationsApi.middleware);
    }
});

setupListeners(store.dispatch);

export default store;
