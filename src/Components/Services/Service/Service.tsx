import React from 'react'
import {useAppDispatch} from "../../../hooks";
import {IProvider} from "../../../Models/provider";
import {setProviderInfoAction} from "../../../Store/ProviderReducer";
import {IService} from "../../../Models/service";
import {prepareProviderData} from "../../../Services/provider";

interface props {
    service: IService,
    provider: IProvider
}

export default function Service({service, provider}: props) {
    var dispatch = useAppDispatch();
    var oldData = provider;
    var newData: IProvider;

    dispatch(prepareProviderData(service.providerUserId, false))
    newData = provider;
    dispatch(setProviderInfoAction(oldData));

    return <div>
        <p>{service.name}</p>
        <p>{service.price}</p>
        <p>{newData.firstName} {newData.lastName}</p>
        <p>{newData.enterpriseName}</p>
        <p>Workhours: {newData.workHoursBegin} - {newData.workHoursEnd}</p>
    </div>
}