import { hideAllDisclaimersAction } from "../../../../../Store/DisclaimerReducer";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import IdentityErrorListItem from "../../../Common/IdentityErrorListItem";

export const EmailChangedDisclaimer = () => {
  const dispatch = useAppDispatch();
  const isEmailChangedSuccessfully = useAppSelector(
    (s) => s.user.isEmailChangedSuccessfully
  );
  const errors = useAppSelector((state) => state.disclaimer.authorizeErrors);

  dispatch(hideAllDisclaimersAction());
  return (
    <div className="mt-5">
      {isEmailChangedSuccessfully ? (
        <p>Email was changed successfully!</p>
      ) : (
        <div>
          <div>
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
