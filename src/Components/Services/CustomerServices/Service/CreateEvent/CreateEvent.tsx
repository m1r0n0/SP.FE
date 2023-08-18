import AdapterDateFns, {
  DateCalendar,
  DigitalClock,
  MultiSectionDigitalClock,
  TimeView,
} from "@mui/x-date-pickers/";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { DateField } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { createEvent } from "../../../../../Services/service";
import { AppDispatch } from "../../../../../Store";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import EventCreationResultMessage from "./EventCreationResultMessage/EventCreationResultMessage";
import { CircularProgress } from "@mui/material";

interface CreateEventProps {
  serviceId: number;
}

export default function CreateEvent({ serviceId }: CreateEventProps) {
  const date = new Date();
  const dispatch = useAppDispatch();
  const isEventCreationRequested = useAppSelector(
    (s) => s.service.isEventCreationRequested
  );
  const isEventCreationFinished = useAppSelector(
    (s) => s.service.isEventCreationFinished
  );

  const [state, setState] = useState({
    dateOfStart: dayjs(date.toISOString()).add(1, "hour").toISOString(),
    dateOfEnd: dayjs(date.toISOString()).add(2, "hour").toISOString(),
  });

  const changeDatesValues = (newValue: Dayjs) => {
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

  //Method which hour is passed and if specific time should be disabled the method
  //should return true
  const shouldDisableTime = (
    value: Dayjs,
    view: TimeView,
    unavailableHours: number[]
  ) => {
    const hour = value.hour();
    if (view === "hours") {
      return hour < 9 || hour > 13;
    }
    if (view === "minutes") {
      const minute = value.minute();
      return minute > 20 && hour === 13;
    }
    return false;
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

  //console.log(state);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div>
          <label htmlFor="price">Choose start date and time </label>
          <DateCalendar
            minDate={dayjs(date.toISOString())}
            value={dayjs(state.dateOfStart)}
            onChange={(newValue) => changeDatesValues(newValue!)}
          />
          <MultiSectionDigitalClock
            minTime={getMinTimeForEventCreation(
              dayjs(state.dateOfStart),
              dayjs(date.toISOString())
            )}
            value={dayjs(state.dateOfStart).startOf("hour")}
            onChange={(newValue) => changeDatesValues(newValue!)}
            ampm={false}
            timeSteps={{ hours: 1, minutes: 60 }}
          />
        </div>

        <div>
          <label htmlFor="price">Choose end date and time </label>
          <DateCalendar
            value={dayjs(state.dateOfEnd)}
            onChange={(newValue) =>
              setState({
                ...state,
                dateOfEnd: newValue!.startOf("hour").toISOString(),
              })
            }
            minDate={dayjs(state.dateOfStart).add(1, "hours")}
          />
          <MultiSectionDigitalClock
            minTime={getMinTimeForEventCreation(
              dayjs(state.dateOfEnd),
              dayjs(state.dateOfStart)
            )}
            value={dayjs(state.dateOfEnd).startOf("hour")}
            onChange={(newValue) =>
              setState({
                ...state,
                dateOfEnd: newValue!.startOf("hour").toISOString(),
              })
            }
            ampm={false}
            timeSteps={{ hours: 1, minutes: 60 }}
          />
        </div>

        {isEventCreationRequested ? (
          <div>
            <CircularProgress size={75} />
          </div>
        ) : (
          <input
            type="button"
            className="btn btn-primary btn-lg"
            value="Order"
            onClick={() => dispatch(createEvent(state, serviceId))}
          />
        )}

        {isEventCreationFinished ? <EventCreationResultMessage /> : null}
      </div>
    </LocalizationProvider>
  );
}
