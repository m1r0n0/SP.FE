import {
    API_CUSTOMER,
    API_VERSION_CUSTOMER,
    CUSTOMER,
    REGISTER_CUSTOMER,
  } from "../JS/routeConstants";
  import { ICustomer } from "../Models/customer";
  import { GetAuthHeader, proceedLogOut } from "../Services";
  import { AppDispatch } from "../Store";
  import {
    handleShowCustomerProviderRegisterFailedDisclaimer,
    hideAllDisclaimersAction,
  } from "../Store/DisclaimerReducer";
  import {
    handleDataChangeFinishedAction,
    handleDataChangedSuccessfullyAction,
    handleRegisterFailureAction,
    handleRegisterSuccessAction,
    setCustomerInfoAction,
  } from "../Store/CustomerReducer";
  
  const CustomerURI = `${API_CUSTOMER}/${API_VERSION_CUSTOMER}/${CUSTOMER}`;
  const RegisterCustomerURI = `${API_CUSTOMER}/${API_VERSION_CUSTOMER}/${CUSTOMER}/${REGISTER_CUSTOMER}`;
  
  export async function fetchCustomerInfo(userId: string) {
    return async (dispatch: AppDispatch) => {
      const response = await fetch(`${CustomerURI}/${userId}`, {
        headers: {
          Authorization: await dispatch(GetAuthHeader()),
        },
      });
  
      if (response.ok) {
        var customer = await response.json();
  
        dispatch(setCustomerInfoAction(customer));
      }
    };
  }
  
  export async function proceedCustomerRegister(userId: string, body: ICustomer) {
    return async (dispatch: AppDispatch) => {
      const response = await fetch(`${RegisterCustomerURI}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: await dispatch(GetAuthHeader()),
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        dispatch(handleRegisterFailureAction());
        dispatch(handleShowCustomerProviderRegisterFailedDisclaimer());
      } else {
        dispatch(handleRegisterSuccessAction());
      }
    };
  }
  
  export async function proceedCustomerEdit(userId: string, body: ICustomer) {
    return async (dispatch: AppDispatch) => {
      const response = await fetch(`${CustomerURI}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: await dispatch(GetAuthHeader()),
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        dispatch(handleShowCustomerProviderRegisterFailedDisclaimer());
      } else {
        dispatch(setCustomerInfoAction(body));
        dispatch(handleDataChangedSuccessfullyAction());
        dispatch(hideAllDisclaimersAction());
      }
      dispatch(handleDataChangeFinishedAction());
    };
  }
  
  export async function proceedCustomerDelete(userId: string) {
    return async (dispatch: AppDispatch) => {
      await fetch(`${CustomerURI}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: await dispatch(GetAuthHeader()),
        },
      });
  
      window.alert("User deleted successfully!");
      dispatch(proceedLogOut());
    };
  }
  