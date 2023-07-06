import {
  IRegisterUser,
  ILoginUser,
  IUserEmailId,
  IUserPasswordId,
} from "../Models/user";
import {
  IDENTITY,
  API,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  GET_USER_EMAIL,
  GET_USER_ID,
  LOGIN,
  REGISTER,
  API_VERSION_IDENTITY,
} from "../JS/routeConstants";
import { error } from "console";

const GetUserIdURI: string = `${API}/${IDENTITY}/${GET_USER_ID}`;
const GetUserEmailURI: string = `${API}/${IDENTITY}/${GET_USER_EMAIL}`;
const LoginURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${LOGIN}`;
const RegisterURI: string = `${API}/${IDENTITY}/${REGISTER}`;
const ChangeUserEmailURI: string = `${API}/${IDENTITY}/${CHANGE_USER_EMAIL}`;
const ChangeUserPasswordURI: string = `${API}/${IDENTITY}/${CHANGE_USER_PASSWORD}`;

export async function fetchUserID(userEmail: string) {
  const response = await fetch(`${GetUserIdURI}?userEmail=${userEmail}`);
  return await response.json();
}

export async function fetchUserEmail(tempUserID: string) {
  const response = await fetch(`${GetUserEmailURI}?userID=${tempUserID}`);
  return await response.json();
}

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

export async function proceedRegister(body: IRegisterUser) {
  const response = await fetch(RegisterURI, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(String(response.status));
  } else {
    return await response.json();
  }
}

export async function proceedEmailChange(body: IUserEmailId) {
  const response = await fetch(ChangeUserEmailURI, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}

export async function proceedPasswordChange(body: IUserPasswordId) {
  const response = await fetch(ChangeUserPasswordURI, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  } else {
    return await response.json();
  }
}
