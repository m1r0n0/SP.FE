import AdapterDateFns, {
  DateCalendar,
  DigitalClock,
  MultiSectionDigitalClock,
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
    dateOfStart: date.toISOString(),
    dateOfEnd: date.toISOString(),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div>
          <label htmlFor="price">Choose start date and time </label>
          <DateCalendar
            value={dayjs(state.dateOfStart)}
            onChange={(newValue) =>
              setState({
                ...state,
                dateOfStart: newValue!.toISOString(),
              })
            }
            minDate={dayjs(date.toISOString())}
          />
          <MultiSectionDigitalClock
            value={dayjs(state.dateOfStart)}
            onChange={(newValue) =>
              setState({
                ...state,
                dateOfStart: newValue!.toISOString(),
              })
            }
            minTime={dayjs(date.toISOString()).add(1, "hour")}
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
                dateOfEnd: newValue!.format("YYYY-MM-DD"),
              })
            }
            minDate={dayjs(state.dateOfStart).add(1, "hours")}
          />
          <MultiSectionDigitalClock
            value={dayjs(state.dateOfEnd)}
            onChange={(newValue) =>
              setState({
                ...state,
                dateOfEnd: newValue!.toISOString(),
              })
            }
            minTime={dayjs(state.dateOfStart).add(1, "hours")}
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
