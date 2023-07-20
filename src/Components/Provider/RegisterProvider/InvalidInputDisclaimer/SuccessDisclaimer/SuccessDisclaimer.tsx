import React from "react";
import { useAppSelector } from "../../../../../hooks";

export default function SuccessDisclaimer() {
  const isDataChangedSuccessfully = useAppSelector(
    (s) => s.provider.isDataChangedSuccessfully
  );

  return isDataChangedSuccessfully ? <p>Changed successfully!</p> : null;
}
