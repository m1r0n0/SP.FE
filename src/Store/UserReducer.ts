import { Reducer } from "redux";
import {
  IIdentityAuthorizationError,
  ILoginUserResponse,
  IUser,
} from "../Models/user";

interface IUserAction {
  type: string;
  payload: ILoginUserResponse | string | IUser | IIdentityAuthorizationError[];
}

interface UserState {
  user: IUser;
  isLoginRequested: boolean;
  isLoginSuccessful: boolean;
  isLoginFinished: boolean;
  isAppLoaded: boolean;
  isUserEmailRequested: boolean;
  isRegisterSuccessful: boolean;
  isRegisterRequested: boolean;
}

const defaultState: UserState = {
  user: { userId: "", userEmail: "" },
  isLoginRequested: false,
  isLoginSuccessful: true,
  isLoginFinished: false,
  isAppLoaded: false,
  isUserEmailRequested: false,
  isRegisterSuccessful: false,
  isRegisterRequested: false,
};

const SET_USER_ID = "SET_USER_ID";
const SET_USER_EMAIL = "SET_USER_EMAIL";
const HANDLE_LOGIN_REQUEST = "HANDLE_LOGIN_REQUEST";
const HANDLE_LOGIN_SUCCESS = "HANDLE_LOGIN_SUCCESS";
const HANDLE_LOGIN_FAILURE = "HANDLE_LOGIN_FAILURE";
const HANDLE_APP_READINESS = "HANDLE_APP_READINESS";
const HANDLE_EMAIL_REQUEST = "HANDLE_EMAIL_REQUEST";
const HANDLE_EMAIL_FETCHED = "HANDLE_EMAIL_FETCHED";
const HANDLE_REGISTER_SUCCESS = "HANDLE_REGISTER_SUCCESS";
const HANDLE_REGISTER_REQUEST = "HANDLE_REGISTER_REQUEST";
const HANDLE_REGISTER_FAILURE = "HANDLE_REGISTER_FAILURE";
const HANDLE_LOGOUT = "HANDLE_LOGOUT";

export const userReducer: Reducer<UserState, IUserAction> = (
  state = defaultState,
  action: IUserAction
) => {
  let loginUser: ILoginUserResponse = action.payload as ILoginUserResponse;
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        user: { ...state.user, userId: action.payload as string },
      };

    case SET_USER_EMAIL:
      if (action.payload !== "") {
        return {
          ...state,
          user: { ...state.user, userEmail: action.payload as string },
        };
      } else return { ...state };

    case HANDLE_LOGIN_REQUEST:
      return { ...state, isLoginRequested: true };

    case HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: { userId: loginUser.userId, userEmail: loginUser.email },
        isLoginSuccessful: true,
        isLoginFinished: true,
      };

    case HANDLE_LOGIN_FAILURE:
      return {
        ...state,
        isLoginSuccessful: false,
        isLoginRequested: false,
      };

    case HANDLE_APP_READINESS:
      return { ...state, isAppLoaded: true };

    case HANDLE_EMAIL_REQUEST:
      return { ...state, isUserEmailRequested: true };

    case HANDLE_EMAIL_FETCHED:
      return { ...state, isUserEmailRequested: false };

    case HANDLE_REGISTER_SUCCESS:
      return { ...state, isRegisterSuccessful: true };

    case HANDLE_LOGOUT:
      return {
        ...state,
        user: defaultState.user,
        isLoginRequested: defaultState.isLoginRequested,
        isLoginSuccessful: defaultState.isLoginSuccessful,
        isLoginFinished: defaultState.isLoginFinished,
      };

    case HANDLE_REGISTER_REQUEST:
      return { ...state, isRegisterRequested: true };

    case HANDLE_REGISTER_FAILURE:
      return {
        ...state,
        isRegisterRequested: false,
        isRegisterSuccessful: false,
      };

    default:
      return state;
  }
};

export const setUserIdAction = (payload: string) => ({
  type: SET_USER_ID,
  payload,
});
export const setUserEmailAction = (payload: string) => ({
  type: SET_USER_EMAIL,
  payload,
});
export const handleLoginRequestAction = () => ({
  type: HANDLE_LOGIN_REQUEST,
});
export const handleLoginSuccessAction = (payload: ILoginUserResponse) => ({
  type: HANDLE_LOGIN_SUCCESS,
  payload,
});
export const handleLoginFailureAction = () => ({
  type: HANDLE_LOGIN_FAILURE,
});
export const handleAppReadinessAction = () => ({
  type: HANDLE_APP_READINESS,
});
export const handleEmailRequestAction = () => ({
  type: HANDLE_EMAIL_REQUEST,
});
export const handleEmailFetchedAction = () => ({
  type: HANDLE_EMAIL_FETCHED,
});
export const handleRegisterSuccessAction = () => ({
  type: HANDLE_REGISTER_SUCCESS,
});
export const handleLogoutAction = () => ({
  type: HANDLE_LOGOUT,
});
export const handleRegisterRequestAction = () => ({
  type: HANDLE_REGISTER_REQUEST,
});
export const handleRegisterFailureAction = () => ({
  type: HANDLE_REGISTER_FAILURE,
});
