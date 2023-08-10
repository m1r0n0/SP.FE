import React, {useState} from "react";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {handleProviderEdit,} from "../../../../Services/provider";
import {IProviderInfo} from "../../../../Models/provider";
import InvalidInputDisclaimer from "../../../Common/InvalidInputDisclaimer";

export default function EditProvider() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.user.user.userId);
    const isDataChangeRequested = useAppSelector(
        (s) => s.provider.isDataChangeRequested
    );
    const provider = useAppSelector((s) => s.provider.provider);
    const isDataChangedSuccessfully = useAppSelector(
        (state) => state.provider.isDataChangedSuccessfully
    );

    const [state, setState] = useState({
        ...provider,
        workHoursBegin: provider.workHoursBegin.toString(),
        workHoursEnd: provider.workHoursEnd.toString(),
    });

    const providerState: IProviderInfo = {
        ...state,
        workHoursBegin: parseInt(state.workHoursBegin, 10),
        workHoursEnd: parseInt(state.workHoursEnd, 10),
    };

    return (
        <div>
            <h2>Edit</h2>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    value={state.firstName}
                    onChange={(event) =>
                        setState({...state, firstName: event.target.value})
                    }
                    type="text"
                    name="firstName"
                    id="firstName"
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    value={state.lastName}
                    onChange={(event) =>
                        setState({...state, lastName: event.target.value})
                    }
                    type="text"
                    name="lastName"
                    id="lastName"
                />
            </div>
            <div>
                <label htmlFor="enterpriseName">Enterprise Name</label>
                <input
                    value={state.enterpriseName}
                    onChange={(event) =>
                        setState({...state, enterpriseName: event.target.value})
                    }
                    type="text"
                    name="enterpriseName"
                    id="enterpriseName"
                />
            </div>
            <label htmlFor="hoursQuestion">What hours you will be available?</label>
            <div>
                <label htmlFor="workHoursBegin">Begin of Work (0 - 23)</label>
                <input
                    value={state.workHoursBegin}
                    onChange={(event) =>
                        setState({
                            ...state,
                            workHoursBegin: event.target.value,
                        })
                    }
                    type="text"
                    name="workHoursBegin"
                    id="workHoursBegin"
                />
            </div>
            <div>
                <label htmlFor="workHoursEnd">End of Work (0 - 23)</label>
                <input
                    value={state.workHoursEnd.toString()}
                    onChange={(event) =>
                        setState({
                            ...state,
                            workHoursEnd: event.target.value,
                        })
                    }
                    type="text"
                    name="workHoursEnd"
                    id="workHoursEnd"
                />
            </div>
            <div className="m-4">
                {isDataChangeRequested ? (
                    <CircularProgress size={75}/>
                ) : (
                    <input
                        type="button"
                        value="Edit"
                        className="btn btn-success btn-lg"
                        onClick={() => dispatch(handleProviderEdit(userId, providerState))}
                    />
                )}
            </div>

            <InvalidInputDisclaimer/>
        </div>
    );
}
