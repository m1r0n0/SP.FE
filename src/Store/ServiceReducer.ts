import {Reducer} from "redux";
import {IEvent, IService} from "../Models/service";

interface IServiceAction {
    type: string;
    payload: string | IEvent[] | IService[];
}

interface IServiceState {
    events: IEvent[]
    services: IService[]
}

const defaultState: IServiceState = {
    events: [],
    services: []
};

const SET_EVENTS = "SET_EVENTS";
const SET_SERVICES = "SET_SERVICES";

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
        case SET_SERVICES:
            return {
                ...state,
                services: action.payload as IService[],
            };

        default:
            return state;
    }
};

export const setEventsAction = (payload: IEvent[]) => ({
    type: SET_EVENTS,
    payload
});
export const setServicesAction = (payload: IService[]) => ({
    type: SET_SERVICES,
    payload
});

