import {IService} from "../../Models/service";
import Service from "./Service";
import {useAppSelector} from "../../hooks";

export default async function Services() {
    var service: IService = {
        serviceId: 3,
        name: "nameee",
        price: 109,
        providerUserId: "provider"
    }
    var provider = useAppSelector(state => state.provider.provider)

    return (<Service service={service} provider={provider}/>)
}