import { Reducer } from "redux";
import {
  IIdentityAuthorizationError,
  ILoginUserResponse,
  IUser,
} from "../Models/user";

interface IUserAction {
  type: string;
  payload:
    | ILoginUserResponse
    | string
    | IUser
    | IIdentityAuthorizationError[]
    | boolean;
}

interface IUserState {
  user: IUser;
  isProvider: boolean;
  authenticationToken: string;
  isAppLoaded: boolean;
  isUserEmailRequested: boolean;
  isLoginRequested: boolean;
  isLoginSuccessful: boolean;
  isLoginFinished: boolean;
  isRegisterSuccessful: boolean;
  isRegisterRequested: boolean;
  isRegisterFinished: boolean;
  isEmailChangeRequested: boolean;
  isEmailChangedSuccessfully: boolean;
  isEmailChangeFinished: boolean;
  isPasswordChangeRequested: boolean;
  isPasswordChangedSuccessfully: boolean;
  isPasswordChangeFinished: boolean;
  isEmailFetched: boolean;
  isPersonalDataFetched: boolean;
  isRegistered: boolean;
}

const defaultState: IUserState = {
  user: { userId: "", userEmail: "" },
  isProvider: false,
  authenticationToken: "",
  isAppLoaded: false,
  isUserEmailRequested: false,
  isLoginRequested: false,
  isLoginSuccessful: true,
  isLoginFinished: false,
  isRegisterSuccessful: false,
  isRegisterRequested: false,
  isRegisterFinished: false,
  isEmailChangeRequested: false,
  isEmailChangedSuccessfully: false,
  isEmailChangeFinished: false,
  isPasswordChangeRequested: false,
  isPasswordChangedSuccessfully: false,
  isPasswordChangeFinished: false,
  isEmailFetched: false,
  isPersonalDataFetched: false,
  isRegistered: true,
};

const HIDE_ALL_DISCLAIMERS = "HIDE_ALL_DISCLAIMERS";
const SET_USER_ID = "SET_USER_ID";
const SET_USER_EMAIL = "SET_USER_EMAIL";
const SET_IS_PROVIDER = "SET_IS_PROVIDER";
const SET_AUTHENTICATION_TOKEN = "SET_AUTHENTICATION_TOKEN";
const HANDLE_USER_LOGIN_REQUEST = "HANDLE_USER_LOGIN_REQUEST";
const HANDLE_USER_LOGIN_SUCCESS = "HANDLE_USER_LOGIN_SUCCESS";
const HANDLE_USER_LOGIN_FAILURE = "HANDLE_USER_LOGIN_FAILURE";
const HANDLE_USER_APP_READINESS = "HANDLE_USER_APP_READINESS";
const HANDLE_USER_EMAIL_REQUEST = "HANDLE_USER_EMAIL_REQUEST";
const HANDLE_USER_EMAIL_FETCHED = "HANDLE_USER_EMAIL_FETCHED";
const HANDLE_USER_REGISTER_SUCCESS = "HANDLE_USER_REGISTER_SUCCESS";
const HANDLE_USER_REGISTER_REQUEST = "HANDLE_USER_REGISTER_REQUEST";
const HANDLE_USER_REGISTER_FAILURE = "HANDLE_USER_REGISTER_FAILURE";
const HANDLE_USER_EMAIL_CHANGE_REQUEST = "HANDLE_USER_EMAIL_CHANGE_REQUEST";
const HANDLE_USER_EMAIL_CHANGED_SUCCESSFULLY =
  "HANDLE_USER_EMAIL_CHANGED_SUCCESSFULLY";
const HANDLE_USER_EMAIL_CHANGE_FINISHED = "HANDLE_USER_EMAIL_CHANGE_FINISHED";
const HANDLE_USER_PASSWORD_CHANGE_REQUEST =
  "HANDLE_USER_PASSWORD_CHANGE_REQUEST";
const HANDLE_USER_PASSWORD_CHANGED_SUCCESSFULLY =
  "HANDLE_USER_PASSWORD_CHANGED_SUCCESSFULLY";
const HANDLE_USER_PASSWORD_CHANGE_FINISHED =
  "HANDLE_USER_PASSWORD_CHANGE_FINISHED";
const HANDLE_USER_LOGOUT = "HANDLE_USER_LOGOUT";
const SET_IS_EMAIL_FETCHED = "SET_IS_EMAIL_FETCHED";
const SET_IS_PERSONAL_DATA_FETCHED = "SET_IS_PERSONAL_DATA_FETCHED";
const SET_IS_USER_REGISTERED = "SET_IS_USER_REGISTERED";

