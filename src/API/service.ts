import {API_SERVICE, API_VERSION_SERVICE, CUSTOMER, EVENTS, NEW, PROVIDER, SERVICE} from "../JS/routeConstants";
import {AppDispatch} from "../Store";
import {GetAuthHeader} from "../Services";
import {setEventsAction, setServicesAction} from "../Store/ServiceReducer";
import {IServiceCreation, IServiceEdition} from "../Models/service";

const ServiceURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}`;
const CreateServiceURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${NEW}`;
const GetServicesForProviderURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${PROVIDER}`
const GetEventsForProviderURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${EVENTS}/${PROVIDER}`
const GetEventsForCustomerURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${EVENTS}/${CUSTOMER}`

export async function getAllServices() {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${ServiceURI}`, {
            headers: {
                Authorization: await dispatch(GetAuthHeader()),
            },
        });

        if (response.ok) {
            var services = await response.json();

            dispatch(setServicesAction(services));
        }
    };
}

export async function getServicesForProvider(providerUserId: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${GetServicesForProviderURI}/${providerUserId}`, {
            headers: {
                Authorization: await dispatch(GetAuthHeader()),
            },
        });

        if (response.ok) {
            var services = await response.json();

            dispatch(setServicesAction(services));
        }
    };
}

export async function proceedServiceCreation(body: IServiceCreation, serviceId: number) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${ServiceURI}/${serviceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: await dispatch(GetAuthHeader()),
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            dispatch(await getAllServices())
        }
    }
}

export async function proceedServiceEditing(body: IServiceEdition) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${CreateServiceURI}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: await dispatch(GetAuthHeader()),
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            dispatch(await getAllServices())
        }
    }
}

export async function getEventsForCustomer(customerUserId: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${GetEventsForCustomerURI}/${customerUserId}`, {
            headers: {
                Authorization: await dispatch(GetAuthHeader()),
            },
        });
        if (response.ok) {
            var events = await response.json();

            dispatch(setEventsAction(events));
        }
    }
}

export async function getEventsForProvider(providerUserId: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${GetEventsForCustomerURI}/${providerUserId}`, {
            headers: {
                Authorization: await dispatch(GetAuthHeader()),
            },
        });
        if (response.ok) {
            var events = await response.json();

            dispatch(setEventsAction(events));
        }
    }
}