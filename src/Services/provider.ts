import {
  fetchProviderInfo,
  proceedProviderEdit,
  proceedProviderRegister,
} from "../API/provider";
import { IProvider } from "../Models/provider";
import { AppDispatch } from "../Store";
import {
  handleShowProviderRegisterFailedDisclaimer,
  hideAllDisclaimersAction,
} from "../Store/DisclaimerReducer";
import {
  handleDataChangeFinishedAction,
  handleDataChangedSuccessfullyAction,
  handleRegisterFailureAction,
  handleRegisterSuccessAction,
  setProviderInfoAction,
} from "../Store/ProviderReducer";
import { useAppSelector } from "../hooks";

export const prepareProviderData = () => async (dispatch: AppDispatch) => {
  const userId = useAppSelector((s) => s.user.user.userId);

  if (userId !== "" && userId !== null)
    dispatch(await fetchProviderInfo(userId));
};

export const handleProviderRegister =
  (userId: string, body: IProvider) => async (dispatch: AppDispatch) => {
    var registerSucceed = true;

    dispatch(setProviderInfoAction(body));

    proceedProviderRegister(userId, body)
      .catch(() => {
        registerSucceed = false;
        dispatch(handleRegisterFailureAction());
        dispatch(handleShowProviderRegisterFailedDisclaimer());
      })
      .then(() => {
        if (registerSucceed) {
          dispatch(handleRegisterSuccessAction());
        }
      });
  };

export const handleProviderEdit =
  (userId: string, body: IProvider) => async (dispatch: AppDispatch) => {
    var registerSucceed = true;

    dispatch(setProviderInfoAction(body));

    proceedProviderEdit(userId, body)
      .catch(() => {
        registerSucceed = false;
        dispatch(handleDataChangeFinishedAction());
        dispatch(handleShowProviderRegisterFailedDisclaimer());
      })
      .then(() => {
        if (registerSucceed) {
          dispatch(handleDataChangedSuccessfullyAction());
          dispatch(hideAllDisclaimersAction());
        }
      });
  };
