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
    <div id="provider-service-view-component">
      <div id="service-view-container">
        <div className="name">
          <p id="name">
            <strong>{service.name}</strong>
          </p>
        </div>
        <div className="price">
          <p id="price">{service.price}$</p>
        </div>
        <input
          id="edit-button"
          type="button"
          className="btn"
          value="Edit"
          onClick={() => setIsEditingMode(true)}
        />
        <input
          type="button"
          className="btn delete-button"
          value="Delete"
          onClick={async () => dispatch(deleteService(service))}
        />
      </div>
    </div>
  );
}
