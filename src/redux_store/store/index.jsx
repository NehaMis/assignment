import { createStore } from "redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import appReducer from "../reducer/index.jsx";

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const rootReducer = (state, action) => {
    if ("user_logout" === action.type) {
        state = undefined;
    }

    return appReducer(state, action);
};

const pR = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk);
export const store = createStore(pR, middleware);

export const persistor = persistStore(store);
