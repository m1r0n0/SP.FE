import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import EmailChangedDisclaimer from "./EmailChangedDisclaimer";
import { handleEmailChange } from "../../../../Services/user";
import { CircularProgress } from "@mui/material";
import { hideAllDisclaimersAction } from "../../../../Store/DisclaimerReducer";

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

  dispatch(hideAllDisclaimersAction());
  return (
    <div>
      <div className="mb-3">
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
        ) :
        <input
          type="button"
          value="Change Email"
          onClick={() => dispatch(handleEmailChange(userId, state))}
        />}
        {isEmailChangeFinished ? <EmailChangedDisclaimer /> : null}
      </div>
    </div>
  );
};
