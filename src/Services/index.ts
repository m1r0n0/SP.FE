import { proceedProviderDelete } from "../API/provider";
import { proceedUserDelete } from "../API/user";
import { AppDispatch } from "../Store";
import { handleProviderLogoutAction } from "../Store/ProviderReducer";
import { prepareProviderData } from "./provider";
import { prepareUserData, proceedUserLogOut } from "./user";

export const prepareAppToLoad = () => async (dispatch: AppDispatch) => {
  dispatch(prepareUserData());
  dispatch(prepareProviderData());
};

export const proceedLogOut = () => async (dispatch: AppDispatch) => {
  dispatch(proceedUserLogOut());
  dispatch(handleProviderLogoutAction());
};

export const confirmDelete =
  (userId: string) => async (dispatch: AppDispatch) => {
    if (window.confirm("Do you really want to delete your account?")) {
      dispatch(await proceedUserDelete(userId))
    }
  };