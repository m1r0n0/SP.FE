import { AppDispatch } from "../Store";
import { getAllServices } from "../API/service";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

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
