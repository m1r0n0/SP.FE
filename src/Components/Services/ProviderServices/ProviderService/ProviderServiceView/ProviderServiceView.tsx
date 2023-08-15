import React from "react";
import { IServiceInfo } from "../../../../../Models/service";
import { proceedServiceDeletion } from "../../../../../API/service";
import { useAppDispatch } from "../../../../../hooks";

interface ProviderServiceViewProps {
  service: IServiceInfo;
  setIsEditingMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProviderServiceView({
  service,
  setIsEditingMode,
}: ProviderServiceViewProps) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>{service.name}</p>
      <p>Price: {service.price}$</p>
      <input
        type="button"
        className="btn btn-primary btn-lg"
        value="Edit"
        onClick={() => setIsEditingMode(true)}
      />
      <input
        type="button"
        className="btn btn-primary btn-lg"
        value="Delete"
        onClick={async () =>
          dispatch(await proceedServiceDeletion(service.serviceId))
        }
      />
      <p>-----------------------------</p>
    </div>
  );
}
