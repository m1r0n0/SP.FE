import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import IdentityErrorListItem from "../../../../Account/Common/IdentityErrorListItem";

export const EmailChangedDisclaimer = () => {
  const dispatch = useAppDispatch();
  const isEmailChangedSuccessfully = useAppSelector(
    (s) => s.user.isEmailChangedSuccessfully
  );
  const errors = useAppSelector((state) => state.disclaimer.authorizeErrors);

  return (
    <div>
      {isEmailChangedSuccessfully ? (
        <p className="message-result-succeeded">
          Email was changed successfully!
        </p>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};
