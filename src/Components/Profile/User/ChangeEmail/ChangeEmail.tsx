import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import EmailChangedDisclaimer from "./EmailChangedDisclaimer";
import { handleEmailChange } from "../../../../Services/user";
import { CircularProgress } from "@mui/material";

export const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const isEmailChangeRequested = useAppSelector(
    (s) => s.user.isEmailChangeRequested
  );
  const isEmailChangeFinished = useAppSelector(
    (s) => s.user.isEmailChangeFinished
  );

  const [state, setState] = useState({
    newEmail: "",
  });

  return (
    <div className="app-body-component">
      <div className="input-textfield-box">
        <label htmlFor="email">Enter new Email:</label>
        <input
          value={state.newEmail}
          onChange={(event) =>
            setState({ ...state, newEmail: event.target.value })
          }
          type="text"
          name="email"
          id="email"
        />
      </div>
      <div>
        {isEmailChangeRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            className="btn"
            value="Change Email"
            onClick={() => dispatch(handleEmailChange(userId, state))}
          />
        )}
        {isEmailChangeFinished ? <EmailChangedDisclaimer /> : null}
      </div>
    </div>
  );
};
