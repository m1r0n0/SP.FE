import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import PasswordChangedDisclaimer from "./PasswordChangedDisclaimer";
import { CircularProgress } from "@mui/material";
import { handlePasswordChange } from "../../../../Services/user";

export const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isPasswordChangeRequested = useAppSelector(
    (state) => state.user.isPasswordChangeRequested
  );
  const isPasswordChangeFinished = useAppSelector(
    (state) => state.user.isPasswordChangeFinished
  );

  const [state, setState] = useState({
    newPassword: "",
  });

  return (
    <div className="app-body-component">
      <div className="input-textfield-box">
        <label htmlFor="password">Enter new Password:</label>
        <input
          value={state.newPassword}
          onChange={(event) =>
            setState({ ...state, newPassword: event.target.value })
          }
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        {isPasswordChangeRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            className="btn"
            value="Change Password"
            onClick={() => dispatch(handlePasswordChange(userId, state))}
          />
        )}
        {isPasswordChangeFinished ? <PasswordChangedDisclaimer /> : null}
      </div>
    </div>
  );
};
