import {Reducer} from "redux";
import {ICustomer} from "../Models/customer";

interface ICustomerAction {
    type: string;
    payload: string | ICustomer;
}

interface ICustomerState {
    customer: ICustomer;
    isRegisterSuccessful: boolean;
    isRegisterRequested: boolean;
    isRegisterFinished: boolean;
    isDataChangeRequested: boolean;
    isDataChangedSuccessfully: boolean;
    isDataChangeFinished: boolean;
}

const defaultState: ICustomerState = {
    customer: {
        firstName: "",
        lastName: ""
    },
    isRegisterSuccessful: false,
    isRegisterRequested: false,
    isRegisterFinished: false,
    isDataChangeRequested: false,
    isDataChangedSuccessfully: false,
    isDataChangeFinished: false,
};

const SET_CUSTOMER = "SET_CUSTOMER";
const HANDLE_CUSTOMER_REGISTER_SUCCESS = "HANDLE_CUSTOMER_REGISTER_SUCCESS";
const HANDLE_CUSTOMER_REGISTER_REQUEST = "HANDLE_CUSTOMER_REGISTER_REQUEST";
const HANDLE_CUSTOMER_REGISTER_FAILURE = "HANDLE_CUSTOMER_REGISTER_FAILURE";
const HANDLE_CUSTOMER_DATA_CHANGE_REQUEST =
    "HANDLE_CUSTOMER_DATA_CHANGE_REQUEST";
const HANDLE_CUSTOMER_DATA_CHANGED_SUCCESSFULLY =
    "HANDLE_CUSTOMER_DATA_CHANGED_SUCCESSFULLY";
const HANDLE_CUSTOMER_DATA_CHANGE_FINISHED =
    "HANDLE_CUSTOMER_DATA_CHANGE_FINISHED";
const HANDLE_CUSTOMER_LOG_OUT = "HANDLE_CUSTOMER_LOG_OUT";

export const customerReducer: Reducer<ICustomerState, ICustomerAction> = (
    state = defaultState,
    action: ICustomerAction
) => {
    switch (action.type) {
        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload as ICustomer,
            };

        case HANDLE_CUSTOMER_REGISTER_SUCCESS:
            return {
                ...state,
                isDataChangeRequested: false,
                isRegisterSuccessful: true,
                isRegisterFinished: true,
            };
        case HANDLE_CUSTOMER_REGISTER_REQUEST:
            return {
                ...state,
                isRegisterRequested: true,
                isRegisterFinished: false,
            };
        case HANDLE_CUSTOMER_REGISTER_FAILURE:
            return {
                ...state,
                isRegisterRequested: false,
                isRegisterSuccessful: false,
                isRegisterFinished: true,
            };

        case HANDLE_CUSTOMER_DATA_CHANGE_REQUEST:
            return {
                ...state,
                isDataChangeRequested: true,
                isDataChangedSuccessfully: false,
            };
        case HANDLE_CUSTOMER_DATA_CHANGED_SUCCESSFULLY:
            return {
                ...state,
                isDataChangedSuccessfully: true,
            };
        case HANDLE_CUSTOMER_DATA_CHANGE_FINISHED:
            return {
                ...state,
                isDataChangeRequested: false,
                isDataChangeFinished: true,
            };

        case HANDLE_CUSTOMER_LOG_OUT:
            return {...defaultState};

        default:
            return state;
    }
};

export const setCustomerInfoAction = (payload: ICustomer) => ({
    type: SET_CUSTOMER,
    payload,
});

export const handleRegisterSuccessAction = () => ({
    type: HANDLE_CUSTOMER_REGISTER_SUCCESS,
});
export const handleRegisterRequestAction = () => ({
    type: HANDLE_CUSTOMER_REGISTER_REQUEST,
});
export const handleRegisterFailureAction = () => ({
    type: HANDLE_CUSTOMER_REGISTER_FAILURE,
});

export const handleDataChangeRequestAction = () => ({
    type: HANDLE_CUSTOMER_DATA_CHANGE_REQUEST,
});
export const handleDataChangedSuccessfullyAction = () => ({
    type: HANDLE_CUSTOMER_DATA_CHANGED_SUCCESSFULLY,
});
export const handleDataChangeFinishedAction = () => ({
    type: HANDLE_CUSTOMER_DATA_CHANGE_FINISHED,
});

export const handleCustomerLogoutAction = () => ({
    type: HANDLE_CUSTOMER_LOG_OUT,
});
