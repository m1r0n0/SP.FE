import { CircularProgress } from "@mui/material";
import React from "react";
import { IServiceWithProvider } from "../../../Models";
import { IProvider } from "../../../Models/provider";
import { getCustomersEvents, getServices } from "../../../Services/service";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Service from "../../Services/CustomerServices/Service";
import { ICustomerEvent } from "../../../Models/service";
import CustomerEvent from "./CustomerEvent/CustomerEvent";

interface CustomerEventsProps {}

export default function CustomerEvents({}: CustomerEventsProps) {
  var dispatch = useAppDispatch();
  var isEventsFetched = useAppSelector((s) => s.service.isEventsFetched);
  var events = useAppSelector((s) => s.service.customerEvents);
  var customerUID = useAppSelector((s) => s.user.user.userId);

  if (!isEventsFetched) dispatch(getCustomersEvents(customerUID));

  return (
    <div>
      <h1>Order History</h1>
      {isEventsFetched ? (
        <div className="d-flex flex-column">
          {events?.map((event: ICustomerEvent, index: number) => {
            return <CustomerEvent key={index} event={event} />;
          })}
        </div>
      ) : (
        <div className="load-circle">
          <CircularProgress size={300} />
        </div>
      )}
    </div>
  );
}
