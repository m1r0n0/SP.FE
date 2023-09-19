import {
  DateCalendar,
  LocalizationProvider,
  MultiSectionDigitalClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface DatePickProps {
  state: {
    dateOfStart: string;
    dateOfEnd: string;
  };
  minDate: Dayjs;
  minTime: Dayjs;
  onStartDateComponentChange: (newValue: Dayjs) => void;
  onEndDateComponentChange: (
    value: React.SetStateAction<{
      dateOfStart: string;
      dateOfEnd: string;
    }>
  ) => void;
  isStartDateComponent: boolean;
}

export default function DatePick({
  state,
  minDate,
  minTime,
  isStartDateComponent,
  onStartDateComponentChange,
  onEndDateComponentChange,
}: DatePickProps) {
  const date = new Date();
  var shouldDisableTimeAdditionalHoursAmount: number;

  //add -1 hour to hide begin hour for end date clock
  //and also display clock because we subtract 1 hour from endWorkHours
  isStartDateComponent
    ? (shouldDisableTimeAdditionalHoursAmount = -1)
    : (shouldDisableTimeAdditionalHoursAmount = 0);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-pick-block">
        <DateCalendar
          className="calendar"
          minDate={minDate}
          value={dayjs(state.dateOfStart)}
          onChange={(newValue) => changeDatesValuesDueNewDate(newValue!)}
        />
        <MultiSectionDigitalClock
          className="clock"
          minTime={getMinTimeForEventCreation(
            dayjs(state.dateOfStart),
            dayjs(date.toISOString())
          )}
          value={dayjs(state.dateOfStart).startOf("hour")}
          onChange={(newValue) => changeDatesValuesDueNewDate(newValue!)}
          ampm={false}
          timeSteps={{ hours: 1, minutes: 60 }}
          skipDisabled
          shouldDisableTime={(date) => {
            var hour = date.tz("Iceland").hour();
            return (
              date.hour() < provider.workHoursBegin ||
              date.hour() > provider.workHoursEnd ||
              currentDateAvailabilityHours.indexOf(hour) !== -1
            );
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
