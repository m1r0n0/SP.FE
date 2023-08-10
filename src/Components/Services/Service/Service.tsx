import React from 'react'
import {useAppDispatch} from "../../../hooks";
import {IProviderInfo} from "../../../Models/provider";
import {IServiceInfo} from "../../../Models/service";

interface props {
    service: IServiceInfo,
    provider: IProviderInfo
}

export default function Service({service, provider}: props) {
    var dispatch = useAppDispatch();

    return <div>
        <p>{service.name}</p>
        <p>{service.price}$</p>
        <p>{provider.firstName} {provider.lastName}</p>
        <p>{provider.enterpriseName}</p>
        <p>Workhours: {provider.workHoursBegin} - {provider.workHoursEnd}</p>
    </div>
}