export const userReducer: Reducer<IUserState, IUserAction> = (
  state = defaultState,
  action: IUserAction
) => {
  let loginUser: ILoginUserResponse = action.payload as ILoginUserResponse;

  switch (action.type) {
    case HIDE_ALL_DISCLAIMERS:
      return {
        ...state,
        isEmailChangeRequested: false,
        isEmailChangeFinished: false,
        isPasswordChangeRequested: false,
        isPasswordChangeFinished: false,
      };
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
    case SET_IS_PROVIDER:
      return { ...state, isProvider: action.payload as boolean };

    case SET_AUTHENTICATION_TOKEN:
      return {
        ...state,
        authenticationToken: action.payload as string,
      };

    case HANDLE_USER_APP_READINESS:
      return { ...state, isAppLoaded: true };
    case HANDLE_USER_EMAIL_REQUEST:
      return { ...state, isUserEmailRequested: true };
    case HANDLE_USER_EMAIL_FETCHED:
      return { ...state, isUserEmailRequested: false };

    case HANDLE_USER_LOGIN_REQUEST:
      return { ...state, isLoginRequested: true };
    case HANDLE_USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: { userId: loginUser.userId, userEmail: loginUser.email },
        isLoginSuccessful: true,
        isLoginFinished: true,
      };
    case HANDLE_USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoginSuccessful: false,
        isLoginRequested: false,
      };

    case HANDLE_USER_LOGOUT:
      return {
        ...defaultState,
        isAppLoaded: true,
      };

    case HANDLE_USER_REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterSuccessful: true,
        isRegisterFinished: true,
        isRegistered: false,
      };
    case HANDLE_USER_REGISTER_REQUEST:
      return { ...state, isRegisterRequested: true };
    case HANDLE_USER_REGISTER_FAILURE:
      return {
        ...state,
        isRegisterRequested: false,
        isRegisterSuccessful: false,
        isRegisterFinished: true,
      };

    case HANDLE_USER_EMAIL_CHANGE_REQUEST:
      return {
        ...state,
        isEmailChangeRequested: true,
        isEmailChangedSuccessfully: false,
      };
    case HANDLE_USER_EMAIL_CHANGED_SUCCESSFULLY:
      return {
        ...state,
        isEmailChangedSuccessfully: true,
      };
    case HANDLE_USER_EMAIL_CHANGE_FINISHED:
      return {
        ...state,
        isEmailChangeRequested: false,
        isEmailChangeFinished: true,
      };

    case HANDLE_USER_PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        isPasswordChangeRequested: true,
        isPasswordChangedSuccessfully: false,
      };
    case HANDLE_USER_PASSWORD_CHANGED_SUCCESSFULLY:
      return {
        ...state,
        isPasswordChangedSuccessfully: true,
      };
    case HANDLE_USER_PASSWORD_CHANGE_FINISHED:
      return {
        ...state,
        isPasswordChangeRequested: false,
        isPasswordChangeFinished: true,
      };

    case SET_IS_EMAIL_FETCHED:
      return {
        ...state,
        isEmailFetched: action.payload as boolean,
      };
    case SET_IS_PERSONAL_DATA_FETCHED:
      return {
        ...state,
        isPersonalDataFetched: action.payload as boolean,
      };

    case SET_IS_USER_REGISTERED:
      return {
        ...state,
        isRegistered: action.payload as boolean,
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
export const setIsProviderAction = (payload: boolean) => ({
  type: SET_IS_PROVIDER,
  payload,
});

export const setAuthenticationTokenAction = (payload: string) => ({
  type: SET_AUTHENTICATION_TOKEN,
  payload,
});

export const handleAppReadinessAction = () => ({
  type: HANDLE_USER_APP_READINESS,
});
export const handleEmailRequestAction = () => ({
  type: HANDLE_USER_EMAIL_REQUEST,
});
export const handleEmailFetchedAction = () => ({
  type: HANDLE_USER_EMAIL_FETCHED,
});

export const handleLoginRequestAction = () => ({
  type: HANDLE_USER_LOGIN_REQUEST,
});
export const handleLoginSuccessAction = (payload: ILoginUserResponse) => ({
  type: HANDLE_USER_LOGIN_SUCCESS,
  payload,
});
export const handleLoginFailureAction = () => ({
  type: HANDLE_USER_LOGIN_FAILURE,
});

export const handleLogoutAction = () => ({
  type: HANDLE_USER_LOGOUT,
});

export const handleRegisterSuccessAction = () => ({
  type: HANDLE_USER_REGISTER_SUCCESS,
});
export const handleRegisterRequestAction = () => ({
  type: HANDLE_USER_REGISTER_REQUEST,
});
export const handleRegisterFailureAction = () => ({
  type: HANDLE_USER_REGISTER_FAILURE,
});

export const handleEmailChangeRequestAction = () => ({
  type: HANDLE_USER_EMAIL_CHANGE_REQUEST,
});
export const handleEmailChangedSuccessfullyAction = () => ({
  type: HANDLE_USER_EMAIL_CHANGED_SUCCESSFULLY,
});
export const handleEmailChangeFinishedAction = () => ({
  type: HANDLE_USER_EMAIL_CHANGE_FINISHED,
});

export const handlePasswordChangeRequestAction = () => ({
  type: HANDLE_USER_PASSWORD_CHANGE_REQUEST,
});
export const handlePasswordChangedSuccessfullyAction = () => ({
  type: HANDLE_USER_PASSWORD_CHANGED_SUCCESSFULLY,
});
export const handlePasswordChangeFinishedAction = () => ({
  type: HANDLE_USER_PASSWORD_CHANGE_FINISHED,
});

export const setIsEmailFetched = (payload: boolean) => ({
  type: SET_IS_EMAIL_FETCHED,
  payload,
});
export const setIsPersonalDataFetched = (payload: boolean) => ({
  type: SET_IS_PERSONAL_DATA_FETCHED,
  payload,
});

export const setIsRegistered = (payload: boolean) => ({
  type: SET_IS_USER_REGISTERED,
  payload,
});
