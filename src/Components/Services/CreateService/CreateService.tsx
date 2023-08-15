import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { createService } from "../../../Services/service";
import { CircularProgress } from "@mui/material";
import ServiceCreationResultMessage from "./ServiceCreationResultMessage/ServiceCreationResultMessage";

export default function CreateService() {
  var dispatch = useAppDispatch();
  const providerUserId = useAppSelector((s) => s.user.user.userId);
  const isServiceCreationRequested = useAppSelector(
    (s) => s.service.isServiceCreationRequested
  );
  const isServiceCreationSucceeded = useAppSelector(
    (s) => s.service.isServiceCreationSucceeded
  );
  const isServiceCreationFinished = useAppSelector(
    (s) => s.service.isServiceCreationFinished
  );

  const [state, setState] = useState({
    name: "",
    price: "",
  });

  return (
    <div>
      <h2>Create the service</h2>
      <div>
        <label htmlFor="price">Service Name </label>
        <input
          value={state.name}
          onChange={(event) => setState({ ...state, name: event.target.value })}
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div>
        <label htmlFor="price">Service Price </label>
        <input
          value={state.price}
          onChange={(event) =>
            setState({ ...state, price: event.target.value })
          }
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div>
        {isServiceCreationRequested ? (
          <CircularProgress size={75} />
        ) : (
          <input
            type="button"
            className="btn btn-primary btn-lg"
            value="Create"
            onClick={() => dispatch(createService(state, providerUserId))}
          />
        )}
      </div>
      <div>
        {isServiceCreationFinished ? (
          <ServiceCreationResultMessage
            isSucceeded={isServiceCreationSucceeded}
          />
        ) : null}
      </div>
    </div>
  );
}
