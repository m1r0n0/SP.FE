import { CircularProgress } from "@mui/material";
import { getServicesForProvider } from "../../../API/service";
import { IServiceWithProvider } from "../../../Models";
import { getProviderServices, getServices } from "../../../Services/service";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Service from "../CustomerServices/Service";
import ProviderService from "./ProviderService";

export default function ProviderServices() {
  var dispatch = useAppDispatch();
  var isServicesFetched = useAppSelector((s) => s.service.isServicesFetched);
  var services = useAppSelector((s) => s.service.services);
  var userId = useAppSelector((s) => s.user.user.userId);

  if (!isServicesFetched) dispatch(getProviderServices(userId));

  return isServicesFetched ? (
    <div className="d-flex flex-column">
      <h1>My services</h1>
      {services?.map(
        (serviceWithProvider: IServiceWithProvider, index: number) => {
          return (
            <ProviderService
              key={index}
              service={serviceWithProvider.service}
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
