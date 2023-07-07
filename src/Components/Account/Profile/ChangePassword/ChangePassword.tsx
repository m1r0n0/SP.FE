import { useState } from "react";
import { proceedPasswordChange } from "../../../../API";
import { useAppSelector } from "../../../../hooks";
import PasswordChangedDisclaimer from "./PasswordChangedDisclaimer";

export const ChangePassword = () => {
  const userId = useAppSelector((state) => state.user.user.userId);
  const [state, setState] = useState({
    newPassword: "",
  });
  const [isPasswordChangedSuccessfully, setIsPasswordChangedSuccessfully] =
    useState(false);
  const [showPasswordChangedDisclaimer, setShowPasswordChangedDisclaimer] =
    useState(false);

  const handleSubmit = () => {
    let isFetchResponseOk = true;
    proceedPasswordChange(userId, state)
      .catch(() => {
        console.log("pukpuk");

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
