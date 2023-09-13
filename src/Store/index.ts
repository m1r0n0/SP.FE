import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./UserReducer";
import thunk from "redux-thunk";
import {disclaimerReducer} from "./DisclaimerReducer";
import {providerReducer} from "./ProviderReducer";
import {customerReducer} from "./CustomerReducer";
import {serviceReducer} from "./ServiceReducer";

const rootReducer = combineReducers({
    user: userReducer,
    disclaimer: disclaimerReducer,
    provider: providerReducer,
    customer: customerReducer,
    service: serviceReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
