import { useState } from "react";
import { proceedPasswordChange } from "../../../../API";
import { useAppSelector } from "../../../../hooks";
import PasswordChangedDisclaimer from "./PasswordChangedDisclaimer";

export const ChangePassword = () => {
  const userId = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    newPassword: "",
    userId: String(userId),
  });
  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);
  const [showPasswordChangedDisclaimer, setShowPasswordChangedDisclaimer] =
    useState(false);

  const handleSubmit = () => {
    console.log(state);
    let isFetchResponseOk = true;
    proceedPasswordChange(state)
      .catch(() => {
        isFetchResponseOk = false;
        setIsPasswordChangedSuccessfully(false);
      })
      .then(() => {
        if (isFetchResponseOk) setIsPasswordChangedSuccessfully(true);
        setShowPasswordChangedDisclaimer(true);
      });
  };

  return (
    <div>
      <div className="mb-4">
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
        <input type="button" value="Change Password" onClick={handleSubmit} />
        {showPasswordChangedDisclaimer ? (
          <PasswordChangedDisclaimer
            isPasswordChanged={isPasswordChangedSuccessfully}
          />
        ) : null}
      </div>
    </div>
  );
};
