import {
  IRegisterUser,
  ILoginUser,
  IUserEmail,
  IUserPassword,
} from "../Models/user";
import {
  IDENTITY,
  API_ACCOUNT,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  GET_USER,
  LOGIN,
  REGISTER,
  API_VERSION_IDENTITY,
} from "../JS/routeConstants";
import { AppDispatch, GetState } from "../Store";
import {
  handleEmailChangeFinishedAction,
  handleEmailChangedSuccessfullyAction,
  handlePasswordChangedSuccessfullyAction,
  setUserEmailAction,
} from "../Store/UserReducer";
import { setAuthorizationErrorsAction } from "../Store/DisclaimerReducer";

const LoginURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${LOGIN}`;
const RegisterURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${REGISTER}`;
const GetUserEmailURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${GET_USER}`;
const ChangeUserEmailURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${CHANGE_USER_EMAIL}`;
const ChangeUserPasswordURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${CHANGE_USER_PASSWORD}`;

const GetAuthHeader =
  () => async (dispatch: AppDispatch, getState: GetState) => {
    const token = getState().user.authenticationToken;
    return `Bearer ${token}`;
  };

export async function proceedLogin(body: ILoginUser) {
  const response = await fetch(LoginURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export function fetchUserEmail(tempUserID: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${GetUserEmailURI}/${tempUserID}`, {
      headers: {
        Authorization: await dispatch(GetAuthHeader()),
      },
    });

    var res = await response.json();

    dispatch(setUserEmailAction(res.email));
  };
}

export async function proceedRegister(body: IRegisterUser) {
  const response = await fetch(RegisterURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!response.ok) {
    throw await response.json();
  } else {
    return await response.json();
  }
}

export async function proceedEmailChange(userId: string, body: IUserEmail) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${ChangeUserEmailURI}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      var errorResponse = await response.json();

      dispatch(setAuthorizationErrorsAction(errorResponse.errors));
    } else {
      var res = await response.json();

      dispatch(handleEmailChangedSuccessfullyAction());
      dispatch(setUserEmailAction(res.newEmail));
    }
  };
}

export async function proceedPasswordChange(
  userId: string,
  body: IUserPassword
) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${ChangeUserPasswordURI}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      var errorResponse = await response.json();

      dispatch(setAuthorizationErrorsAction(errorResponse.errors));
    } else {
      dispatch(handlePasswordChangedSuccessfullyAction());
    }
  };
}
