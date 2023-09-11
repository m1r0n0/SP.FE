import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLogon } from "../../../../Services/user";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import InvalidInputDisclaimer from "../../../Common/InvalidInputDisclaimer/InvalidInputDisclaimer";
import { ICustomer } from "../../../../Models/customer";
import { handleCustomerRegister } from "../../../../Services/customer";

export default function RegisterProvider() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isRegisterRequested = useAppSelector(
    (s) => s.customer.isRegisterRequested
  );
  const isUserRegisterFinished = useAppSelector(
    (state) => state.user.isRegisterFinished
  );
  const isRegisterSuccessful = useAppSelector(
    (s) => s.customer.isRegisterSuccessful
  );

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
  });

  const customerState: ICustomer = {
    firstName: state.firstName,
    lastName: state.lastName,
  };

  return (isLogon(userId) && !isUserRegisterFinished) ||
    isRegisterSuccessful ? (
    <Navigate to="/Profile" />
  ) : (
    <div>
      <h2>Register</h2>
      <div className="input-textfield-box">
        <label htmlFor="firstName">First Name</label>
        <input
          value={state.firstName}
          onChange={(event) =>
            setState({ ...state, firstName: event.target.value })
          }
          type="text"
          name="firstName"
          id="firstName"
        />
      </div>
      <div className="input-textfield-box">
        <label htmlFor="lastName">Last Name</label>
        <input
          value={state.lastName}
          onChange={(event) =>
            setState({ ...state, lastName: event.target.value })
          }
          type="text"
          name="lastName"
          id="lastName"
        />
      </div>
      <div className="submit-button-box">
        {isRegisterRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            value="Register"
            className="btn btn-success btn-lg"
            onClick={() =>
              dispatch(handleCustomerRegister(userId, customerState))
            }
          />
        )}
      </div>

      <InvalidInputDisclaimer />
    </div>
  );
}
