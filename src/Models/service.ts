export interface IService {
    serviceId: number,
    name: string,
    price: number,
    providerUserId: string
}

export interface IEvent {
    EventId: number,
    ServiceId: number,
    CustomerUserId: string,
    DateOfStart: string,
    DateOfEnd: string
}

export interface IServiceCreation {
    name: string,
    price: number,
    providerUserId: string
}

export interface IServiceEdition {
    name: string,
    price: number,
}