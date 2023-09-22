import {
  API_PROVIDER,
  API_VERSION_PROVIDER,
  NEW,
  PROVIDER,
} from "../JS/routeConstants";
import { IProviderInfo } from "../Models/provider";
import { GetAuthHeader, proceedLogOut } from "../Services";
import { AppDispatch } from "../Store";
import {
  handleShowCustomerProviderRegisterFailedDisclaimer,
  hideAllDisclaimersAction,
} from "../Store/DisclaimerReducer";
import {
  handleDataChangedSuccessfullyAction,
  handleDataChangeFinishedAction,
  handleRegisterFailureAction,
  handleRegisterSuccessAction,
  setProviderInfoAction,
} from "../Store/ProviderReducer";
import {
  setIsPersonalDataFetched,
  setIsRegistered,
} from "../Store/UserReducer";

const ProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}`;
const RegisterProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}/${NEW}`;

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
      dispatch(setIsPersonalDataFetched(true));
    }

    if (response.status === 404) {
      dispatch(setIsPersonalDataFetched(true));
      dispatch(setIsRegistered(false));
    }
  };
}

export async function proceedProviderRegister(
  userId: string,
  body: IProviderInfo
) {
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
      dispatch(handleShowCustomerProviderRegisterFailedDisclaimer());
    } else {
      dispatch(handleRegisterSuccessAction());
      dispatch(setIsRegistered(true));
    }
  };
}

export async function proceedProviderEdit(userId: string, body: IProviderInfo) {
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
      dispatch(handleShowCustomerProviderRegisterFailedDisclaimer());
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
