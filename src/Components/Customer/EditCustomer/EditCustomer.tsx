import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLogon } from "../../../Services/user";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import RegisterDisclaimers from "../../Account/Register/Disclaimers";
import {
  handleCustomerEdit,
  handleCustomerRegister,
} from "../../../Services/customer";
import { ICustomer } from "../../../Models/customer";
import InvalidInputDisclaimer from "../../Common/InvalidInputDisclaimer";
import SuccessDisclaimer from "../../Common/InvalidInputDisclaimer/SuccessDisclaimer/SuccessDisclaimer";

export default function EditCustomer() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isDataChangeRequested = useAppSelector(
    (s) => s.customer.isDataChangeRequested
  );
  const customer = useAppSelector((s) => s.customer.customer);
  const isDataChangedSuccessfully = useAppSelector(
    (state) => state.customer.isDataChangedSuccessfully
  );

  const [state, setState] = useState(customer);

  return (
    <div>
      <h2>Edit</h2>
      <div>
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
      <div>
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
      <div className="m-4">
        {isDataChangeRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            value="Edit"
            className="btn btn-success btn-lg"
            onClick={() => dispatch(handleCustomerEdit(userId, state))}
          />
        )}
      </div>

      <InvalidInputDisclaimer />
    </div>
  );
}
