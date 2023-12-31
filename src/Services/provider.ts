import {
  fetchProviderInfo,
  proceedProviderEdit,
  proceedProviderRegister,
} from "../API/provider";
import { IProviderInfo } from "../Models/provider";
import { AppDispatch } from "../Store";
import { hideAllDisclaimersAction } from "../Store/DisclaimerReducer";
import {
  handleDataChangeRequestAction,
  handleRegisterRequestAction,
  setProviderInfoAction,
} from "../Store/ProviderReducer";
import { setIsProviderAction, setIsRegistered } from "../Store/UserReducer";

export const prepareProviderData =
  (userId: string, isUserRegisterFinished: boolean) =>
  async (dispatch: AppDispatch) => {
    if (userId !== "" && userId !== null && !isUserRegisterFinished) {
      dispatch(await fetchProviderInfo(userId));
      dispatch(setIsProviderAction(true));
    }
  };

export const handleProviderRegister =
  (userId: string, body: IProviderInfo) => async (dispatch: AppDispatch) => {
    dispatch(hideAllDisclaimersAction());
    dispatch(handleRegisterRequestAction());
    dispatch(setProviderInfoAction(body));
    dispatch(await proceedProviderRegister(userId, body));
  };

export const handleProviderEdit =
  (userId: string, body: IProviderInfo) => async (dispatch: AppDispatch) => {
    dispatch(hideAllDisclaimersAction());
    dispatch(handleDataChangeRequestAction());
    dispatch(await proceedProviderEdit(userId, body));
  };
