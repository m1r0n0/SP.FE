import React from "react";

interface NoEventsDisclaimerProps {
  setIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoEventsDisclaimer({
  setIsDisplayed,
}: NoEventsDisclaimerProps) {
  setIsDisplayed(true);
  return <h2>There's no orders for this day</h2>;
}
