import { Reducer } from "redux";
import { IEvent, IService, IServiceInfo } from "../Models/service";
import { IServiceWithProvider } from "../Models";

interface IServiceAction {
  type: string;
  payload:
    | string
    | IEvent[]
    | IServiceInfo[]
    | IServiceWithProvider[]
    | boolean;
}

interface IServiceState {
  events: IEvent[];
  services: IServiceWithProvider[];
  isServicesFetched: boolean;
}

const defaultState: IServiceState = {
  events: [],
  services: [],
  isServicesFetched: false,
};

const SET_EVENTS = "SET_EVENTS";
const SET_SERVICES_WITH_PROVIDERS = "SET_SERVICES_WITH_PROVIDERS";
const SET_SERVICES = "SET_SERVICES";
const SET_SERVICE_FETCHED_STATUS = "SET_SERVICE_FETCHED_STATUS";
const HANDLE_USER_LOGOUT = "HANDLE_USER_LOGOUT";

export const serviceReducer: Reducer<IServiceState, IServiceAction> = (
  state = defaultState,
  action: IServiceAction
) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload as IEvent[],
      };
    case SET_SERVICES_WITH_PROVIDERS:
      return {
        ...state,
        services: action.payload as IServiceWithProvider[],
      };
    case SET_SERVICES:
      return { ...state, services: action.payload as IServiceWithProvider[] };
    case SET_SERVICE_FETCHED_STATUS:
      return { ...state, isServicesFetched: action.payload as boolean };

      case HANDLE_USER_LOGOUT:
        return{...defaultState}
    default:
      return state;
  }
};

export const setEventsAction = (payload: IEvent[]) => ({
  type: SET_EVENTS,
  payload,
});
export const setServicesWithProvidersAction = (
  payload: IServiceWithProvider[]
) => ({
  type: SET_SERVICES_WITH_PROVIDERS,
  payload,
});
export const setServicesAction = (payload: IServiceInfo[]) => ({
  type: SET_SERVICES,
  payload,
});
export const setServicesFetchedStatus = (payload: boolean) => ({
  type: SET_SERVICE_FETCHED_STATUS,
  payload,
});
export const handleLogoutAction = () => ({
    type: HANDLE_USER_LOGOUT,
});
