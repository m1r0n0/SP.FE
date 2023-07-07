import {
  IRegisterUser,
  ILoginUser,
  IUserEmail,
  IUserPassword,
} from "../Models/user";
import {
  IDENTITY,
  API,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  GET_USER,
  GET_USER_ID,
  LOGIN,
  REGISTER,
  API_VERSION_IDENTITY,
} from "../JS/routeConstants";

const LoginURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${LOGIN}`;
const RegisterURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${REGISTER}`;
const GetUserIdURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${GET_USER_ID}`;
const GetUserEmailURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${GET_USER}`;
const ChangeUserEmailURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${CHANGE_USER_EMAIL}`;
const ChangeUserPasswordURI: string = `${API}/${API_VERSION_IDENTITY}/${IDENTITY}/${CHANGE_USER_PASSWORD}`;

export async function fetchUserID(userEmail: string) {
  const response = await fetch(`${GetUserIdURI}/${userEmail}`);
  return await response.json();
}

export async function fetchUserEmail(tempUserID: string) {
  const response = await fetch(`${GetUserEmailURI}/${tempUserID}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
  });
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
  const response = await fetch(`${ChangeUserEmailURI}/${userId}`, {
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

export async function proceedPasswordChange(
  userId: string,
  body: IUserPassword
) {
  const response = await fetch(`${ChangeUserPasswordURI}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not OK");
  }
}
