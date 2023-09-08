import React from "react";
import { IServiceInfo } from "../../../../../Models/service";
import { proceedServiceDeletion } from "../../../../../API/service";
import { useAppDispatch } from "../../../../../hooks";
import { deleteService } from "../../../../../Services/service";

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
    <div id="service-view-container">
      <p id="name">
        <strong>{service.name}</strong>
      </p>
      <p id="price">{service.price}$</p>
      <input
        id="edit-button"
        type="button"
        className="btn btn-primary btn-lg"
        value="Edit"
        onClick={() => setIsEditingMode(true)}
      />
      <input
        id="delete-button"
        type="button"
        className="btn btn-primary btn-lg"
        value="Delete"
        onClick={async () => dispatch(deleteService(service))}
      />
    </div>
  );
}
