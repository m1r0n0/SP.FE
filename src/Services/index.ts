import { proceedUserDelete } from "../API/user";
import { IUser } from "../Models/user";
import { AppDispatch, GetState } from "../Store";
import { handleCustomerLogoutAction } from "../Store/CustomerReducer";
import { handleProviderLogoutAction } from "../Store/ProviderReducer";
import { handleAppReadinessAction } from "../Store/UserReducer";
import { prepareCustomerData } from "./customer";
import { prepareProviderData } from "./provider";
import { prepareUserData, proceedUserLogOut } from "./user";

export const prepareAppToLoad =
  (
    user: IUser,
    isUserEmailRequested: boolean,
    isUserRegisterFinished: boolean,
    token: string | null,
    isProvider: boolean,
    isEmailFetched: boolean,
    isPersonalDataFetched: boolean
  ) => async (dispatch: AppDispatch) => {
    await dispatch(
      prepareUserData(user, isUserEmailRequested, token as string)
    );

    if (!isPersonalDataFetched) {
      if (isProvider) {
        await dispatch(
          prepareProviderData(user.userId, isUserRegisterFinished)
        );
      } else
        await dispatch(
          prepareCustomerData(user.userId, isUserRegisterFinished)
        );
    }

    //Load app if there's NO user info OR all user info fetched
    if (token === null || (isEmailFetched && isPersonalDataFetched))
      dispatch(handleAppReadinessAction());
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
