import jwtDecode from "jwt-decode";
import {
  fetchUserEmail,
  proceedEmailChange,
  proceedLogin,
  proceedPasswordChange,
  proceedRegister,
} from "../API/user";
import { tokenLS } from "../JS/constants";
import { IComponentDependentDisclaimerStates } from "../Models";
import {
  IAuthorizationBadRequestResponse,
  IDecodedJWT,
  ILoginUser,
  IRegisterUser,
  IUser,
  IUserEmail,
  IUserPassword,
} from "../Models/user";
import { AppDispatch } from "../Store";
import {
  hideAllDisclaimersAction,
  setIsNoMatchingPasswordsAction,
  setAuthorizationErrorsAction,
} from "../Store/DisclaimerReducer";
import {
  handleAppReadinessAction,
  handleEmailChangeFinishedAction,
  handleEmailChangeRequestAction,
  handleEmailRequestAction,
  handleLoginFailureAction,
  handleLoginRequestAction,
  handleLoginSuccessAction,
  handleLogoutAction,
  handlePasswordChangeFinishedAction,
  handlePasswordChangeRequestAction,
  handleRegisterFailureAction,
  handleRegisterRequestAction,
  handleRegisterSuccessAction,
  setAuthenticationTokenAction,
  setUserIdAction,
} from "../Store/UserReducer";

export const prepareUserData =
  (user: IUser, isUserEmailRequested: boolean, token: string | null) =>
  async (dispatch: AppDispatch) => {
    await dispatch(
      setUserStateBasedOnAuthenticationToken(isUserEmailRequested, token)
    );

    if (user.userEmail !== "") dispatch(handleAppReadinessAction());
  };

export const setUserStateBasedOnAuthenticationToken =
  (isUserEmailRequested: boolean, token: string | null) =>
  async (dispatch: AppDispatch) => {
    if (!isUserEmailRequested) {
      if (token !== null) {
        dispatch(() => dispatch(setAuthenticationTokenAction(token)));

        var decodedToken: IDecodedJWT = jwtDecode(token);
        var userId: string = decodedToken.UserId;

        dispatch(setUserIdAction(userId));
        dispatch(handleEmailRequestAction());

        await dispatch(() => dispatch(fetchUserEmail(userId)));
      } else dispatch(() => dispatch(handleAppReadinessAction()));
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
      var registerSucceed: boolean = true;

      await proceedRegister(userState)
        .catch((errorResponse: IAuthorizationBadRequestResponse) => {
          registerSucceed = false;
          dispatch(setAuthorizationErrorsAction(errorResponse.result.errors));
          dispatch(handleRegisterFailureAction());
        })
        .then(() => {
          if (registerSucceed) {
            const user: ILoginUser = {
              email: userState.email,
              password: userState.password,
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
  };

export const handleLogin =
  (loginData: ILoginUser) => async (dispatch: AppDispatch) => {
    dispatch(handleLoginRequestAction());

    try {
      const user = await proceedLogin(loginData);

      localStorage.setItem(tokenLS, user.token);
      dispatch(setAuthenticationTokenAction(user.token));

      dispatch(handleLoginSuccessAction(user));

      if (loginData.rememberMe) {
        //setLongTermUserCookies(String(user.userId));
      } else {
        //setOnCloseUserCookies(String(user.userId));
      }
    } catch (error) {
      dispatch(handleLoginFailureAction());
    }
  };

export const isLogon = (userId: string): boolean => {
  return userId !== "";
};

export const proceedUserLogOut = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem(tokenLS);
  dispatch(handleLogoutAction());
};

export const handleEmailChange =
  (userId: string, state: IUserEmail) => async (dispatch: AppDispatch) => {
    dispatch(handleEmailChangeRequestAction());
    await dispatch(await proceedEmailChange(userId, state));
    dispatch(handleEmailChangeFinishedAction());
  };

export const handlePasswordChange =
  (userId: string, state: IUserPassword) => async (dispatch: AppDispatch) => {
    dispatch(handlePasswordChangeRequestAction());
    await dispatch(await proceedPasswordChange(userId, state));
    dispatch(handlePasswordChangeFinishedAction());
  };
