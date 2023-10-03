import AdapterDateFns, {
  DateCalendar,
  DigitalClock,
  MultiSectionDigitalClock,
  TimeView,
} from "@mui/x-date-pickers/";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  createEvent,
  getUnavailableHours,
} from "../../../../../Services/service";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import EventCreationResultMessage from "./EventCreationResultMessage/EventCreationResultMessage";
import { CircularProgress } from "@mui/material";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { IProvider } from "../../../../../Models/provider";
import DatePick from "./DatePick";

interface CreateEventProps {
  serviceId: number;
  provider: IProvider;
}

export default function CreateEvent({ serviceId, provider }: CreateEventProps) {
  const date = new Date();
  dayjs.extend(utc);
  dayjs.extend(tz);

  const dispatch = useAppDispatch();
  const isEventCreationRequested = useAppSelector(
    (s) => s.service.isEventCreationRequested
  );
  const isEventCreationFinished = useAppSelector(
    (s) => s.service.isEventCreationFinished
  );
  const availabilitySchedule = useAppSelector(
    (s) => s.service.availabilitySchedule
  );
  const userId = useAppSelector((s) => s.user.user.userId);

  const [state, setState] = useState({
    dateOfStart: dayjs(date.toISOString())
      .add(1, "hour")
      .startOf("hour")
      .toISOString(),
    dateOfEnd: dayjs(date.toISOString())
      .add(2, "hour")
      .startOf("hour")
      .toISOString(),
  });

  const changeDatesValuesDueNewDate = (newValue: Dayjs) => {
    if (dayjs(state.dateOfEnd).isAfter(newValue)) {
      setState({
        ...state,
        dateOfStart: newValue!.startOf("hour").toISOString(),
      });
    } else
      setState({
        dateOfStart: newValue!.startOf("hour").toISOString(),
        dateOfEnd: newValue!.add(1, "hour").toISOString(),
      });
  };

  const getMinTimeForEventCreation = (newDate: Dayjs, minimumDate: Dayjs) => {
    var properMinTime;

    if (newDate.isAfter(minimumDate, "d")) {
      properMinTime = newDate.startOf("day");
    } else {
      properMinTime = minimumDate.add(1, "hour");
    }

    return properMinTime;
  };

  var currentDateAvailabilityHours =
    availabilitySchedule
      .filter((s) => dayjs(state.dateOfStart).isSame(s.date, "D"))
      .map((s) => s.unavailableHours)[0] ?? [];

  const changeDateOfEnd = (newValue: Dayjs) => {
    setState({
      ...state,
      dateOfEnd: newValue!.startOf("hour").toISOString(),
    });
  };

  const isStartDateAppropriate =
    dayjs(state.dateOfStart).isAfter(dayjs(date.toISOString())) &&
    dayjs(state.dateOfStart).hour() >= provider.workHoursBegin &&
    dayjs(state.dateOfStart).hour() <= provider.workHoursEnd;

  const isEndDateAppropriate =
    dayjs(state.dateOfEnd).isAfter(dayjs(date.toISOString())) &&
    dayjs(state.dateOfStart).hour() >= provider.workHoursBegin &&
    dayjs(state.dateOfStart).hour() <= provider.workHoursEnd - 1;

  useEffect(() => {
    dispatch(getUnavailableHours(provider.userId));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <form>
          <div className="date-pick-area">
            <label htmlFor="price">Choose start date and time </label>
            <DatePick
              state={state}
              minDate={dayjs(date.toISOString())}
              minTime={getMinTimeForEventCreation(
                dayjs(state.dateOfStart),
                dayjs(date.toISOString())
              )}
              isStartDateComponent={true}
              onChange={changeDatesValuesDueNewDate}
              provider={provider}
              currentDateAvailabilityHours={currentDateAvailabilityHours}
            />
          </div>
          <div className="date-pick-area">
            <label htmlFor="price">Choose end date and time </label>
            <DatePick
              state={state}
              minDate={dayjs(state.dateOfStart).add(1, "hours")}
              minTime={getMinTimeForEventCreation(
                dayjs(state.dateOfEnd),
                dayjs(state.dateOfStart)
              )}
              isStartDateComponent={false}
              onChange={changeDateOfEnd}
              provider={provider}
              currentDateAvailabilityHours={currentDateAvailabilityHours}
            />
          </div>

          {isEventCreationRequested ? (
            <div>
              <CircularProgress size={75} />
            </div>
          ) : isStartDateAppropriate && isEndDateAppropriate ? (
            <div>
              <input
                type="button"
                className="btn btn-primary btn-lg"
                value="Order"
                onClick={() =>
                  dispatch(
                    createEvent(state, serviceId, provider.userId, userId)
                  )
                }
              />
              {isEventCreationFinished ? <EventCreationResultMessage /> : null}
            </div>
          ) : null}
        </form>
      </div>
    </LocalizationProvider>
  );
}
