import {
  API_GRAPHQL,
  API_SERVICE,
  API_VERSION_SERVICE,
  CUSTOMER,
  EVENTS,
  NEW,
  PROVIDER,
  SERVICE,
} from "../JS/routeConstants";
import { AppDispatch } from "../Store";
import { GetAuthHeader } from "../Services";
import { setEventsAction, setServicesAction } from "../Store/ServiceReducer";
import { IServiceCreation, IServiceEdition } from "../Models/service";
import { getServices } from "../Services/service";

const GraphQlURI = `${API_GRAPHQL}`;
const CreateServiceURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${NEW}`;
const GetServicesForProviderURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${PROVIDER}`;
const GetEventsForProviderURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${EVENTS}/${PROVIDER}`;
const GetEventsForCustomerURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${EVENTS}/${CUSTOMER}`;

export async function getAllServices(query: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${GraphQlURI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      var services = await response.json();

      dispatch(setServicesAction(services.data));
    }
  };
}

export async function getServicesForProvider(providerUserId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `${GetServicesForProviderURI}/${providerUserId}`,
      {
        headers: {
          Authorization: await dispatch(GetAuthHeader()),
        },
      }
    );

    if (response.ok) {
      var services = await response.json();

      dispatch(setServicesAction(services));
    }
  };
}

export async function proceedServiceCreation(
  body: IServiceCreation,
  serviceId: number
) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${GraphQlURI}/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      dispatch(getServices());
    }
  };
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
      dispatch(getServices());
    }
  };
}

export async function getEventsForCustomer(customerUserId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `${GetEventsForCustomerURI}/${customerUserId}`,
      {
        headers: {
          Authorization: await dispatch(GetAuthHeader()),
        },
      }
    );
    if (response.ok) {
      var events = await response.json();

      dispatch(setEventsAction(events));
    }
  };
}

export async function getEventsForProvider(providerUserId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `${GetEventsForProviderURI}/${providerUserId}`,
      {
        headers: {
          Authorization: await dispatch(GetAuthHeader()),
        },
      }
    );
    if (response.ok) {
      var events = await response.json();

      dispatch(setEventsAction(events));
    }
  };
}
