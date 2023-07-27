import {
    fetchCustomerInfo,
    proceedCustomerEdit,
    proceedCustomerRegister,
  } from "../API/customer";
  import { ICustomer } from "../Models/customer";
  import { AppDispatch } from "../Store";
  import { hideAllDisclaimersAction } from "../Store/DisclaimerReducer";
  import {
    handleDataChangeRequestAction,
    handleRegisterRequestAction,
    setCustomerInfoAction,
  } from "../Store/CustomerReducer";
  
  export const prepareCustomerData = (userId: string, isUserRegisterFinished: boolean) => async (dispatch: AppDispatch) => {
  
    if (userId !== "" && userId !== null && !isUserRegisterFinished)
      dispatch(await fetchCustomerInfo(userId));
  };
  
  export const handleCustomerRegister =
    (userId: string, body: ICustomer) => async (dispatch: AppDispatch) => {
      dispatch(hideAllDisclaimersAction());
      dispatch(handleRegisterRequestAction());
      dispatch(setCustomerInfoAction(body));
      dispatch(await proceedCustomerRegister(userId, body));
    };
  
  export const handleCustomerEdit =
    (userId: string, body: ICustomer) => async (dispatch: AppDispatch) => {
      dispatch(hideAllDisclaimersAction());
      dispatch(handleDataChangeRequestAction());
  
      dispatch(await proceedCustomerEdit(userId, body));
    };
  