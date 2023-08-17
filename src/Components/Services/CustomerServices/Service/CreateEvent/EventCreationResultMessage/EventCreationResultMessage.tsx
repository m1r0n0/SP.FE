import React from "react";
import { useAppSelector } from "../../../../../../hooks";

interface EventCreationResultMessageProps {}

export default function EventCreationResultMessage({}: EventCreationResultMessageProps) {
  const isEventCreationSucceeded = useAppSelector(
    (s) => s.service.isEventCreationSucceeded
  );
  const successMessage = "Ordered successfully!";
  const failureMessage = "Oops! Something went wrong. Try later please";

  return isEventCreationSucceeded ? (
    <p> {successMessage} </p>
  ) : (
    <p> {failureMessage} </p>
  );
}
