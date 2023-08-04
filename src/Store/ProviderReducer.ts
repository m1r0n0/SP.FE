import {Reducer} from "redux";
import {IProvider} from "../Models/provider";

interface IProviderAction {
    type: string;
    payload: string | IProvider;
}

interface IProviderState {
    provider: IProvider;
    isRegisterSuccessful: boolean;
    isRegisterRequested: boolean;
    isRegisterFinished: boolean;
    isDataChangeRequested: boolean;
    isDataChangedSuccessfully: boolean;
    isDataChangeFinished: boolean;
}

const defaultState: IProviderState = {
    provider: {
        firstName: "",
        lastName: "",
        enterpriseName: "",
        workHoursBegin: 8,
        workHoursEnd: 16,
    },
    isRegisterSuccessful: false,
    isRegisterRequested: false,
    isRegisterFinished: false,
    isDataChangeRequested: false,
    isDataChangedSuccessfully: false,
    isDataChangeFinished: false,
};

const SET_PROVIDER = "SET_PROVIDER";
const HANDLE_PROVIDER_REGISTER_SUCCESS = "HANDLE_PROVIDER_REGISTER_SUCCESS";
const HANDLE_PROVIDER_REGISTER_REQUEST = "HANDLE_PROVIDER_REGISTER_REQUEST";
const HANDLE_PROVIDER_REGISTER_FAILURE = "HANDLE_PROVIDER_REGISTER_FAILURE";
const HANDLE_PROVIDER_DATA_CHANGE_REQUEST =
    "HANDLE_PROVIDER_DATA_CHANGE_REQUEST";
const HANDLE_PROVIDER_DATA_CHANGED_SUCCESSFULLY =
    "HANDLE_PROVIDER_DATA_CHANGED_SUCCESSFULLY";
const HANDLE_PROVIDER_DATA_CHANGE_FINISHED =
    "HANDLE_PROVIDER_DATA_CHANGE_FINISHED";
const HANDLE_PROVIDER_LOG_OUT = "HANDLE_PROVIDER_LOG_OUT";

export const providerReducer: Reducer<IProviderState, IProviderAction> = (
    state = defaultState,
    action: IProviderAction
) => {
    switch (action.type) {
        case SET_PROVIDER:
            return {
                ...state,
                provider: action.payload as IProvider,
            };

        case HANDLE_PROVIDER_REGISTER_SUCCESS:
            return {
                ...state,
                isDataChangeRequested: false,
                isRegisterSuccessful: true,
                isRegisterFinished: true,
            };
        case HANDLE_PROVIDER_REGISTER_REQUEST:
            return {
                ...state,
                isRegisterRequested: true,
                isRegisterFinished: false,
            };
        case HANDLE_PROVIDER_REGISTER_FAILURE:
            return {
                ...state,
                isRegisterRequested: false,
                isRegisterSuccessful: false,
                isRegisterFinished: true,
            };

        case HANDLE_PROVIDER_DATA_CHANGE_REQUEST:
            return {
                ...state,
                isDataChangeRequested: true,
                isDataChangedSuccessfully: false,
            };
        case HANDLE_PROVIDER_DATA_CHANGED_SUCCESSFULLY:
            return {
                ...state,
                isDataChangedSuccessfully: true,
            };
        case HANDLE_PROVIDER_DATA_CHANGE_FINISHED:
            return {
                ...state,
                isDataChangeRequested: false,
                isDataChangeFinished: true,
            };

        case HANDLE_PROVIDER_LOG_OUT:
            return {...defaultState};

        default:
            return state;
    }
};

export const setProviderInfoAction = (payload: IProvider) => ({
    type: SET_PROVIDER,
    payload,
});

export const handleRegisterSuccessAction = () => ({
    type: HANDLE_PROVIDER_REGISTER_SUCCESS,
});
export const handleRegisterRequestAction = () => ({
    type: HANDLE_PROVIDER_REGISTER_REQUEST,
});
export const handleRegisterFailureAction = () => ({
    type: HANDLE_PROVIDER_REGISTER_FAILURE,
});

export const handleDataChangeRequestAction = () => ({
    type: HANDLE_PROVIDER_DATA_CHANGE_REQUEST,
});
export const handleDataChangedSuccessfullyAction = () => ({
    type: HANDLE_PROVIDER_DATA_CHANGED_SUCCESSFULLY,
});
export const handleDataChangeFinishedAction = () => ({
    type: HANDLE_PROVIDER_DATA_CHANGE_FINISHED,
});

export const handleProviderLogoutAction = () => ({
    type: HANDLE_PROVIDER_LOG_OUT,
});
