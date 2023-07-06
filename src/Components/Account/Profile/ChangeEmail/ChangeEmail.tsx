import { useState } from "react";
import { proceedEmailChange } from "../../../../API";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { setUserEmailAction } from "../../../../Store/UserReducer";
import EmailChangedDisclaimer from "./EmailChangedDisclaimer";

export const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    newEmail: "",
    userId: String(userId),
  });
  const [isEmailChangedSuccessfully, setIsEmailChangedSuccessfully] =
    useState(false);
  const [showEmailChangedDisclaimer, setShowEmailChangedDisclaimer] =
    useState(false);

  const handleSubmit = () => {
    proceedEmailChange(state)
      .catch(() => {
        setIsEmailChangedSuccessfully(false);
      })
      .then((response) => {
        if (response.newEmail !== null) {
          dispatch(setUserEmailAction(response.newEmail));
          setIsEmailChangedSuccessfully(true);
        }
        setShowEmailChangedDisclaimer(true);
      });
  };

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
        <input type="button" value="Change Email" onClick={handleSubmit} />
        {showEmailChangedDisclaimer ? (
          <EmailChangedDisclaimer isEmailChanged={isEmailChangedSuccessfully} />
        ) : null}
      </div>
    </div>
  );
};
