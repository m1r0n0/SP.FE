import {
  ILoginUser,
  IRegisterUser,
  IUserEmail,
  IUserPassword,
} from "../Models/user";
import {
  API_ACCOUNT,
  API_SERVICE,
  API_VERSION_IDENTITY,
  API_VERSION_SERVICE,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  DELETE_USER,
  DELETE_USER_RELATED_INFO,
  GET_USER,
  IDENTITY,
  LOGIN,
  REGISTER,
  SERVICE,
} from "../JS/routeConstants";
import { AppDispatch } from "../Store";
import {
  handleEmailChangedSuccessfullyAction,
  handlePasswordChangedSuccessfullyAction,
  setIsEmailFetched,
  setUserEmailAction,
} from "../Store/UserReducer";
import { setAuthorizationErrorsAction } from "../Store/DisclaimerReducer";
import { GetAuthHeader, proceedLogOut } from "../Services";
import { proceedProviderDelete } from "./provider";
import { proceedCustomerDelete } from "./customer";
import { SERVFAIL } from "dns";
import { proceedUserRelatedInfoDelete } from "./service";

const LoginURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${LOGIN}`;
const RegisterURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${REGISTER}`;
const GetUserEmailURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${GET_USER}`;
const ChangeUserEmailURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${CHANGE_USER_EMAIL}`;
const ChangeUserPasswordURI: string = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${CHANGE_USER_PASSWORD}`;
const DeleteUserURI = `${API_ACCOUNT}/${API_VERSION_IDENTITY}/${IDENTITY}/${DELETE_USER}`;

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

    if (response.ok) {
      var res = await response.json();
      dispatch(setUserEmailAction(res.email));
      dispatch(setIsEmailFetched(true));
    } else {
      await dispatch(proceedLogOut());
    }
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

export async function proceedUserDelete(userId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${DeleteUserURI}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: await dispatch(GetAuthHeader()),
      },
    });

    if (response.ok) {
      dispatch(await proceedProviderDelete(userId));
      dispatch(await proceedCustomerDelete(userId));
      dispatch(await proceedUserRelatedInfoDelete(userId));

      window.alert("User deleted successfully!");
      dispatch(proceedLogOut());
    }
  };
}
