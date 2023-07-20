import {
  API_PROVIDER,
  API_VERSION_PROVIDER,
  PROVIDER,
  REGISTER_PROVIDER,
} from "../JS/routeConstants";
import { IProvider } from "../Models/provider";
import { proceedLogOut } from "../Services";
import { AppDispatch } from "../Store";
import { setProviderInfoAction } from "../Store/ProviderReducer";

const ProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}`;
const RegisterProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}/${REGISTER_PROVIDER}`;

export async function fetchProviderInfo(userId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${ProviderURI}/${userId}`);

    if (response.ok) {
      var provider = await response.json();

      dispatch(setProviderInfoAction(provider));
    }
  };
}

export async function proceedProviderRegister(userId: string, body: IProvider) {
  const response = await fetch(`${RegisterProviderURI}/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export async function proceedProviderEdit(userId: string, body: IProvider) {
  const response = await fetch(`${ProviderURI}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export async function proceedProviderDelete(userId: string) {
  return async (dispatch: AppDispatch) => {
    await fetch(`${ProviderURI}/${userId}`, {
      method: "DELETE",
      // headers: {
      //   Authorization: await dispatch(GetAuthHeader()),
      // },
    });

    window.alert("User deleted successfully!");
    dispatch(proceedLogOut());
  };
}
