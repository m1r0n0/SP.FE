import { IServiceInfo } from "../../Models/service";
import Service from "./CustomerServices/Service";
import { IProvider } from "../../Models/provider";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getServices } from "../../Services/service";
import { IServiceWithProvider } from "../../Models";
import ProviderServices from "./ProviderServices/ProviderServices";
import CustomerServices from "./CustomerServices/CustomerServices";

export default function Services() {
  var isProvider = useAppSelector((s) => s.user.isProvider);

  return isProvider ? <ProviderServices /> : <CustomerServices />;
}
