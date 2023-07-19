import { AppDispatch } from "../Store";
import { prepareProviderData } from "./provider";
import { prepareUserData } from "./user";

export const prepareAppToLoad = () => async (dispatch: AppDispatch) => {
  dispatch(prepareUserData());
  dispatch(prepareProviderData());
};
