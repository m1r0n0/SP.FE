import {IService} from "../../Models/service";
import Service from "./Service";
import {useAppSelector} from "../../hooks";

export default function Services() {
    var service: IService = {
        serviceId: 3,
        name: "nameee",
        price: 109,
        providerUserId: "4920e9e8-0b68-4c4b-b063-6a24963217b6"
    }
    var provider = useAppSelector(state => state.provider.provider)

    return (<Service service={service} provider={provider}/>)
}