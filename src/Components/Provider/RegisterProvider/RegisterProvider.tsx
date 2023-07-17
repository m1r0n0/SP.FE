import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLogon } from "../../../Services/user";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import RegisterDisclaimers from "../../Account/Register/Disclaimers";

interface RegisterProviderProps {}

export default function RegisterProvider() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    enterpriseName: "",
    workHoursBegin: 8,
    workHoursEnd: 16,
  });

  return isLogon(userId) ? (
    <Navigate to="/" />
  ) : (
    <div>
      <h2>Register</h2>
      <div>
        <label htmlFor="FirstName">First Name</label>
        <input
          value={state.firstName}
          onChange={(event) =>
            setState({ ...state, firstName: event.target.value })
          }
          type="text"
          name="email"
          id="email"
        />
      </div>

      <RegisterDisclaimers />
    </div>
  );
}
