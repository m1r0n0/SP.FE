import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./UserReducer";
import thunk from "redux-thunk";
import {disclaimerReducer} from "./DisclaimerReducer"

const rootReducer = combineReducers({
  user: userReducer,
  disclaimer: disclaimerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
