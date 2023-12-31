import React from "react";
import {useAppSelector} from "../../../../hooks";

export default function SuccessDisclaimer() {
    const isProviderDataChangedSuccessfully = useAppSelector(
        (s) => s.provider.isDataChangedSuccessfully
    );
    const isCustomerDataChangedSuccessfully = useAppSelector(
        (s) => s.customer.isDataChangedSuccessfully
    );

    return isProviderDataChangedSuccessfully ||
    isCustomerDataChangedSuccessfully ? (
        <p className="message-result-succeeded">Changed successfully!</p>
    ) : null;
}
