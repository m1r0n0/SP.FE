import { proceedProviderRegister } from "../API/provider";
import { IProvider } from "../Models/provider";
import { AppDispatch } from "../Store";
import {
  handleRegisterFailureAction,
  handleRegisterSuccessAction,
  setProviderDataAction,
} from "../Store/ProviderReducer";

export const handleProviderRegister =
  (userId: string, body: IProvider) => async (dispatch: AppDispatch) => {
    var registerSucceed = true;

    dispatch(setProviderDataAction(body));

    proceedProviderRegister(userId, body)
      .catch(() => {
        registerSucceed = false;
        dispatch(handleRegisterFailureAction());
      })
      .then(() => {
        if (registerSucceed) {
          dispatch(handleRegisterSuccessAction());
        }
      });
  };
