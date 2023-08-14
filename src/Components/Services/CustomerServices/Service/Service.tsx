import React from "react";
import { useAppDispatch } from "../../../../hooks";
import { IProviderInfo } from "../../../../Models/provider";
import { IServiceInfo } from "../../../../Models/service";

interface props {
  service: IServiceInfo;
  provider: IProviderInfo;
}

export default function Service({ service, provider }: props) {
  var dispatch = useAppDispatch();

  return (
    <div>
      <p>{service.name}</p>
      <p>Price: {service.price}$</p>
      <p>
        Provider: {provider.firstName} {provider.lastName}
      </p>
      <p>{provider.enterpriseName}</p>
      <p>
        Workhours: {provider.workHoursBegin} - {provider.workHoursEnd}
      </p>
      <p>-----------------------------</p>
    </div>
  );
}
