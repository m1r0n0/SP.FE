import React from "react";

interface ServiceCreationResultMessageProps {
  isSucceeded: boolean;
}

export default function ServiceCreationResultMessage({
  isSucceeded,
}: ServiceCreationResultMessageProps) {
  const SucceedMessage = "Service Created Successfully!";
  const FailureMessage = "Service wasn't created! Check the input!";

  return isSucceeded ? (
    <p className="message-result-succeeded">{SucceedMessage}</p>
  ) : (
    <p className="message-result-failed">{FailureMessage}</p>
  );
}
