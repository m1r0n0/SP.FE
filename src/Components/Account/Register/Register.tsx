import { useState } from "react";
import { Navigate } from "react-router-dom";
import { handleRegister, isLogon } from "../../../Services/user";
import { IRegisterUser } from "../../../Models/user";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { hideAllDisclaimersAction } from "../../../Store/DisclaimerReducer";
import RegisterDisclaimers from "./Disclaimers";
import { CircularProgress } from "@mui/material";
import { IComponentDependentDisclaimerStates } from "../../../Models";

export const Register = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isRegisterRequested = useAppSelector((s) => s.user.isRegisterRequested);
  const isRegisterSuccessful = useAppSelector(
    (state) => state.user.isRegisterSuccessful
  );
  const isRegisterFinished = useAppSelector(
    (state) => state.user.isRegisterFinished
  );
  
  const [state, setState] = useState({
    email: "",
    password: "",
    isProvider: false,
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit() {
    dispatch(hideAllDisclaimersAction());

    var properUserState: IRegisterUser = {
      email: state.email,
      password: state.password,
    };
    var disclaimerStates: IComponentDependentDisclaimerStates = {
      isNoMatchingPasswords:
        state.password !== passwordConfirm ||
        (state.password === "" && passwordConfirm === ""),
      isInvalidEmail: state.email === "",
    };

    dispatch(handleRegister(properUserState, disclaimerStates));
  }

  return isLogon(userId) && !isRegisterFinished ? (
    <Navigate to="/Profile" />
  ) : (
    <div>
      <h2>Register</h2>
      <div>
        <label htmlFor="Email">Email</label>
        <input
          value={state.email}
          onChange={(event) =>
            setState({ ...state, email: event.target.value })
          }
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input
          onChange={(event) =>
            setState({ ...state, password: event.target.value })
          }
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <label htmlFor="PasswordConfirm">Password Confirm</label>
        <input
          onChange={(event) => setPasswordConfirm(event.target.value)}
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
        />
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="customer"
            name="user"
            value="customer"
            onClick={() => {
              setState({ ...state, isProvider: false });
            }}
            defaultChecked
          />
          <label htmlFor="customer">Customer</label>
        </div>
        <div>
          <input
            type="radio"
            id="provider"
            name="user"
            value="provider"
            onClick={() => {
              setState({ ...state, isProvider: true });
            }}
          />
          <label htmlFor="provider">Provider</label>
        </div>
      </div>
      <div className="m-4">
        {isRegisterSuccessful ? (
          state.isProvider ? (
            <Navigate to="/Register/Provider" />
          ) : (
            <Navigate to="/Register/Customer" />
          )
        ) : isRegisterRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            value="Register"
            className="btn btn-success btn-lg"
            onClick={handleSubmit}
          />
        )}
      </div>
      <RegisterDisclaimers />
    </div>
  );
};
