import {IServiceInfo} from "../../Models/service";
import Service from "./Service";
import {IProvider} from "../../Models/provider";

export default function Services() {
    var service: IServiceInfo = {
        serviceId: 3,
        name: "nameee",
        price: 109
    }
    var provider: IProvider = {
        userId: "c5677ebc-7099-428f-aa29-8159714de76e",
        firstName: "John",
        lastName: "Martin",
        enterpriseName: "Martin Inc",
        workHoursBegin: 8,
        workHoursEnd: 16
    }

    return (<Service service={service} provider={provider}/>)
}