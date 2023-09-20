import {
  DateCalendar,
  LocalizationProvider,
  MultiSectionDigitalClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { IProvider } from "../../../../../../Models/provider";

interface DatePickProps {
  state: {
    dateOfStart: string;
    dateOfEnd: string;
  };
  minDate: Dayjs;
  minTime: Dayjs;
  onChange: (newValue: Dayjs) => void;
  isStartDateComponent: boolean;
  provider: IProvider;
  currentDateAvailabilityHours: number[];
}

export default function DatePick({
  state,
  minDate,
  minTime,
  isStartDateComponent,
  onChange,
  provider,
  currentDateAvailabilityHours,
}: DatePickProps) {
  var additionalHoursAmount: number;

  //add -1 hour to hide end of unavailable hour for end date clock
  //and also display clock because we subtract 1 hour from endWorkHours
  isStartDateComponent
    ? (additionalHoursAmount = 0)
    : (additionalHoursAmount = -1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-pick-block">
        <DateCalendar
          className="calendar"
          minDate={minDate}
          value={
            isStartDateComponent
              ? dayjs(state.dateOfStart).startOf("hour")
              : dayjs(state.dateOfEnd).startOf("hour")
          }
          onChange={(newValue) => onChange(newValue!)}
        />
        <MultiSectionDigitalClock
          className="clock"
          minTime={minTime}
          value={
            isStartDateComponent
              ? dayjs(state.dateOfStart).startOf("hour")
              : dayjs(state.dateOfEnd).startOf("hour")
          }
          onChange={(newValue) => onChange(newValue!)}
          ampm={false}
          timeSteps={{ hours: 1, minutes: 60 }}
          skipDisabled
          shouldDisableTime={(date) => {
            var hour = date
              .add(additionalHoursAmount, "h")
              .tz("Iceland")
              .hour();
            return (
              date.hour() < provider.workHoursBegin ||
              //invert additionalHoursAmount for start & end components here
              date.hour() > provider.workHoursEnd + additionalHoursAmount ||
              currentDateAvailabilityHours.indexOf(hour) !== -1
            );
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
