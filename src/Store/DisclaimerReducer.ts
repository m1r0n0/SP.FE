import { Reducer } from "redux";

interface IDisclaimerAction {
  type: string;
  payload: boolean;
}

interface DisclaimerState {
  isExistingEmail: boolean;
  isInvalidEmail: boolean;
  isInvalidPasswordInput: boolean;
  isNoMatchingPasswords: boolean;
  isEmailSuitable: boolean;
  isStateUpdated: boolean;
  isFullUrlInvalid: boolean;
  isDeletingLinkNotFound: boolean;
  isDeletingLinkUnaccessible: boolean;
  isLinkDeletedSuccessfully: boolean;
}

const defaultState: DisclaimerState = {
  isExistingEmail: false,
  isInvalidEmail: false,
  isInvalidPasswordInput: false,
  isNoMatchingPasswords: false,
  isEmailSuitable: true,
  isStateUpdated: false,
  isFullUrlInvalid: false,
  isDeletingLinkNotFound: false,
  isDeletingLinkUnaccessible: false,
  isLinkDeletedSuccessfully: false,
};

//Common disclaimers action types
const HIDE_ALL_DISCLAIMERS = "HIDE_ALL_DISCLAIMERS";
const SET_IS_STATE_UPDATED = "SET_IS_STATE_UPDATED";

//Account disclaimers action types
const SET_IS_EXISTING_EMAIL = "SET_IS_EXISTING_EMAIL";
const SET_IS_INVALID_EMAIL = "IS_INVALID_EMAIL ";
const SET_IS_INVALID_PASSWORD_INPUT = "IS_INVALID_PASSWORD_INPUT";
const SET_IS_NO_MATCHING_PASSWORDS = "IS_NO_MATCHING_PASSWORDS";
const SET_IS_EMAIL_SUITABLE = "SET_IS_EMAIL_SUITABLE";

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
    case SET_IS_EXISTING_EMAIL:
      return { ...state, isExistingEmail: action.payload };
    case SET_IS_INVALID_EMAIL:
      return { ...state, isInvalidEmail: action.payload };
    case SET_IS_INVALID_PASSWORD_INPUT:
      return { ...state, isInvalidPasswordInput: action.payload };
    case SET_IS_NO_MATCHING_PASSWORDS:
      return { ...state, isNoMatchingPasswords: action.payload };
    case SET_IS_EMAIL_SUITABLE:
      return { ...state, isEmailSuitable: action.payload };
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
export const setIsExistingEmailAction = (payload: boolean) => ({
  type: SET_IS_EXISTING_EMAIL,
  payload,
});
export const setIsInvalidEmailAction = (payload: boolean) => ({
  type: SET_IS_INVALID_EMAIL,
  payload,
});
export const setIsInvalidPasswordInputAction = (payload: boolean) => ({
  type: SET_IS_INVALID_PASSWORD_INPUT,
  payload,
});
export const setIsNoMatchingPasswordsAction = (payload: boolean) => ({
  type: SET_IS_NO_MATCHING_PASSWORDS,
  payload,
});
export const setIsEmailSuitableAction = (payload: boolean) => ({
  type: SET_IS_EMAIL_SUITABLE,
  payload,
});


