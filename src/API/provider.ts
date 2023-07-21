import {
  API_PROVIDER,
  API_VERSION_PROVIDER,
  PROVIDER,
  REGISTER_PROVIDER,
} from "../JS/routeConstants";
import { IProvider } from "../Models/provider";
import { GetAuthHeader, proceedLogOut } from "../Services";
import { AppDispatch } from "../Store";
import {
  handleShowProviderRegisterFailedDisclaimer,
  hideAllDisclaimersAction,
} from "../Store/DisclaimerReducer";
import {
  handleDataChangeFinishedAction,
  handleDataChangedSuccessfullyAction,
  handleRegisterFailureAction,
  handleRegisterSuccessAction,
  setProviderInfoAction,
} from "../Store/ProviderReducer";

const ProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}`;
const RegisterProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}/${REGISTER_PROVIDER}`;

export async function fetchProviderInfo(userId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${ProviderURI}/${userId}`, {
      headers: {
        Authorization: await dispatch(GetAuthHeader()),
      },
    });

    if (response.ok) {
      var provider = await response.json();

      dispatch(setProviderInfoAction(provider));
    }
  };
}

export async function proceedProviderRegister(userId: string, body: IProvider) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${RegisterProviderURI}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      dispatch(handleRegisterFailureAction());
      dispatch(handleShowProviderRegisterFailedDisclaimer());
    } else {
      dispatch(handleRegisterSuccessAction());
    }
  };
}

export async function proceedProviderEdit(userId: string, body: IProvider) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${ProviderURI}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      dispatch(handleShowProviderRegisterFailedDisclaimer());
    } else {
      dispatch(setProviderInfoAction(body));
      dispatch(handleDataChangedSuccessfullyAction());
      dispatch(hideAllDisclaimersAction());
    }
    dispatch(handleDataChangeFinishedAction());
  };
}

export async function proceedProviderDelete(userId: string) {
  return async (dispatch: AppDispatch) => {
    await fetch(`${ProviderURI}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: await dispatch(GetAuthHeader()),
      },
    });

    window.alert("User deleted successfully!");
    dispatch(proceedLogOut());
  };
}
