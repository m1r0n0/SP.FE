import { Reducer } from "redux";
import { IIdentityAuthorizationError } from "../Models/user";

interface IDisclaimerAction {
  type: string;
  payload: boolean | IIdentityAuthorizationError[];
}

interface DisclaimerState {
  authorizeErrors: IIdentityAuthorizationError[];
  isNoMatchingPasswords: boolean;
  showProviderRegisterFailedDisclaimer: boolean;
}

const defaultState: DisclaimerState = {
  authorizeErrors: [],
  isNoMatchingPasswords: false,
  showProviderRegisterFailedDisclaimer: false,
};

//Common disclaimers action types
const HIDE_ALL_DISCLAIMERS = "HIDE_ALL_DISCLAIMERS";
const SET_IS_STATE_UPDATED = "SET_IS_STATE_UPDATED";

//Account disclaimers action types
const SET_AUTHORIZE_ERRORS = "SET_AUTHORIZE_ERRORS";
const SET_IS_NO_MATCHING_PASSWORDS = "IS_NO_MATCHING_PASSWORDS";

//Provider disclaimers action types
const HANDLE_CUSTOMER_PROVIDER_REGISTER_FAILURE =
  "HANDLE_CUSTOMER_PROVIDER_REGISTER_FAILURE";

export const disclaimerReducer: Reducer<DisclaimerState, IDisclaimerAction> = (
  state = defaultState,
  action: IDisclaimerAction
) => {
  switch (action.type) {
    //Common disclaimers actions
    case HIDE_ALL_DISCLAIMERS:
      return { ...defaultState };
    case SET_IS_STATE_UPDATED:
      return { ...state, isStateUpdated: true };

    //Account disclaimers actions
    case SET_AUTHORIZE_ERRORS:
      return {
        ...state,
        authorizeErrors: action.payload as IIdentityAuthorizationError[],
      };
    case SET_IS_NO_MATCHING_PASSWORDS:
      return { ...state, isNoMatchingPasswords: action.payload as boolean };

    //Account disclaimers actions
    case HANDLE_CUSTOMER_PROVIDER_REGISTER_FAILURE:
      return { ...state, showProviderRegisterFailedDisclaimer: true };

    default:
      return state;
  }
};

//Common disclaimers actions
export const hideAllDisclaimersAction = () => ({
  type: HIDE_ALL_DISCLAIMERS,
});
export const setIsStateUpdatedAction = () => ({
  type: SET_IS_STATE_UPDATED,
});

//Account disclaimers actions
export const setAuthorizationErrorsAction = (
  payload: IIdentityAuthorizationError[]
) => ({
  type: SET_AUTHORIZE_ERRORS,
  payload,
});
export const setIsNoMatchingPasswordsAction = (payload: boolean) => ({
  type: SET_IS_NO_MATCHING_PASSWORDS,
  payload,
});

//Provider disclaimers actions
export const handleShowCustomerProviderRegisterFailedDisclaimer = () => ({
  type: HANDLE_CUSTOMER_PROVIDER_REGISTER_FAILURE,
});
