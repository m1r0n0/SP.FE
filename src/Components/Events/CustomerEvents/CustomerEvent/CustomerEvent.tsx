import React from "react";
import { ICustomerEvent } from "../../../../Models/service";
import dayjs from "dayjs";

interface CustomerEventProps {
  event: ICustomerEvent;
}

export default function CustomerEvent({ event }: CustomerEventProps) {
  return (
    <div className="event-container">
      <p>
        <strong>{event.serviceName}</strong>
      </p>
      <p>
        <label>Provider: {event.providerName}, </label>
        <label>{event.providerEnterpriseName}</label>
      </p>
      <div id="time-display-area">
        <p>{dayjs(event.dateOfStart).format("DD.MM.YYYY HH:00")}</p>
        <p> - </p>
        <p>{dayjs(event.dateOfEnd).format("DD.MM.YYYY HH:00")}</p>
      </div>
    </div>
  );
}
