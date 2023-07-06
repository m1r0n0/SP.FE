interface EmailChangedDisclaimerProps {
  isEmailChanged: boolean;
}

export const EmailChangedDisclaimer: React.FC<EmailChangedDisclaimerProps> = ({
  isEmailChanged,
}) => {
  return (
    <div className="mt-5">
      {isEmailChanged ? (
        <p>Email changed successfully!</p>
      ) : (
        <div>
          <p>Email didn't changed!</p>
          <div>
            <p>It may be caused by several problems: </p>
            <ul>
              <li> This email is already in use </li>
              <li> Server issues</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
