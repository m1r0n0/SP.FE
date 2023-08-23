import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { IProvider, IProviderInfo } from "../../../../Models/provider";
import { IServiceInfo } from "../../../../Models/service";
import CreateEvent from "./CreateEvent/CreateEvent";

interface props {
  service: IServiceInfo;
  provider: IProvider;
}

export default function Service({ service, provider }: props) {
  var dispatch = useAppDispatch();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  return (
    <div>
      <p>-----------------------------</p>
      <p>{service.name}</p>
      <p>Price: {service.price}$</p>
      <p>
        Provider: {provider.firstName} {provider.lastName}
      </p>
      <p>{provider.enterpriseName}</p>
      <p>
        Workhours: {provider.workHoursBegin} - {provider.workHoursEnd}
      </p>

      {isCreatingEvent ? (
        <CreateEvent serviceId={service.serviceId} providerUserId={provider.userId} />
      ) : (
        <input
          type="button"
          className="btn btn-primary btn-lg"
          value="Order"
          onClick={() => setIsCreatingEvent(true)}
        />
      )}
    </div>
  );
}
