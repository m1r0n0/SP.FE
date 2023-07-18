import {
  API_PROVIDER,
  API_VERSION_PROVIDER,
  PROVIDER,
  REGISTER_PROVIDER,
} from "../JS/routeConstants";
import { IProvider } from "../Models/provider";

const RegisterProviderURI = `${API_PROVIDER}/${API_VERSION_PROVIDER}/${PROVIDER}/${REGISTER_PROVIDER}`;

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
