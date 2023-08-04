import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import IncorrectLoginInputDisclaimer from "./IncorrectLoginInputDisclaimer";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {handleLogin, isLogon} from "../../../Services/user";
import {CircularProgress} from "@mui/material";

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
    const [isProvider, setIsProvider] = useState(false);

    return isLogon(userId) ? (
        <Navigate to="/Profile"/>
    ) : (
        <div>
            <h2> Enter the app</h2>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    value={state.email}
                    onChange={(event) =>
                        setState({...state, email: event.target.value})
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
                        setState({...state, password: event.target.value})
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
                        setState({...state, rememberMe: event.target.checked})
                    }
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
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
                            setIsProvider(false);
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
                            setIsProvider(true);
                        }}
                    />
                    <label htmlFor="provider">Provider</label>
                </div>
            </div>
            <div className="m-3">
                {isLoginFinished ? (
                    <Navigate to="/"/>
                ) : isLoginRequested ? (
                    <CircularProgress size={75}/>
                ) : (
                    <input
                        type="button"
                        className="btn btn-primary btn-lg"
                        value="Log in"
                        onClick={() => dispatch(handleLogin(state, isProvider))}
                    />
                )}
            </div>
            <div>{isLoginSuccessful ? null : <IncorrectLoginInputDisclaimer/>}</div>
        </div>
    );
};
