import {fetchProviderInfo, proceedProviderEdit, proceedProviderRegister,} from "../API/provider";
import {IProvider} from "../Models/provider";
import {AppDispatch} from "../Store";
import {hideAllDisclaimersAction} from "../Store/DisclaimerReducer";
import {
    handleDataChangeRequestAction,
    handleRegisterRequestAction,
    setProviderInfoAction,
} from "../Store/ProviderReducer";

export const prepareProviderData = (userId: string, isUserRegisterFinished: boolean) => async (dispatch: AppDispatch) => {
    if (userId !== "" && userId !== null && !isUserRegisterFinished)
        dispatch(await fetchProviderInfo(userId));
};

export const handleProviderRegister =
    (userId: string, body: IProvider) => async (dispatch: AppDispatch) => {
        dispatch(hideAllDisclaimersAction());
        dispatch(handleRegisterRequestAction());
        dispatch(setProviderInfoAction(body));
        dispatch(await proceedProviderRegister(userId, body));
    };

export const handleProviderEdit =
    (userId: string, body: IProvider) => async (dispatch: AppDispatch) => {
        dispatch(hideAllDisclaimersAction());
        dispatch(handleDataChangeRequestAction());

        dispatch(await proceedProviderEdit(userId, body));
    };
