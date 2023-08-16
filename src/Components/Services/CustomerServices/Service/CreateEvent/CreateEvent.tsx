import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { DateField } from "@mui/x-date-pickers/";
import { useState } from "react";
import { createEvent } from "../../../../../Services/service";

interface CreateEventProps {}

export default function CreateEvent({}: CreateEventProps) {
  const date = new Date();
  var value = date.toISOString();
  value = value.slice(0, 10);
  console.log(value);

  const [state, setState] = useState({
    dateOfStart: "16-08-23",
    dateOfEnd: "17-08-23",
  });
  return (
    <div>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateField
          label="Controlled picker"
          value={value}
          //onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider> */}
      <div>
        <label htmlFor="price">dateOfStart </label>
        <input
          value={state.dateOfStart}
          onChange={(event) =>
            setState({ ...state, dateOfStart: event.target.value })
          }
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div>
        <label htmlFor="price">dateOfEnd </label>
        <input
          value={state.dateOfEnd}
          onChange={(event) =>
            setState({ ...state, dateOfEnd: event.target.value })
          }
          type="text"
          name="name"
          id="name"
        />
      </div>
      <input
        type="button"
        className="btn btn-primary btn-lg"
        value="Order"
        onClick={async() => dispatch(createEvent())}
      />
    </div>
  );
}
