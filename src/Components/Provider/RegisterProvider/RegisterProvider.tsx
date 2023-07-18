import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLogon } from "../../../Services/user";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import RegisterDisclaimers from "../../Account/Register/Disclaimers";
import { handleProviderRegister } from "../../../Services/provider";

export default function RegisterProvider() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isRegisterRequested = useAppSelector(
    (s) => s.provider.isRegisterRequested
  );
  const isRegisterSuccessful = useAppSelector(
    (state) => state.provider.isRegisterSuccessful
  );

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    enterpriseName: "",
    workHoursBegin: 8,
    workHoursEnd: 16,
  });

  return (
    <div>
      <h2>Register</h2>
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
      <div>
        <label htmlFor="enterpriseName">Enterprise Name</label>
        <input
          value={state.enterpriseName}
          onChange={(event) =>
            setState({ ...state, enterpriseName: event.target.value })
          }
          type="text"
          name="enterpriseName"
          id="enterpriseName"
        />
      </div>
      <label htmlFor="hoursQuestion">What hours you will be available?</label>
      <div>
        <label htmlFor="workHoursBegin">Begin of Work</label>
        <input
          value={state.workHoursBegin}
          onChange={(event) =>
            setState({
              ...state,
              workHoursBegin: parseInt(event.target.value, 10),
            })
          }
          type="text"
          name="workHoursBegin"
          id="workHoursBegin"
        />
      </div>
      <div>
        <label htmlFor="workHoursEnd">End of Work</label>
        <input
          value={state.workHoursEnd}
          onChange={(event) =>
            setState({
              ...state,
              workHoursEnd: parseInt(event.target.value, 10),
            })
          }
          type="text"
          name="workHoursEnd"
          id="workHoursEnd"
        />
      </div>
      <div className="m-4">
        {isRegisterSuccessful ? (
          <Navigate to="/" />
        ) : isRegisterRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            value="Register"
            className="btn btn-success btn-lg"
            onClick={() => dispatch(handleProviderRegister(userId, state))}
          />
        )}
      </div>
    </div>
  );
}
