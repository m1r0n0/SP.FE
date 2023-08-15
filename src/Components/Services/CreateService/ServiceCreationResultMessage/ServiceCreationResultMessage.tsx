import React from "react";

interface ServiceCreationResultMessageProps {
  isSucceeded: boolean;
}

export default function ServiceCreationResultMessage({
  isSucceeded,
}: ServiceCreationResultMessageProps) {
  const SucceedMessage = "Service Created Successfully!";
  const FailureMessage = "Service wasn't created! Check the input!";

  return isSucceeded ? <p>{SucceedMessage}</p> : <p>{FailureMessage}</p>;
}
