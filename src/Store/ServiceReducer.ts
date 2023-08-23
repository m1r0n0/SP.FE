import { Reducer } from "redux";
import {
  IAvailabilitySchedule,
  IEvent,
  IService,
  IServiceInfo,
} from "../Models/service";
import { IServiceWithProvider } from "../Models";

interface IServiceAction {
  type: string;
  payload:
    | string
    | IEvent[]
    | IServiceInfo[]
    | IServiceWithProvider[]
    | IAvailabilitySchedule[]
    | boolean;
}

interface IServiceState {
  events: IEvent[];
  services: IServiceWithProvider[];
  availabilitySchedule: IAvailabilitySchedule[];
  isServicesFetched: boolean;
  isServiceCreationRequested: boolean;
  isServiceCreationSucceeded: boolean;
  isServiceCreationFinished: boolean;
  isEventCreationRequested: boolean;
  isEventCreationSucceeded: boolean;
  isEventCreationFinished: boolean;
}

const defaultState: IServiceState = {
  events: [],
  services: [],
  availabilitySchedule: [],
  isServicesFetched: false,
  isServiceCreationRequested: false,
  isServiceCreationSucceeded: false,
  isServiceCreationFinished: false,
  isEventCreationRequested: false,
  isEventCreationSucceeded: false,
  isEventCreationFinished: false,
};

const SET_EVENTS = "SET_EVENTS";
const SET_SERVICES_WITH_PROVIDERS = "SET_SERVICES_WITH_PROVIDERS";
const SET_SERVICES = "SET_SERVICES";
const SET_SERVICE_FETCHED_STATUS = "SET_SERVICE_FETCHED_STATUS";
const HANDLE_USER_LOGOUT = "HANDLE_USER_LOGOUT";

const SET_AVAILABILITY_SCHEDULE = "SET_AVAILABILITY_SCHEDULE";

const HANDLE_SERVICE_CREATION_REQUEST = "HANDLE_SERVICE_CREATION_REQUEST";
const HANDLE_SERVICE_CREATION_SUCCESS = "HANDLE_SERVICE_CREATION_SUCCESS";
const HANDLE_SERVICE_CREATION_FAILURE = "HANDLE_SERVICE_CREATION_FAILURE";

const HANDLE_EVENT_CREATION_REQUEST = "HANDLE_EVENT_CREATION_REQUEST";
const HANDLE_EVENT_CREATION_SUCCESS = "HANDLE_EVENT_CREATION_SUCCESS";
const HANDLE_EVENT_CREATION_FAILURE = "HANDLE_EVENT_CREATION_FAILURE";

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

    case SET_AVAILABILITY_SCHEDULE:
      return {
        ...state,
        availabilitySchedule: action.payload as IAvailabilitySchedule[],
      };

    case HANDLE_SERVICE_CREATION_REQUEST:
      return {
        ...state,
        isServiceCreationRequested: true,
      };
    case HANDLE_SERVICE_CREATION_SUCCESS:
      return {
        ...state,
        isServiceCreationRequested: false,
        isServiceCreationFinished: true,
        isServiceCreationSucceeded: true,
      };
    case HANDLE_SERVICE_CREATION_FAILURE:
      return {
        ...state,
        isServiceCreationRequested: false,
        isServiceCreationFinished: true,
        isServiceCreationSucceeded: false,
      };

    case HANDLE_EVENT_CREATION_REQUEST:
      return {
        ...state,
        isEventCreationRequested: true,
      };
    case HANDLE_EVENT_CREATION_SUCCESS:
      return {
        ...state,
        isEventCreationRequested: false,
        isEventCreationFinished: true,
        isEventCreationSucceeded: true,
      };
    case HANDLE_EVENT_CREATION_FAILURE:
      return {
        ...state,
        isEventCreationRequested: false,
        isEventCreationFinished: true,
        isEventCreationSucceeded: false,
      };

    case HANDLE_USER_LOGOUT:
      return { ...defaultState };
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

export const setAvailabilitySchedule = (payload: IAvailabilitySchedule[]) => ({
  type: SET_AVAILABILITY_SCHEDULE,
  payload,
})

export const handleLogoutAction = () => ({
  type: HANDLE_USER_LOGOUT,
});

export const handleServiceCreationRequest = () => ({
  type: HANDLE_SERVICE_CREATION_REQUEST,
});
export const handleServiceCreationSuccess = () => ({
  type: HANDLE_SERVICE_CREATION_SUCCESS,
});
export const handleServiceCreationFailure = () => ({
  type: HANDLE_SERVICE_CREATION_FAILURE,
});

export const handleEventCreationRequest = () => ({
  type: HANDLE_EVENT_CREATION_REQUEST,
});
export const handleEventCreationSuccess = () => ({
  type: HANDLE_EVENT_CREATION_SUCCESS,
});
export const handleEventCreationFailure = () => ({
  type: HANDLE_EVENT_CREATION_FAILURE,
});
