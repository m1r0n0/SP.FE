import { fetchUserEmail, proceedLogin, proceedRegister } from "../API";
import { lifeTimeOfCookie } from "../JS/constants";
import {
  IComponentDependentDisclaimerStates} from "../Models";
import { ILoginUser, IRegisterUser, IUser } from "../Models/user";
import { AppDispatch } from "../Store";
import {
  setIsEmailSuitableAction,
  setIsInvalidPasswordInputAction,
  setIsExistingEmailAction,
  hideAllDisclaimersAction,
  setIsInvalidEmailAction,
  setIsNoMatchingPasswordsAction,
} from "../Store/DisclaimerReducer";
import {
  handleAppReadinessAction,
  handleEmailRequestAction,
  handleLoginFailureAction,
  handleLoginRequestAction,
  handleLoginSuccessAction,
  handleRegisterFailureAction,
  handleRegisterRequestAction,
  handleRegisterSuccessAction,
  setUserEmailAction,
  setUserIdAction,
} from "../Store/UserReducer";
import { useAppSelector } from "../hooks";

const splittedCookies: string[] = document.cookie.split("; ");

export const prepareAppToLoad =
  (user: IUser) => async (dispatch: AppDispatch) => {
    await dispatch(setUserStateBasedOnCookies());

    if (user.userEmail !== "" || splittedCookies.at(0) === "")
      dispatch(handleAppReadinessAction());
  };

export const setUserStateBasedOnCookies =
  () => async (dispatch: AppDispatch) => {
    const isUserEmailRequested = useAppSelector(
      (state) => state.user.isUserEmailRequested
    );

    if (!isUserEmailRequested) {
      splittedCookies.forEach((cookie) => {

        if (cookie.startsWith("userID=")) {
          let tempUserID = cookie.split("=").pop()!;

          dispatch(setUserIdAction(tempUserID));

          if (!(tempUserID === undefined || tempUserID === "")) {

            dispatch(handleEmailRequestAction());

            fetchUserEmail(tempUserID).then((result) => {
              dispatch(setUserEmailAction(result.newEmail));
            });
          }
        }
      });
    }
  };

export const handleRegister =
  (
    userState: IRegisterUser,
    disclaimerStates: IComponentDependentDisclaimerStates
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(handleRegisterRequestAction());
    dispatch(updateRegisterStateDependentDisclaimerStates(disclaimerStates));

    if (
      !disclaimerStates.isNoMatchingPasswords &&
      !disclaimerStates.isInvalidEmail
    ) {
      var isEmailSuitable: boolean = true;
      var isInvalidPassword: boolean = false;

      await proceedRegister(userState)
        .catch((error) => {
          isEmailSuitable = error.message !== "409";

          dispatch(setIsEmailSuitableAction(isEmailSuitable));

          if (isEmailSuitable) {
            isInvalidPassword = true;

            dispatch(setIsInvalidPasswordInputAction(isInvalidPassword));
          }

          dispatch(setIsExistingEmailAction(!isEmailSuitable));
          dispatch(handleRegisterFailureAction());
        })
        .then((res) => {
          if (isEmailSuitable && !isInvalidPassword) {
            const user: ILoginUser = {
              email: res.email,
              password: res.password,
              rememberMe: true,
            };

            dispatch(handleLogin(user));
            dispatch(handleRegisterSuccessAction());
            dispatch(hideAllDisclaimersAction());
          }
        });
    } else dispatch(handleRegisterFailureAction());
  };

export const updateRegisterStateDependentDisclaimerStates =
  (disclaimerStates: IComponentDependentDisclaimerStates) =>
  async (dispatch: AppDispatch) => {

    dispatch(
      setIsNoMatchingPasswordsAction(disclaimerStates.isNoMatchingPasswords)
    );

    dispatch(setIsInvalidEmailAction(disclaimerStates.isInvalidEmail));
  };

export const handleLogin =
  (loginData: ILoginUser) => async (dispatch: AppDispatch) => {

    dispatch(handleLoginRequestAction());

    try {
      const user = await proceedLogin(loginData);

      dispatch(handleLoginSuccessAction(user));

      if (loginData.rememberMe) {
        setLongTermUserCookies(String(user.userId));
      } else {
        setOnCloseUserCookies(String(user.userId));
      }

    } catch (error) {
      dispatch(handleLoginFailureAction());
    }
  };

const setLongTermUserCookies = (userID: string) => {
  document.cookie = "userID=" + userID + "; max-age=" + lifeTimeOfCookie;
};

const setOnCloseUserCookies = (userID: string) => {
  document.cookie = "userID=" + userID;
};

export const isLogon = (userId: string): boolean => {
  return userId !== "";
};
