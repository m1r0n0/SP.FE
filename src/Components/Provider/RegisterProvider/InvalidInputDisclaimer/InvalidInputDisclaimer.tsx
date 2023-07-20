import React from "react";
import { useAppSelector } from "../../../../hooks";
import SuccessDisclaimer from "./SuccessDisclaimer";

export default function InvalidInputDisclaimer() {
  const showProviderRegisterFailedDisclaimer = useAppSelector(
    (s) => s.disclaimer.showProviderRegisterFailedDisclaimer
  );
  return showProviderRegisterFailedDisclaimer ? (
    <p>Invalid input data!</p>
  ) : (
    <SuccessDisclaimer />
  );
}
