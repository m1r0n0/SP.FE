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
import { AppDispatch, GetState } from "../Store";
import { GetAuthHeader } from "../Services";
import {
  setEventsAction,
  setServicesWithProvidersAction,
  setServicesFetchedStatus,
  handleServiceCreationSuccess,
  handleServiceCreationFailure,
} from "../Store/ServiceReducer";
import { IServiceCreation, IServiceEdition } from "../Models/service";
import {
  getServices,
  modifyServicesArrayForProvider,
} from "../Services/service";

const GraphQlURI = `${API_GRAPHQL}`;
const ServiceURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}`;
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

      dispatch(setServicesWithProvidersAction(services.data.services));
      dispatch(setServicesFetchedStatus(true));
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

      services = modifyServicesArrayForProvider(services);
      dispatch(setServicesWithProvidersAction(services));
      dispatch(setServicesFetchedStatus(true));
    }
  };
}

export async function proceedServiceCreation(body: IServiceCreation) {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const response = await fetch(`${CreateServiceURI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const providerUserId = getState().user.user.userId;
      
      dispatch(await getServicesForProvider(providerUserId));
      dispatch(handleServiceCreationSuccess());
    } else dispatch(handleServiceCreationFailure());
  };
}

export async function proceedServiceEditing(
  body: IServiceEdition,
  serviceId: number
) {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const response = await fetch(`${ServiceURI}/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const providerUserId = getState().user.user.userId;
      dispatch(await getServicesForProvider(providerUserId));
    }
  };
}

export async function proceedServiceDeletion(serviceId: number) {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const response = await fetch(`${ServiceURI}/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: await dispatch(GetAuthHeader()),
      },
    });
    if (response.ok) {
      const providerUserId = getState().user.user.userId;
      dispatch(await getServicesForProvider(providerUserId));
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
