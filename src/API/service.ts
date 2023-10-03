import {
  API_GRAPHQL,
  API_SERVICE,
  API_VERSION_SERVICE,
  CUSTOMER,
  DELETE_USER_RELATED_INFO,
  EVENTS,
  NEW,
  PROVIDER,
  SERVICE,
} from "../JS/routeConstants";
import { AppDispatch, GetState } from "../Store";
import { GetAuthHeader } from "../Services";
import {
  setCustomerEventsAction,
  setServicesWithProvidersAction,
  setServicesFetchedStatus,
  handleServiceCreationSuccess,
  handleServiceCreationFailure,
  handleEventCreationFailure,
  handleEventCreationSuccess,
  setAvailabilitySchedule,
  setEventsFetchedStatus,
  setProviderEventsAction,
} from "../Store/ServiceReducer";
import {
  IEventCreation,
  IServiceCreation,
  IServiceEdition,
} from "../Models/service";
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
const DeleteUserInfoURI = `${API_SERVICE}/${API_VERSION_SERVICE}/${SERVICE}/${DELETE_USER_RELATED_INFO}`;

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

export async function getEventsForCustomer(query: string) {
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
      var events = await response.json();

      dispatch(setCustomerEventsAction(events.data.customerEvents));
      dispatch(setEventsFetchedStatus(true));
    }
  };
}

export async function getEventsForProvider(query: string) {
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
      var events = await response.json();

      dispatch(setProviderEventsAction(events.data.providerEvents));
      dispatch(setEventsFetchedStatus(true));
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
    }

    dispatch(setServicesFetchedStatus(true));
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

export async function proceedEventCreation(
  event: IEventCreation,
  serviceId: number
) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${ServiceURI}/${serviceId}/new/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await dispatch(GetAuthHeader()),
      },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      dispatch(handleEventCreationSuccess());
    } else dispatch(handleEventCreationFailure());
  };
}

export async function getProviderAvailAbilitySchedule(providerUserId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(
      `${GetEventsForProviderURI}/${providerUserId}/unavailableHours`,
      {
        headers: {
          Authorization: await dispatch(GetAuthHeader()),
        },
      }
    );
    if (response.ok) {
      var schedules = await response.json();

      dispatch(setAvailabilitySchedule(schedules));
    }
  };
}

export async function proceedUserRelatedInfoDelete(userId: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${DeleteUserInfoURI}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: await dispatch(GetAuthHeader()),
      },
    });
  };
}
