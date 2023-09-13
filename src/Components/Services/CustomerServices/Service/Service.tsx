import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { IProvider, IProviderInfo } from "../../../../Models/provider";
import { IServiceInfo } from "../../../../Models/service";
import CreateEvent from "./CreateEvent/CreateEvent";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface props {
  service: IServiceInfo;
  provider: IProvider;
}

export default function Service({ service, provider }: props) {
  var dispatch = useAppDispatch();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  return (
    <div className="service-container">
      <p id="name">{service.name}</p>
      <div id="provider-area">
        <h4>Provider</h4>
        <p>
          {provider.firstName} {provider.lastName},
        </p>
        <p> {provider.enterpriseName} </p>
      </div>
      <p id="price">{service.price}$</p>
      <div id="order-area">
        {isCreatingEvent ? (
          <div>
            <IconButton
              color="primary"
              aria-label="hide-calendars"
              size="large"
              onClick={() => setIsCreatingEvent(false)}
            >
              <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
            <CreateEvent serviceId={service.serviceId} provider={provider} />
          </div>
        ) : (
          <input
            type="button"
            className="btn btn-primary btn-lg"
            value="Order"
            onClick={() => setIsCreatingEvent(true)}
          />
        )}
      </div>
    </div>
  );
}
