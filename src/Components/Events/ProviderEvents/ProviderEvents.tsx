import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IProviderEvent } from "../../../Models/service";
import { getProviderEvents } from "../../../Services/service";
import ProviderEvent from "./ProviderEvent/ProviderEvent";
import "./ProviderEvents.css";
import NoEventsDisclaimer from "./NoEventsDisclaimer";

interface ProviderEventsProps {}

export default function ProviderEvents({}: ProviderEventsProps) {
  const date = new Date();
  dayjs.extend(utc);
  dayjs.extend(tz);

  var dispatch = useAppDispatch();
  var isEventsFetched = useAppSelector((s) => s.service.isEventsFetched);
  var events = useAppSelector((s) => s.service.providerEvents);
  var providerUID = useAppSelector((s) => s.user.user.userId);

  const [currentDate, setCurrentDate] = useState(
    dayjs(date.toISOString()).startOf("day").add(1, "hour")
  );

  const checkWhetherEventOnTheCurrentDate = (event: IProviderEvent) => {
    return (
      dayjs(event.dateOfStart).startOf("day").isBefore(currentDate) &&
      dayjs(event.dateOfEnd).endOf("day").isAfter(currentDate)
    );
  };

  if (!isEventsFetched) dispatch(getProviderEvents(providerUID));

  return (
    <div className="app-body-component calendar-component">
      <h1>Orders Calendar</h1>
      <div className="info-display-area">
        <div className="calendar-display-area">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div id="calendar">
              <DateCalendar
                value={currentDate}
                onChange={(newValue) =>
                  setCurrentDate(newValue!.add(1, "hour"))
                }
              />
            </div>
          </LocalizationProvider>
        </div>
        <div>
          {isEventsFetched ? (
            <div className="events-display-area">
              {events?.length > 0 ? (
                events?.map((event: IProviderEvent, index: number) => {
                  return checkWhetherEventOnTheCurrentDate(event) ? (
                    <ProviderEvent key={index} event={event} />
                  ) : (
                    <></>
                  );
                })
              ) : (
                <h2>There's no more orders for this day</h2>
              )}
            </div>
          ) : (
            <div className="prov-ev-load-circle">
              <CircularProgress size={150} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
