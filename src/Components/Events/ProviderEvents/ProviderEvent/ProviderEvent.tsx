import React from "react";
import { IProviderEvent } from "../../../../Models/service";
import dayjs from "dayjs";

interface ProviderEventProps {
  event: IProviderEvent;
}

export default function ProviderEvent({ event }: ProviderEventProps) {
  return (
    <div className="event-container">
      <p>
        <strong>{event.serviceName}</strong>
      </p>
      <p>Client: {event.customerName} </p>
      <div id="time-display-area">
        <p>{dayjs(event.dateOfStart).format("DD.MM.YYYY HH:00")}</p>
        <p> - </p>
        <p>{dayjs(event.dateOfEnd).format("DD.MM.YYYY HH:00")} </p>
      </div>
    </div>
  );
}
