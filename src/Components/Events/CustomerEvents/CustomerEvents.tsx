import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { getCustomersEvents } from "../../../Services/service";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ICustomerEvent } from "../../../Models/service";
import CustomerEvent from "./CustomerEvent/CustomerEvent";
import "./CustomerEvents.css";

interface CustomerEventsProps {}

export default function CustomerEvents({}: CustomerEventsProps) {
  var dispatch = useAppDispatch();
  var isEventsFetched = useAppSelector((s) => s.service.isEventsFetched);
  var events = useAppSelector((s) => s.service.customerEvents);
  var customerUID = useAppSelector((s) => s.user.user.userId);

  useEffect(() => {
    dispatch(getCustomersEvents(customerUID));
  }, []);

  return (
    <div className="app-body-component">
      <h1>Order History</h1>
      {isEventsFetched ? (
        events.length > 0 ? (
          <div id="events-area">
            {events?.map((event: ICustomerEvent, index: number) => {
              return <CustomerEvent key={index} event={event} />;
            })}
          </div>
        ) : (
          <h2>You don't have any order!</h2>
        )
      ) : (
        <div className="load-circle">
          <CircularProgress size={300} />
        </div>
      )}
    </div>
  );
}
