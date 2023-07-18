import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./UserReducer";
import thunk from "redux-thunk";
import {disclaimerReducer} from "./DisclaimerReducer"
import { providerReducer } from "./ProviderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  disclaimer: disclaimerReducer,
  provider: providerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
