import React from "react";
import { IProviderEvent } from "../../../../Models/service";
import dayjs from "dayjs";

interface ProviderEventProps {
  event: IProviderEvent;
}

export default function ProviderEvent({ event }: ProviderEventProps) {
  return (
    <div>
      <p>----------------------</p>
      <p>{event.serviceName}</p>
      <p>Client: {event.customerName} </p>
      <p>Start: {dayjs(event.dateOfStart).format("DD.MM.YYYY HH:00")}</p>
      <p>End: {dayjs(event.dateOfEnd).format("DD.MM.YYYY HH:00")}</p>
    </div>
  );
}
