import { useAppSelector } from "../../../../hooks";
import ErrorsListItem from "./ErrorsListItem";
import NoMatchingPasswordsDisclaimer from "./NoMatchingPasswordsDisclaimer";

export const RegisterDisclaimers = () => {
  const errors = useAppSelector((state) => state.disclaimer.authorizeErrors);
  const showNoMatchingPasswordsDisclaimer = useAppSelector(
    (state) => state.disclaimer.isNoMatchingPasswords
  );

  return (
    <div className="d-flex justify-content-center">
      <div>
        {showNoMatchingPasswordsDisclaimer ? (
          <NoMatchingPasswordsDisclaimer />
        ) : null}
      </div>
      <div>
        {errors.map((error) => {
          return <ErrorsListItem errorDescription={error.description} />;
        })}
      </div>
    </div>
  );
};
