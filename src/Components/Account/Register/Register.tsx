import { useState } from "react";
import { Navigate } from "react-router-dom";
import { handleRegister, isLogon } from "../../../Services/user";
import { IRegisterUser } from "../../../Models/user";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { hideAllDisclaimersAction } from "../../../Store/DisclaimerReducer";
import RegisterDisclaimers from "./Disclaimers";
import { CircularProgress } from "@mui/material";
import { IComponentDependentDisclaimerStates } from "../../../Models";
import "../Account.css";

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

    dispatch(
      handleRegister(properUserState, disclaimerStates, state.isProvider)
    );
  }

  return isLogon(userId) && !isRegisterFinished ? (
    <Navigate to="/Profile" />
  ) : (
    <div className="auth-component">
      <h2>Register</h2>
      <form>
        <div className="input-textfield-box">
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
        <div className="input-textfield-box">
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
        <div className="input-textfield-box">
          <label htmlFor="PasswordConfirm">Password Confirm</label>
          <input
            onChange={(event) => setPasswordConfirm(event.target.value)}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
          />
        </div>
        <div className="radiobutton-main-box">
          <div className="radiobutton-sub-box">
            <input
              type="radio"
              id="radio-customer"
              name="user"
              value="customer"
              onClick={() => {
                setState({ ...state, isProvider: false });
              }}
              defaultChecked
            />
            <label htmlFor="customer">Customer</label>
          </div>
          <div className="radiobutton-sub-box">
            <input
              type="radio"
              id="radio-provider"
              name="user"
              value="provider"
              onClick={() => {
                setState({ ...state, isProvider: true });
              }}
            />
            <label htmlFor="provider">Provider</label>
          </div>
        </div>
        <div>
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
      </form>
      <RegisterDisclaimers />
    </div>
  );
};
