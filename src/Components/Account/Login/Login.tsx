import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import IncorrectLoginInputDisclaimer from "./IncorrectLoginInputDisclaimer";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { handleLogin, isLogon } from "../../../Services/user";
import { CircularProgress } from "@mui/material";

export const Login = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isLoginFinished = useAppSelector((state) => state.user.isLoginFinished);
  const isLoginRequested = useAppSelector(
    (state) => state.user.isLoginRequested
  );
  const isLoginSuccessful = useAppSelector(
    (state) => state.user.isLoginSuccessful
  );

  const [state, setState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
    dispatch(handleLogin(state));
  };

  return isLogon(userId) ? (
    <Navigate to="/" />
  ) : (
    <div>
      <h2> Enter the app</h2>
      <div>
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
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
        <label htmlFor="rememberMe">Remember me?</label>
        <input
          onChange={(event) =>
            setState({ ...state, rememberMe: event.target.checked })
          }
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
        />
      </div>
      <div className="m-3">
        {isLoginFinished ? (
          <Navigate to="/" />
        ) : isLoginRequested ? (
          <CircularProgress 
            size={75}
          />
        ) : (
          <input
            type="button"
            className="btn btn-primary btn-lg"
            value="Log in"
            onClick={handleSubmit}
          />
        )}
      </div>
      <div>{isLoginSuccessful ? null : <IncorrectLoginInputDisclaimer />}</div>
    </div>
  );
};
