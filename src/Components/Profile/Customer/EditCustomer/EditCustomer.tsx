import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { handleCustomerEdit } from "../../../../Services/customer";
import InvalidInputDisclaimer from "../../../Common/InvalidInputDisclaimer";
import { useNavigate } from "react-router-dom";

export default function EditCustomer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isDataChangeRequested = useAppSelector(
    (s) => s.customer.isDataChangeRequested
  );
  const customer = useAppSelector((s) => s.customer.customer);

  const [state, setState] = useState(customer);

  return (
    <div>
      <form>
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
        <div>
          {isDataChangeRequested ? (
            <CircularProgress size={75} />
          ) : (
            <div className="edit-profile-buttons">
              <input
                type="button"
                value="Edit"
                className="btn btn-success btn-lg"
                onClick={() => dispatch(handleCustomerEdit(userId, state))}
              />
              <input
                type="button"
                value="Back"
                className="btn btn-success btn-lg"
                onClick={() => navigate("/Profile")}
              />
            </div>
          )}
        </div>
      </form>
      <InvalidInputDisclaimer />
    </div>
  );
}
