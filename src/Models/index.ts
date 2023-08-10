import {IProvider} from "./provider";
import {IServiceInfo} from "./service";

export interface IComponentDependentDisclaimerStates {
    isNoMatchingPasswords: boolean;
    isInvalidEmail: boolean;
}

export interface IServiceWithProvider {
    service: IServiceInfo;
    provider: IProvider
}