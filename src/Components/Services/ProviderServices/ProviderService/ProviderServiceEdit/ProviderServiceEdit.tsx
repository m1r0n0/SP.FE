import React, { useState } from "react";
import { IServiceInfo } from "../../../../../Models/service";
import { AppDispatch } from "../../../../../Store";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { editService } from "../../../../../Services/service";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ProviderServiceEditProps {
  service: IServiceInfo;
  setIsEditingMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProviderServiceEdit({
  service,
  setIsEditingMode,
}: ProviderServiceEditProps) {
  var dispatch = useAppDispatch();

  const [state, setState] = useState({
    name: service.name,
    price: String(service.price),
  });

  const prepareServiceToEdit = () => {
    setIsEditingMode(false);
    dispatch(editService(state, service.serviceId));
  };

  return (
    <div className="provider-service-component">
      <div className="provider-service-container">
        <IconButton
          className="back-button"
          color="primary"
          aria-label="cancel-edit-mode"
          size="large"
          onClick={() => setIsEditingMode(false)}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <form>
          <div className="provider-service-edit-input-area">
            <div className="input-textfield-box">
              <label htmlFor="price">Service Name</label>
              <input
                value={state.name}
                onChange={(event) =>
                  setState({ ...state, name: event.target.value })
                }
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="input-textfield-box">
              <label htmlFor="price">Service Price, $</label>
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
          </div>
          <input
            type="button"
            className="btn btn-primary btn-lg"
            value="Apply changes"
            onClick={prepareServiceToEdit}
          />
        </form>
      </div>
    </div>
  );
}
