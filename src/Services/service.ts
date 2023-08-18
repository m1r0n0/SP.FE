import { AppDispatch, GetState } from "../Store";
import {
  getAllServices,
  getServicesForProvider,
  proceedEventCreation,
  proceedServiceCreation,
  proceedServiceDeletion,
  proceedServiceEditing,
} from "../API/service";
import { jsonToGraphQLQuery } from "json-to-graphql-query";
import {
  IEventCreation,
  IEventDates,
  IServiceCreation,
  IServiceEdition,
  IServiceEditionInStrings,
  IServiceInfo,
} from "../Models/service";
import { IServiceWithProvider } from "../Models";
import {
  handleEventCreationRequest,
  handleServiceCreationRequest,
} from "../Store/ServiceReducer";
import { TimeView } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export const getServices = () => async (dispatch: AppDispatch) => {
  const query = {
    services: {
      service: {
        serviceId: true,
        name: true,
        price: true,
      },
      provider: {
        providerId: true,
        userId: true,
        firstName: true,
        lastName: true,
        enterpriseName: true,
        workHoursBegin: true,
        workHoursEnd: true,
      },
    },
  };

  let graphql_query = jsonToGraphQLQuery(query, { pretty: true });
  graphql_query = `{${graphql_query}}`;
  dispatch(await getAllServices(graphql_query));
};

export const getProviderServices =
  (providerUserId: string) => async (dispatch: AppDispatch) => {
    dispatch(await getServicesForProvider(providerUserId));
  };

export const modifyServicesArrayForProvider = (
  services: IServiceInfo[]
): IServiceWithProvider[] => {
  var newArray: IServiceWithProvider[] = [];

  services.map((e: IServiceInfo) => {
    var serviceWithProvider: IServiceWithProvider = {
      service: e,
      provider: undefined,
    };

    newArray.push(serviceWithProvider);
  });

  return newArray;
};

export const editService =
  (service: IServiceEditionInStrings, serviceId: number) =>
  async (dispatch: AppDispatch) => {
    var properService: IServiceEdition = {
      name: service.name,
      price: Number(service.price),
    };

    dispatch(await proceedServiceEditing(properService, serviceId));
  };

export const createService =
  (service: IServiceEditionInStrings, providerUserId: string) =>
  async (dispatch: AppDispatch) => {
    var properService: IServiceCreation = {
      name: service.name,
      price: Number(service.price),
      providerUserId: providerUserId,
    };

    dispatch(handleServiceCreationRequest());
    dispatch(await proceedServiceCreation(properService));
  };

export const deleteService =
  (service: IServiceInfo) => async (dispatch: AppDispatch) => {
    if (window.confirm(`Do you really want to delete "${service.name}"?`))
      dispatch(await proceedServiceDeletion(service.serviceId));
  };

export const createEvent =
  (dates: IEventDates, serviceId: number) =>
  async (dispatch: AppDispatch, getState: GetState) => {
    var event: IEventCreation = {
      dateOfStart: dates.dateOfStart,
      dateOfEnd: dates.dateOfEnd,
      customerUserId: getState().user.user.userId,
    };

    dispatch(handleEventCreationRequest());
    dispatch(await proceedEventCreation(event, serviceId));
  };
