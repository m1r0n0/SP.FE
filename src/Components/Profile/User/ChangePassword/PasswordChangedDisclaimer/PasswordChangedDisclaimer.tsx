import { useAppSelector } from "../../../../../hooks";
import IdentityErrorListItem from "../../../../Account/Common/IdentityErrorListItem";

export const PasswordChangedDisclaimer = () => {
  const isPasswordChangedSuccessfully = useAppSelector(
    (state) => state.user.isPasswordChangedSuccessfully
  );
  const errors = useAppSelector((state) => state.disclaimer.authorizeErrors);

  return (
    <div className="mt-5">
      {isPasswordChangedSuccessfully ? (
        <p className="message-result-succeeded">
          Password changed successfully!
        </p>
      ) : (
        <div className="message-result-failed">
          {errors.map((error) => {
            return (
              <IdentityErrorListItem
                errorDescription={error.description}
                key={error.code}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
