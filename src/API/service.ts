import {API_SERVICE, API_VERSION_SERVICE, NEW, SERVICE} from "../JS/routeConstants";
import {AppDispatch} from "../Store";
import {GetAuthHeader} from "../Services";

const ServiceURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}`;
const CreateServiceURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${NEW}`;

export async function getServiceInfo(userId: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${ServiceURI}/${userId}`, {
            headers: {
                Authorization: await dispatch(GetAuthHeader()),
            },
        });

        if (response.ok) {
            var provider = await response.json();

            dispatch(setProviderInfoAction(provider));
        }
    };
}

export async function proceedServiceCreation(body: ) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(`${CreateServiceURI}}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: await dispatch(GetAuthHeader()),
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {

        } else {

        }
    };
}