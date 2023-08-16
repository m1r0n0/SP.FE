import { IServiceWithProvider } from "../../../Models";
import { IProvider } from "../../../Models/provider";
import { getServices } from "../../../Services/service";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Service from "./Service";

export default function CustomerServices() {
  var dispatch = useAppDispatch();
  var isServicesFetched = useAppSelector((s) => s.service.isServicesFetched);
  var services = useAppSelector((s) => s.service.services);

  if (!isServicesFetched) dispatch(getServices());

  return isServicesFetched ? (
    <div className="d-flex flex-column">
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
  ) : null;
}
