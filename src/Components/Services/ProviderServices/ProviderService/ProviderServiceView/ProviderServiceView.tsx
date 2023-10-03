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
    <div className="provider-service-component">
      <div className="provider-service-container">
        <div className="name">
          <p id="name">
            <strong>{service.name}</strong>
          </p>
        </div>
        <div className="provider-price-area">
          <p id="provider-price">{service.price}$</p>
        </div>
        <div id="control-buttons">
          <input
            id="edit-button"
            type="button"
            className="btn"
            value="Edit"
            onClick={() => setIsEditingMode(true)}
          />
          <input
            id="delete-button"
            type="button"
            className="btn delete-button"
            value="Delete"
            onClick={async () => dispatch(deleteService(service))}
          />
        </div>
      </div>
    </div>
  );
}
