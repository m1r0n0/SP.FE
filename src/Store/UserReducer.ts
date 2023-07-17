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

interface IUserState {
  user: IUser;
  authenticationToken: string;
  isAppLoaded: boolean;
  isUserEmailRequested: boolean;
  isLoginRequested: boolean;
  isLoginSuccessful: boolean;
  isLoginFinished: boolean;
  isRegisterSuccessful: boolean;
  isRegisterRequested: boolean;
  isEmailChangeRequested: boolean;
  isEmailChangedSuccessfully: boolean;
  isEmailChangeFinished: boolean;
  isPasswordChangeRequested: boolean;
  isPasswordChangedSuccessfully: boolean;
  isPasswordChangeFinished: boolean;
}

const defaultState: IUserState = {
  user: { userId: "", userEmail: "" },
  authenticationToken: "",
  isAppLoaded: false,
  isUserEmailRequested: false,
  isLoginRequested: false,
  isLoginSuccessful: true,
  isLoginFinished: false,
  isRegisterSuccessful: false,
  isRegisterRequested: false,
  isEmailChangeRequested: false,
  isEmailChangedSuccessfully: false,
  isEmailChangeFinished: false,
  isPasswordChangeRequested: false,
  isPasswordChangedSuccessfully: false,
  isPasswordChangeFinished: false,
};

const SET_USER_ID = "SET_USER_ID";
const SET_USER_EMAIL = "SET_USER_EMAIL";
const SET_AUTHENTICATION_TOKEN = "SET_AUTHENTICATION_TOKEN";
const HANDLE_LOGIN_REQUEST = "HANDLE_LOGIN_REQUEST";
const HANDLE_LOGIN_SUCCESS = "HANDLE_LOGIN_SUCCESS";
const HANDLE_LOGIN_FAILURE = "HANDLE_LOGIN_FAILURE";
const HANDLE_APP_READINESS = "HANDLE_APP_READINESS";
const HANDLE_EMAIL_REQUEST = "HANDLE_EMAIL_REQUEST";
const HANDLE_EMAIL_FETCHED = "HANDLE_EMAIL_FETCHED";
const HANDLE_REGISTER_SUCCESS = "HANDLE_REGISTER_SUCCESS";
const HANDLE_REGISTER_REQUEST = "HANDLE_REGISTER_REQUEST";
const HANDLE_REGISTER_FAILURE = "HANDLE_REGISTER_FAILURE";
const HANDLE_EMAIL_CHANGE_REQUEST = "HANDLE_EMAIL_CHANGE_REQUEST";
const HANDLE_EMAIL_CHANGED_SUCCESSFULLY = "HANDLE_EMAIL_CHANGED_SUCCESSFULLY";
const HANDLE_EMAIL_CHANGE_FINISHED = "HANDLE_EMAIL_CHANGE_FINISHED";
const HANDLE_PASSWORD_CHANGE_REQUEST = "HANDLE_PASSWORD_CHANGE_REQUEST";
const HANDLE_PASSWORD_CHANGED_SUCCESSFULLY =
  "HANDLE_PASSWORD_CHANGED_SUCCESSFULLY";
const HANDLE_PASSWORD_CHANGE_FINISHED = "HANDLE_PASSWORD_CHANGE_FINISHED";
const HANDLE_LOGOUT = "HANDLE_LOGOUT";

export const userReducer: Reducer<IUserState, IUserAction> = (
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
      
      case SET_AUTHENTICATION_TOKEN:
      return {
        ...state,
        authenticationToken: action.payload as string,
      };

    case HANDLE_APP_READINESS:
      return { ...state, isAppLoaded: true };
    case HANDLE_EMAIL_REQUEST:
      return { ...state, isUserEmailRequested: true };
    case HANDLE_EMAIL_FETCHED:
      return { ...state, isUserEmailRequested: false };

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

    case HANDLE_LOGOUT:
      return {
        ...state,
        user: defaultState.user,
        isLoginRequested: defaultState.isLoginRequested,
        isLoginSuccessful: defaultState.isLoginSuccessful,
        isLoginFinished: defaultState.isLoginFinished,
      };

    case HANDLE_REGISTER_SUCCESS:
      return { ...state, isRegisterSuccessful: true };
    case HANDLE_REGISTER_REQUEST:
      return { ...state, isRegisterRequested: true };
    case HANDLE_REGISTER_FAILURE:
      return {
        ...state,
        isRegisterRequested: false,
        isRegisterSuccessful: false,
      };

    case HANDLE_EMAIL_CHANGE_REQUEST:
      return {
        ...state,
        isEmailChangeRequested: true,
        isEmailChangedSuccessfully: false,
      };
    case HANDLE_EMAIL_CHANGED_SUCCESSFULLY:
      return {
        ...state,
        isEmailChangedSuccessfully: true,
      };
    case HANDLE_EMAIL_CHANGE_FINISHED:
      return {
        ...state,
        isEmailChangeRequested: false,
        isEmailChangeFinished: true,
      };

    case HANDLE_PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        isPasswordChangeRequested: true,
        isPasswordChangedSuccessfully: false,
      };
    case HANDLE_PASSWORD_CHANGED_SUCCESSFULLY:
      return {
        ...state,
        isPasswordChangedSuccessfully: true,
      };
    case HANDLE_PASSWORD_CHANGE_FINISHED:
      return {
        ...state,
        isPasswordChangeRequested: false,
        isPasswordChangeFinished: true,
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

export const setAuthenticationTokenAction = (payload: string) => ({
  type: SET_AUTHENTICATION_TOKEN,
  payload,
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

export const handleLogoutAction = () => ({
  type: HANDLE_LOGOUT,
});

export const handleRegisterSuccessAction = () => ({
  type: HANDLE_REGISTER_SUCCESS,
});
export const handleRegisterRequestAction = () => ({
  type: HANDLE_REGISTER_REQUEST,
});
export const handleRegisterFailureAction = () => ({
  type: HANDLE_REGISTER_FAILURE,
});

export const handleEmailChangeRequestAction = () => ({
  type: HANDLE_EMAIL_CHANGE_REQUEST,
});
export const handleEmailChangedSuccessfullyAction = () => ({
  type: HANDLE_EMAIL_CHANGED_SUCCESSFULLY,
});
export const handleEmailChangeFinishedAction = () => ({
  type: HANDLE_EMAIL_CHANGE_FINISHED,
});

export const handlePasswordChangeRequestAction = () => ({
  type: HANDLE_PASSWORD_CHANGE_REQUEST,
});
export const handlePasswordChangedSuccessfullyAction = () => ({
  type: HANDLE_PASSWORD_CHANGED_SUCCESSFULLY,
});
export const handlePasswordChangeFinishedAction = () => ({
  type: HANDLE_PASSWORD_CHANGE_FINISHED,
});
