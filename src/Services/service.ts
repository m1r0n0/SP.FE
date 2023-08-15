import { AppDispatch } from "../Store";
import {
  getAllServices,
  getServicesForProvider,
  proceedServiceCreation,
  proceedServiceEditing,
} from "../API/service";
import { jsonToGraphQLQuery } from "json-to-graphql-query";
import {
  IServiceCreation,
  IServiceEdition,
  IServiceEditionInStrings,
  IServiceInfo,
} from "../Models/service";
import { IServiceWithProvider } from "../Models";
import { handleServiceCreationRequest } from "../Store/ServiceReducer";

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
  (
    service: IServiceEditionInStrings,
    serviceId: number,
  ) =>
  async (dispatch: AppDispatch) => {
    var properService: IServiceEdition = {
      name: service.name,
      price: Number(service.price),
    };

    dispatch(
      await proceedServiceEditing(properService, serviceId)
    );
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
    dispatch(
      await proceedServiceCreation(properService)
    );
  };
