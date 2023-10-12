import jwtDecode from "jwt-decode";
import { proceedUserDelete } from "../API/user";
import { IDecodedJWT, IUser } from "../Models/user";
import { AppDispatch, GetState } from "../Store";
import { handleCustomerLogoutAction } from "../Store/CustomerReducer";
import { handleProviderLogoutAction } from "../Store/ProviderReducer";
import { setIsAppLoaded } from "../Store/UserReducer";
import { prepareCustomerData } from "./customer";
import { prepareProviderData } from "./provider";
import { prepareUserData, proceedUserLogOut } from "./user";

export const prepareAppToLoad =
  (
    isUserEmailRequested: boolean,
    isUserRegisterFinished: boolean,
    token: string | null,
    isProvider: boolean
  ) =>
  async (dispatch: AppDispatch) => {
    if (token !== null) {
      var decodedToken: IDecodedJWT = jwtDecode(token as string);
      var userId: string = decodedToken.UserId;

      await dispatch(prepareUserData(isUserEmailRequested, token as string));

      if (isProvider) {
        dispatch(prepareProviderData(userId, isUserRegisterFinished));
      } else {
        dispatch(prepareCustomerData(userId, isUserRegisterFinished));
      }
    }
  };

export const checkAppReadiness =
  (
    token: string | null,
    isEmailFetched: boolean,
    isPersonalDataFetched: boolean
  ) =>
  async (dispatch: AppDispatch) => {
    //Load app if there's NO user info OR all user info fetched
    if (token === null || (isEmailFetched && isPersonalDataFetched))
      dispatch(setIsAppLoaded(true));
  };

export const proceedLogOut = () => async (dispatch: AppDispatch) => {
  dispatch(proceedUserLogOut());
  dispatch(handleProviderLogoutAction());
  dispatch(handleCustomerLogoutAction());
};

export const confirmDelete =
  (userId: string, isAlreadyDeleted: boolean) =>
  async (dispatch: AppDispatch) => {
    if (!isAlreadyDeleted)
      if (window.confirm("Do you really want to delete your account?")) {
        dispatch(await proceedUserDelete(userId));
      }
  };

export const GetAuthHeader =
  () => async (dispatch: AppDispatch, getState: GetState) => {
    const token = getState().user.authenticationToken;
    return `Bearer ${token}`;
  };
