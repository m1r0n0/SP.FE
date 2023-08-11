import {IServiceInfo} from "../../Models/service";
import Service from "./Service";
import {IProvider} from "../../Models/provider";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getServices} from "../../Services/service";

export default function Services() {
    var dispatch = useAppDispatch();
    dispatch(getServices());
    var services = useAppSelector(s => s.service.services);

    var service: IServiceInfo = services.pop()?.service as IServiceInfo;
    var provider: IProvider = services.pop()?.provider as IProvider;

    return (<Service service={service} provider={provider}/>)
}