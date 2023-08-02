import { Reducer } from "redux";

interface ICustomerAction {
    type: string;
    payload: string;
}

interface ICustomerState {

}

const defaultState: ICustomerState = {

};

const SET_CUSTOMER = "SET_CUSTOMER";

export const customerReducer: Reducer<ICustomerState, ICustomerAction> = (
    state = defaultState,
    action: ICustomerAction
) => {
    switch (action.type) {
        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
            };

        default:
            return state;
    }
};

export const handleRegisterSuccessAction = () => ({
    type: ,
});

