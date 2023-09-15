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
    <div className="app-body-component">
      <h1>My services</h1>
      <div id="provider-services-area">
        {services.length !== 0 ? (
          services?.map(
            (serviceWithProvider: IServiceWithProvider, index: number) => {
              return (
                <ProviderService
                  key={index}
                  service={serviceWithProvider.service}
                />
              );
            }
          )
        ) : (
          <h2>You haven't created any service yet!</h2>
        )}
      </div>
    </div>
  ) : (
    <div className="load-circle">
      <CircularProgress size={300} />
    </div>
  );
}
