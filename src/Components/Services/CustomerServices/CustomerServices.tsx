import { CircularProgress } from "@mui/material";
import { IServiceWithProvider } from "../../../Models";
import { IProvider } from "../../../Models/provider";
import { getServices } from "../../../Services/service";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Service from "./Service";
import "./CustomerServices.css";
import { useEffect } from "react";

export default function CustomerServices() {
  var dispatch = useAppDispatch();
  var isServicesFetched = useAppSelector((s) => s.service.isServicesFetched);
  var services = useAppSelector((s) => s.service.services);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return isServicesFetched ? (
    <div className="app-body-component">
      <h1>Services</h1>
      {services?.map(
        (serviceWithProvider: IServiceWithProvider, index: number) => {
          return (
            <Service
              key={index}
              service={serviceWithProvider.service}
              provider={serviceWithProvider.provider as IProvider}
            />
          );
        }
      )}
    </div>
  ) : (
    <div className="load-circle">
      <CircularProgress size={300} />
    </div>
  );
}
