import React from "react";
import { IServiceInfo } from "../../../../Models/service";
import { useAppDispatch } from "../../../../hooks";

interface props {
  service: IServiceInfo;
}

export default function ProviderService({ service }: props) {
  var dispatch = useAppDispatch();

  return (
    <div>
      <p>{service.name}</p>
      <p>Price: {service.price}$</p>
      <p>-----------------------------</p>
    </div>
  );
}
