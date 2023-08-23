export interface IService {
  serviceId: number;
  name: string;
  price: number;
  providerUserId: string;
}

export interface IServiceInfo {
  serviceId: number;
  name: string;
  price: number;
}

export interface IServiceCreation {
  name: string;
  price: number;
  providerUserId: string;
}

export interface IServiceEdition {
  name: string;
  price: number;
}

export interface IServiceEditionInStrings {
  name: string;
  price: string;
}

export interface IEvent {
  EventId: number;
  ServiceId: number;
  CustomerUserId: string;
  DateOfStart: string;
  DateOfEnd: string;
}

export interface IEventCreation {
  customerUserId: string;
  dateOfStart: string;
  dateOfEnd: string;
}

export interface IEventDates {
  dateOfStart: string;
  dateOfEnd: string;
}

export interface IAvailabilitySchedule{
  date: string,
  unavailableHours: number[];
}