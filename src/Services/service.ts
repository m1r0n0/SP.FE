import { AppDispatch } from "../Store";
import { getAllServices, getServicesForProvider } from "../API/service";
import { jsonToGraphQLQuery } from "json-to-graphql-query";
import { IServiceInfo } from "../Models/service";
import { IServiceWithProvider } from "../Models";

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

export const modifyServicesForProvider = (
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
