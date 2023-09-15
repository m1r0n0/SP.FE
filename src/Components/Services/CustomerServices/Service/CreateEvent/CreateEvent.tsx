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

  const [isStartDateAppropriate, setIsStartDateAppropriate] = useState(false);
  const [isEndDateAppropriate, setIsEndDateAppropriate] = useState(false);

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

  useEffect(() => {
    dispatch(getUnavailableHours(provider.userId));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <form>
          <div className="date-pick-area">
            <label htmlFor="price">Choose start date and time </label>
            <div className="date-pick-block">
              <DateCalendar
                className="calendar"
                minDate={dayjs(date.toISOString())}
                value={dayjs(state.dateOfStart)}
                onChange={(newValue) => changeDatesValues(newValue!)}
              />
              <MultiSectionDigitalClock
                className="clock"
                minTime={getMinTimeForEventCreation(
                  dayjs(state.dateOfStart),
                  dayjs(date.toISOString())
                )}
                value={dayjs(state.dateOfStart).startOf("hour")}
                onChange={(newValue) => changeDatesValues(newValue!)}
                ampm={false}
                timeSteps={{ hours: 1, minutes: 60 }}
                skipDisabled
                shouldDisableTime={
                  (date) => {
                    var hour = date.tz("Iceland").hour();
                    return currentDateAvailabilityHours.indexOf(hour) !== -1;
                  }
                }
              />
            </div>
          </div>
          <div className="date-pick-area">
            <label htmlFor="price">Choose end date and time </label>
            <div className="date-pick-block">
              <DateCalendar
                className="calendar"
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
                className="clock"
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
                skipDisabled
                shouldDisableTime={(date) => {
                  //add -1 hour to hide begin hour
                  //and also display clock because we subtract 1 hour from endWorkHours
                  var hour = date.tz("Iceland").add(-1, "h").hour();
                  return currentDateAvailabilityHours.indexOf(hour) !== -1;
                }}
              />
            </div>
          </div>

          {isEventCreationRequested ? (
            <div>
              <CircularProgress size={75} />
            </div>
          ) : isStartDateAppropriate && isEndDateAppropriate ? null : (
            <input
              type="button"
              className="btn btn-primary btn-lg"
              value="Order"
              onClick={() =>
                dispatch(createEvent(state, serviceId, provider.userId))
              }
            />
          )}
        </form>

        {isEventCreationFinished ? <EventCreationResultMessage /> : null}
      </div>
    </LocalizationProvider>
  );
}
