import { proceedProviderDelete } from "../API/provider";
import { proceedUserDelete } from "../API/user";
import { IUser } from "../Models/user";
import { AppDispatch, GetState } from "../Store";
import { handleCustomerLogoutAction } from "../Store/CustomerReducer";
import { handleProviderLogoutAction } from "../Store/ProviderReducer";
import { prepareCustomerData } from "./customer";
import { prepareProviderData } from "./provider";
import { prepareUserData, proceedUserLogOut } from "./user";

export const prepareAppToLoad =
  (
    user: IUser,
    isUserEmailRequested: boolean,
    isUserRegisterFinished: boolean,
    token: string | null,
    isProvider: boolean
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(prepareUserData(user, isUserEmailRequested, token));
    if (isProvider !== null) {
      if (isProvider) {
        dispatch(prepareProviderData(user.userId, isUserRegisterFinished));
      } else dispatch(prepareCustomerData(user.userId, isUserRegisterFinished));
    }
  };

export const proceedLogOut = () => async (dispatch: AppDispatch) => {
  dispatch(proceedUserLogOut());
  dispatch(handleProviderLogoutAction());
  dispatch(handleCustomerLogoutAction());
};

export const confirmDelete =
  (userId: string) => async (dispatch: AppDispatch) => {
    if (window.confirm("Do you really want to delete your account?")) {
      dispatch(await proceedUserDelete(userId));
    }
  };

export const GetAuthHeader =
  () => async (dispatch: AppDispatch, getState: GetState) => {
    const token = getState().user.authenticationToken;
    return `Bearer ${token}`;
  };
