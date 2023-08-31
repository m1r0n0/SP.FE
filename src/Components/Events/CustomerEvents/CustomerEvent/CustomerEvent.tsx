import React from "react";
import { ICustomerEvent } from "../../../../Models/service";
import dayjs from "dayjs";

interface CustomerEventProps {
  event: ICustomerEvent;
}

export default function CustomerEvent({ event }: CustomerEventProps) {
  return (
    <div>
      <p>----------------------</p>
      <p>{event.serviceName}</p>
      <p>
        {event.providerName}, {event.providerEnterpriseName}
      </p>
      <p>Start: {dayjs(event.dateOfStart).format("DD.MM.YYYY HH:00")}</p>
      <p>End: {dayjs(event.dateOfEnd).format("DD.MM.YYYY HH:00")}</p>
    </div>
  );
}
