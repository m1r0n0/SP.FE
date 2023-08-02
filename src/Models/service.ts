export interface IService {
    serviceId: string,
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